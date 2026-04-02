import { getArtists } from "@/lib/ghost";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Potters, ceramicists, and makers pushing the craft forward. Explore featured ceramic artists from around the world.",
  openGraph: {
    title: "Artists | CeramicsIQ",
    description: "Featured ceramic artists from around the world.",
  },
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="bg-warm">
      <section className="max-w-6xl mx-auto px-8 pt-10 pb-5">
        <h1 className="font-serif text-[42px] font-bold text-ash mb-2">
          Artists
        </h1>
        <p className="font-serif text-[17px] text-smoke mb-7 max-w-[520px]">
          Potters, ceramicists, and makers pushing the craft forward.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-5">
          {artists.map((a) => (
            <div
              key={a.name}
              className="group bg-white border border-line flex cursor-pointer hover:border-ember/30 transition-colors"
            >
              <div className="w-[130px] flex-shrink-0 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.name}
                  className="hover-image w-full h-full object-cover min-h-[140px]"
                />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <h3 className="text-base font-bold text-ash mb-1">
                  {a.name}
                </h3>
                <p className="text-sm text-ember mb-2">{a.technique}</p>
                <p className="text-[13px] text-smoke">{a.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
