import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Pip Value Calculator | Calculate Pip Value for Forex, Gold and Bitcoin',
  description: 'Use our free pip calculator to instantly find the monetary value of one pip for standard, mini, and micro lots across Forex pairs, Gold XAUUSD, and Bitcoin in your account currency.',
  alternates: {
    canonical: '/tools/pip-calculator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pip Value Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "browserRequirements": "Requires HTML5/JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free pip calculator to instantly find the monetary value of one pip for standard, mini, and micro lots across Forex pairs, Gold XAUUSD, and Bitcoin in your account currency."
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
