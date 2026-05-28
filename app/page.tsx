import type { Metadata } from 'next';
import Link from 'next/link';
import LiveTicker from '@/components/LiveTicker';
import { BLOG_POSTS } from '@/lib/blogData';
import { getPexelsImage } from '@/lib/pexels';
import { Calculator, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Usman Trades | Free Forex, Gold and Bitcoin Trading Tools and Education',
  description: 'Usman Trades is a free professional trading education platform featuring mathematically precise calculators for Forex, Gold XAUUSD, and Bitcoin. Learn position sizing, risk management, and market architecture with clean, human-written guides.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const featuredPosts = BLOG_POSTS.slice(0, 5);

  const postsWithImages = await Promise.all(
    featuredPosts.map(async (post) => {
      const pexelsImage = await getPexelsImage(post.category);
      return {
        ...post,
        image: pexelsImage,
      };
    })
  );

  const leadPost = postsWithImages[0];
  const secondaryPosts = postsWithImages.slice(1);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate Forex lot size correctly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your correct lot size, divide your absolute cash risk (account balance multiplied by risk percentage) by the product of your stop loss distance in pips and the pip value of the currency pair. This calculation ensures that you lose exactly your targeted percentage if your stop loss is hit."
        }
      },
      {
        "@type": "Question",
        "name": "What is a safe risk percentage per trade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard professional risk threshold is between one percent and two percent of your total account equity per trade setup. Trading with higher risk percentages can lead to rapid drawdowns and emotional distress, preventing you from surviving natural market volatility sequences."
        }
      },
      {
        "@type": "Question",
        "name": "How do central banks affect Gold prices (XAUUSD)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Central banks accumulate physical gold bullion to diversify sovereign reserves away from the US Dollar. This massive institutional demand creates strong higher timeframe support zones. Additionally, gold holds an inverse relationship with US Treasury yields and real interest rates."
        }
      },
      {
        "@type": "Question",
        "name": "How do I manage risk when trading Bitcoin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Managing cryptocurrency risk requires wider stop loss levels and reduced leverage to accommodate higher intraday volatility. You must measure the average true range of the asset over a thirty day cycle and set strict, automated drawdown limits to preserve your core capital."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="space-y-10">
      {/* 2. WSJ Editorial Style Platform Header */}
      <header className="border-b-4 border-double border-slate-900 pb-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
          <div>
            <span className="text-[11px] font-bold text-accent tracking-widest uppercase block mb-1">
              Independent Technical Intelligence
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight leading-none">
              The Usman Trades Journal
            </h1>
          </div>
        </div>
      </header>

      {/* 3. Newspaper 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Main Articles Editorial Board (8 Cols) */}
        <main className="lg:col-span-8 space-y-12">
          {/* Main Lead Story */}
          {leadPost && (
            <article className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-4 font-mono">
                ★ EDITOR&apos;S LEAD ANALYSIS
              </span>
              <div className="relative aspect-[21/9] w-full mb-6 rounded bg-slate-100 overflow-hidden border border-slate-100">
                <img
                  src={leadPost.image.url}
                  alt={leadPost.image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-950 leading-tight mb-3">
                <Link href={leadPost.route} className="text-slate-950 hover:text-accent no-underline transition-colors">
                  {leadPost.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {leadPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-500 font-serif">
                  By <strong>Usman Trades Editorial Team</strong> • {leadPost.date}
                </span>
                <Link
                  href={leadPost.route}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded transition-all duration-200"
                >
                  Read Full Paper &rarr;
                </Link>
              </div>
            </article>
          )}

          {/* Secondary Sub-Stories Grid */}
          <section className="space-y-6">
            <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest border-b border-slate-900 pb-2">
              LATEST RESEARCH PAPERS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {secondaryPosts.map((post) => (
                <article key={post.slug} className="flex flex-col justify-between border border-slate-100 rounded-lg bg-slate-50/50 hover:border-slate-300 transition-all duration-200 overflow-hidden">
                  <div className="relative aspect-video w-full border-b border-slate-100 bg-slate-100 overflow-hidden">
                    <img
                      src={post.image.url}
                      alt={post.image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 font-mono">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-bold font-serif text-slate-950 leading-snug mb-2">
                      <Link href={post.route} className="text-slate-950 hover:text-accent no-underline">
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 mt-auto">
                      <span className="text-[10px] text-slate-500">{post.readTime}</span>
                      <Link href={post.route} className="text-[11px] font-bold text-accent no-underline hover:text-accent-dark">
                        Analyze &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT COLUMN: Professional Finance Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Widget 2: Educational Advisory Bulletin */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50/70 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 font-mono">
              EDITORIAL CHARTER
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              &ldquo;Usman Trades provides strict, mathematics-based technical modeling and interbank asset research. We represent a conflict-free informational publishing body. Under zero circumstances do we validate signals, promote external brokerage accounts, or promise speculative gains.&rdquo;
            </p>
            <p className="text-[10px] text-slate-500 font-serif">
              — Usman Trades Ethics Board
            </p>
          </div>

          {/* Sidebar Widget 3: Quick Navigation Directory */}
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 font-mono">
              UTILITY SUITE
            </h3>
            <ul className="space-y-3 p-0 m-0 list-none text-xs">
              <li className="flex items-center justify-between">
                <Link href="/tools/lot-size-calculator" className="flex items-center gap-2 text-slate-700 hover:text-accent font-medium no-underline">
                  <Calculator className="w-3.5 h-3.5" />
                  Lot Size Calculator
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">Risk Control</span>
              </li>
              <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                <Link href="/tools/risk-calculator" className="flex items-center gap-2 text-slate-700 hover:text-accent font-medium no-underline">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Risk & Position Limit
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">Defense</span>
              </li>
              <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                <Link href="/tools/pip-calculator" className="flex items-center gap-2 text-slate-700 hover:text-accent font-medium no-underline">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Pip Value Estimator
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">Contract Math</span>
              </li>
              <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                <Link href="/tools/profit-calculator" className="flex items-center gap-2 text-slate-700 hover:text-accent font-medium no-underline">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Profit & Loss Projection
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">Valuation</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* 4. Core Trading Methodology */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-b border-slate-200 py-12 my-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Our Trading Philosophy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The vast majority of retail participants approach the financial markets completely backwards. They rely heavily on emotional decisions and fundamentally broken technical indicators. We reject that approach entirely. We believe that consistent profitability in Forex and Cryptocurrency markets requires a deeply mechanical mindset rooted entirely in mathematics. Our methodology focuses exclusively on capital preservation first and profit generation second. By strictly managing your absolute drawdown potential using our proprietary calculators, you completely remove the anxiety from your daily execution routine.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Institutional Market Architecture</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We analyze the markets precisely how massive financial institutions view them. We completely ignore arbitrary diagonal lines drawn on small timeframes. Instead we hunt for massive liquidity pools and deep horizontal order blocks where tier one banks execute their billions. When you align your retail strategies alongside these giant institutional footprints, your win rate improves dramatically. We provide you with the exact formulas and psychological frameworks necessary to survive the extreme volatility present in modern global asset classes.
          </p>
        </div>
      </section>

      {/* 4.5 Frequently Asked Questions (AEO/FAQ) */}
      <section className="border-t border-slate-200 pt-12 my-12 space-y-6">
        <div className="text-center md:text-left">
          <span className="text-[11px] font-bold text-accent tracking-widest uppercase block mb-1">
            FAQ Desk
          </span>
          <h2 className="text-3xl font-bold font-serif text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 max-w-[640px]">
            Direct, mathematically precise answers to high-intent questions regarding Forex contract sizes, risk controls, and institutional layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-serif">How do I calculate Forex lot size correctly?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To calculate your correct lot size, divide your absolute cash risk (account balance multiplied by risk percentage) by the product of your stop loss distance in pips and the pip value of the currency pair. This calculation ensures that you lose exactly your targeted percentage if your stop loss is hit.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-serif">What is a safe risk percentage per trade?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A standard professional risk threshold is between one percent and two percent of your total account equity per trade setup. Trading with higher risk percentages can lead to rapid drawdowns and emotional distress, preventing you from surviving natural market volatility sequences.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-serif">How do central banks affect Gold prices (XAUUSD)?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Central banks accumulate physical gold bullion to diversify sovereign reserves away from the US Dollar. This massive institutional demand creates strong higher timeframe support zones. Additionally, gold holds an inverse relationship with US Treasury yields and real interest rates.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 font-serif">How do I manage risk when trading Bitcoin?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Managing cryptocurrency risk requires wider stop loss levels and reduced leverage to accommodate higher intraday volatility. You must measure the average true range of the asset over a thirty day cycle and set strict, automated drawdown limits to preserve your core capital.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Financial Integrity Advisory Disclaimer */}
      <section className="bg-slate-50 border border-slate-200 p-8 rounded-lg text-center">
        <span className="text-xs font-bold text-rose-800 uppercase tracking-widest block mb-2 font-mono">
          ▲ STRICT RISK ADVISORY DIRECTIVE
        </span>
        <h2 className="text-base font-bold text-slate-950 mb-2 font-serif">Financial Markets Advisory Disclaimer</h2>
        <p className="text-xs text-slate-650 max-w-[720px] mx-auto leading-relaxed">
          The mathematical tools, leverage equations, position estimations, and macroeconomic research materials provided in the Usman Trades Journal are designed exclusively to serve educational and risk-modelling purposes. Leveraged trading (Forex, CFD Commodities, Cryptocurrencies) carries significant risk and can result in absolute loss of trading capital. Always execute independent verification and seek licensed broker validation before risking real assets in global order books.
        </p>
      </section>
    </div>
    </>
  );
}
