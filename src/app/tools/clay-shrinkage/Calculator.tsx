"use client";

import { useState } from "react";

type Mode = "measure" | "plan";
type Unit = "mm" | "cm" | "in";

const roundTo2 = (n: number) => Math.round(n * 100) / 100;

export function ShrinkageCalculator() {
  const [mode, setMode] = useState<Mode>("measure");
  const [unit, setUnit] = useState<Unit>("mm");

  // Measure mode
  const [wetSize, setWetSize] = useState("");
  const [drySize, setDrySize] = useState("");
  const [firedSize, setFiredSize] = useState("");

  // Plan mode
  const [targetFiredSize, setTargetFiredSize] = useState("");
  const [shrinkagePct, setShrinkagePct] = useState("");

  // Results
  const [measureResult, setMeasureResult] = useState<{
    totalShrinkage: number;
    wetToDry?: number;
    dryToFired?: number;
  } | null>(null);
  const [planResult, setPlanResult] = useState<number | null>(null);
  const [savedShrinkage, setSavedShrinkage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const unitLabel = unit === "in" ? "in" : unit;

  const clearMeasureResult = () => setMeasureResult(null);
  const clearPlanResult = () => setPlanResult(null);

  const calculateMeasure = () => {
    const errs: string[] = [];
    const wet = parseFloat(wetSize);
    const fired = parseFloat(firedSize);
    const dry = drySize.trim() !== "" ? parseFloat(drySize) : null;

    if (isNaN(wet) || wet <= 0) errs.push("Enter a valid wet/green size.");
    if (isNaN(fired) || fired <= 0) errs.push("Enter a valid fired size.");
    if (!isNaN(wet) && !isNaN(fired) && fired >= wet)
      errs.push("Fired size should be smaller than wet size.");
    if (dry !== null) {
      if (isNaN(dry) || dry <= 0) errs.push("Enter a valid bone dry size, or leave it blank.");
      else if (!isNaN(wet) && dry >= wet) errs.push("Bone dry size should be smaller than wet size.");
      else if (!isNaN(fired) && dry <= fired) errs.push("Bone dry size should be larger than fired size.");
    }

    if (errs.length > 0) {
      setErrors(errs);
      setMeasureResult(null);
      return;
    }
    setErrors([]);

    const totalShrinkage = roundTo2(((wet - fired) / wet) * 100);
    const result: { totalShrinkage: number; wetToDry?: number; dryToFired?: number } = {
      totalShrinkage,
    };
    if (dry !== null && !isNaN(dry)) {
      result.wetToDry = roundTo2(((wet - dry) / wet) * 100);
      result.dryToFired = roundTo2(((dry - fired) / dry) * 100);
    }
    setMeasureResult(result);
  };

  const calculatePlan = () => {
    const errs: string[] = [];
    const target = parseFloat(targetFiredSize);
    const pct = parseFloat(shrinkagePct);

    if (isNaN(target) || target <= 0) errs.push("Enter a valid target fired size.");
    if (isNaN(pct) || pct <= 0 || pct >= 100)
      errs.push("Shrinkage % must be between 0 and 100.");

    if (errs.length > 0) {
      setErrors(errs);
      setPlanResult(null);
      return;
    }
    setErrors([]);

    const buildSize = roundTo2(target / (1 - pct / 100));
    setPlanResult(buildSize);
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex border border-line">
        {(
          [
            { key: "measure" as Mode, label: "Calculate shrinkage" },
            { key: "plan" as Mode, label: "Plan build size" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setMode(key);
              setErrors([]);
            }}
            className={
              "flex-1 py-3 text-sm font-semibold transition-colors " +
              (mode === key
                ? "bg-ash text-white"
                : "bg-white text-smoke hover:text-ash")
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Unit selector */}
      <div>
        <span className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
          Unit
        </span>
        <div className="flex gap-2">
          {(["mm", "cm", "in"] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={
                "px-4 py-1.5 text-xs border transition-colors " +
                (unit === u
                  ? "bg-ash text-white border-ash"
                  : "bg-white text-smoke border-line hover:text-ash")
              }
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {mode === "measure" ? (
        <div className="space-y-5">
          {/* Wet size */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
              Wet / green size ({unitLabel})
            </label>
            <input
              type="number"
              value={wetSize}
              min={0}
              step={0.1}
              onChange={(e) => {
                setWetSize(e.target.value);
                clearMeasureResult();
              }}
              placeholder="e.g. 120"
              className="w-40 border border-line bg-white px-4 py-2.5 text-ash tabular-nums focus:outline-none focus:border-ember"
            />
          </div>

          {/* Dry size (optional) */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-1">
              Bone dry size ({unitLabel}){" "}
              <span className="normal-case font-normal text-smoke/70">
                (optional)
              </span>
            </label>
            <p className="text-xs text-smoke mb-2">
              Measure after drying, before firing. Leave blank to skip the
              wet-to-dry breakdown.
            </p>
            <input
              type="number"
              value={drySize}
              min={0}
              step={0.1}
              onChange={(e) => {
                setDrySize(e.target.value);
                clearMeasureResult();
              }}
              placeholder="e.g. 115"
              className="w-40 border border-line bg-white px-4 py-2.5 text-ash tabular-nums focus:outline-none focus:border-ember"
            />
          </div>

          {/* Fired size */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
              Fired size ({unitLabel})
            </label>
            <input
              type="number"
              value={firedSize}
              min={0}
              step={0.1}
              onChange={(e) => {
                setFiredSize(e.target.value);
                clearMeasureResult();
              }}
              placeholder="e.g. 105"
              className="w-40 border border-line bg-white px-4 py-2.5 text-ash tabular-nums focus:outline-none focus:border-ember"
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="border border-ember bg-cream px-4 py-3 space-y-1">
              {errors.map((e, i) => (
                <p key={i} className="text-sm text-ash">
                  &#9888; {e}
                </p>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={calculateMeasure}
            className="w-full bg-ash hover:opacity-90 text-white font-semibold py-3.5 text-base transition-opacity"
          >
            Calculate shrinkage
          </button>

          {/* Results */}
          {measureResult && (
            <div className="border border-line bg-white">
              <div className="bg-cream px-5 py-3 border-b border-line">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke">
                  Shrinkage results
                </p>
              </div>
              <div className="px-5 py-4 space-y-3">
                {measureResult.wetToDry !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ash">Wet to dry</span>
                    <span className="font-semibold text-ash tabular-nums">
                      {measureResult.wetToDry}%
                    </span>
                  </div>
                )}
                {measureResult.dryToFired !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-ash">Dry to fired</span>
                    <span className="font-semibold text-ash tabular-nums">
                      {measureResult.dryToFired}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-line pt-3">
                  <span className="text-sm font-semibold text-ash">
                    Total shrinkage
                  </span>
                  <span className="text-2xl font-bold text-ember tabular-nums">
                    {measureResult.totalShrinkage}%
                  </span>
                </div>
              </div>
              <div className="px-5 pb-4">
                <button
                  type="button"
                  onClick={() => {
                    const pct = String(measureResult.totalShrinkage);
                    setSavedShrinkage(pct);
                    setShrinkagePct(pct);
                    setMode("plan");
                    setErrors([]);
                  }}
                  className="text-sm text-ember hover:text-ash transition-colors font-semibold"
                >
                  Use this % in the Plan tab &rarr;
                </button>
              </div>
              <div className="px-5 py-3 bg-cream border-t border-line">
                <p className="text-xs text-ash">
                  <span className="font-semibold">Studio tip:</span> Run this
                  calculation on a dedicated shrinkage bar. Make a 10 cm or
                  4-inch strip from fresh clay, fire it alongside your work,
                  then remeasure to get the exact rate for that body and that
                  kiln.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm text-smoke leading-relaxed">
            Know your clay body&apos;s shrinkage rate? Enter a target fired size
            and the calculator returns exactly how large to build it wet.
          </p>

          {savedShrinkage && (
            <div className="bg-cream border border-line px-4 py-2.5">
              <p className="text-xs text-ash">
                Shrinkage % carried over from your measurement:{" "}
                <span className="font-semibold">{savedShrinkage}%</span>
              </p>
            </div>
          )}

          {/* Target fired size */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
              Target fired size ({unitLabel})
            </label>
            <input
              type="number"
              value={targetFiredSize}
              min={0}
              step={0.1}
              onChange={(e) => {
                setTargetFiredSize(e.target.value);
                clearPlanResult();
              }}
              placeholder="e.g. 100"
              className="w-40 border border-line bg-white px-4 py-2.5 text-ash tabular-nums focus:outline-none focus:border-ember"
            />
          </div>

          {/* Shrinkage % */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
              Total shrinkage (%)
            </label>
            <div className="relative w-40">
              <input
                type="number"
                value={shrinkagePct}
                min={0}
                max={99}
                step={0.1}
                onChange={(e) => {
                  setShrinkagePct(e.target.value);
                  clearPlanResult();
                }}
                placeholder="e.g. 12"
                className="w-full border border-line bg-white px-4 py-2.5 pr-8 text-ash tabular-nums focus:outline-none focus:border-ember"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke text-sm pointer-events-none">
                %
              </span>
            </div>
            <p className="text-xs text-smoke mt-1.5">
              Typical range: 10&ndash;15% for most stoneware. Use the Calculate
              tab to find your exact rate.
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="border border-ember bg-cream px-4 py-3 space-y-1">
              {errors.map((e, i) => (
                <p key={i} className="text-sm text-ash">
                  &#9888; {e}
                </p>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={calculatePlan}
            className="w-full bg-ash hover:opacity-90 text-white font-semibold py-3.5 text-base transition-opacity"
          >
            Calculate build size
          </button>

          {planResult !== null && (
            <div className="border border-line bg-white">
              <div className="bg-ash text-white px-5 py-5 flex items-center justify-between">
                <span className="font-semibold">Build wet to</span>
                <span className="text-2xl font-bold tabular-nums">
                  {planResult} {unit}
                </span>
              </div>
              <div className="px-5 py-3 bg-cream border-t border-line">
                <p className="text-xs text-ash">
                  <span className="font-semibold">Studio tip:</span> Build
                  slightly larger and trim to size while the clay is still
                  plastic. Measure while the piece is still wet and upright
                  before stiffening begins.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
