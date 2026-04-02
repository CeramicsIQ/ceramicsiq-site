"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/lib/ghost";

const TAGS = ["All", "Techniques", "Artist Features", "Collector Guides", "Market Intel"];

export function TagFilter({ articles }: { articles: Article[] }) {
  const [tag, setTag] = useState("All");
  const filtered = tag === "All" ? articles : articles.filter((a) => a.tag === tag);

  return (
    <>
      <div className="flex gap-1 flex-wrap border-b border-line pb-4 mb-6">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`text-[13px] px-4 py-2 border-none rounded-sm cursor-pointer transition-colors ${
              tag === t
                ? "font-semibold bg-ash text-white"
                : "text-smoke bg-transparent hover:text-ash"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-7 pb-16">
        {filtered.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </>
  );
}
