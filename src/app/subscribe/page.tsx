import { EmailCapture } from "@/components/EmailCapture";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get weekly technique deep-dives, artist features, and collector intelligence from CeramicsIQ. Written by a working ceramicist.",
  openGraph: {
    title: "Subscribe | CeramicsIQ",
    description: "Weekly ceramics intelligence delivered to your inbox.",
  },
};

export default function SubscribePage() {
  return (
    <div className="bg-warm">
      <section className="max-w-[520px] mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-[42px] font-bold text-ash leading-tight mb-4">
          Never miss a firing
        </h1>
        <p className="font-serif text-[17px] text-smoke leading-relaxed mb-8">
          Weekly deep-dives on techniques, artists, and what&apos;s worth
          collecting. Written by a working ceramicist.
        </p>
        <div className="flex justify-center">
          <EmailCapture />
        </div>
      </section>

      <section className="border-t border-line py-10 px-8">
        <div className="max-w-[520px] mx-auto">
          <h3 className="text-[15px] font-bold uppercase tracking-wide text-ash mb-5">
            What you&apos;ll get
          </h3>
          {[
            "Technique breakdowns — how soda firing, wood firing, and atmospheric glazing actually work",
            "Artist profiles — the potters pushing the craft forward",
            "Collector intelligence — how to evaluate, buy, and build a collection",
            "Market notes — what's moving and where attention is shifting",
          ].map((item, i) => (
            <div
              key={i}
              className="py-3.5 border-b border-line flex gap-3.5 items-baseline"
            >
              <span className="text-sm font-bold text-ember flex-shrink-0">
                {i + 1}.
              </span>
              <p className="text-[15px] text-[#4A4238] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
