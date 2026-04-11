import type { Metadata } from "next";
import Link from "next/link";
import { CritiqueForm } from "./CritiqueForm";

export const metadata: Metadata = {
  title: "Ceramics Critique",
  description:
    "Upload a photo of your ceramic piece and get a free AI-powered critique covering form, glaze work, surface quality, and specific suggestions from a ceramics instructor's perspective.",
  alternates: {
    canonical: "/tools/ceramics-critique",
  },
  openGraph: {
    title: "Ceramics Critique | CeramicsIQ",
    description:
      "Get a free ceramics critique for your piece. Upload a photo and receive detailed feedback on form, glaze, surface, and technique.",
    url: "/tools/ceramics-critique",
    type: "website",
  },
};

export default function CeramicsCritiquePage() {
  return (
    <div className="bg-warm">
      {/* Breadcrumb + tagline */}
      <div className="border-b border-line bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-smoke mb-2">
            <Link href="/tools" className="no-underline hover:text-ash">
              Tools
            </Link>
            <span className="mx-2 text-line">/</span>
            <span className="text-ash">Ceramics Critique</span>
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ash leading-snug">
            Ceramics Critique
          </h1>
          <p className="text-sm text-smoke mt-3 max-w-xl">
            Upload a photo of your piece and get a free critique covering form,
            glaze work, surface quality, and one or two concrete suggestions.
            Two critiques per session.
          </p>
        </div>
      </div>

      {/* Tool */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-10 pb-6">
        <CritiqueForm />
      </section>

      {/* Privacy statement */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-10">
        <div className="border border-line bg-cream px-5 py-4">
          <p className="text-[12px] text-smoke leading-relaxed">
            <span className="font-semibold text-ash">Privacy:</span> Photos you upload are sent to
            Anthropic&apos;s API to generate your critique and are not stored by CeramicsIQ.
            Anthropic may process and store submitted content in accordance with their{" "}
            <a
              href="https://www.anthropic.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember no-underline hover:underline"
            >
              privacy policy
            </a>
            . Do not upload photos containing personal or sensitive information.
          </p>
        </div>
      </section>

      {/* Explainer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-8 pb-16">
        <div className="border-t border-line pt-10">
          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            What does the critique cover?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            The critique looks at what is visible in your photo: form and
            proportion, surface texture and throwing marks, glaze application
            and any firing effects, and overall technical execution. It calls
            out what is working and gives one or two specific, actionable
            suggestions. It reads like feedback from a studio mentor rather than
            a checklist.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            How do I get the best critique?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed mb-8">
            Shoot in natural light against a plain background if you can. A
            straight-on photo works well for most forms; for surface texture,
            raking light from the side can reveal a lot more. The cleaner and
            sharper the image, the more specific the feedback. Dark or blurry
            photos limit what can be assessed.
          </p>

          <h2 className="font-serif text-xl font-bold text-ash mb-3">
            Is this a replacement for a real critique?
          </h2>
          <p className="text-[15px] text-ash leading-relaxed">
            No. A good mentor in the studio, handling your piece, will always
            see more than a photo can show. Weight, wall thickness, how it sits
            in the hand - none of that comes through an image. Think of this as
            a first pass: a way to get structured feedback quickly, spot things
            worth looking at more closely, or prepare for a conversation with
            your instructor or fellow potters.
          </p>
        </div>
      </section>
    </div>
  );
}
