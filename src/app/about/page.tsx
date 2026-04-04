import { IMG } from "@/lib/ghost";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "CeramicsIQ is technique deep-dives, artist features, and collector intelligence for the ceramics world. Built by Lin Kensington, a working soda-fired ceramicist.",
  openGraph: {
    title: "About | CeramicsIQ",
    description:
      "Built by a working ceramicist. Technique deep-dives, artist features, and collector intelligence.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-warm">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h1 className="font-serif text-[36px] md:text-[42px] font-bold text-ash leading-tight mb-6">
            About CeramicsIQ
          </h1>
          <p className="font-serif text-[17px] text-[#4A4238] leading-relaxed mb-4">
            CeramicsIQ started because the ceramics world deserved better
            content. Not Pinterest boards. Not listicles. Real depth, the kind
            that helps you understand what you&apos;re looking at when you pick
            up a handmade bowl, and why it matters.
          </p>
          <p className="font-serif text-[17px] text-[#4A4238] leading-relaxed">
            Working soda-fired ceramicist. A decade in e-commerce. Deep into tea
            ceremony culture. CeramicsIQ is the resource I wished existed when I
            started collecting.
          </p>
        </div>
        <div className="overflow-hidden">
          <img
            src={IMG.founder}
            alt="Lin Kensington"
            className="hover-image w-full h-[280px] md:h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Content pillars */}
      <section className="border-t border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              t: "Techniques",
              d: "Firing methods, glazing science, surface analysis",
            },
            {
              t: "Artist Features",
              d: "Process, philosophy, and the work itself",
            },
            {
              t: "Collector Guides",
              d: "How to evaluate, buy, and build with intention",
            },
            {
              t: "Market Intel",
              d: "Auction trends, emerging artists, where attention is shifting",
            },
          ].map((item) => (
            <div key={item.t}>
              <h3 className="text-[15px] font-bold text-ash mb-2">{item.t}</h3>
              <p className="text-sm text-smoke leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal note */}
      <section className="py-10 px-4 sm:px-8">
        <div className="max-w-[720px] mx-auto">
          <p className="font-serif text-[17px] leading-relaxed text-[#4A4238] mb-7">
            I make my own soda-fired stoneware at{" "}
            <a href="https://linkensington.art" target="_blank" rel="noopener noreferrer" className="text-ash font-bold hover:text-ember transition-colors">Lin Kensington Art</a>.
            CeramicsIQ is where I share everything I&apos;ve learned, and keep
            learning, about this world.
          </p>
          <div className="bg-cream p-6 border border-line flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h4 className="text-[15px] font-bold text-ash mb-1">
                Ceramics I.Q. on YouTube
              </h4>
              <p className="text-sm text-smoke">
                Technique breakdowns, studio visits, collector deep-dives.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@CeramicsIQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ember no-underline hover:underline"
            >
              Watch →
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD About page schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Organization",
              name: "CeramicsIQ",
              founder: {
                "@type": "Person",
                name: "Lin Kensington",
                jobTitle: "Ceramicist & Founder",
              },
              description:
                "Technique deep-dives, artist features, and collector intelligence for the ceramics world.",
            },
          }),
        }}
      />
    </div>
  );
}
