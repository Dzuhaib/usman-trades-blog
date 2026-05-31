import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';
import { generateBlogSchema } from '@/lib/seo-os/schema-engine';
import SmartText from '@/components/SmartText';

export const metadata: Metadata = {
  title: 'Support and Resistance | How to Find High-Probability Entry Zones',
  description: 'Learn how to identify where big institutions are actually trading. Move past basic trendlines and understand order blocks and supply zones.',
  alternates: {
    canonical: '/blog/posts/support-resistance',
  },
};

export default async function SupportResistancePost() {
  const post = BLOG_POSTS.find(p => p.slug === 'support-resistance')!;
  const images = await getPexelsImages('candlestick chart technical analysis patterns', 4);

  const blogSchema = generateBlogSchema({
    title: post.title,
    excerpt: post.excerpt,
    image: images[0]?.url || '',
    date: post.date,
    updatedAt: post.updatedAt,
    route: post.route,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
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
            <SmartText text={post.excerpt} />
          </p>
        </header>

        {/* Image 1: Main Cover */}
        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden">
          <Image src={images[0].url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#trendlines" className="hover:text-accent no-underline">1. The Problem with Basic Trendlines</a></li>
            <li><a href="#orderblocks" className="hover:text-accent no-underline">2. Understanding Institutional Entry Zones</a></li>
            <li><a href="#fakeouts" className="hover:text-accent no-underline">3. Why the Market Hits Your Stop Loss First</a></li>
            <li><a href="#strategy" className="hover:text-accent no-underline">4. Building a More Reliable Approach</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="trendlines">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Problem with Basic Trendlines</h2>
            <p>
              <SmartText text="Many trading books teach you to draw diagonal lines connecting lows and highs on a chart. They tell you to just buy whenever the price touches that line. While this sounds simple, it often fails because big banks and funds don't look at charts that way." />
            </p>
            <p>
              <SmartText text="Institutional traders care about finding enough liquidity to fill their massive orders without moving the price too much. Before you look for patterns, it's better to understand the value of what you're trading using our Pip Value Estimator." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1]?.url} alt="The Problem with Basic Trendlines" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="orderblocks">
            <h2 className="text-2xl font-bold mt-12 mb-6">Understanding Institutional Entry Zones</h2>
            <p>
              <SmartText text="Instead of diagonal lines, professional traders look for horizontal zones where price has suddenly accelerated in the past. These areas are often called 'order blocks' because they represent places where a major institution stepped in with a lot of money." />
            </p>
            <p>
              <SmartText text="When the market returns to these areas, there's a good chance those same institutions will want to trade there again. By following these footprints, you align yourself with the real power in the market. To learn more about how these big players operate, check out our Forex Architecture Guide." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2]?.url} alt="Understanding Institutional Entry Zones" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="fakeouts">
            <h2 className="text-2xl font-bold mt-12 mb-6">Why the Market Hits Your Stop Loss First</h2>
            <p>
              <SmartText text="Have you ever placed a trade, only for the price to spike just past your stop loss before heading exactly where you thought it would? This is often a 'liquidity grab.' Institutions sometimes push the price just far enough to trigger retail stop losses, which gives them the liquidity they need to enter in the opposite direction." />
            </p>
            <p>
              <SmartText text="To avoid this, you need to give your trades more room to breathe. Using our Lot Size Calculator can help you figure out a safe position size that allows for a wider, more logical stop loss." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3]?.url} alt="Why the Market Hits Your Stop Loss First" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="strategy">
            <h2 className="text-2xl font-bold mt-12 mb-6">Building a More Reliable Approach</h2>
            <p>
              <SmartText text="Start looking at higher timeframes like the 4-hour or daily charts to find the most important zones. Be patient and wait for the price to come to you, rather than chasing every small move." />
            </p>
            <p>
              <SmartText text="Trading this way requires a lot of discipline and a steady mindset. We go into this in much more detail in our Trading Psychology Guide." />
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Project Your Price Action Targets</h3>
          <p className="text-base text-secondary m-0">
            <SmartText text="Once you identify your target zones, use our tools to run the math on your potential profit before you enter." />
          </p>
          <Link href="/tools/profit-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Profit Calculator &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog/posts/trading-mindset" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Previous: Trading Psychology
          </Link>
          <Link href="/blog" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Back to Library &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
