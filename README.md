# CeramicsIQ

Editorial website for ceramics education, artist features, and collector resources.

**Stack:** Next.js 16 + Ghost CMS + Tailwind CSS + TypeScript

---

## Quick Start (Run Locally)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

The site works immediately with built-in sample articles. Connect Ghost to use your own content.

---

## Your Accounts

| Service | URL | What it does |
|---------|-----|--------------|
| **Ghost CMS** | [ceramics-iq.ghost.io/ghost](https://ceramics-iq.ghost.io/ghost) | Write and manage all your content |
| **GitHub** | [github.com/CeramicsIQ/ceramicsiq-site](https://github.com/CeramicsIQ/ceramicsiq-site) | Stores the website code |
| **Domain** | ceramicsiq.com | Your public website address |

---

## How to Publish Content

All content is managed through Ghost. No code changes needed.

1. Go to [ceramics-iq.ghost.io/ghost](https://ceramics-iq.ghost.io/ghost)
2. Click **Posts** then **New post**
3. Write your article using Ghost's editor
4. Add a **featured image**, **excerpt**, and **tags**
5. Click **Publish**

Your site automatically fetches new posts from Ghost.

### Tags to use
- `Techniques` — firing, glazing, throwing how-tos
- `Artist Features` — studio visits, interviews
- `Collector Guides` — what to look for, pricing
- `Market Intel` — auction results, trends

### Adding ceramic metadata
In Ghost's post settings, use the **Code injection** field to add firing details:
```html
<script type="application/json" id="ceramic-meta">
{"temperature":"Cone 10","atmosphere":"Reduction","body":"Stoneware"}
</script>
```

---

## Project Structure

```
ceramicsiq-site/
├── src/
│   ├── app/                  # Pages (Next.js App Router)
│   │   ├── page.tsx          # Homepage
│   │   ├── journal/          # Article listing + detail pages
│   │   ├── artists/          # Artist profiles
│   │   ├── about/            # About page
│   │   ├── subscribe/        # Newsletter signup
│   │   ├── layout.tsx        # Root layout + SEO
│   │   ├── sitemap.ts        # Auto-generated sitemap
│   │   └── robots.ts         # Search engine + AI crawler rules
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Sticky navigation
│   │   ├── Footer.tsx        # Footer with newsletter
│   │   ├── ArticleCard.tsx   # Article card (grid + sidebar)
│   │   ├── EmailCapture.tsx  # Newsletter signup form
│   │   └── TagFilter.tsx     # Category filter buttons
│   └── lib/
│       └── ghost.ts          # Ghost API + mock data fallback
├── .env.local                # Your API keys (never commit this!)
├── .env.example              # Template for .env.local
├── setup.sh                  # One-time setup script
└── package.json
```

---

## Common Tasks

### Preview changes locally
```bash
npm run dev
# Open http://localhost:3000
```

### Build for production
```bash
npm run build
```

### Push code updates to GitHub
```bash
git add -A
git commit -m "describe your change"
git push
```

### Deploy
If using **Vercel** (recommended for Next.js):
1. Go to vercel.com
2. Sign in with GitHub
3. Import CeramicsIQ/ceramicsiq-site
4. Add environment variables (from .env.local)
5. Deploy — it auto-deploys on every git push

If using **Netlify**:
1. Go to netlify.com
2. New site, import from Git, select the repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables, deploy

If using **IONOS**:
1. Build locally: `npm run build` then `npm run start`
2. Or use IONOS Deploy Now with the GitHub repo
3. Add environment variables in the IONOS dashboard

---

## Environment Variables

Copy .env.example to .env.local:
```bash
cp .env.example .env.local
```

| Variable | Value | Where to find it |
|----------|-------|-------------------|
| `GHOST_URL` | `https://ceramics-iq.ghost.io` | Your Ghost site URL |
| `GHOST_CONTENT_API_KEY` | (your key) | Ghost Settings, Integrations, Custom, CeramicsIQ Website |
| `SITE_URL` | `https://ceramicsiq.com` | Your domain |

---

## Ghost Newsletter

Ghost has built-in newsletter functionality. Members who subscribe through your site get emails when you publish. Configure in Ghost Settings, Newsletters.

## Future: Paid Memberships

Ghost supports Stripe for paid memberships. When ready:
1. Ghost Settings, Tiers, Connect with Stripe
2. Set up pricing tiers
3. Gate content behind membership levels

---

## SEO and AEO (Already Built In)

- Meta tags, Open Graph, Twitter Cards on every page
- JSON-LD structured data (Article + Organization schemas)
- Auto-generated sitemap at /sitemap.xml
- AI crawler access enabled (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Per-article SEO metadata via generateMetadata
