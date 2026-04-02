import { getArticles } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import type { Metadata } from "next";
import { TagFilter } from "./TagFilter";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Technique deep-dives, artist features, collector guides, and market intelligence from the ceramics world.",
  openGraph: {
    title: "Journal | CeramicsIQ",
    description:
      "Technique deep-dives, artist features, collector guides, and market intelligence from the ceramics world.",
  },
};

export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <div className="bg-warm">
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-5">
        <h1 className="font-serif text-[42px] font-bold text-ash mb-5">
          Journal
        </h1>
        <TagFilter articles={articles} />
      </section>
    </div>
  );
}
