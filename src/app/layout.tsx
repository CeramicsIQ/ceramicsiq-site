import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://ceramicsiq.com"),
  title: {
    default: "CeramicsIQ: Technique, Artists, Collector Intelligence",
    template: "%s | CeramicsIQ",
  },
  description:
    "Technique deep-dives, artist features, and collector intelligence for the ceramics world. Built by a working ceramicist.",
  keywords: [
    "ceramics",
    "pottery",
    "soda firing",
    "ceramic collecting",
    "ceramic artists",
    "glaze techniques",
    "kiln firing",
    "stoneware",
    "porcelain",
    "ceramic art",
  ],
  authors: [{ name: "Lin Kensington" }],
  creator: "CeramicsIQ",
  publisher: "CeramicsIQ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CeramicsIQ",
    title: "CeramicsIQ: Technique, Artists, Collector Intelligence",
    description:
      "Technique deep-dives, artist features, and collector intelligence for the ceramics world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CeramicsIQ",
    description:
      "Technique deep-dives, artist features, and collector intelligence for the ceramics world.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "XMAbqmkwAN-AzMfIfWEbW4ErXUKcUlsz5_fPInrYqzs",
    other: {
      "msvalidate.01": "8DEA1C4A1EFEC2C3B3BCD74591540D10",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Organization schema for AEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CeramicsIQ",
              url: process.env.SITE_URL || "https://ceramicsiq.com",
              logo: `${process.env.SITE_URL || "https://ceramicsiq.com"}/logo.png`,
              description:
                "Technique deep-dives, artist features, and collector intelligence for the ceramics world.",
              founder: {
                "@type": "Person",
                name: "Lin Kensington",
                url: "https://linkensingtonart.com",
                sameAs: [
                  "https://www.etsy.com/shop/LinKensington",
                  "https://www.pinterest.com/LinKensingtonArt/",
                  "https://www.instagram.com/lin_kensington_art/",
                ],
              },
              sameAs: [
                "https://www.youtube.com/@CeramicsIQ",
                "https://www.instagram.com/ceramicsiq/",
              ],
              knowsAbout: [
                "ceramics",
                "pottery",
                "kintsugi",
                "Japanese ceramics",
                "studio pottery",
                "wood firing",
                "soda firing",
                "shino glaze",
                "Mingei philosophy",
              ],
            }),
          }}
        />
      {/* JSON-LD WebSite + BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": (process.env.SITE_URL || "https://ceramicsiq.com") + "/#website",
                url: process.env.SITE_URL || "https://ceramicsiq.com",
                name: "CeramicsIQ",
                description: "Technique deep-dives, artist features, and collector intelligence for the ceramics world.",
                publisher: {
                  "@id": (process.env.SITE_URL || "https://ceramicsiq.com") + "/#organization",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: process.env.SITE_URL || "https://ceramicsiq.com",
                  },
                ],
              },
            ],
          }),
        }}
      />
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SYRFE3ZR2W"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SYRFE3ZR2W');
        `}
      </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-warm text-ash">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
