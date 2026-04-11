import type { Metadata } from "next";
import Link from "next/link";
import { ShrinkageCalculator } from "./Calculator";

export const metadata: Metadata = {
  title: "Clay Shrinkage Calculator",
  description:
    "Free clay shrinkage calculator for potters. Calculate the shrinkage percentage of your clay body from wet to fired, or find out how large to build a piece to hit a target fired size.",
  alternates: {
    canonical: "/tools/clay-shrinkage",
  },
  openGraph: {
    title: "Clay Shrinkage Calculator | CeramicsIQ",
    description:
      "Calculate clay shrinkage percentage from wet and fired measurements, or reverse-calculate the wet build size you need to hit a target fired dimension.",
    url: "/tools/clay-shrinkage",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is clay shrinkage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clay shrinkage is the reduction in size that happens as a piece of clay loses moisture and then undergoes vitrification during firing. It occurs in two stages: first as the piece dries from plastic to bone dry, and again as it fires in the kiln. Total shrinkage for stoneware typically falls between 10 and 15 percent from the wet state to the finished fired piece. The exact rate depends on the clay body, the firing temperature, and how densely the clay particles are packed during throwing or handbuilding.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate clay shrinkage percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To calculate clay shrinkage percentage, measure your piece in the wet state and again after firing. Subtract the fired measurement from the wet measurement, divide by the wet measurement, and multiply by 100. The formula is: shrinkage percent equals (wet size minus fired size) divided by wet size, times 100. For example, if a test bar starts at 120mm wet and fires to 105mm, the shrinkage is (120 minus 105) divided by 120, times 100 - which equals 12.5 percent.",
      },
    },
    {
      "@type": "Question",
      name: "What size should I make something to get a specific fired size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide your target fired size by one minus the shrinkage rate expressed as a decimal. If you want a finished piece that is 100mm wide and your clay shrinks 12 percent, divide 100 by (1 minus 0.12), which gives you 0.88. That produces a build size of approximately 113.6mm. The Plan Build Size tab of this calculator handles that arithmetic directly - enter the target fired size and your clay body's known shrinkage rate, and it returns the wet build size.",
      },
    },
    {
      "@type": "Question",
      name: "Why does clay shrink more in some firings than others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shrinkage rate depends primarily on firing temperature and the mineral composition of the clay body. Clays fired to higher temperatures undergo more vitrification - a process where silica and alumina fuse - which compresses the clay particles further. Porcelain fired to cone 10 or higher typically shrinks 12 to 15 percent total. Low-fire earthenware fired to cone 04 might shrink only 8 to 10 percent. Clay body formulation also matters: bodies with higher ball clay content tend to shrink more than those with more grog or silica sand.",
      },
    },
    {
      "@type": "Question",
      name: "What is a shrinkage bar and how do I use one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A shrinkage bar is a flat test strip made from fresh clay, usually 100 to 150mm long, with a scored line or a measurement marked at a known wet length. After drying and firing alongside your work, you remeasure the bar and compare it to the original length. The difference gives you the shrinkage rate for that clay body at that specific firing. Many potters keep a dedicated shrinkage bar in every test firing to track how a new clay batch behaves before committing to a full production run.",
      },
    },
  ],
};

export default function ClayShrinkagePage() {
  return (
    <div className="bg-warm">
      {/* FAQ JSON-LD for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb + tagline */}
      <div className="border-b border-line bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
            <Link href="/tools" className="no-underline hover:text-ash">
              Tools
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ash">Clay Shrinkage Calculator</span>
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ash leading-snug">
            Clay Shrinkage Calculator
          </h1>
          <p className="text-sm text-smoke mt-3 max-w-xl">
            Measure wet and fired dimensions to find your clay body&apos;s
            shrinkage rate, or enter a target fired size to get the exact wet
            build size.
          </p>
        </div>
      </div>

      {/* Calculator (client component) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pb-16">
        <ShrinkageCalculator />
      </section>

      {/* AEO explainer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16">
        <div className="border-t border-line pt-10">
          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            What is clay shrinkage?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            Clay shrinkage is the reduction in size that happens as a piece
            loses moisture and then undergoes vitrification in the kiln. It
            occurs in two distinct stages: wet to bone dry as water evaporates
            from the clay body, and dry to fired as the silica and alumina fuse
            under heat. Most stoneware shrinks between 10 and 15 percent total
            from the plastic state to the finished fired piece, though the exact
            rate depends on the clay body, firing temperature, and how the piece
            was built.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            How do you calculate clay shrinkage percentage?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            Measure your piece wet, then again after firing. Subtract the fired
            measurement from the wet measurement, divide by the wet measurement,
            and multiply by 100. A test bar that starts at 120mm wet and comes
            out of the kiln at 105mm has a total shrinkage of (120 - 105)
            divided by 120, times 100 - which is 12.5 percent. The Calculate
            Shrinkage tab above handles this automatically; entering a bone dry
            measurement as well splits the result into wet-to-dry and
            dry-to-fired stages.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            How do I plan a build size from a target fired dimension?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed">
            Once you know your clay body&apos;s shrinkage rate, divide the
            target fired size by one minus the shrinkage expressed as a decimal.
            For a target of 100mm with a 12 percent shrinkage rate: 100 divided
            by 0.88 equals approximately 113.6mm wet. The Plan Build Size tab
            does this in one step. The most reliable approach is to fire a
            dedicated shrinkage bar - a 100mm strip of fresh clay - alongside
            your work each time you use a new clay batch, so the rate stays
            accurate across different bodies and temperatures.
          </p>
        </div>
      </section>
    </div>
  );
}
