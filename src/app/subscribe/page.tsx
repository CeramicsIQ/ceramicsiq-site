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

      {/* ── Hero + signup + lead magnet (unified) ── */}
      <section className="border-b border-line bg-cream">
        <div className="max-w-[580px] mx-auto px-6 py-14 text-center">
          <h1 className="font-serif text-[40px] font-bold text-ash leading-tight mb-3">
            Never miss a firing
          </h1>
          <p className="font-serif text-[17px] text-smoke leading-relaxed mb-8">
            Weekly deep-dives on techniques, artists, and what&apos;s worth
            collecting. Written by a working ceramicist.
          </p>
          <div className="flex justify-center mb-6">
            <EmailCapture />
          </div>
          {/* Lead magnet callout */}
          <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#FDF9F4] border border-line px-5 py-4 text-left"
               style={{borderLeft: "4px solid #E8520E"}}>
            <div className="flex-shrink-0 w-20 border border-line bg-white flex flex-col items-center justify-center py-4 px-2 text-center shadow-sm">
              <p className="text-[7px] font-bold uppercase tracking-widest text-ember mb-1">Ceramics IQ</p>
              <p className="font-serif text-[9px] font-bold text-ash leading-snug">5 Things Collectors Notice</p>
              <p className="text-[7px] text-smoke mt-2 italic">Free guide</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-ember mb-1">Free with every signup</p>
              <p className="text-[14px] font-semibold text-ash leading-snug mb-1">
                5 Things Collectors Notice in Every Strong Ceramic Piece
              </p>
              <p className="text-[13px] text-smoke leading-relaxed">
                &ldquo;Inside the Clay&rdquo; — Secrets only a potter would notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-10 px-8">
        <div className="max-w-[520px] mx-auto">
          <h3 className="text-[15px] font-bold uppercase tracking-wide text-ash mb-5">
            Every week in your inbox
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
