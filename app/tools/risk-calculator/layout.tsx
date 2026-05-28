import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Risk Calculator | Calculate Your Trade Risk and Position Limits',
  description: 'Use our free risk calculator to determine your absolute cash risk, pip gap distance, and maximum position limits before entering a Forex, Gold, or Bitcoin trade. Protect your trading account instantly.',
  alternates: {
    canonical: '/tools/risk-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Risk & Position Limit Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "browserRequirements": "Requires HTML5/JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free professional risk calculator to determine your absolute cash risk, entry/exit coordinates, and maximum position limits before entering a Forex, Gold, or Bitcoin trade."
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
