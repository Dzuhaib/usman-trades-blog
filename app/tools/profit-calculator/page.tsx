import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import ProfitCalculator from './ProfitCalculator';

export const metadata: Metadata = {
  title: "Trading Profit & Loss Projection Tool | Reward-to-Risk Estimator",
  description: "Calculate exact transaction outcomes and reward projections across Forex, Gold, and Cryptocurrencies. Visualize your potential gains before you trade.",
};

export default async function ProfitCalculatorPage() {
  const image1 = await getPexelsImage('financial profit growth');
  const image2 = await getPexelsImage('trader workspace');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      {/* Header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/tools" className="text-xs text-muted hover:text-primary no-underline uppercase tracking-wider font-semibold">&larr; Back to Tools</Link>
        </div>
        <h1 className="text-4xl font-black text-primary md:text-5xl mb-4 tracking-tight">Profit & Loss Projection Tool</h1>
        <p className="text-lg text-secondary leading-relaxed">
          Proactively projecting your transaction outcomes is a hallmark of institutional-grade trading. The Profit & Loss Calculator allows you to visualize your potential gains and losses before committing capital, enabling you to align every trade with your broader financial objectives.
        </p>
      </header>

      {/* Main Calculator Component */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <ProfitCalculator />
      </section>

      {/* Educational Content */}
      <section className="prose prose-invert max-w-none space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Projecting Probable Outcomes</h2>
            <p className="text-secondary leading-relaxed">
              Before clicking "buy" or "sell," you must have a clear exit strategy for both profit and loss. This tool helps you project those outcomes by calculating the exact dollar value of your price targets.
            </p>
            <p className="text-secondary leading-relaxed">
              By understanding the potential return on a trade relative to its stop-loss distance, you can filter out "low-probability" setups and focus only on trades that offer a significant mathematical edge. Projections are not promises, but they are essential for rules-based execution.
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
          <h2 className="text-2xl font-bold text-primary">Gross vs. Net Profit Logic</h2>
          <p className="text-secondary leading-relaxed">
            It is vital to distinguish between gross profit and net profit. Gross profit, which this calculator estimates, is the raw difference between your entry and exit price multiplied by your position size. Net profit, however, accounts for external costs such as broker commissions, bid-ask spreads, and overnight swap fees.
          </p>
          <p className="text-secondary leading-relaxed">
            To be truly profitable, your gross gains must consistently exceed these operational costs. Always leave a "buffer" in your projections to account for these real-world trading expenses, ensuring your net bottom line remains positive over hundreds of trades.
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
            <h2 className="text-2xl font-bold text-primary">Realistic Reward-to-Risk Targets</h2>
            <p className="text-secondary leading-relaxed">
              One of the most common mistakes in trading is aiming for unrealistic profit targets. While a 1:10 reward-to-risk ratio looks great on paper, it often has a very low win rate. Most professional traders find their "sweet spot" between 1:1.5 and 1:3.
            </p>
            <p className="text-secondary leading-relaxed">
              Use this calculator to experiment with different price targets and see how they affect your potential bottom line. By setting realistic goals based on market structure and volatility, you ensure that your trading remains sustainable and less stressful over the long term.
            </p>
          </div>
        </div>
      </section>

      {/* Internal SEO links */}
      <footer className="border-t border-border pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-secondary no-underline hover:text-primary font-medium transition-colors">&larr; Back to Tools</Link>
        <Link href="/tools/lot-size-calculator" className="bg-accent/10 text-accent px-4 py-2 rounded-full no-underline hover:bg-accent hover:text-white transition-all font-bold">Open Lot Size Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
