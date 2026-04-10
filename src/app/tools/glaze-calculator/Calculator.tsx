"use client";

import { useCallback, useState } from "react";

type Row = { id: number; name: string; percentage: string };
type ResultRow = { name: string; percentage: number; grams: number };
type Results = {
  matResults: ResultRow[];
  addResults: ResultRow[];
  batchGrams: number;
  additivesTotal: number;
  grandTotal: number;
};

let nextId = 1;
const newRow = (name = "", percentage = ""): Row => ({
  id: nextId++,
  name,
  percentage,
});

const makeInitialMaterials = (): Row[] => [
  newRow("Silica"),
  newRow("Whiting"),
  newRow("Feldspar"),
  newRow(),
];

const makeInitialAdditives = (): Row[] => [newRow()];

const roundTo2 = (n: number) => Math.round(n * 100) / 100;

export function GlazeCalculator() {
  const [materials, setMaterials] = useState<Row[]>(makeInitialMaterials);
  const [additives, setAdditives] = useState<Row[]>(makeInitialAdditives);
  const [batchSize, setBatchSize] = useState("1000");
  const [recipeName, setRecipeName] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  // ── Mutations ────────────────────────────────────────────────
  const clearResults = () => {
    setResults(null);
    setErrors([]);
  };

  const updateMaterial = (id: number, field: "name" | "percentage", value: string) => {
    setMaterials((ms) => ms.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
    clearResults();
  };
  const addMaterial = () => {
    setMaterials((ms) => [...ms, newRow()]);
  };
  const removeMaterial = (id: number) => {
    setMaterials((ms) => ms.filter((m) => m.id !== id));
    clearResults();
  };

  const updateAdditive = (id: number, field: "name" | "percentage", value: string) => {
    setAdditives((as) => as.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    clearResults();
  };
  const addAdditive = () => {
    setAdditives((as) => [...as, newRow()]);
  };
  const removeAdditive = (id: number) => {
    setAdditives((as) => as.filter((a) => a.id !== id));
    clearResults();
  };

  // ── Calculation ──────────────────────────────────────────────
  const calculate = useCallback(() => {
    const errs: string[] = [];

    const filledMats = materials.filter(
      (m) => m.name.trim() !== "" || m.percentage !== ""
    );
    const filledAdds = additives.filter(
      (a) => a.name.trim() !== "" || a.percentage !== ""
    );

    const matRows: { name: string; pct: number }[] = [];
    let totalBase = 0;
    for (const m of filledMats) {
      if (!m.name.trim()) {
        errs.push("All base materials need a name.");
        break;
      }
      const pct = parseFloat(m.percentage);
      if (isNaN(pct) || pct <= 0) {
        errs.push(`"${m.name}" has an invalid percentage.`);
        break;
      }
      totalBase += pct;
      matRows.push({ name: m.name, pct });
    }

    if (matRows.length === 0) errs.push("Add at least one base material.");

    const batchGrams = parseFloat(batchSize);
    if (isNaN(batchGrams) || batchGrams <= 0) {
      errs.push("Batch size must be a positive number.");
    }

    if (matRows.length > 0 && Math.abs(totalBase - 100) > 0.01) {
      errs.push(
        `Base materials total ${roundTo2(totalBase)}% — they must add up to exactly 100%.`
      );
    }

    const addRows: { name: string; pct: number }[] = [];
    for (const a of filledAdds) {
      if (!a.name.trim()) {
        errs.push("All additives need a name.");
        break;
      }
      const pct = parseFloat(a.percentage);
      if (isNaN(pct) || pct <= 0) {
        errs.push(`Additive "${a.name}" has an invalid percentage.`);
        break;
      }
      addRows.push({ name: a.name, pct });
    }

    if (errs.length > 0) {
      setErrors(errs);
      setResults(null);
      return;
    }

    setErrors([]);

    const matResults: ResultRow[] = matRows.map((m) => ({
      name: m.name,
      percentage: m.pct,
      grams: roundTo2((m.pct / 100) * batchGrams),
    }));

    const addResults: ResultRow[] = addRows.map((a) => ({
      name: a.name,
      percentage: a.pct,
      grams: roundTo2((a.pct / 100) * batchGrams),
    }));

    const additivesTotal = roundTo2(
      addResults.reduce((s, a) => s + a.grams, 0)
    );
    const grandTotal = roundTo2(batchGrams + additivesTotal);

    setResults({
      matResults,
      addResults,
      batchGrams,
      additivesTotal,
      grandTotal,
    });
  }, [materials, additives, batchSize]);

  const reset = () => {
    setMaterials(makeInitialMaterials());
    setAdditives(makeInitialAdditives());
    setBatchSize("1000");
    setRecipeName("");
    setResults(null);
    setErrors([]);
  };

  // ── Derived ─────────────────────────────────────────────────
  const totalBaseDisplay = materials.reduce(
    (s, m) => s + (parseFloat(m.percentage) || 0),
    0
  );
  const isBaseOk = Math.abs(totalBaseDisplay - 100) < 0.01;
  const totalPctColorClass = isBaseOk
    ? "text-emerald-700"
    : totalBaseDisplay > 100
    ? "text-ember"
    : "text-smoke";

  // ── UI ──────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Recipe name */}
      <div>
        <label
          htmlFor="recipe-name"
          className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2"
        >
          Recipe name (optional)
        </label>
        <input
          id="recipe-name"
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="e.g. Shino Base, Tenmoku, Celadon…"
          className="w-full border border-line bg-white px-4 py-2.5 text-ash placeholder-smoke/60 focus:outline-none focus:border-ember"
        />
      </div>

      {/* Batch size */}
      <div>
        <label
          htmlFor="batch-size"
          className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2"
        >
          Target batch size (grams)
        </label>
        <div className="flex items-center gap-3">
          <input
            id="batch-size"
            type="number"
            value={batchSize}
            min={1}
            onChange={(e) => {
              setBatchSize(e.target.value);
              clearResults();
            }}
            className="w-40 border border-line bg-white px-4 py-2.5 text-ash tabular-nums focus:outline-none focus:border-ember"
          />
          <span className="text-smoke text-sm">grams</span>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[500, 1000, 2000, 5000].map((g) => {
            const active = batchSize === String(g);
            return (
              <button
                type="button"
                key={g}
                onClick={() => {
                  setBatchSize(String(g));
                  clearResults();
                }}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  active
                    ? "bg-ash text-white border-ash"
                    : "bg-white text-smoke border-line hover:text-ash"
                }`}
              >
                {g}g
              </button>
            );
          })}
        </div>
      </div>

      {/* Base materials */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-smoke">
            Base materials
          </span>
          <span
            className={`text-sm font-semibold tabular-nums ${totalPctColorClass}`}
          >
            Total: {roundTo2(totalBaseDisplay)}%
            {isBaseOk ? " ✓" : " (need 100%)"}
          </span>
        </div>

        <div className="space-y-2">
          {materials.map((m, i) => (
            <div key={m.id} className="flex items-center gap-2">
              <input
                type="text"
                value={m.name}
                onChange={(e) => updateMaterial(m.id, "name", e.target.value)}
                placeholder={`Material ${i + 1}`}
                className="flex-1 min-w-0 border border-line bg-white px-3 py-2 text-sm text-ash placeholder-smoke/60 focus:outline-none focus:border-ember"
              />
              <div className="relative w-24 sm:w-28 flex-shrink-0">
                <input
                  type="number"
                  value={m.percentage}
                  min={0}
                  max={100}
                  step={0.1}
                  onChange={(e) =>
                    updateMaterial(m.id, "percentage", e.target.value)
                  }
                  placeholder="0"
                  className="w-full border border-line bg-white px-3 py-2 pr-7 text-sm text-ash text-right tabular-nums placeholder-smoke/60 focus:outline-none focus:border-ember"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-smoke text-xs pointer-events-none">
                  %
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeMaterial(m.id)}
                disabled={materials.length <= 1}
                aria-label="Remove material"
                className="w-7 text-smoke hover:text-ember disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMaterial}
          className="mt-3 text-sm text-smoke hover:text-ash flex items-center gap-1.5 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add material
        </button>
      </div>

      {/* Additives */}
      <div>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-1">
          Colorants & additives
        </span>
        <p className="text-xs text-smoke mb-3">
          Added on top of the 100% base — e.g. 2% cobalt carbonate on a 1000g batch = 20g
          extra.
        </p>

        <div className="space-y-2">
          {additives.map((a, i) => (
            <div key={a.id} className="flex items-center gap-2">
              <input
                type="text"
                value={a.name}
                onChange={(e) => updateAdditive(a.id, "name", e.target.value)}
                placeholder={`Additive ${i + 1} (e.g. Cobalt Carbonate)`}
                className="flex-1 min-w-0 border border-line bg-white px-3 py-2 text-sm text-ash placeholder-smoke/60 focus:outline-none focus:border-ember"
              />
              <div className="relative w-24 sm:w-28 flex-shrink-0">
                <input
                  type="number"
                  value={a.percentage}
                  min={0}
                  step={0.1}
                  onChange={(e) =>
                    updateAdditive(a.id, "percentage", e.target.value)
                  }
                  placeholder="0"
                  className="w-full border border-line bg-white px-3 py-2 pr-7 text-sm text-ash text-right tabular-nums placeholder-smoke/60 focus:outline-none focus:border-ember"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-smoke text-xs pointer-events-none">
                  %
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeAdditive(a.id)}
                disabled={additives.length <= 1}
                aria-label="Remove additive"
                className="w-7 text-smoke hover:text-ember disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none flex-shrink-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addAdditive}
          className="mt-3 text-sm text-smoke hover:text-ash flex items-center gap-1.5 transition-colors"
        >
          <span className="text-lg leading-none">+</span> Add additive
        </button>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="border border-ember bg-cream px-4 py-3 space-y-1">
          {errors.map((e, i) => (
            <p key={i} className="text-sm text-ash">
              ⚠ {e}
            </p>
          ))}
        </div>
      )}

      {/* Calculate button */}
      <button
        type="button"
        onClick={calculate}
        className="w-full bg-ash hover:opacity-90 text-white font-semibold py-3.5 text-base transition-opacity"
      >
        Calculate batch weights
      </button>

      {/* Results */}
      {results && (
        <div className="border border-line bg-white">
          {recipeName && (
            <div className="bg-cream px-5 py-3 border-b border-line">
              <p className="font-serif font-bold text-ash">{recipeName}</p>
              <p className="text-xs text-smoke">
                Batch size: {results.batchGrams}g base
              </p>
            </div>
          )}

          {/* Base materials table */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke mb-3">
              Base materials
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-smoke uppercase tracking-wider">
                  <th className="text-left pb-2 font-medium">Material</th>
                  <th className="text-right pb-2 font-medium w-16">%</th>
                  <th className="text-right pb-2 font-medium w-24">Grams</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {results.matResults.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2 text-ash">{r.name}</td>
                    <td className="py-2 text-right text-smoke tabular-nums">
                      {r.percentage}
                    </td>
                    <td className="py-2 text-right font-semibold text-ash tabular-nums">
                      {r.grams}g
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-line">
                  <td className="pt-2 font-semibold text-ash">Base total</td>
                  <td className="pt-2 text-right text-smoke tabular-nums">100%</td>
                  <td className="pt-2 text-right font-bold text-ash tabular-nums">
                    {results.batchGrams}g
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Additives table */}
          {results.addResults.length > 0 && (
            <div className="px-5 pt-2 pb-2 border-t border-line mt-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke mb-3 mt-2">
                Colorants & additives
              </p>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-line">
                  {results.addResults.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2 text-ash">{r.name}</td>
                      <td className="py-2 text-right text-smoke tabular-nums w-16">
                        {r.percentage}%
                      </td>
                      <td className="py-2 text-right font-semibold text-ash tabular-nums w-24">
                        {r.grams}g
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-line">
                    <td className="pt-2 text-smoke text-xs">Additives subtotal</td>
                    <td></td>
                    <td className="pt-2 text-right text-smoke tabular-nums text-xs">
                      {results.additivesTotal}g
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Grand total */}
          <div className="bg-ash text-white px-5 py-4 flex items-center justify-between">
            <span className="font-semibold">Total batch weight</span>
            <span className="text-xl font-bold tabular-nums">
              {results.grandTotal}g
            </span>
          </div>

          {/* Studio tip */}
          <div className="px-5 py-3 bg-cream border-t border-line">
            <p className="text-xs text-ash">
              <span className="font-semibold">Studio tip:</span> Weigh each material into
              a bucket and mix dry before adding water. Sieve through an 80-mesh screen
              for best results.
            </p>
          </div>
        </div>
      )}

      {/* Reset */}
      {results && (
        <button
          type="button"
          onClick={reset}
          className="w-full border border-line text-smoke hover:text-ash py-2.5 text-sm transition-colors"
        >
          Start a new recipe
        </button>
      )}
    </div>
  );
}
