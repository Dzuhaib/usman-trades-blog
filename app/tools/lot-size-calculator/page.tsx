import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import LotSizeCalculator from './LotSizeCalculator';

export const metadata: Metadata = {
  title: "Professional Forex Lot Size Calculator | Accurate Position Sizing",
  description: "Calculate exact standard contracts or units to limit risk according to account balance parameters. Professional-grade position sizing tool for Forex, Gold, and Crypto.",
};

export default async function LotSizeCalculatorPage() {
  const image1 = await getPexelsImage('trading position sizing');
  const image2 = await getPexelsImage('forex charts');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      {/* Header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/tools" className="text-xs text-muted hover:text-primary no-underline uppercase tracking-wider font-semibold">&larr; Back to Tools</Link>
        </div>
        <h1 className="text-4xl font-black text-primary md:text-5xl mb-4 tracking-tight">Professional Forex Lot Size Calculator</h1>
        <p className="text-lg text-secondary leading-relaxed">
          Position sizing is the single most critical skill for a professional trader. Without it, even the best strategy will eventually lead to ruin due to the mathematical certainty of drawdown. This tool helps you calculate the exact number of lots or units to trade based on your specific risk parameters.
        </p>
      </header>

      {/* Main Calculator Component */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <LotSizeCalculator />
      </section>

      {/* Educational Content */}
      <section className="prose prose-invert max-w-none space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">The Importance of Position Sizing</h2>
            <p className="text-secondary leading-relaxed">
              Many novice traders focus solely on entry signals, neglecting the quantitative reality of their exposure. Position sizing ensures that no single trade can significantly damage your account equity. By defining a fixed percentage of risk (typically 1% or less), you align your trading with the Law of Large Numbers.
            </p>
            <p className="text-secondary leading-relaxed">
              This statistical approach allows for "breathing room" during losing streaks, ensuring you stay in the game long enough for your edge to manifest. Without precise sizing, a short string of losses can lead to catastrophic equity depletion, a state from which it is mathematically difficult to recover.
            </p>
          </div>
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src={image1.url} 
              alt={image1.alt} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Breaking Down the Lot Size Formula</h2>
          <p className="text-secondary leading-relaxed">
            The math behind our calculator is straightforward but vital to understand. The core formula that governs every trade execution on this platform is:
          </p>
          <div className="bg-surface border border-border p-6 rounded-lg font-mono text-sm text-accent">
            Position Size = (Account Balance * Risk %) / (Stop Loss in Pips * Pip Value)
          </div>
          <p className="text-secondary leading-relaxed">
            For example, if you have a $10,000 account and want to risk 1% ($100) with a 20-pip stop loss on EUR/USD (where 1 pip = $10 per standard lot), the calculation would be $100 / (20 * $10) = 0.5 Lots. This tool automates these conversions for various instruments, including Gold and Bitcoin, where contract specifications differ significantly from traditional currency pairs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
            <Image 
              src={image2.url} 
              alt={image2.alt} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <h2 className="text-2xl font-bold text-primary">Managing Drawdown with Precision</h2>
            <p className="text-secondary leading-relaxed">
              Drawdown is an inevitable phase of every trading career. The difference between a professional and an amateur is how they manage it. By using a precise lot size calculator, you eliminate the emotional temptation to "revenge trade" or "size up" to recover losses.
            </p>
            <p className="text-secondary leading-relaxed">
              Consistent sizing leads to a smoother equity curve and provides the psychological stability needed to execute your plan without hesitation. Precision in sizing is the bridge between gambling and professional speculation. It allows you to treat trading as a business of probabilities rather than a series of guesses.
            </p>
          </div>
        </div>
      </section>

      {/* Internal SEO links */}
      <footer className="border-t border-border pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-secondary no-underline hover:text-primary font-medium transition-colors">&larr; Back to Tools</Link>
        <Link href="/tools/risk-calculator" className="bg-accent/10 text-accent px-4 py-2 rounded-full no-underline hover:bg-accent hover:text-white transition-all font-bold">Open Risk Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
