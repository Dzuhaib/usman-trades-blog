import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import RiskCalculator from './RiskCalculator';

export const metadata: Metadata = {
  title: "Trading Risk Calculator | Calculate Your Monetary Risk",
  description: "Find out exactly how much money you are risking on your next trade. Our free risk calculator helps you define your technical exit points and see the cash impact before you trade.",
  alternates: {
    canonical: '/tools/risk-calculator',
  },
  keywords: "risk calculator, trading risk tool, money management forex, position risk calculator, stop loss calculator",
};

const image1 = { url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg', alt: 'Professional risk management and financial calculation' };
const image2 = { url: 'https://images.pexels.com/photos/35118208/pexels-photo-35118208.jpeg', alt: 'Stock market candles and technical analysis chart' };

const pageSchema = generateWebPageSchema({
  name: "Trading Risk Calculator",
  description: "Calculate the exact dollar amount you are risking on your next trade. Works for Forex, Gold, and Bitcoin.",
  url: "/tools/risk-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Trading Risk",
  "description": "Learn how to determine your exact dollar risk before entering a trade.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Define Your Entry and Stop Loss",
      "text": "Identify the price level where your trade idea is invalid and set your stop loss there."
    },
    {
      "@type": "HowToStep",
      "name": "Set Your Risk Percentage",
      "text": "Choose what percentage of your account you are willing to risk, typically 1% or 2%."
    },
    {
      "@type": "HowToStep",
      "name": "Review the Calculated Risk",
      "text": "The calculator will display the exact dollar amount you stand to lose if your stop loss is hit."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Should I risk the same amount on every trade?","acceptedAnswer":{"@type":"Answer","text":"Most experts suggest keeping your risk percentage the same for every trade. This creates a smooth equity curve and prevents one single loss from wiping out multiple wins."}},{"@type":"Question","name":"What happens if I don't use a stop loss?","acceptedAnswer":{"@type":"Answer","text":"Trading without a stop loss means your risk is theoretically unlimited. This is the fastest way to lose an entire trading account. Always define your risk before you enter."}},{"@type":"Question","name":"Does this tool work for Gold and Bitcoin?","acceptedAnswer":{"@type":"Answer","text":"Yes. The calculator adjusts for the specific price movements of Gold and Bitcoin, which are different than standard Forex pairs."}}]};

export default async function RiskCalculatorPage() {
  return (
      <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Risk Calculator', href: '/tools/risk-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Risk Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Successful trading is more about managing the risk of being wrong than it is about predicting the future. Professional traders focus on how much they could lose before they think about how much they could make. This tool shows you the cash impact of your stop loss levels instantly.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <RiskCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Technical vs Monetary Risk</h2>
          <p>
            When you plan a trade, you should have two types of exit points in mind. A technical exit is the price where your idea is no longer valid. For example, if you buy because price broke a specific level, your technical exit would be back below that level.
          </p>
          <p>
            Monetary risk is the actual dollar amount you are comfortable losing if that technical level is hit. Professionals find the technical level first and then adjust their trade size to match their monetary limit. This calculator bridge the gap between where the market moves and how your account balance reacts.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How to Use the Risk Calculator</h2>
          <p>
            Calculating your risk before you pull the trigger on a trade is a simple process that saves you from emotional stress later.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-xl">The 3 Step Calculation</h3>
            <ol className="text-base space-y-4 list-decimal pl-5 text-slate-600">
              <li><strong>Find your entry and exit:</strong> Decide where you want to enter the market and where you will admit you are wrong (your stop loss).</li>
              <li><strong>Define your risk percent:</strong> Decide what portion of your account you are willing to lose, such as 1%.</li>
              <li><strong>Calculate the distance:</strong> Measure the distance between your entry and stop loss. The tool will then tell you the monetary risk and recommended size.</li>
            </ol>
          </div>
          <p>
            For instance, if your entry is at 1.1000 and your stop loss is at 1.0950, your distance is 50 pips. If your account is $10,000 and you risk 1%, this tool will confirm that your loss will be exactly $100 if the market reaches your stop.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Why Risk Control Matters</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Emotional Stability</h3>
              <p className="text-sm text-slate-600">
                When you know your exact loss amount before you enter, you remove the fear of the unknown. This helps you stick to your plan even when the market moves against you.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Account Longevity</h3>
              <p className="text-sm text-slate-600">
                Losing streaks are a normal part of trading. By keeping your risk small and controlled, you ensure that you stay in the game long enough for your winning trades to build your account.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Risk Management Strategies for Forex and Gold</h2>
          <p>
            Effective risk management is the single most important skill a trader can develop. While technical analysis and trading strategies are important, they mean nothing if you cannot manage the risk on each trade. The risk calculator is your first line of defense against catastrophic losses.
          </p>
          <p>
            In Forex trading, the high leverage available can make risk management feel optional. A 1:100 leverage means that a 1% move against you wipes out 100% of your margin. This is why professional traders use the risk calculator to ensure they never expose more than a small percentage of their account on any single trade.
          </p>
          <p>
            Gold trading presents a different challenge. While gold typically has lower leverage than Forex pairs, its volatility can be just as dangerous. A sudden $50 move in gold can result in a significant loss if your position size is not properly calculated. The risk calculator accounts for these asset-specific characteristics so you can trade with confidence.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Asset-Specific Risk Considerations</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li><strong>Forex:</strong> High leverage available; risk is measured in pips and account currency</li>
              <li><strong>Gold:</strong> Higher volatility per lot; dollar risk is more significant per point</li>
              <li><strong>Bitcoin:</strong> Extreme volatility; risk percentages should be lower than other assets</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Mathematics of Risk and Reward</h2>
          <p>
            Every trade you enter is a mathematical equation with two variables: the probability of success and the amount you stand to gain or lose. Even with a 50% win rate, you can be profitable if your average win is larger than your average loss. This is the foundation of the risk reward ratio.
          </p>
          <p>
            For example, if you risk $100 to make $200, you only need to be right 34% of the time to break even. If you risk $100 to make $100, you need to be right 50% of the time just to break even. The risk calculator helps you visualize these numbers before you enter, so you can decide whether the trade is worth taking.
          </p>
          <p>
            Many traders make the mistake of focusing only on the win rate. A high win rate means nothing if your losses are larger than your wins. By using the risk calculator consistently, you train yourself to think in terms of risk first and reward second, which is the mindset of a professional trader.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Risk Reward Quick Reference</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>1:1 ratio requires 50% win rate to break even</li>
              <li>1:2 ratio requires 34% win rate to break even</li>
              <li>1:3 ratio requires 25% win rate to break even</li>
              <li>Always aim for at least a 1:2 risk reward ratio</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Should I risk the same amount on every trade?</h3>
              <p className="text-base">Most experts suggest keeping your risk percentage the same for every trade. This creates a smooth equity curve and prevents one single loss from wiping out multiple wins.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">What happens if I don't use a stop loss?</h3>
              <p className="text-base">Trading without a stop loss means your risk is theoretically unlimited. This is the fastest way to lose an entire trading account. Always define your risk before you enter.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does this tool work for Gold and Bitcoin?</h3>
              <p className="text-base">Yes. The calculator adjusts for the specific price movements of Gold and Bitcoin, which are different than standard Forex pairs.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Back to Library</Link>
        <Link href="/tools/pip-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Pip Calculator &rarr;</Link>
      </footer>
    </article>
      </>
  );
}
