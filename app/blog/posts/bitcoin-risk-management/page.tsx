import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Bitcoin Risk Management | How to Handle Crypto Volatility Safely',
  description: 'Learn how to manage Bitcoin volatility without losing your head. Practical tips on position sizing and drawdown protection for crypto traders.',
  alternates: {
    canonical: '/blog/posts/bitcoin-risk-management',
  },
};

export default async function BitcoinRiskPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'bitcoin-risk-management')!;
  const images = await getPexelsImages('Bitcoin cryptocurrency risk', 4);

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
        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden">
          <Image src={images[0]?.url} alt={images[0]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#volatility" className="hover:text-accent no-underline">1. The Reality of Bitcoin Volatility</a></li>
            <li><a href="#drawdown" className="hover:text-accent no-underline">2. Protecting Your Account from Big Drops</a></li>
            <li><a href="#ranges" className="hover:text-accent no-underline">3. Understanding Daily Price Swings</a></li>
            <li><a href="#psychology" className="hover:text-accent no-underline">4. Managing the Stress of Crypto Trading</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="volatility">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Reality of Bitcoin Volatility</h2>
            <p>
              Bitcoin moves differently than any other asset. While a major currency like the Euro might move half a percent in a day, Bitcoin can easily swing 5% or 10% on a completely normal Tuesday. This is what makes it exciting, but it&apos;s also what makes it dangerous for unprepared traders.
            </p>
            <p>
              You can&apos;t use the same rules for Bitcoin that you use for Forex. If you try to use too much leverage, a sudden $2,000 drop can wipe out your account in minutes. Before you enter a crypto trade, always use our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link> to make sure your position isn&apos;t too big for your account.
            </p>
          </section>

          {/* Image 2 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1]?.url} alt={images[1]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="drawdown">
            <h2 className="text-2xl font-bold mt-12 mb-6">Protecting Your Account from Big Drops</h2>
            <p>
              A &ldquo;drawdown&rdquo; is just a fancy way of saying your account balance has gone down from its highest point. In crypto, you are going to have losing streaks—it&apos;s a mathematical certainty. Your goal isn&apos;t to avoid them entirely, but to make sure they don&apos;t end your trading career.
            </p>
            <p>
              Professional traders set limits. For example, if they lose 10% of their account, they stop trading and take a break to clear their head. You should have the same kind of &ldquo;circuit breaker&rdquo; for your own trading. Never let one bad week in Bitcoin ruin months of hard work.
            </p>
          </section>

          {/* Image 3 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2]?.url} alt={images[2]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="ranges">
            <h2 className="text-2xl font-bold mt-12 mb-6">Understanding Daily Price Swings</h2>
            <p>
              Before you trade Bitcoin, you need to know how much it usually moves in a day. If Bitcoin is moving $3,000 up and down every day, putting your stop loss just $50 away from your entry is a mistake—you&apos;ll get stopped out by normal market noise before the price has a chance to move in your direction.
            </p>
            <p>
              Your stop loss needs to be in a logical place where the trade is actually &ldquo;broken,&rdquo; not just where you&apos;re afraid of losing money. We recommend checking our guide on <Link href="/blog/posts/support-resistance" className="text-accent hover:underline">Support and Resistance</Link> to find better places for your exits.
            </p>
          </section>

          {/* Image 4 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3]?.url} alt={images[3]?.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="psychology">
            <h2 className="text-2xl font-bold mt-12 mb-6">Managing the Stress of Crypto Trading</h2>
            <p>
              Trading Bitcoin can be incredibly stressful. Watching the price bounce around can trigger a lot of fear and greed. The best way to stay calm is to have a plan before you start.
            </p>
            <p>
              When you know exactly how much you stand to lose before you even click &ldquo;buy,&rdquo; the market can&apos;t surprise you as easily. If you find yourself getting emotional, take a look at our <Link href="/blog/posts/trading-mindset" className="text-accent hover:underline">Trading Psychology Guide</Link> for more tips on staying disciplined.
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Secure Your Crypto Capital</h3>
          <p className="text-base text-secondary m-0">
            Don&apos;t guess your risk on Bitcoin. Use our tools to define your limits before you trade.
          </p>
          <Link href="/tools/risk-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Risk Calculator &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog/posts/what-is-forex" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Previous: What is Forex?
          </Link>
          <Link href="/blog/posts/trading-mindset" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Trading Psychology &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
