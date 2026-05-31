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
  title: 'What Moves Gold Prices Every Day? The 4 Core Drivers',
  description: 'Understand the global factors that drive gold prices. Learn about the inverse dollar relationship, interest rates, and central bank activity.',
  alternates: {
    canonical: '/blog/posts/what-moves-gold',
  },
};

export default async function WhatMovesGoldPost() {
  const post = BLOG_POSTS.find(p => p.slug === 'what-moves-gold')!;
  const images = await getPexelsImages('federal reserve interest rates gold', 5);

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

        {/* Introduction */}
        <header className="border-b border-border pb-8 space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-[4px]">
              {post.category}
            </span>
            <span className="text-xs text-muted">Updated {post.updatedAt}</span>
            <span className="text-xs text-muted">&bull; {post.readTime}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary md:text-5xl leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            <SmartText text="Gold is more than just a shiny metal used for jewelry. In the financial world, it acts as a global thermometer for economic health. To trade it successfully, you have to understand the massive forces that move the price every single day." />
          </p>
        </header>

        {/* Image 1 */}
        <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden">
          <Image src={images[0]?.url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" priority />
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">In this guide:</h2>
          <ul className="grid gap-2 text-sm font-medium text-slate-600">
            <li><a href="#drivers" className="hover:text-accent no-underline">1. The Core Drivers of Gold Prices</a></li>
            <li><a href="#example" className="hover:text-accent no-underline">2. Practical Example: The FOMC Move</a></li>
            <li><a href="#mistakes" className="hover:text-accent no-underline">3. Common Mistakes to Avoid</a></li>
            <li><a href="#risk" className="hover:text-accent no-underline">4. Risk and Volatility Awareness</a></li>
          </ul>
        </nav>

        {/* Main Concept */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="drivers">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Core Drivers of Gold Prices</h2>
            <p>
              <SmartText text="Many new traders think gold moves because of supply and demand for physical bars. While that matters in the long term, the daily price is actually driven by four main macro factors." />
            </p>
            <div className="space-y-6 mt-6">
               <div className="space-y-2">
                 <h3 className="font-bold text-slate-900 underline decoration-accent underline-offset-4">The US Dollar Relationship</h3>
                 <p className="text-base text-slate-600">
                   <SmartText text="Gold is priced in US Dollars (XAUUSD). Because of this, they usually have an inverse relationship. When the Dollar gets stronger, gold becomes more expensive for people using other currencies to buy, which usually causes the price of gold to drop." />
                 </p>
               </div>
               <div className="space-y-2">
                 <h3 className="font-bold text-slate-900 underline decoration-accent underline-offset-4">Interest Rates (The Fed)</h3>
                 <p className="text-base text-slate-600">
                   <SmartText text="Gold doesn't pay interest or dividends. When the Federal Reserve raises interest rates, investors can earn more money by holding government bonds instead of gold. This 'opportunity cost' often leads to selling pressure on gold." />
                 </p>
               </div>
            </div>
          </section>

          {/* Image 2 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[1]?.url} alt="The Core Drivers of Gold Prices" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <p>
              <SmartText text="Beyond the US economy, gold also reacts to Geopolitical Tension and Central Bank Activity. When the world feels unstable—such as during a war or a major trade dispute—investors flock to gold as a 'Safe Haven.' Meanwhile, central banks in countries like China, India, and Russia buy massive amounts of gold to protect their national wealth from the fluctuating value of the US Dollar." />
            </p>
          </section>

          {/* Image 3 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[2]?.url} alt="Geopolitical Tension and Central Bank Activity" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          {/* Practical Example */}
          <section id="example">
            <h2 className="text-2xl font-bold mt-12 mb-6">Practical Example: The FOMC Move</h2>
            <p>
              <SmartText text="Let's look at a situation that happens several times a year. Imagine the Federal Reserve holds a meeting and announces they are raising interest rates by 0.50% to fight inflation." />
            </p>
            <p>
              <SmartText text="In this scenario, you will often see the US Dollar spike higher within seconds of the news. Almost instantly, the price of gold will drop $20 or $30. Why? Because the 'yield' on cash is now higher, making the non-yielding gold less attractive to big institutions. If you trade during these times, always check our Lot Size Calculator to ensure your position can handle the sudden price jump." />
            </p>
          </section>

          {/* Image 4 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[3]?.url} alt="Practical Example: The FOMC Move" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          {/* Common Mistakes */}
          <section id="mistakes">
            <h2 className="text-2xl font-bold mt-12 mb-6">Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 space-y-4 text-base">
              <li><strong>Chasing the News:</strong> This is known as the "invincibility trap." After a few wins, traders feel confident and double their risk, only for one loss to wipe out all their recent progress.</li>
              <li><strong>Ignoring the Dollar:</strong> If you trade gold without looking at what the US Dollar Index (DXY) is doing, you are trading with a blindfold on.</li>
              <li><strong>Using Too Much Leverage:</strong> Gold is much more volatile than currency pairs like EUR/USD. Using the same lot size on gold that you use on currencies is a recipe for a quick margin call.</li>
            </ul>
          </section>

          {/* Risk Considerations */}
          <section id="risk">
            <h2 className="text-2xl font-bold mt-12 mb-6">Risk and Volatility Awareness</h2>
            <p>
              <SmartText text="Gold can move 500 or 1,000 pips in a single day. This speed is exciting but dangerous. You must accept that your analysis won't always be right. The market doesn't care about your opinion." />
            </p>
            <p>
              <SmartText text="The key to surviving in the gold market is to keep your risk small on every single trade. We recommend never risking more than 1% of your account on a gold setup. If the volatility is too high, it is perfectly okay to stay on the sidelines and wait for a calmer environment. If you need help staying disciplined, check out our Trading Psychology Guide." />
            </p>
          </section>

          {/* Image 5 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[4]?.url} alt="Risk and Volatility Awareness" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          {/* FAQ */}
          <section className="bg-slate-50 p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Why does gold go down when the dollar goes up?</h3>
                <p className="text-sm text-slate-600">
                  <SmartText text="Because gold is priced in dollars, a stronger dollar means you need fewer of them to buy the same ounce of gold, naturally pushing the price lower." />
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Does jewelry demand move the daily gold price?</h3>
                <p className="text-sm text-slate-600">
                  <SmartText text="Rarely. While physical demand matters over years, the daily price is driven by institutional investors, central banks, and algorithmic traders." />
                </p>
              </div>
            </div>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Related Tools */}
        <section className="bg-surface border border-border p-8 rounded-xl space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Project Your Gold Outcomes</h3>
          <p className="text-base text-secondary m-0">
            <SmartText text="Gold moves fast. Use our tools to run the math on your potential profit and risk before you enter the market." />
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/tools/pip-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline hover:text-accent-dark">
              Pip Value Estimator &rarr;
            </Link>
            <Link href="/tools/profit-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline hover:text-accent-dark">
              Profit Projection &rarr;
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Further Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/blog/posts/xauusd-guide" className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all no-underline group">
               <span className="text-[10px] font-bold text-accent uppercase block mb-1">Deep Dive</span>
               <h4 className="text-sm font-bold text-slate-900 group-hover:text-accent">Complete Gold Trading Guide</h4>
            </Link>
            <Link href="/blog/posts/what-is-forex" className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all no-underline group">
               <span className="text-[10px] font-bold text-accent uppercase block mb-1">Foundations</span>
               <h4 className="text-sm font-bold text-slate-900 group-hover:text-accent">How Global Markets Work</h4>
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Back to Library
          </Link>
          <Link href="/blog/posts/xauusd-guide" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Gold Trading Deep Dive &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
