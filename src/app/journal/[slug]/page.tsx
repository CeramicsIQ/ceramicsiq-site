import { getArticle, getArticles } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { EmailCapture } from "@/components/EmailCapture";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articleFaqs } from "@/data/faqs";

// Generate static paths for all articles
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

// Dynamic metadata for SEO + AEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630 }],
      publishedTime: article.date,
      authors: [article.author],
      tags: [article.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
    alternates: {
      canonical: `/journal/${slug}`,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const articles = await getArticles();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="bg-warm">
      {/* JSON-LD Article schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            author: {
              "@type": "Person",
              name: article.author,
            },
            publisher: {
              "@type": "Organization",
              name: "CeramicsIQ",
              url: "https://ceramicsiq.com",
            },
            datePublished: article.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://ceramicsiq.com/journal/${slug}`,
            },
            keywords: [article.tag, "ceramics", "pottery"].join(", "),
          }),
        }}
      />

      {/* FAQ JSON-LD schema for AEO */}
      {articleFaqs[slug] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: articleFaqs[slug].map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Header */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-9">
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className="text-xs font-semibold text-ember uppercase tracking-wide">
            {article.tag}
          </span>
          <span className="text-line">|</span>
          <span className="text-[13px] text-smoke">{article.date}</span>
        </div>

        <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-bold text-ash leading-tight mb-3">
          {article.title}
        </h1>

        {article.subtitle && (
          <blockquote className="border-l-[3px] border-ember pl-5 my-5">
            <p className="font-serif text-[1.25rem] leading-relaxed text-[#4A4238] italic">
              {article.subtitle}
            </p>
          </blockquote>
        )}

        <div className="flex items-center flex-wrap gap-4 pb-5 border-b border-line mb-7">
          <span className="text-sm font-semibold text-ash">
            {article.author}
          </span>
          <span className="text-[13px] text-smoke">{article.readTime} read</span>
          {article.temp && (
            <span className="ml-auto font-mono text-[11px] text-ash/30">
              {article.temp} · {article.body} · {article.atm}
            </span>
          )}
        </div>
      </div>

      {/* Hero image */}
      <div className="max-w-[900px] mx-auto">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-[420px] object-cover"
        />
      </div>

      {/* Body */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10">
        {article.html ? (
          <div
            className="ghost-content"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        ) : (
          <>
            <p className="font-serif text-lg leading-relaxed text-[#4A4238] mb-6">
              {article.excerpt}
            </p>
            <div className="py-12 bg-cream text-center my-6 border border-line">
              <p className="text-sm text-smoke">Full article coming soon.</p>
            </div>
          </>
        )}
      </div>

      {/* Inline newsletter */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-ash p-6 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div>
            <p className="font-serif text-xl font-bold text-white mb-1">
              Enjoying this?
            </p>
            <p className="text-sm text-[#888]">Get articles like this weekly.</p>
          </div>
          <EmailCapture variant="dark" />
        </div>
      </div>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-16 border-t border-line">
        <h2 className="text-[15px] font-bold uppercase tracking-wide text-ash mb-6">
          Continue Reading
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-7">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </article>
  );
}
