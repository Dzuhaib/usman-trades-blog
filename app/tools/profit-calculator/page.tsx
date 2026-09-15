import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProfitCalculator from './ProfitCalculator';

export const metadata: Metadata = {
  title: "Trading Profit Calculator | Estimate Your Trade Outcomes",
  description: "Calculate your potential profit or loss before you enter a trade. Our free tool works for Forex, Gold, and Bitcoin to help you visualize your reward to risk ratio.",
  alternates: {
    canonical: '/tools/profit-calculator',
  },
  keywords: "trading profit calculator, profit calculator, forex profit tool, trading returns calculator, reward risk calculator",
};

const image1 = { url: 'https://images.pexels.com/photos/39368611/pexels-photo-39368611.jpeg', alt: 'Financial growth and successful trading outcomes' };
const image2 = { url: 'https://images.pexels.com/photos/5831264/pexels-photo-5831264.jpeg', alt: 'Professional trading desk with multiple monitors' };

const pageSchema = generateWebPageSchema({
  name: "Trading Profit Calculator",
  description: "Calculate your potential profit or loss before entering a trade. Works for Forex, Gold, and Bitcoin to help you visualize your reward to risk ratio.",
  url: "/tools/profit-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Trading Profit",
  "description": "Learn how to estimate your potential profit or loss before entering a trade.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Trade Details",
      "text": "Input your entry price, exit price, and position size for the asset you are trading."
    },
    {
      "@type": "HowToStep",
      "name": "Review Your Projected Outcome",
      "text": "The calculator will display your potential profit or loss based on the price movement and contract specifications."
    },
    {
      "@type": "HowToStep",
      "name": "Evaluate Your Risk Reward Ratio",
      "text": "Compare your potential reward to your risk to determine if the trade meets your strategy criteria."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does this calculator include broker fees?","acceptedAnswer":{"@type":"Answer","text":"No. This tool calculates gross profit based on price movement. To find your net profit, you must subtract any spreads, commissions, or swap fees charged by your broker."}},{"@type":"Question","name":"Why does my profit change when I trade different pairs?","acceptedAnswer":{"@type":"Answer","text":"Profit depends on the value of a pip, which can vary across different currency pairs. This tool accounts for those differences to give you an accurate dollar amount."}},{"@type":"Question","name":"What is a good reward to risk ratio?","acceptedAnswer":{"@type":"Answer","text":"Many professionals aim for at least a 2 to 1 ratio, meaning they stand to gain twice as much as they are willing to lose. This allows you to remain profitable even if you lose half of your trades."}}]};

export default async function ProfitCalculatorPage() {
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
        { label: 'Profit Calculator', href: '/tools/profit-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Profit Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Knowing exactly how much you stand to gain or lose is the first step toward becoming a disciplined trader. Before you click buy or sell, you should have a clear target in mind. This calculator helps you see the monetary value of your trade ideas so you can make objective decisions based on math.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <ProfitCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Visualizing Your Reward</h2>
          <p>
            Trading is not just about being right. It is about how much you make when you are right versus how much you lose when you are wrong. By projecting your profit before you enter, you can decide if a trade is actually worth the risk.
          </p>
          <p>
            If a trade only offers a tiny profit but requires a large stop loss, it might not be worth taking even if you think the price will move in your direction. Professional traders look for setups where the potential reward is significantly higher than the potential loss. Our tool allows you to experiment with different exit points to find the best balance for your strategy.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How Profit is Calculated</h2>
          <p>
            Calculating profit depends on three main factors: the size of your trade, the distance the price moves, and the type of asset you are trading.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-4">
            <p className="font-bold text-slate-900">The Core Profit Logic</p>
            <p className="text-base text-slate-600">
              Profit = (Exit Price - Entry Price) &times; Position Size &times; Contract Multiplier
            </p>
            <p className="text-sm italic">Note: For sell trades, the calculation is (Entry Price - Exit Price).</p>
          </div>
          <p>
            For Forex, the contract multiplier for a standard lot is 100,000 units. For Gold, it is 100 ounces per lot. Bitcoin is simpler because it is usually calculated on a one-to-one basis. This tool handles all these details automatically so you can focus on your analysis.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Realistic Profit Targets</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Avoid Greed</h3>
              <p className="text-sm text-slate-600">
                It is tempting to look for trades that will double your account in a day, but these are rare and high risk. Focus on consistent, smaller wins that build up over time.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Market Structure</h3>
              <p className="text-sm text-slate-600">
                Place your profit targets at logical levels where the price has reacted before, rather than at random numbers. Use the calculator to see if those logical levels offer a good return.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Profit Calculation for Different Assets</h2>
          <p>
            Each asset class has its own conventions for calculating profit, and understanding these differences is essential for accurate trade planning. In Forex, profit is calculated based on the number of pips the price moves multiplied by the pip value per lot. For Gold, the calculation uses the dollar difference between entry and exit prices multiplied by the number of ounces in your position. For Bitcoin, it is simply the dollar difference multiplied by the number of BTC units.
          </p>
          <p>
            Our profit calculator automatically handles these asset-specific calculations so you do not need to manually adjust formulas. You simply enter your trade parameters, and the tool displays the exact profit or loss in dollars. This automation eliminates calculation errors and saves you time when evaluating multiple trade setups across different markets.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Profit Calculation Summary by Asset</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li><strong>Forex:</strong> Profit = Pips moved × Pip value × Number of lots</li>
              <li><strong>Gold:</strong> Profit = Price difference × Position size in ounces</li>
              <li><strong>Bitcoin:</strong> Profit = Price difference × Number of BTC units</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">When to Use a Profit Calculator</h2>
          <p>
            A profit calculator should be used before every trade, not after. By projecting your potential outcome before entering, you can decide whether the trade meets your risk reward criteria and is worth taking. Many traders skip this step and rely on gut feeling, which is one of the most common reasons they fail to maintain consistent profitability.
          </p>
          <p>
            The calculator is also useful for evaluating existing trades. If your original plan called for a specific profit target and the price has reached that level, you can use the calculator to confirm the exact dollar amount you stand to gain. This helps you decide whether to take profit at the planned level or adjust your target based on current market conditions.
          </p>
          <p>
            For traders who manage multiple positions simultaneously, the profit calculator becomes even more valuable. By calculating the potential profit for each trade individually, you can assess your overall portfolio exposure and ensure that no single trade or asset class represents too large a portion of your risk budget.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does this calculator include broker fees?</h3>
              <p className="text-base">No. This tool calculates gross profit based on price movement. To find your net profit, you must subtract any spreads, commissions, or swap fees charged by your broker.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Why does my profit change when I trade different pairs?</h3>
              <p className="text-base">Profit depends on the value of a pip, which can vary across different currency pairs. This tool accounts for those differences to give you an accurate dollar amount.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">What is a good reward to risk ratio?</h3>
              <p className="text-base">Many professionals aim for at least a 2 to 1 ratio, meaning they stand to gain twice as much as they are willing to lose. This allows you to remain profitable even if you lose half of your trades.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Explore All Tools</Link>
        <Link href="/tools/lot-size-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Lot Size Calculator &rarr;</Link>
      </footer>
    </article>
      </>
  );
}
