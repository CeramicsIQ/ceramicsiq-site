import type { Metadata } from "next";
import Link from "next/link";
import { GlazeCalculator } from "./Calculator";

export const metadata: Metadata = {
  title: "Glaze Batch Calculator",
  description:
    "Free glaze batch calculator for potters. Enter your recipe percentages and target batch size to get exact weights in grams. Handles colorants and additives separately, on top of the 100% base.",
  alternates: {
    canonical: "/tools/glaze-calculator",
  },
  openGraph: {
    title: "Glaze Batch Calculator | CeramicsIQ",
    description:
      "Enter your recipe percentages and batch size. Get exact weights for every material, with colorants calculated on top of the 100% base.",
    url: "/tools/glaze-calculator",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate a glaze batch size?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Enter each material's percentage of the recipe (the base materials must total 100%) and your target batch size in grams. Multiply each percentage by the batch size and divide by 100 to get the weight of each material. Colorants and additives are calculated on top of the 100% base.",
      },
    },
    {
      "@type": "Question",
      name: "Why do glaze recipe percentages add up to 100?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Glaze recipes use a percentage-based system so the same recipe can be scaled to any batch size. The base materials always total 100%, and colorants or opacifiers are added on top as additional percentages — for example, 2% cobalt carbonate on a 1000g batch equals 20g extra.",
      },
    },
    {
      "@type": "Question",
      name: "Are colorants included in the 100% base of a glaze recipe?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Colorants, opacifiers, and other additives are calculated on top of the 100% base recipe. This keeps the underlying chemistry consistent so you can adjust colorants without reformulating the glaze.",
      },
    },
    {
      "@type": "Question",
      name: "How do I double or halve a glaze recipe?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Because the recipe is expressed in percentages, you simply change the target batch size. For a double batch, enter twice the grams; for half, enter half. The percentages stay the same and every material scales proportionally.",
      },
    },
  ],
};

export default function GlazeCalculatorPage() {
  return (
    <div className="bg-warm">
      {/* FAQ JSON-LD for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Breadcrumb + tagline ── */}
      <div className="border-b border-line bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
            <Link href="/tools" className="no-underline hover:text-ash">
              Tools
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ash">Glaze Batch Calculator</span>
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ash leading-snug">
            Glaze Batch Calculator
          </h1>
          <p className="text-sm text-smoke mt-3 max-w-xl">
            Enter your recipe percentages and a target batch size. Get exact weights for
            every material, with colorants handled separately on top of the 100% base.
          </p>
        </div>
      </div>

      {/* ── Calculator (client component) ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pb-16">
        <GlazeCalculator />
      </section>

      {/* ── Explainer for AEO (question-based H2s) ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16">
        <div className="border-t border-line pt-10">
          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            How do I calculate a glaze batch size?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            Glaze recipes are written in percentages so they can be scaled to any batch
            size. To calculate the actual weight of each material, multiply its percentage
            by your target batch size and divide by 100. For a 1000g batch of a recipe
            that&apos;s 50% feldspar, 25% silica, 15% whiting, and 10% kaolin, you&apos;d
            weigh out 500g, 250g, 150g, and 100g respectively.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            Why are colorants added on top of the 100% base?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            Keeping colorants and opacifiers outside the 100% base lets you adjust them
            without changing the glaze chemistry underneath. A base recipe at 2% cobalt
            carbonate versus 4% cobalt carbonate still fires the same way structurally —
            only the color shifts. This is why most potter&apos;s recipes list colorants
            as additions rather than reformulating the base.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            How do I scale a glaze recipe up or down?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed">
            Just change the target batch size. Because the recipe is percentage-based, all
            the individual weights scale proportionally. A common studio workflow is to
            test new glazes at 500g, then mix production batches at 2000–5000g once a
            recipe is dialed in.
          </p>
        </div>
      </section>
    </div>
  );
}
