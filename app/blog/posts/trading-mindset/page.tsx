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
  title: 'Trading Psychology Guide | How to Keep a Cool Head in the Market',
  description: 'Master your emotions while trading. Learn how to overcome common mental mistakes and build a disciplined, rules-based approach to the markets.',
  alternates: {
    canonical: '/blog/posts/trading-mindset',
  },
};

export default async function TradingMindsetPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'trading-mindset')!;
  const images = await getPexelsImages('meditation zen focus office calm', 4);

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
            <li><a href="#loss" className="hover:text-accent no-underline">1. Dealing with the Pain of Losing</a></li>
            <li><a href="#bias" className="hover:text-accent no-underline">2. Avoiding the Trap of "Seeing What You Want to See"</a></li>
            <li><a href="#discipline" className="hover:text-accent no-underline">3. The Importance of a Solid Routine</a></li>
            <li><a href="#randomness" className="hover:text-accent no-underline">4. Accepting That You Can't Control Everything</a></li>
          </ul>
        </nav>

        {/* Article Body */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="loss">
            <h2 className="text-2xl font-bold mt-12 mb-6">Dealing with the Pain of Losing</h2>
            <p>
              <SmartText text="It's a biological fact: losing money hurts much more than making money feels good. In trading, this often leads people to hold onto losing trades for way too long, hoping they'll turn around, while closing winning trades too early out of fear they'll disappear." />
            </p>
            <p>
              <SmartText text="The only way to beat this is to know exactly how much you're willing to lose before you even enter a trade. Using our Lot Size Calculator lets you set that boundary mathematically, taking the guesswork and emotion out of the equation." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[1].url} alt="Dealing with the Pain of Losing" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="bias">
            <h2 className="text-2xl font-bold mt-12 mb-6">Avoiding the Trap of “Seeing What You Want to See”</h2>
            <p>
              <SmartText text="When you've already decided to buy an asset, your brain starts looking for every reason why it will go up and ignores all the reasons why it might go down. This is called confirmation bias, and it's a major reason why traders stay in bad trades." />
            </p>
            <p>
              <SmartText text="Try to look at the opposite side. Before you buy, ask yourself: 'What would have to happen for me to be wrong?' If you can't answer that, you're trading on hope, not a plan. To understand the real market structure, take a look at our Technical Price Action Guide." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[2].url} alt="Avoiding the Trap of 'Seeing What You Want to See'" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="discipline">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Importance of a Solid Routine</h2>
            <p>
              <SmartText text="Discipline is the only thing that will keep you going during a losing streak. Professional traders don't rely on how they feel; they rely on a checklist. If they haven't checked the news calendar or calculated their risk using a Profit Calculator, they don't trade." />
            </p>
            <p>
              <SmartText text="Creating your own simple routine helps you treat trading like a business rather than a hobby. It keeps you from making impulsive decisions that you'll regret later." />
            </p>
          </section>

          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-[4px] overflow-hidden my-12">
            <Image src={images[3].url} alt="The Importance of a Solid Routine" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section id="randomness">
            <h2 className="text-2xl font-bold mt-12 mb-6">Accepting That You Can't Control Everything</h2>
            <p>
              <SmartText text="The hardest part of trading is accepting that even a perfect setup can fail. You can do everything right and still lose money on a single trade. The market is random in the short term, and that's okay." />
            </p>
            <p>
              <SmartText text="Your goal isn't to win every trade, but to follow your plan flawlessly over 100 trades. When you stop worrying about the money on one trade and start focusing on your process, you'll find that trading becomes much calmer and more predictable." />
            </p>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Internal Link CTA */}
        <section className="bg-surface border border-border p-8 rounded-[4px] space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Remove Emotion with Hard Math</h3>
          <p className="text-base text-secondary m-0">
            <SmartText text="The best defense against mental mistakes is using math to stay objective. Explore our free tool suite to make better decisions." />
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
