/**
 * Ghost Content API integration
 *
 * When Ghost is connected, articles come from the CMS.
 * Until then, falls back to local mock data.
 */

const GHOST_URL = process.env.GHOST_URL || "";
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY || "";

export interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  html?: string;
  temp?: string;
  body?: string;
  atm?: string;
  featured?: boolean;
}

export interface Artist {
  name: string;
  technique: string;
  location: string;
  image: string;
}

// âââ Mock data (used until Ghost is connected) âââ

const IMG = {
  sodaFiring: "/soda-firing-hero.jpg",
  teaBowl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop&q=80",
  studio: "https://images.unsplash.com/photo-1602432234498-ec543da08099?w=800&h=800&fit=crop&q=80",
  glaze: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=800&fit=crop&q=80",
  kiln: "https://images.unsplash.com/photo-1548101307-740937b6db84?w=800&h=600&fit=crop&q=80",
  hero: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&h=900&fit=crop&q=80",
  founder: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=600&fit=crop&q=80",
};

export const mockArticles: Article[] = [
  {
    slug: "soda-firing-explained",
    title: "Soda Firing Explained",
    subtitle: "What Makes It Special and Why Collectors Are Paying Attention",
    tag: "Techniques",
    author: "Lin Kensington",
    date: "March 28, 2026",
    readTime: "12 min",
    excerpt: "A collector's guide to one of ceramics' most unpredictable and rewarding firing techniques. The kiln becomes the collaborator.",
    image: IMG.sodaFiring,
    temp: "1,260Â°C", body: "Stoneware", atm: "Reduction",
    featured: true,
  },
  {
    slug: "reading-glaze-surfaces",
    title: "How to Read a Glaze Surface",
    subtitle: "What the Finish Tells You About the Fire",
    tag: "Collector Guides",
    author: "Lin Kensington",
    date: "March 25, 2026",
    readTime: "8 min",
    excerpt: "Decode the visual language of ceramic glazes: from crazing to crystal formation, every surface tells a story.",
    image: IMG.teaBowl,
    temp: "1,220Â°C", body: "Kaolin", atm: "Oxidation",
    featured: true,
  },
  {
    slug: "studio-visit-portland",
    title: "A Kiln That Hasn't Cooled in 40 Years",
    subtitle: "Inside a Wood-Fired Pottery in Rural Oregon",
    tag: "Artist Features",
    author: "Lin Kensington",
    date: "March 22, 2026",
    readTime: "10 min",
    excerpt: "A third-generation potter whose anagama kiln runs on instinct, patience, and 36-hour firing cycles.",
    image: IMG.studio,
    temp: "1,180Â°C", body: "Iron-rich", atm: "Neutral",
    featured: true,
  },
  {
    slug: "market-report-q1-2026",
    title: "Where Collector Attention Is Shifting",
    subtitle: "Q1 2026 Market Report",
    tag: "Market Intel",
    author: "Lin Kensington",
    date: "March 18, 2026",
    readTime: "6 min",
    excerpt: "Auction results, gallery trends, and why atmospheric firing is having a moment in the secondary market.",
    image: IMG.glaze,
    temp: "1,300Â°C", body: "Porcelain", atm: "Reduction",
  },
  {
    slug: "wadding-marks-guide",
    title: "Wadding Marks Are Not Flaws",
    subtitle: "Learning to See the Kiln's Signature",
    tag: "Techniques",
    author: "Lin Kensington",
    date: "March 14, 2026",
    readTime: "5 min",
    excerpt: "Those rough spots on the foot of a pot are evidence of process, and collectors should know the difference.",
    image: IMG.kiln,
    temp: "1,280Â°C", body: "Stoneware", atm: "Reduction",
  },
  {
    slug: "tea-bowl-collecting",
    title: "A Beginner's Guide to Tea Bowl Collecting",
    subtitle: "What to Look for and Where to Start",
    tag: "Collector Guides",
    author: "Lin Kensington",
    date: "March 10, 2026",
    readTime: "9 min",
    excerpt: "The tea bowl is ceramics at its most essential. Here's how to build a collection with intention.",
    image: IMG.hero,
    temp: "1,200Â°C", body: "Mixed", atm: "Oxidation",
  },
];

export const mockArtists: Artist[] = [
  { name: "Mika Tanaka", technique: "Soda-fired stoneware", location: "Shigaraki, JP", image: IMG.sodaFiring },
  { name: "Clara Ruiz", technique: "Wood-fired porcelain", location: "Oaxaca, MX", image: IMG.teaBowl },
  { name: "James Okafor", technique: "Atmospheric reduction", location: "Portland, OR", image: IMG.studio },
  { name: "Elina Voss", technique: "Salt-glazed earthenware", location: "Copenhagen, DK", image: IMG.glaze },
  { name: "Ben Ahrens", technique: "Soda & ash glazing", location: "Asheville, NC", image: IMG.sodaFiring },
  { name: "Yuki Ishida", technique: "Raku & pit firing", location: "Kyoto, JP", image: IMG.teaBowl },
];

// âââ Helpers âââ

/**
 * Truncate text at a sentence or word boundary so it never cuts mid-word.
 * Also replaces em dashes (â) with en dashes (â).
 */
function smartExcerpt(text: string, maxLen = 220): string {
  if (!text) return "";
  // Strip all em dashes and en dashes
  let clean = text.replace(/\s*[ââ]\s*/g, ", ").replace(/,\s*,/g, ",");
  if (clean.length <= maxLen) return clean;

  // Try to cut at the last sentence end within the limit
  const trimmed = clean.slice(0, maxLen);
  const lastSentence = Math.max(
    trimmed.lastIndexOf(". "),
    trimmed.lastIndexOf("! "),
    trimmed.lastIndexOf("? ")
  );
  if (lastSentence > maxLen * 0.4) {
    return clean.slice(0, lastSentence + 1);
  }

  // Otherwise cut at the last word boundary
  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace > 0) {
    return clean.slice(0, lastSpace) + "...";
  }
  return trimmed + "...";
}

/**
 * Strip all em dashes and en dashes from text, replacing with commas.
 * Handles patterns like "word â word" -> "word, word" and "word â word" -> "word, word".
 */
function cleanDashes(text: string): string {
  if (!text) return "";
  return text.replace(/\s*[ââ]\s*/g, ", ").replace(/,\s*,/g, ",");
}

// âââ Ghost API functions âââ

function isGhostConfigured(): boolean {
  return Boolean(GHOST_URL && GHOST_KEY);
}

function ghostApi(resource: string, params: Record<string, string> = {}) {
  const url = new URL(`/ghost/api/content/${resource}/`, GHOST_URL);
  url.searchParams.set("key", GHOST_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  return fetch(url.toString(), { next: { revalidate: 30 } });
}

function ghostPostToArticle(post: any): Article {
  const tags = post.tags?.map((t: any) => t.name) || [];
  return {
    slug: post.slug,
    title: post.title,
    subtitle: cleanDashes(post.custom_excerpt || ""),
    tag: tags[0] || "Uncategorized",
    author: post.primary_author?.name || "CeramicsIQ",
    date: new Date(post.published_at).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    }),
    readTime: `${post.reading_time || 5} min`,
    excerpt: smartExcerpt(post.excerpt || ""),
    image: post.feature_image || IMG.sodaFiring,
    html: cleanDashes(post.html || ""),
    featured: post.featured || false,
    // Custom ceramic metadata from Ghost code injection or custom fields
    temp: post.codeinjection_head ? extractMeta(post.codeinjection_head, "temp") : undefined,
    body: post.codeinjection_head ? extractMeta(post.codeinjection_head, "body") : undefined,
    atm: post.codeinjection_head ? extractMeta(post.codeinjection_head, "atm") : undefined,
  };
}

function extractMeta(code: string, key: string): string | undefined {
  const match = code.match(new RegExp(`data-${key}="([^"]+)"`));
  return match?.[1];
}

// âââ Public API âââ

export async function getArticles(): Promise<Article[]> {
  if (!isGhostConfigured()) return mockArticles;

  try {
    const res = await ghostApi("posts", {
      include: "tags,authors",
      limit: "20",
      order: "published_at desc",
    });
    const data = await res.json();
    return data.posts?.map(ghostPostToArticle) || mockArticles;
  } catch {
    return mockArticles;
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!isGhostConfigured()) {
    return mockArticles.find(a => a.slug === slug) || null;
  }

  try {
    const res = await ghostApi(`posts/slug/${slug}`, {
      include: "tags,authors",
    });
    const data = await res.json();
    return data.posts?.[0] ? ghostPostToArticle(data.posts[0]) : null;
  } catch {
    return mockArticles.find(a => a.slug === slug) || null;
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter(a => a.featured).slice(0, 3);
}

export async function getArtists(): Promise<Artist[]> {
  // Artists will come from Ghost pages or a custom integration later
  return mockArtists;
}

export { IMG };
