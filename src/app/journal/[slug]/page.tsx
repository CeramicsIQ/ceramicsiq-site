import { getArticle, getArticles } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { EmailCapture } from "@/components/EmailCapture";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

// Soda firing article content (mock — in production this comes from Ghost HTML)
const sodaFiringHTML = `
<p>The short version: Soda firing is a kiln technique where sodium carbonate (soda ash) is introduced into a kiln at peak temperature, creating a vapor that deposits a glassy surface directly onto the clay. No two pieces come out the same. The kiln itself becomes a collaborator — flame path, atmospheric chemistry, and the placement of each piece on the shelf all influence the final result.</p>

<p>For collectors, that means every soda-fired piece is genuinely one-of-a-kind — not in the marketing sense, but in the physics sense. The glaze wasn't applied by hand. It was created by fire.</p>

<h2>How Soda Firing Actually Works</h2>

<p>In a conventional glaze firing, the potter dips or brushes liquid glaze onto a piece before it goes into the kiln. The kiln melts the glaze, and you get more or less what you planned for.</p>

<p>Soda firing is different. The potter loads unglazed or lightly glazed pieces into the kiln, brings it to around 2,300°F (cone 10), and then introduces soda ash — usually dissolved in water and sprayed through ports in the kiln walls. The sodium vaporizes instantly and travels through the kiln on the flame path, bonding with the silica in the clay surface to form a thin, glassy coating.</p>

<p>Here's where it gets interesting: the vapor doesn't land evenly. Pieces near the ports get hit harder. Pieces sheltered behind others get less. The side of a bowl facing the flame looks completely different from the side facing away.</p>

<p>The potter makes informed decisions about clay body, kiln loading, temperature, and how much soda to introduce — but the kiln gets the final vote. That tension between skill and surrender is what defines the technique.</p>

<h2>Soda vs. Salt: What's the Difference?</h2>

<p>Salt firing uses sodium chloride (table salt), which releases chlorine gas when it vaporizes. It produces a distinctive "orange peel" texture. It also produces hydrochloric acid, which is hard on kilns and the surrounding environment.</p>

<p>Soda firing uses sodium carbonate or sodium bicarbonate (baking soda). The surface tends to be smoother and more varied than salt. It's also less damaging to the kiln and doesn't produce toxic gases.</p>

<p>Most contemporary ceramic artists working in atmospheric firing have shifted toward soda for these reasons.</p>

<h2>What to Look for as a Collector</h2>

<h3>Surface Variation</h3>

<p>The hallmark of good soda firing is variation across the surface of a single piece. Look for areas where the soda hit heavily transitioning into areas with less buildup.</p>

<h3>The Clay Body Showing Through</h3>

<p>In the best work, you can see the clay body contributing to the surface — warm flashing where iron in the clay reacts with the atmosphere.</p>

<h3>Wadding Marks</h3>

<p>Potters use small balls of refractory clay called "wadding" to elevate pieces. These leave small, rough marks on the foot or base. Signatures of the process, not flaws.</p>

<h3>Form and Fire Working Together</h3>

<p>Ridges catch more soda. Concave surfaces pool it differently than convex ones. Rims and lips show the strongest effects because they're most exposed.</p>

<h2>Why Soda-Fired Work Commands Higher Prices</h2>

<p><strong>Kiln economics.</strong> A full soda firing cycle runs roughly 36 hours.</p>

<p><strong>Yield rates.</strong> Experienced soda firers keep 60–80% of a kiln load.</p>

<p><strong>Kiln loading is an art.</strong> Where each piece sits determines its character.</p>

<p><strong>No do-overs.</strong> A soda-fired piece is what it is. The kiln made its statement.</p>

<h2>The Bottom Line</h2>

<p>Soda firing sits at the intersection of craft and chemistry, intention and chance. Every piece carries evidence of a specific moment in a specific kiln, a collaboration between the potter's skill and the fire's unpredictability.</p>
`;

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

  const contentHTML =
    article.html || (slug === "soda-firing-explained" ? sodaFiringHTML : null);

  return (
    <article className="bg-warm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            author: { "@type": "Person", name: article.author },
            publisher: { "@type": "Organization", name: "CeramicsIQ", url: "https://ceramicsiq.com" },
            datePublished: article.date,
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://ceramicsiq.com/journal/${slug}` },
            keywords: [article.tag, "ceramics", "pottery"].join(", "),
          }),
        }}
      />

      {/* Header */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 pt-9">
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className="text-xs font-semibold text-ember uppercase tracking-wide">{article.tag}</span>
          <span className="text-line">|</span>
          <span className="text-[13px] text-smoke">{article.date}</span>
        </div>

        <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-bold text-ash leading-tight mb-3">
          {article.title}
        </h1>

        {article.subtitle && (
          <p className="font-serif text-xl text-smoke leading-snug mb-4">{article.subtitle}</p>
        )}

        <div className="flex items-center flex-wrap gap-4 pb-5 border-b border-line mb-7">
          <span className="text-sm font-semibold text-ash">{article.author}</span>
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
        <img src={article.image} alt={article.title} className="w-full h-[420px] object-cover" />
      </div>

      {/* Body */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-10">
        {contentHTML ? (
          <div className="ghost-content" dangerouslySetInnerHTML={{ __html: contentHTML }} />
        ) : (
          <>
            <p className="font-serif text-lg leading-relaxed text-[#4A4238] mb-6">{article.excerpt}</p>
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
            <p className="font-serif text-xl font-bold text-white mb-1">Enjoying this?</p>
            <p className="text-sm text-[#888]">Get articles like this weekly.</p>
          </div>
          <EmailCapture variant="dark" />
        </div>
      </div>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-16 border-t border-line">
        <h2 className="text-[15px] font-bold uppercase tracking-wide text-ash mb-6">Continue Reading</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-7">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </article>
  );
}import { getArticle, getArticles } from "@/lib/ghost";
import { ArticleCard } from "@/components/ArticleCard";
import { EmailCapture } from "@/components/EmailCapture";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

// Soda firing article content (mock — in production this comes from Ghost HTML)
const sodaFiringHTML = `
<p>The short version: Soda firing is a kiln technique where sodium carbonate (soda ash) is introduced into a kiln at peak temperature, creating a vapor that deposits a glassy surface directly onto the clay. No two pieces come out the same. The kiln itself becomes a collaborator — flame path, atmospheric chemistry, and the placement of each piece on the shelf all influence the final result.</p>

<p>For collectors, that means every soda-fired piece is genuinely one-of-a-kind — not in the marketing sense, but in the physics sense. The glaze wasn't applied by hand. It was created by fire.</p>

<h2>How Soda Firing Actually Works</h2>

<p>In a conventional glaze firing, the potter dips or brushes liquid glaze onto a piece before it goes into the kiln. The kiln melts the glaze, and you get more or less what you planned for.</p>

<p>Soda firing is different. The potter loads unglazed or lightly glazed pieces into the kiln, brings it to around 2,300°F (cone 10), and then introduces soda ash — usually dissolved in water and sprayed through ports in the kiln walls. The sodium vaporizes instantly and travels through the kiln on the flame path, bonding with the silica in the clay surface to form a thin, glassy coating.</p>

<p>Here's where it gets interesting: the vapor doesn't land evenly. Pieces near the ports get hit harder. Pieces sheltered behind others get less. The side of a bowl facing the flame looks completely different from the side facing away.</p>

<p>The potter makes informed decisions about clay body, kiln loading, temperature, and how much soda to introduce — but the kiln gets the final vote. That tension between skill and surrender is what defines the technique.</p>

<h2>Soda vs. Salt: What's the Difference?</h2>

<p>Salt firing uses sodium chloride (table salt), which releases chlorine gas when it vaporizes. It produces a distinctive "orange peel" texture. It also produces hydrochloric acid, which is hard on kilns and the surrounding environment.</p>

<p>Soda firing uses sodium carbonate or sodium bicarbonate (baking soda). The surface tends to be smoother and more varied than salt. It's also less damaging to the kiln and doesn't produce toxic gases.</p>

<p>Most contemporary ceramic artists working in atmospheric firing have shifted toward soda for these reasons.</p>

<h2>What to Look for as a Collector</h2>

<h3>Surface Variation</h3>

<p>The hallmark of good soda firing is variation across the surface of a single piece. Look for areas where the soda hit heavily transitioning into areas with less buildup.</p>

<h3>The Clay Body Showing Through</h3>

<p>In the best work, you can see the clay body contributing to the surface — warm flashing where iron in the clay reacts with the atmosphere.</p>

<h3>Wadding Marks</h3>

<p>Potters use small balls of refractory clay called "wadding" to elevate pieces. These leave small, rough marks on the foot or base. Signatures of the process, not flaws.</p>

<h3>Form and Fire Working Together</h3>

<p>Ridges catch more soda. Concave surfaces pool it differently than convex ones. Rims and lips show the strongest effects because they're most exposed.</p>

<h2>Why Soda-Fired Work Commands Higher Prices</h2>

<p><strong>Kiln economics.</strong> A full soda firing cycle runs roughly 36 hours.</p>

<p><strong>Yield rates.</strong> Experienced soda firers keep 60–80% of a kiln load.</p>

<p><strong>Kiln loading is an art.</strong> Where each piece sits determines its character.</p>

<p><strong>No do-overs.</strong> A soda-fired piece is what it is. The kiln made its statement.</p>

<h2>The Bottom Line</h2>

<p>Soda firing sits at the intersection of craft and chemistry, intention and chance. Every piece carries evidence of a specific moment in a specific kiln, a collaboration between the potter's skill and the fire's unpredictability.</p>
`;

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

  // Use Ghost HTML if available, otherwise use mock content
  const contentHTML =
    article.html || (slug === "soda-firing-explained" ? sodaFiringHTML : null);

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

      {/* Header */}
      <div className="max-w-[720px] mx-auto px-6 pt-9">
        <div className="flex items-center gap-3 mb-4">
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
          <p className="font-serif text-xl text-smoke leading-snug mb-4">
            {article.subtitle}
          </p>
        )}

        <div className="flex items-center gap-4 pb-5 border-b border-line mb-7">
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
      <div className="max-w-[720px] mx-auto px-6 py-10">
        {contentHTML ? (
          <div
            className="ghost-content"
            dangerouslySetInnerHTML={{ __html: contentHTML }}
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
      <div className="max-w-[720px] mx-auto px-6 pb-12">
        <div className="bg-ash p-8 flex justify-between items-center flex-wrap gap-5">
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
      <section className="max-w-6xl mx-auto px-8 py-6 pb-16 border-t border-line">
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
