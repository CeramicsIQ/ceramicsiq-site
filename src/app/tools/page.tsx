import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free interactive tools for potters and ceramic artists — glaze batch calculator, firing schedule builder, and more. Built by a working ceramicist.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Tools | CeramicsIQ",
    description:
      "Free interactive tools for potters and ceramic artists — built by a working ceramicist.",
    url: "/tools",
    type: "website",
  },
};

type Tool = {
  title: string;
  href: string;
  blurb: string;
  status: "live" | "coming-soon";
};

const tools: Tool[] = [
  {
    title: "Glaze Batch Calculator",
    href: "/tools/glaze-calculator",
    blurb:
      "Enter a recipe in percentages and a target batch size. Get exact weights in grams for every material, with colorants and additives handled separately on top of the 100% base.",
    status: "live",
  },
  {
    title: "Firing Schedule Builder",
    href: "/tools/firing-schedule",
    blurb:
      "Build a complete kiln firing schedule — ramp rates, hold times, and controlled cooling — formatted for common controllers. Includes soda and atmosphere firing presets.",
    status: "coming-soon",
  },
  {
    title: "Glaze Material Substitution Helper",
    href: "/tools/substitutions",
    blurb:
      "Replace a material in a recipe with something you actually have on your shelf. See what oxides shift, what stays the same, and what to watch for.",
    status: "coming-soon",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="bg-warm">
      {/* ── Tagline bar ── */}
      <div className="border-b border-line bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <p className="font-serif text-lg sm:text-xl font-semibold text-ash leading-snug">
            Tools for Working Potters.
          </p>
          <p className="text-sm text-smoke mt-3">
            Free, mobile-friendly calculators and planners. Built for the studio.
          </p>
        </div>
      </div>

      {/* ── Tools grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10 pb-16">
        <h2 className="text-[13px] font-bold uppercase tracking-wide text-ash mb-6 pb-2.5 border-b-2 border-ember inline-block">
          Available Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const isLive = tool.status === "live";
            const cardClasses =
              "block border border-line bg-white p-6 sm:p-7 transition-colors " +
              (isLive ? "hover:border-ember no-underline" : "opacity-70");

            const inner = (
              <>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl font-bold text-ash leading-snug">
                    {tool.title}
                  </h3>
                  {!isLive && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-smoke border border-line px-2 py-0.5 whitespace-nowrap mt-1.5">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-smoke leading-relaxed">{tool.blurb}</p>
                {isLive && (
                  <p className="text-sm font-semibold text-ember mt-4">
                    Open tool →
                  </p>
                )}
              </>
            );

            return isLive ? (
              <Link key={tool.href} href={tool.href} className={cardClasses}>
                {inner}
              </Link>
            ) : (
              <div key={tool.href} className={cardClasses}>
                {inner}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-smoke mt-10 max-w-2xl">
          More tools on the way. If there&apos;s something you wish existed for the studio,{" "}
          <Link href="/subscribe" className="text-ember no-underline hover:underline">
            let me know
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
