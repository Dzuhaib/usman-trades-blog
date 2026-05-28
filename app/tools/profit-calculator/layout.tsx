import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Profit Calculator | Calculate Your Trade Profit and Loss',
  description: 'Use our free profit calculator to project your potential gains or losses on any Forex, Gold XAUUSD, or Bitcoin trade. Enter your entry price, exit price, lot size, and direction to see results instantly.',
  alternates: {
    canonical: '/tools/profit-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Profit & Loss Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "browserRequirements": "Requires HTML5/JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free profit calculator to project your potential gains or losses on any Forex, Gold XAUUSD, or Bitcoin trade using customized contract inputs."
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
