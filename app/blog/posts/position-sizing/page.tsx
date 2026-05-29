import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Position Sizing Formula for Forex, Gold and Bitcoin Trading',
  description: 'Learn the exact mathematical formula to calculate your position sizing in Forex, Gold, and Bitcoin trading. Prevent account drawdowns and trade professionally without guessing your lot size.',
  alternates: {
    canonical: '/blog/posts/position-sizing',
  },
};

export default async function PositionSizingPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'position-sizing')!;
  const images = await getPexelsImages('Risk Management calculations', 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": images[0]?.url,
    "datePublished": post.date,
    "dateModified": post.updatedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
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
      "@id": `https://usmantrades.co.uk${post.route}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[720px] mx-auto space-y-12 py-8">
        <Breadcrumbs items={[
          { label: 'Library', href: '/blog' },
          { label: post.category, href: '/blog?category=' + post.category },
          { label: post.title, href: post.route }
        ]} />

        {/* Article Header */}
        <header className="border-b border-border pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
              {post.category}
            </span>
            <span className="text-xs text-muted">Updated {post.updatedAt}</span>
            <span className="text-xs text-muted">&bull; {post.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary md:text-4xl leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            {post.excerpt}
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

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#danger" className="hover:text-accent no-underline">1. The Danger of Constant Lot Sizing</a></li>
            <li><a href="#formula" className="hover:text-accent no-underline">2. The Simple Position Sizing Formula</a></li>
            <li><a href="#example" className="hover:text-accent no-underline">3. A Practical Example</a></li>
            <li><a href="#assets" className="hover:text-accent no-underline">4. Trading Gold and Bitcoin</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="danger">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Danger of Constant Lot Sizing</h2>
            <p>
              Many people starting out in the markets make the mistake of using the same "lot size" for every trade. They might decide to buy 0.1 lots every time they trade, regardless of how far away their stop loss is or how volatile the market is. This is a simple mathematical error that can lead to unexpected losses.
            </p>
            <p>
              Think of it this way: if your stop loss on one trade is 10 pips and on another it's 50 pips, using the same lot size means you're risking five times more money on the second trade. Your account balance shouldn't depend on luck. You can fix this easily by using our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link> to find the right size before you trade.
            </p>
          </section>

          {/* Image 2 */}
          <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12 relative">
            <Image
              src={images[1]?.url}
              alt={images[1]?.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          <section id="formula">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Simple Position Sizing Formula</h2>
            <p>
              To find the right trade size for any asset, you just need a simple bit of math. First, multiply your total account balance by the percentage you're willing to risk (like 1%). Then, divide that number by your stop loss distance multiplied by the "pip value" of what you're trading.
            </p>
            <p>
              Let's break that down into plain English:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Account Balance:</strong> The total money you have available to trade.</li>
              <li><strong>Risk Percentage:</strong> The maximum amount you're comfortable losing if the trade doesn't work out.</li>
              <li><strong>Stop Loss:</strong> The distance between your entry price and the point where you'll exit the trade to protect your capital.</li>
            </ul>
          </section>

          {/* Image 3 */}
          <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12 relative">
            <Image
              src={images[2]?.url}
              alt={images[2]?.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          <section id="example">
            <h2 className="text-2xl font-bold mt-12 mb-6">A Practical Example</h2>
            <p>
              Imagine you're trading EUR/USD with $10,000 in your account. You decide to risk 1% ($100) on a trade. Your stop loss is 20 pips away.
            </p>
            <p>
              When you do the math, it shows you should trade exactly 0.5 lots. This way, if the market hits your stop loss, you lose exactly $100—no more, no less. You can check these numbers using our <Link href="/tools/pip-calculator" className="text-accent hover:underline">Pip Value Calculator</Link> to be sure.
            </p>
          </section>

          <section id="assets">
            <h2 className="text-2xl font-bold mt-12 mb-6">Trading Gold and Bitcoin</h2>
            <p>
              Calculating your size for Gold and Bitcoin requires a bit more care because these markets move much faster than regular currencies.
            </p>
            <p>
              For Gold, you have to look at the actual dollar move rather than just "pips." For Bitcoin, since the price is in whole dollars, it's often easier to calculate your risk based on the price difference. If you're interested in Gold, we have a full <Link href="/blog/posts/xauusd-guide" className="text-accent hover:underline">Gold Trading Guide</Link> that explains the details.
            </p>
          </section>

          {/* Image 4 */}
          <div className="w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12 relative">
            <Image
              src={images[3]?.url}
              alt={images[3]?.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>

          <section>
            <h2 className="text-2xl font-bold mt-12 mb-6">Wrapping Up</h2>
            <p>
              You should never have to guess how much you're risking. Experienced traders always know their "risk boundary" before they enter a trade. By using this simple approach, you take the emotion out of trading. You protect your money from big market swings and make sure you can stay in the game long enough to see results.
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Calculate Position Sizing Instantly</h3>
          <p className="text-base text-secondary m-0">
            Don't worry about doing the math by hand. Use our free calculators to instantly find the right trade size for Forex, Gold, and Crypto.
          </p>
          <Link href="/tools/lot-size-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Lot Size Calculator &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Back to Library
          </Link>
          <Link href="/blog/posts/xauusd-guide" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Gold Trading Guide &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
