import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import RiskCalculator from './RiskCalculator';

export const metadata: Metadata = {
  title: "Trading Risk Calculator | Stop Loss & Invalidation Logic",
  description: "Verify absolute dollar-at-risk, pip spans, and position limits directly based on technical entries and stop price levels. Professional risk management for serious traders.",
};

export default async function RiskCalculatorPage() {
  const image1 = await getPexelsImage('risk management finance');
  const image2 = await getPexelsImage('stock market volatility');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      {/* Header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/tools" className="text-xs text-muted hover:text-primary no-underline uppercase tracking-wider font-semibold">&larr; Back to Tools</Link>
        </div>
        <h1 className="text-4xl font-black text-primary md:text-5xl mb-4 tracking-tight">Trading Risk & Invalidation Calculator</h1>
        <p className="text-lg text-secondary leading-relaxed">
          Successful trading is not about predicting the future; it is about managing the mathematical risk of being wrong. The Risk & Invalidation Calculator allows you to define your technical exit points and immediately see the monetary impact, ensuring your capital is protected by logic rather than emotion.
        </p>
      </header>

      {/* Main Calculator Component */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <RiskCalculator />
      </section>

      {/* Educational Content */}
      <section className="prose prose-invert max-w-none space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Technical vs. Monetary Invalidation</h2>
            <p className="text-secondary leading-relaxed">
              There are two types of stops: technical and monetary. A technical invalidation point is a price level where your trade thesis is proven wrong—perhaps a break of a structural low or a violation of a trendline. Monetary invalidation is the maximum dollar amount you are willing to lose.
            </p>
            <p className="text-secondary leading-relaxed">
              Professional traders always prioritize technical invalidation first. They find the level where the market "speaks" and then use this calculator to adjust their position size to match their monetary risk tolerance. This ensures your stop is placed based on market structure, not just a random number.
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
          <h2 className="text-2xl font-bold text-primary">The Psychology of Risk-at-Entry</h2>
          <p className="text-secondary leading-relaxed">
            The moment you enter a trade, your cognitive biases begin to work against you. "Loss aversion" can make it difficult to close a losing position, often leading to "hope-based" trading. By calculating your exact risk-at-entry, you create a psychological "pre-commitment" to your plan.
          </p>
          <p className="text-secondary leading-relaxed">
            Knowing that a stop-loss hit will only cost you a predetermined 1% of your account provides the mental clarity needed to let the trade play out. You are no longer gambling on an outcome; you are executing a statistically sound business operation with a known cost of doing business.
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
            <h2 className="text-2xl font-bold text-primary">Volatility-Adjusted Stop Placement</h2>
            <p className="text-secondary leading-relaxed">
              Static stop losses (e.g., always using a 20-pip stop) are often ineffective because they do not account for changing market volatility. During high-impact news events or volatile sessions, a narrow stop might be triggered by simple market "noise" rather than a true change in trend.
            </p>
            <p className="text-secondary leading-relaxed">
              A better approach is to use technical levels or Average True Range (ATR) to determine your stop distance. This calculator then takes that volatility-adjusted distance and tells you exactly how much capital to allocate, ensuring your risk remains constant even as market conditions shift from quiet to explosive.
            </p>
          </div>
        </div>
      </section>

      {/* Internal SEO links */}
      <footer className="border-t border-border pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-secondary no-underline hover:text-primary font-medium transition-colors">&larr; Back to Tools</Link>
        <Link href="/tools/pip-calculator" className="bg-accent/10 text-accent px-4 py-2 rounded-full no-underline hover:bg-accent hover:text-white transition-all font-bold">Open Pip Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
