import { getArticles, getFeaturedArticles } from "@/lib/ghost";
import { ArticleCard, ArticleCardRow } from "@/components/ArticleCard";
import { EmailCapture } from "@/components/EmailCapture";
import Link from "next/link";

export default async function HomePage() {
  const articles = await getArticles();
  const featured = await getFeaturedArticles();
  const lead = featured[0] || articles[0];
  const stacked = featured.length > 1 ? featured.slice(1, 3) : articles.slice(1, 3);
  const sidebar = articles.slice(0, 4);

  return (
    <div className="bg-warm">
      {/* ── Tagline bar ── */}
      <div className="border-b border-line bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
          <p className="font-serif text-lg sm:text-xl font-semibold text-ash leading-snug">
            The Intelligence Behind Ceramics.
          </p>
          <p className="text-sm text-smoke mt-3">
            A deeper look at process, form, and glaze.
          </p>
        </div>
      </div>

      {/* ── Hero: editorial layout — stacks on mobile, 3-col on desktop ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-7 grid grid-cols-1 lg:grid-cols-[1fr_340px_260px] gap-7 border-b border-line">
        {/* Lead story */}
        <div>
          <ArticleCard article={lead} size="large" />
        </div>

        {/* Two stacked stories */}
        <div className="flex flex-col gap-6">
          {stacked.map((a) => (
            <ArticleCard key={a.slug} article={a} size="default" />
          ))}
        </div>

        {/* Featured sidebar */}
        <div className="border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-6">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-ash mb-5 pb-2.5 border-b-2 border-ember inline-block">
            Featured
          </h3>
          <div>
            {sidebar.map((a) => (
              <ArticleCardRow key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter bar ── */}
      <section className="bg-cream border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-ash mb-0.5">
              Never miss a firing
            </h3>
            <p className="text-sm text-smoke">
              Weekly technique deep-dives, artist features, and collector intelligence.
            </p>
          </div>
          <EmailCapture />
        </div>
      </section>

      {/* ── Latest ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-9 pb-16">
        <h2 className="text-[15px] font-bold uppercase tracking-wide text-ash mb-6">
          Latest
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-7">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
        <div className="text-center mt-9">
          <Link href="/journal" className="text-sm font-semibold text-ember no-underline hover:underline">
            See all articles →
          </Link>
        </div>
      </section>
    </div>
  );
}
