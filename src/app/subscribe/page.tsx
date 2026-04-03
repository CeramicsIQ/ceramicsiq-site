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

      {/* ── Lead magnet offer ── */}
      <section className="border-b border-line bg-cream">
        <div className="max-w-[580px] mx-auto px-6 py-12 flex flex-col sm:flex-row gap-8 items-center">
          {/* PDF cover preview */}
          <div className="flex-shrink-0 w-36 border border-line shadow-sm bg-[#FDF9F4] flex flex-col items-center justify-center py-6 px-4 text-center"
               style={{borderLeft: "5px solid #E8520E"}}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-ember mb-2">Ceramics IQ</p>
            <p className="font-serif text-[11px] font-bold text-ash leading-snug">5 Things Collectors Notice in Every Strong Ceramic Piece</p>
            <p className="text-[8px] text-smoke mt-3 italic">No rules. Just insight.</p>
          </div>
          {/* Offer copy */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ember mb-2">Free with your signup</p>
            <h2 className="font-serif text-2xl font-bold text-ash leading-snug mb-3">
              5 Things Collectors Notice in Every Strong Ceramic Piece
            </h2>
            <p className="text-[15px] text-smoke leading-relaxed mb-4">
              A short guide to developing your eye — what separates work that holds up from work that just looks good in photos.
            </p>
            <a
              href="/lead-magnet.pdf"
              download="5-Things-Collectors-Notice-CeramicsIQ.pdf"
              className="inline-block text-[11px] font-bold uppercase tracking-widest text-ember border border-ember px-4 py-2 hover:bg-ember hover:text-cream transition-colors"
            >
              Download free guide →
            </a>
          </div>
        </div>
      </section>

      {/* ── Signup ── */}
      <section className="max-w-[520px] mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-[38px] font-bold text-ash leading-tight mb-4">
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
