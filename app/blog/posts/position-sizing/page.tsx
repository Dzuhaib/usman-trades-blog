import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';

export const metadata: Metadata = {
  title: 'Position Sizing Formula for Forex, Gold and Bitcoin Trading',
  description: 'Learn the exact mathematical formula to calculate your position sizing in Forex, Gold, and Bitcoin trading. Prevent account drawdowns and trade professionally without guessing your lot size.',
  alternates: {
    canonical: '/blog/posts/position-sizing',
  },
};

export default async function PositionSizingPost() {
  const images = await getPexelsImages('Risk Management calculations', 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Mathematics of Position Sizing in Leveraged Markets",
    "description": "Learn the exact mathematical formula to calculate your position sizing in Forex, Gold, and Bitcoin trading. Prevent account drawdowns and trade professionally without guessing your lot size.",
    "image": images[0]?.url,
    "datePublished": "2026-05-28T23:00:00+05:00",
    "dateModified": "2026-05-28T23:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Usman Trades",
      "url": "https://usmantrades.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Usman Trades",
      "logo": {
        "@type": "ImageObject",
        "url": "https://usmantrades.co.uk/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://usmantrades.co.uk/blog/posts/position-sizing"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[720px] mx-auto space-y-8">
      {/* Article Header */}
      <header className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
            Risk Management
          </span>
          <span className="text-xs text-muted">Published May 28, 2026</span>
          <span className="text-xs text-muted">&bull; 8 min read</span>
        </div>
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl leading-tight">
          The Mathematics of Position Sizing in Leveraged Markets
        </h1>
        <p className="text-base text-secondary italic">
          Why standard lot sizing fails and how to calculate perfectly structured trades based on your specific account metrics and stop loss coordinates.
        </p>
      </header>

      {/* Image 1: Main Cover */}
      <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden relative">
        <Image
          src={images[0]?.url}
          alt={images[0]?.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority
        />
      </div>

      {/* Article Body */}
      <div className="article-content space-y-6 text-primary leading-relaxed">
        <h2 className="text-2xl font-bold mt-8 mb-4">The Danger of Constant Lot Sizing</h2>
        <p>
          Many beginner traders approach market leverage with a completely static lot size assumption. They often decide to buy a fixed amount like zero point one lots on every single trade they execute. They do this regardless of the stop loss distance, the asset volatility, or the specific contract guidelines of the instrument. This is a severe mathematical error that guarantees failure over a long timeline.
        </p>
        <p>
          If your stop loss on your first trade is ten pips and on your second trade is fifty pips, a constant fixed lot size means you are risking five times more capital on your second trade than your first trade. Your account equity curve becomes a slave to random asset variations rather than structured probability. You can fix this immediately by using our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link> to find the exact units required before you click buy or sell.
        </p>

        {/* Image 2 */}
        <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8 relative">
          <Image
            src={images[1]?.url}
            alt={images[1]?.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Universal Position Sizing Formula</h2>
        <p>
          To calculate the precise lot size for any asset, you must follow the core mathematical formula for risk control. The formula requires you to multiply your total account balance by your accepted risk percentage. You then divide that result by the product of your stop loss distance and the pip value of the asset.
        </p>
        <p>
          Let us break down each element of this formula to thoroughly understand the mechanical components at play. Your Account Balance is the total equity currently available in your trading account. Your Risk Percentage is the absolute limit of monetary loss you are completely willing to accept on a single trade concept. Your Stop Loss is the technical distance between your entry price and your invalidation point.
        </p>

        {/* Image 3 */}
        <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8 relative">
          <Image
            src={images[2]?.url}
            alt={images[2]?.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">A Practical Forex Example</h2>
        <p>
          Assume you are trading the Euro against the US Dollar with ten thousand dollars in your trading account. You decide your maximum risk limit is exactly one percent. Your stop loss for this specific trade setup is twenty pips away from your entry price.
        </p>
        <p>
          Your risk amount is exactly one hundred dollars. When you divide that one hundred dollars by the value of twenty pips, the math dictates you must execute exactly zero point five lots. By executing exactly that size, if the market hits your stop loss, you lose precisely your targeted one percent. You can verify all contract mathematics using our <Link href="/tools/pip-calculator" className="text-accent hover:underline">Pip Value Estimator</Link> to ensure complete accuracy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Handling Gold and Bitcoin Volatility</h2>
        <p>
          Calculating position limits for Gold and Cryptocurrency markets requires thoroughly understanding their specific contract specifications. These assets move much faster than traditional fiat currency pairs.
        </p>
        <p>
          For physical gold trading, a standard measurement unit behaves differently than forex currencies. You must convert price movements into raw dollar differences. For Bitcoin, since pricing is in whole dollars, your risk is best calculated directly using outright price discrepancies. If you want to dive deeper into Gold specifics, please read our dedicated <Link href="/blog/posts/xauusd-guide" className="text-accent hover:underline">Gold Trading Guide</Link> for macroeconomic context.
        </p>

        {/* Image 4 */}
        <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8 relative">
          <Image
            src={images[3]?.url}
            alt={images[3]?.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Institutional Conclusion</h2>
        <p>
          You should never enter a trade simply guessing your risk boundary. Professional institutional asset managers operate with incredibly rigid percentage thresholds. By mastering this simple mathematical formula, you eliminate emotional variables entirely. You safeguard your capital against sudden market volatility and ensure you survive long enough to extract profits consistently.
        </p>
      </div>

      {/* Internal Link CTA */}
      <section className="bg-surface border border-border p-6 rounded-[4px] space-y-3 mt-8">
        <h3 className="text-base font-bold text-primary m-0">Calculate Position Sizing Instantly</h3>
        <p className="text-sm text-secondary m-0">
          Why calculate everything by hand? Use our mathematically precise utility calculators to instantly configure your exact risk parameters for Forex, Gold, and Cryptocurrencies.
        </p>
        <Link href="/tools/lot-size-calculator" className="text-xs font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
          Open Lot Size Calculator &rarr;
        </Link>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-border pt-6 flex justify-between items-center text-xs pb-12">
        <Link href="/blog" className="text-secondary no-underline hover:text-primary">
          &larr; Back to Blog
        </Link>
        <Link href="/blog/posts/xauusd-guide" className="text-accent no-underline hover:text-accent-dark">
          Next Post: Gold Trading Guide &rarr;
        </Link>
      </footer>
    </article>
    </>
  );
}
