import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Trading Psychology Guide | How to Keep a Cool Head in the Market',
  description: 'Master your emotions while trading. Learn how to overcome common mental mistakes and build a disciplined, rules-based approach to the markets.',
  alternates: {
    canonical: '/blog/posts/trading-mindset',
  },
};

export default async function TradingMindsetPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'trading-mindset')!;
  const images = await getPexelsImages('Trading psychology mindset', 4);

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
          <Image src={images[0].url} alt={images[0].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#loss" className="hover:text-accent no-underline">1. Dealing with the Pain of Losing</a></li>
            <li><a href="#bias" className="hover:text-accent no-underline">2. Avoiding the Trap of "Seeing What You Want to See"</a></li>
            <li><a href="#discipline" className="hover:text-accent no-underline">3. The Importance of a Solid Routine</a></li>
            <li><a href="#randomness" className="hover:text-accent no-underline">4. Accepting That You Can&apos;t Control Everything</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="loss">
            <h2 className="text-2xl font-bold mt-12 mb-6">Dealing with the Pain of Losing</h2>
            <p>
              It&apos;s a biological fact: losing money hurts much more than making money feels good. In trading, this often leads people to hold onto losing trades for way too long, hoping they&apos;ll turn around, while closing winning trades too early out of fear they&apos;ll disappear.
            </p>
            <p>
              The only way to beat this is to know exactly how much you&apos;re willing to lose before you even enter a trade. Using our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link> lets you set that boundary mathematically, taking the guesswork and emotion out of the equation.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1].url} alt={images[1].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="bias">
            <h2 className="text-2xl font-bold mt-12 mb-6">Avoiding the Trap of &ldquo;Seeing What You Want to See&rdquo;</h2>
            <p>
              When you&apos;ve already decided to buy an asset, your brain starts looking for every reason why it will go up and ignores all the reasons why it might go down. This is called confirmation bias, and it&apos;s a major reason why traders stay in bad trades.
            </p>
            <p>
              Try to look at the opposite side. Before you buy, ask yourself: &ldquo;What would have to happen for me to be wrong?&rdquo; If you can&apos;t answer that, you&apos;re trading on hope, not a plan. To understand the real market structure, take a look at our <Link href="/blog/posts/support-resistance" className="text-accent hover:underline">Technical Price Action Guide</Link>.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2].url} alt={images[2].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="discipline">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Importance of a Solid Routine</h2>
            <p>
              Discipline is the only thing that will keep you going during a losing streak. Professional traders don&apos;t rely on how they feel; they rely on a checklist. If they haven&apos;t checked the news calendar or calculated their risk using a <Link href="/tools/profit-calculator" className="text-accent hover:underline">Profit Calculator</Link>, they don&apos;t trade.
            </p>
            <p>
              Creating your own simple routine helps you treat trading like a business rather than a hobby. It keeps you from making impulsive decisions that you&apos;ll regret later.
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3].url} alt={images[3].alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="randomness">
            <h2 className="text-2xl font-bold mt-12 mb-6">Accepting That You Can&apos;t Control Everything</h2>
            <p>
              The hardest part of trading is accepting that even a perfect setup can fail. You can do everything right and still lose money on a single trade. The market is random in the short term, and that&apos;s okay.
            </p>
            <p>
              Your goal isn&apos;t to win every trade, but to follow your plan flawlessly over 100 trades. When you stop worrying about the money on one trade and start focusing on your process, you&apos;ll find that trading becomes much calmer and more predictable.
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Remove Emotion with Hard Math</h3>
          <p className="text-base text-secondary m-0">
            The best defense against mental mistakes is using math to stay objective. Explore our free tool suite to make better decisions.
          </p>
          <Link href="/tools" className="text-sm font-bold text-accent uppercase tracking-wider no-underline block hover:text-accent-dark">
            Open Utility Tools &rarr;
          </Link>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog/posts/bitcoin-risk-management" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Previous: Bitcoin Risk
          </Link>
          <Link href="/blog/posts/support-resistance" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Technical Structures &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
