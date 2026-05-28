import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';

export const metadata: Metadata = {
  title: 'Support and Resistance | Order Blocks and Liquidity Grabs Explained',
  description: 'Learn how to identify institutional order blocks, horizontal supply and demand zones, and liquidity grabs. Move past basic retail trendlines and trade like professional institutions.',
  alternates: {
    canonical: '/blog/posts/support-resistance',
  },
};

export default async function SupportResistancePost() {
  const images = await getPexelsImages('Technical analysis stock chart', 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Support and Resistance | Order Blocks and Liquidity Grabs Explained",
    "description": "Learn how to identify institutional order blocks, horizontal supply and demand zones, and liquidity grabs. Move past basic retail trendlines and trade like professional institutions.",
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
      "@id": "https://usmantrades.co.uk/blog/posts/support-resistance"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
            Technical Analysis
          </span>
          <span className="text-xs text-muted">Published May 28, 2026</span>
          <span className="text-xs text-muted">&bull; 10 min read</span>
        </div>
        <h1 className="text-3xl font-extrabold text-primary md:text-4xl leading-tight">
          Technical Analysis: Support, Resistance, and Price Action Liquidity
        </h1>
        <p className="text-base text-secondary italic">
          Discard basic retail diagonal trends entirely. Modern price discovery functions entirely off institutional supply clusters, massive order blocks, and aggressive liquidity grabs.
        </p>
      </header>

      <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden">
        <Image src={images[0].url} alt={images[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
      </div>

      <div className="article-content space-y-6 text-primary leading-relaxed">
        <h2 className="text-2xl font-bold mt-8 mb-4">The Flaw of Diagonal Trendlines</h2>
        <p>
          For decades, beginner trading books have taught the exact same ineffective strategy involving diagonal trendlines. Novices are instructed to draw a straight line connecting two random lows on a price chart and simply buy when the price touches that line a third time. This extremely simplistic method completely ignores the underlying mechanics of how massive financial institutions actually execute their multi billion dollar orders.
        </p>
        <p>
          Institutions do not care about a diagonal line drawn by a retail participant on a five minute chart. They care exclusively about finding enough liquidity to fill their massive volume requirements without moving the price too aggressively against themselves. Before you attempt to trade any technical structure, you must understand your baseline mathematical exposure by utilizing our specific <Link href="/tools/pip-calculator" className="text-accent hover:underline">Pip Value Estimator</Link> utility.
        </p>

        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8">
          <Image src={images[1]?.url} alt={images[1]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Horizontal Order Blocks</h2>
        <p>
          Instead of drawing arbitrary diagonal lines, professional traders focus entirely on massive horizontal zones known as order blocks or supply and demand areas. An order block is simply the last opposite candle before a massive, rapid expansion in price. This sudden expansion clearly indicates that a major bank or hedge fund injected massive capital into the market precisely at that specific price level.
        </p>
        <p>
          When the market eventually returns to that specific horizontal zone, there is a very high mathematical probability that the institution still has unfilled orders waiting at that exact price. By identifying these zones on higher timeframe charts, you align your small retail capital alongside the massive institutional footprint. If you want to dive deeper into how this impacts macro markets, please read our dedicated <Link href="/blog/posts/what-is-forex" className="text-accent hover:underline">Forex Architecture Guide</Link>.
        </p>

        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8">
          <Image src={images[2]?.url} alt={images[2]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Mechanics of a Liquidity Grab</h2>
        <p>
          A liquidity grab occurs when large institutions intentionally push the price just past an obvious retail support or resistance zone. They do this specifically to trigger the stop losses of retail traders. Those triggered stop losses act as fresh liquidity, allowing the institutions to finally enter the market in the opposite direction at an incredibly favorable price.
        </p>
        <p>
          You have likely experienced this directly. You place your stop loss tightly under a very obvious support zone. The price spikes down, triggers your stop loss, completely removes you from the trade, and then immediately reverses exactly in your originally predicted direction. To avoid falling victim to this brutal institutional trap, you must calculate wider, mathematically sound buffers using our dedicated <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link>.
        </p>

        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-8">
          <Image src={images[3]?.url} alt={images[3]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Building a Professional Strategy</h2>
        <p>
          To trade professionally, you must completely unlearn the basic retail concepts that fail consistently over the long term. Start mapping your charts exclusively on higher timeframes like the four hour and daily views. Locate the areas where price violently accelerated away from a consolidation zone. These are your true institutional order blocks.
        </p>
        <p>
          Wait patiently for the price to return to these massive horizontal zones. Let the retail traders get trapped in a fakeout or liquidity grab first. Once the fakeout occurs and price shifts back in the direction of the macro trend, you execute your position precisely. This requires immense patience and a completely robotic mindset, which we cover extensively in our <Link href="/blog/posts/trading-mindset" className="text-accent hover:underline">Trading Psychology Guide</Link>.
        </p>
      </div>

      <section className="bg-surface border border-border p-6 rounded-[4px] space-y-3 mt-8">
        <h3 className="text-base font-bold text-primary m-0">Project Your Price Action Targets</h3>
        <p className="text-sm text-secondary m-0">
          Once you identify massive institutional supply clusters, you need to calculate exactly how much profit those targets will yield. Use our tool to run precise math on your ideas.
        </p>
        <Link href="/tools/profit-calculator" className="text-xs font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
          Open Profit Calculator &rarr;
        </Link>
      </section>

      <footer className="border-t border-border pt-6 flex justify-between items-center text-xs pb-12">
        <Link href="/blog/posts/trading-mindset" className="text-secondary no-underline hover:text-primary">
          &larr; Previous: Trading Psychology
        </Link>
        <Link href="/blog" className="text-accent no-underline hover:text-accent-dark">
          Back to Blog Home &rarr;
        </Link>
      </footer>
    </article>
    </>
  );
}
