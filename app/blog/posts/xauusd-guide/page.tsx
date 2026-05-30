import type { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Gold Trading Guide | How to Trade XAUUSD With Macro Liquidity',
  description: 'Master gold XAUUSD trading by understanding macro liquidity pools, central bank accumulation, treasury yields, and the inverse dollar correlation. A complete guide for serious traders.',
  alternates: {
    canonical: '/blog/posts/xauusd-guide',
  },
};

export default async function GoldTradingGuidePost() {
  const post = BLOG_POSTS.find(p => p.slug === 'xauusd-guide')!;
  const images = await getPexelsImages('Gold bullion market finance', 4);

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
      "url": "https://www.usmantrades.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Usman Trades",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.usmantrades.co.uk/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.usmantrades.co.uk${post.route}`
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
        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden">
          <Image src={images[0].url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#nature" className="hover:text-accent no-underline">1. The Unique Nature of Gold</a></li>
            <li><a href="#centralbanks" className="hover:text-accent no-underline">2. How Central Banks Influence Gold</a></li>
            <li><a href="#usd" className="hover:text-accent no-underline">3. Gold and the US Dollar</a></li>
            <li><a href="#volatility" className="hover:text-accent no-underline">4. Managing the Volatility</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="nature">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Unique Nature of Gold</h2>
            <p>
              Trading gold is a different experience than trading regular currency pairs like EUR/USD or GBP/USD. Gold is often seen as a "safe haven"—a place where large investors move their money when the global economy feels uncertain. Whenever there's a spike in market worry or inflation, you'll often see more people looking to buy gold.
            </p>
            <p>
              One thing to remember is that gold doesn't pay interest. Because of this, it's very sensitive to what's happening with US government bonds. If those bonds start paying higher interest, big investors might sell their gold to buy bonds instead. Keeping an eye on this relationship is a key part of trading gold successfully. If you're new to this, our <Link href="/blog/posts/what-is-forex" className="text-accent hover:underline">Forex Education Guide</Link> covers the basics of how markets work.
            </p>
          </section>

          {/* Image 2 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1].url} alt="The Unique Nature of Gold" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="centralbanks">
            <h2 className="text-2xl font-bold mt-12 mb-6">How Central Banks Influence Gold</h2>
            <p>
              Some of the biggest buyers of gold are central banks. Countries like China and Russia often buy large amounts of gold to protect their national savings and rely less on the US dollar. This massive buying creates strong "price floors" on the charts that can last for a long time.
            </p>
            <p>
              When you trade gold, you're trading in the same market as these huge institutions. This is why gold trends can be so powerful—a central bank doesn't stop buying just because of a small change on a 5-minute chart. They buy steadily over months and years. Before you jump into these trends, it's a good idea to use our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link> to make sure your trade size is safe.
            </p>
          </section>

          {/* Image 3 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2].url} alt="How Central Banks Influence Gold" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="usd">
            <h2 className="text-2xl font-bold mt-12 mb-6">Gold and the US Dollar</h2>
            <p>
              Gold is priced in US dollars. This means there's usually an opposite relationship between the two: when the dollar gets stronger, gold often gets cheaper, and when the dollar weakens, gold prices tend to rise.
            </p>
            <p>
              This happens because a stronger dollar makes gold more expensive for people using other currencies to buy. It's always smart to check the "Dollar Index" (DXY) before you enter a gold trade. Trading gold without looking at the dollar is like trying to sail a boat without checking the wind direction.
            </p>
          </section>

          {/* Image 4 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3].url} alt="Gold and the US Dollar" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="volatility">
            <h2 className="text-2xl font-bold mt-12 mb-6">Managing the Volatility</h2>
            <p>
              Gold is known for being very fast-moving. It can jump hundreds of pips in minutes when big news breaks. While this speed can lead to quick wins, it's also why many traders run into trouble.
            </p>
            <p>
              Staying calm is essential. You have to accept that your stop loss might be hit, and you should avoid the temptation to "get even" with the market right away. If you find the mental side of trading tough, take a look at our guide on <Link href="/blog/posts/trading-mindset" className="text-accent hover:underline">Trading Psychology</Link> to help build a steadier approach.
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Protect Your Gold Positions</h3>
          <p className="text-base text-secondary m-0">
            Gold moves fast. Use our risk tools to make sure your account can handle the swings.
          </p>
          <Link href="/tools/risk-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Risk Calculator &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog/posts/position-sizing" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Previous: Position Sizing
          </Link>
          <Link href="/blog/posts/what-is-forex" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: What is Forex? &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
