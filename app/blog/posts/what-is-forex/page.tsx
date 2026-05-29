import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'What is Forex Trading | Market Architecture and Order Types Explained',
  description: 'Understand the core architecture of the foreign exchange market including interbank liquidity, major and minor currency pairs, spreads, and how order execution types affect your trading costs.',
  alternates: {
    canonical: '/blog/posts/what-is-forex',
  },
};

export default async function WhatIsForexPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'what-is-forex')!;
  const images = await getPexelsImages('Foreign Exchange Trading', 4);

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
      "url": "https://www.usmantrades.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Usman Trades",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.usmantrades.uk/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.usmantrades.uk${post.route}`
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

        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden">
          <Image src={images[0].url} alt={images[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#how" className="hover:text-accent no-underline">1. How the Forex Market Works</a></li>
            <li><a href="#pairs" className="hover:text-accent no-underline">2. Major and Minor Currency Pairs</a></li>
            <li><a href="#spreads" className="hover:text-accent no-underline">3. Understanding Spreads and Costs</a></li>
            <li><a href="#perspective" className="hover:text-accent no-underline">4. A Clearer View of the Market</a></li>
          </ul>
        </nav>

        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="how">
            <h2 className="text-2xl font-bold mt-12 mb-6">How the Forex Market Works</h2>
            <p>
              The foreign exchange (Forex) market is the largest financial network in the world. Every day, trillions of dollars are traded back and forth. Unlike the stock market, which has a central building (like the New York Stock Exchange), the Forex market is decentralized. It exists as a massive electronic network of banks all over the globe.
            </p>
            <p>
              When you place a trade, your order doesn't go to one single office. Your broker sends it to "liquidity providers"—which are usually the world's largest banks, like JPMorgan or Citigroup. Understanding that you're trading in this global network is the first step toward a professional approach. Before you start looking at charts, it's helpful to know how to calculate your costs using our <Link href="/tools/pip-calculator" className="text-accent hover:underline">Pip Value Calculator</Link>.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1].url} alt={images[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <h2 className="text-2xl font-bold mt-12 mb-6">Major and Minor Currency Pairs</h2>
            <p>
              In Forex, currencies are always traded in pairs. You're essentially swapping one for another. The most popular ones are called "Major Pairs." These always include the US Dollar—like EUR/USD (Euro vs. Dollar) or GBP/USD (Pound vs. Dollar).
            </p>
            <p>
              Because so many people trade the Majors, they usually have the lowest costs and the "tightest" spreads. "Minor Pairs" are trades between other big currencies that don't include the US Dollar. While these can be great to trade, they often have slightly higher costs because there's a bit less activity in those markets.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2].url} alt={images[2].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <h2 className="text-2xl font-bold mt-12 mb-6">Understanding Spreads and Costs</h2>
            <p>
              The "spread" is simply the difference between the price you buy at and the price you sell at. This is how brokers cover their costs. When big news breaks, banks might step back for a moment to see what happens, which can cause spreads to "widen" or get larger.
            </p>
            <p>
              It's important to account for the spread when you set your stop loss. If you set it too close during a busy news event, the spread itself might trigger your exit. We recommend using our <Link href="/tools/profit-calculator" className="text-accent hover:underline">Profit Calculator</Link> to get a clear picture of your potential gains after costs.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3].url} alt={images[3].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <h2 className="text-2xl font-bold mt-12 mb-6">A Clearer View of the Market</h2>
            <p>
              Once you understand how orders move and how banks interact, you can start to see charts differently. Instead of looking for "magic" indicators, you start to see the patterns left by large-scale trading activity. This shift in perspective is what helps traders move from guessing to making informed decisions. To see how these patterns work on a chart, take a look at our guide on <Link href="/blog/posts/support-resistance" className="text-accent hover:underline">Support and Resistance</Link>.
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Validate Your Trade Economics</h3>
          <p className="text-base text-secondary m-0">
            Make sure you understand the cost of every trade. Use our tools to check your profit margins and pip values before you enter the market.
          </p>
          <Link href="/tools/pip-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Pip Calculator &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog/posts/xauusd-guide" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Previous: Gold Trading
          </Link>
          <Link href="/blog/posts/bitcoin-risk-management" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Bitcoin Risk Management &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
