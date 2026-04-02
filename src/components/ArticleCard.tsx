import Link from "next/link";
import type { Article } from "@/lib/ghost";

interface ArticleCardProps {
  article: Article;
  size?: "large" | "default" | "small";
}

export function ArticleCard({ article, size = "default" }: ArticleCardProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <Link href={`/journal/${article.slug}`} className="group block no-underline">
      {!isSmall && (
        <div
          className={`overflow-hidden mb-3.5 ${
            isLarge ? "aspect-video" : "aspect-[4/3]"
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="hover-image w-full h-full object-cover"
          />
        </div>
      )}

      <div className="mb-2">
        <span className="text-xs font-semibold text-ember uppercase tracking-wide">
          {article.tag}
        </span>
      </div>

      <h3
        className={`font-serif font-bold text-ash leading-snug group-hover:text-ember transition-colors ${
          isLarge ? "text-[28px]" : isSmall ? "text-[17px]" : "text-xl"
        }`}
      >
        {article.title}
      </h3>

      {!isSmall && (
        <p
          className={`font-serif text-smoke leading-relaxed mt-2 ${
            isLarge ? "text-base" : "text-[15px]"
          }`}
        >
          {article.excerpt}
        </p>
      )}

      <p className="text-[13px] text-smoke mt-2">{article.author}</p>
    </Link>
  );
}

export function ArticleCardRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className="group flex gap-3.5 items-start pb-4 mb-4 border-b border-line no-underline last:border-0"
    >
      <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="hover-image w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-serif text-base font-bold text-ash leading-snug mb-1.5 group-hover:text-ember transition-colors">
          {article.title}
        </h4>
        <p className="text-[13px] text-smoke leading-snug">
          {article.excerpt.slice(0, 80)}...
        </p>
      </div>
    </Link>
  );
}
