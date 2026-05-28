import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education",
    template: "%s | Usman Trades",
  },
  description: "Usman Trades is a free trading education platform with professional calculators for Forex, Gold (XAUUSD), and Bitcoin. Learn position sizing, risk management, and technical analysis with simple guides written for real people.",
  metadataBase: new URL("https://usmantrades.co.uk"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "forex trading tools",
    "lot size calculator",
    "pip calculator",
    "risk calculator",
    "profit calculator",
    "forex education",
    "gold trading guide",
    "XAUUSD analysis",
    "bitcoin risk management",
    "position sizing formula",
    "trading psychology",
    "support and resistance",
    "free trading calculators",
    "usman trades",
  ],
  authors: [{ name: "Usman Trades", url: "https://usmantrades.co.uk" }],
  creator: "Usman Trades",
  publisher: "Usman Trades",
  openGraph: {
    title: "Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education",
    description: "Access free professional trading calculators and simple educational guides for Forex, Gold, and Bitcoin. Learn position sizing, risk management, and price action analysis.",
    url: "https://usmantrades.co.uk",
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

// JSON-LD Structured Data for the entire website
function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Usman Trades",
    url: "https://usmantrades.co.uk",
    description: "Free trading education platform with professional calculators for Forex, Gold, and Bitcoin.",
    publisher: {
      "@type": "Organization",
      name: "Usman Trades",
      url: "https://usmantrades.co.uk",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://usmantrades.co.uk/blog?category={search_term_string}",
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
        <WebsiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-primary selection:bg-accent/15">
        <Header />
        
        {/* FX Pricing Live Ticker Tape Widget */}
        <div className="w-full border-b border-slate-100 bg-white">
          <iframe 
            src="https://fxpricing.com/fx-widget/ticker-tape-widget.php?id=1,2,3,5,14,20,1984&border=show&speed=50&click_target=blank&theme=light&tm-cr=FFFFFF&hr-cr=00000013&by-cr=28A745&sl-cr=DC3545&flags=circle&d_mode=compact-name&column=ask,bid,spread&lang=en&font=Arial, sans-serif" 
            width="100%" 
            height="85" 
            style={{ border: 'unset' }}
          ></iframe>
          <div id="fx-pricing-widget-copyright" className="text-center text-[13px] font-sans my-2.5 text-[#9db2bd]">
            <span>Powered by </span>
            <a href="https://fxpricing.com/" target="_blank" rel="noopener noreferrer" className="no-underline text-[#bb3534] font-semibold">FX Pricing</a>
          </div>
        </div>

        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 py-8 md:px-6 md:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
