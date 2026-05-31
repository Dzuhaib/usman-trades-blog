import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPexelsImages } from '@/lib/pexels';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'What Is The Best Risk Percentage Per Trade? A Complete Guide',
  description: 'Learn the optimal risk percentage for Forex, Gold, and Bitcoin trading. We explain why 1% is the industry standard for long term account survival and growth.',
  alternates: {
    canonical: '/blog/posts/best-risk-percentage',
  },
};

export default async function BestRiskPercentagePost() {
  const post = BLOG_POSTS.find(p => p.slug === 'best-risk-percentage')!;
  const images = await getPexelsImages('financial risk safety math', 5);

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

        {/* Introduction */}
        <header className="border-b border-border pb-8 space-y-4">
          <div className="flex items-center gap-3">
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
            The difference between a successful trader and someone who loses their entire account often comes down to one single number: their risk percentage. While everyone wants to make money quickly, the real goal of trading is to survive long enough for the math of your strategy to work.
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
            <li><a href="#concept" className="hover:text-accent no-underline">1. The Core Concept of Risk Percentage</a></li>
            <li><a href="#example" className="hover:text-accent no-underline">2. Practical Example: Survival vs Ruin</a></li>
            <li><a href="#mistakes" className="hover:text-accent no-underline">3. Common Mistakes Beginners Make</a></li>
            <li><a href="#psychology" className="hover:text-accent no-underline">4. Risk and the Biological Stress Response</a></li>
          </ul>
        </nav>

        {/* Main Concept */}
        <div className="article-content space-y-8 text-primary leading-relaxed text-lg">
          <section id="concept">
            <h2 className="text-2xl font-bold mt-12 mb-6">The Core Concept of Risk Percentage</h2>
            <p>
              Risk percentage is the portion of your total account balance that you are willing to lose if a single trade goes wrong. For example, if you have $10,000 and you risk 1%, you are agreeing to lose exactly $100 if your stop loss is hit.
            </p>
            <p>
              In the world of professional finance, 1% is considered the "gold standard" for retail traders. This might sound small, but it is built on a very specific type of logic. Trading is a game of probabilities, and even a great strategy can have a losing streak of 5 or 10 trades in a row. If you risk 5% per trade and lose 10 times, you have lost half of your account. If you risk 1%, you have only lost 10%, which is much easier to recover from.
            </p>
            <p>
              This is where many people get confused. They focus on the potential profit rather than the potential loss. A professional trader looks at their account like a business. They know that capital is their inventory. If they run out of inventory, the business is closed. By keeping your risk percentage low, you protect your inventory and ensure you can stay in the market for years rather than weeks.
            </p>
          </section>

          {/* Image 2 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[1]?.url} alt="Financial risk management and account protection" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <p>
              Another reason 1% is effective is because of how <strong>Mathematical Recovery</strong> works. As your losses get deeper, the gain you need to break even grows exponentially. We call this the "hidden cost of being wrong." If you keep your losses shallow through a small risk percentage, you never have to face the impossible task of needing a 100% gain just to get your money back.
            </p>
            <p>
              To calculate this precisely for your own account, you should always use a tool like our <Link href="/tools/lot-size-calculator" className="text-accent hover:underline">Lot Size Calculator</Link>. This ensures that your position size is mathematically matched to your chosen risk percentage regardless of how far away your stop loss is placed.
            </p>
          </section>

          {/* Practical Example */}
          <section id="example">
            <h2 className="text-2xl font-bold mt-12 mb-6">Practical Example: Survival vs Ruin</h2>
            <p>
              Let&apos;s imagine two different traders, Sarah and James, both starting with $5,000. They both use the exact same strategy, but they have very different views on risk.
            </p>
            <div className="bg-slate-50 p-8 rounded-2xl space-y-6">
               <div className="space-y-2">
                 <h3 className="font-bold text-slate-900">Trader Sarah: The Disciplined Approach</h3>
                 <p className="text-base text-slate-600">Sarah risks exactly 1% ($50) on every trade. She experiences a bad week and loses 6 trades in a row. Her account balance drops to $4,700. She is still very much in the game and feels calm.</p>
               </div>
               <div className="space-y-2 border-t border-slate-200 pt-4">
                 <h3 className="font-bold text-slate-900">Trader James: The Aggressive Approach</h3>
                 <p className="text-base text-slate-600">James risks 10% ($500) because he wants to double his money fast. He also loses those same 6 trades. His account balance is now $2,000. He has lost 60% of his capital and feels intense panic.</p>
               </div>
            </div>
            <p>
              For Sarah to get back to $5,000, she only needs a gain of about 6.4%. For James to get back to his starting balance, he now needs a massive gain of 150%. This is the reality of risk. The strategy was the same, but the risk percentage determined who survived and who was ruined.
            </p>
          </section>

          {/* Image 3 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[2]?.url} alt="Comparison of disciplined vs aggressive trading risk" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          {/* Common Mistakes */}
          <section id="mistakes">
            <h2 className="text-2xl font-bold mt-12 mb-6">Common Mistakes Beginners Make</h2>
            <p>
              Most retail traders fail because they treat the market like a casino rather than a business. Here are the three most frequent errors regarding risk percentage.
            </p>
            <ul className="list-disc pl-6 space-y-4 text-base">
              <li><strong>Increasing Risk After a Win:</strong> This is known as the "invincibility trap." After a few wins, traders feel confident and double their risk, only for one loss to wipe out all their recent progress.</li>
              <li><strong>Increasing Risk After a Loss:</strong> This is "revenge trading." Traders try to win back what they lost by risking even more on the next setup. This usually leads to a rapid account collapse.</li>
              <li><strong>Risking Fixed Lot Sizes:</strong> Instead of using a percentage, many traders just buy 0.1 lots every time. This means their risk changes on every trade depending on the stop loss distance, which makes their equity curve unpredictable.</li>
            </ul>
            <p>
              The solution to all these problems is to remain robotic. Your risk percentage should stay the same whether you just won 5 trades or lost 5 trades. Consistency in risk leads to consistency in results. If you are struggling with these emotions, our <Link href="/blog/posts/trading-mindset" className="text-accent hover:underline">Trading Psychology Guide</Link> offers more tips on staying disciplined.
            </p>
          </section>

          {/* Image 4 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[3]?.url} alt="Common trading mistakes and emotional decision making" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          {/* Psychology Section */}
          <section id="psychology">
            <h2 className="text-2xl font-bold mt-12 mb-6">Risk and the Biological Stress Response</h2>
            <p>
              There is a biological reason why risking too much is a bad idea. When you risk an amount of money that you are not comfortable losing, your brain enters a "fight or flight" mode. This triggers a release of cortisol and adrenaline, which shuts down the part of your brain responsible for logical reasoning and long term planning.
            </p>
            <p>
              In this state, you are much more likely to make mistakes like closing a trade too early out of fear or moving your stop loss out of hope. By keeping your risk percentage at 1% or lower, you keep your emotions in check. You can watch the price move against you without feeling a physical urge to interfere with the trade. Professional trading is boring, and that is exactly how it should be.
            </p>
          </section>

          {/* Image 5 */}
          <div className="relative w-full aspect-[16/9] bg-surface border border-border rounded-xl overflow-hidden my-12">
            <Image src={images[4]?.url} alt="Biological stress response and trading discipline" fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
          </div>

          <section>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Wrapping Up the Lesson</h2>
            <p>
              Your most important job as a trader is to protect your capital. Profit is the byproduct of staying in the game long enough to let your edge play out. By committing to a strict risk percentage of 1% per trade, you remove the element of luck from your trading business.
            </p>
            <p>
              Remember that the market will always be there tomorrow. There is no reason to rush or take unnecessary chances. Use the math of risk to your advantage, and you will find that trading becomes much less stressful and much more sustainable over time.
            </p>
          </section>

          {/* FAQ */}
          <section className="bg-slate-50 p-8 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Is 2% risk too high for a beginner?</h3>
                <p className="text-sm text-slate-600">While some people use 2%, we recommend starting at 1%. This provides a larger safety margin while you are still learning market mechanics and building your discipline.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Does risk percentage change for Gold or Bitcoin?</h3>
                <p className="text-sm text-slate-600">No. The percentage should stay the same, but your position size will change because those assets are more volatile. Always use a calculator to find the correct size for each specific asset.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Can I risk less than 1%?</h3>
                <p className="text-sm text-slate-600">Absolutely. Many professional traders risk only 0.25% or 0.50% per trade, especially when they are managing very large accounts. Risking less is always safer than risking more.</p>
              </div>
            </div>
          </section>
        </div>

        <AuthorBio author={post.author} updatedAt={post.updatedAt} />

        {/* Related Tools */}
        <section className="bg-surface border border-border p-8 rounded-xl space-y-4 mt-12">
          <h3 className="text-lg font-bold text-primary m-0">Project Your Risk and Recovery</h3>
          <p className="text-base text-secondary m-0">
            Don&apos;t leave your account to chance. Use our tools to visualize how risk affects your long term growth and recovery.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/tools/drawdown-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline hover:text-accent-dark">
              Drawdown Calculator &rarr;
            </Link>
            <Link href="/tools/risk-calculator" className="text-sm font-bold text-accent uppercase tracking-wider no-underline hover:text-accent-dark">
              Risk Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        <section className="space-y-4">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Further Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/blog/posts/position-sizing" className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all no-underline group">
               <span className="text-[10px] font-bold text-accent uppercase block mb-1">Fundamentals</span>
               <h4 className="text-sm font-bold text-slate-900 group-hover:text-accent">Position Sizing Formula Guide</h4>
            </Link>
            <Link href="/blog/posts/bitcoin-risk-management" className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all no-underline group">
               <span className="text-[10px] font-bold text-accent uppercase block mb-1">Asset Specific</span>
               <h4 className="text-sm font-bold text-slate-900 group-hover:text-accent">Bitcoin Volatility Management</h4>
            </Link>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-border pt-8 flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-sm pb-12">
          <Link href="/blog" className="text-secondary no-underline hover:text-primary transition-colors">
            &larr; Back to Library
          </Link>
          <Link href="/blog/posts/position-sizing" className="text-accent font-medium no-underline hover:text-accent-dark transition-colors">
            Next: Position Sizing Formula &rarr;
          </Link>
        </footer>
      </article>
    </>
  );
}
