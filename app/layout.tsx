import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AdSlot from "@/components/AdSlot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const SITE_URL = "https://www.usmantrades.co.uk";

export const metadata: Metadata = {
  title: {
    default: "Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education",
    template: "%s | Usman Trades",
  },
  description: "Usman Trades is a free trading education platform with professional calculators for Forex, Gold (XAUUSD), and Bitcoin. Learn position sizing, risk management, and technical analysis with simple guides written for real people.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL),
  alternates: {
    canonical: "./",
  },
  keywords: [
    "forex trading tools",
    "risk reward ratio calculator",
    "lot size calculator",
    "pip calculator",
    "risk calculator",
    "profit calculator",
    "compound growth calculator",
    "drawdown calculator",
    "forex education blog",
    "gold trading guide",
    "XAUUSD analysis",
    "bitcoin risk management",
    "position sizing formula",
    "trading psychology",
    "support and resistance",
    "free trading calculators",
    "usman trades",
    "risk reward ratio trading",
    "risk reward ratio formula",
    "drawdown recovery trading",
    "pip value calculator",
    "compound growth trading",
  ],
  authors: [{ name: "Usman Trades", url: SITE_URL }],
  creator: "Usman Trades",
  publisher: "Usman Trades",
  openGraph: {
    title: "Usman Trades | Free Forex Education, Gold and Bitcoin Trading Tools and Education",
    description: "Access free professional trading calculators and simple educational guides for Forex, Gold, and Bitcoin. Learn position sizing, risk management, and price action analysis.",
    url: SITE_URL,
    siteName: "Usman Trades",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Trades | Free Trading Tools and Education",
    description: "Free professional trading calculators and guides for Forex, Gold, and Bitcoin. Master position sizing and risk management.",
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
  verification: {
    google: "TzW6oxoWedZLWUyLtbiNxONBmwfnrqGOrPtoKI5_zJY",
  },
};

// Google Consent Mode v2 — defaults denied, updated by CookieConsent
function ConsentModeScript() {
  const script = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

// JSON-LD Structured Data for the entire website
function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Usman Trades",
    url: SITE_URL,
    description: "Free trading education platform with professional calculators for Forex, Gold, and Bitcoin.",
    publisher: {
      "@type": "Organization",
      name: "Usman Trades",
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?category={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <ConsentModeScript />
        <WebsiteJsonLd />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5017133932206570"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-primary selection:bg-accent/15 overflow-x-hidden">
        <Header />

        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8 md:px-6 md:py-12">
          <AdSlot slot="6622183398" />
          {children}
          <AdSlot slot="6622183398" />
        </main>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}

