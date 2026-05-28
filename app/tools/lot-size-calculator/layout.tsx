import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Lot Size Calculator | Calculate Your Forex, Gold and Bitcoin Position Size',
  description: 'Use our free lot size calculator to find the exact position size for your Forex, Gold XAUUSD, or Bitcoin trade. Enter your account balance, risk percentage, and stop loss to get your precise lot size instantly.',
  alternates: {
    canonical: '/tools/lot-size-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Lot Size Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "browserRequirements": "Requires HTML5/JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free, mathematically precise lot size calculator to find the exact position size for Forex, Gold XAUUSD, and Bitcoin trading based on balance, risk percentage, and stop loss pips."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
