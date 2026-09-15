import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import MarginCalculator from './MarginCalculator';

export const metadata: Metadata = {
  title: "Trading Margin Calculator | Calculate Leverage Requirements",
  description: "Find out exactly how much margin you need to open a trade. Our free calculator helps you understand leverage, contract sizes, and market exposure for Forex, Gold, and Bitcoin.",
  alternates: {
    canonical: '/tools/margin-calculator',
  },
  keywords: "margin calculator, leverage calculator, forex margin tool, trading margin requirements, margin trading calculator",
};

const image1 = { url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg', alt: 'Conceptual representation of financial leverage and market exposure' };
const image2 = { url: 'https://images.pexels.com/photos/14866072/pexels-photo-14866072.jpeg', alt: 'Safe vault representing financial security and collateral' };

const pageSchema = generateWebPageSchema({
  name: "Trading Margin Calculator",
  description: "Calculate exactly how much margin you need to open a leveraged position. Supports Forex, Gold, and Bitcoin with real-time contract specifications.",
  url: "/tools/margin-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Required Margin",
  "description": "Learn how to calculate the margin required for your trades across Forex, Gold, and Bitcoin.",
  "totalTime": "PT3M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Your Asset",
      "text": "Choose whether you are trading Forex, Gold, or Bitcoin. Each asset has different contract specifications and margin requirements."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Position Size",
      "text": "Input the size of your trade in lots, ounces, or units depending on the asset type."
    },
    {
      "@type": "HowToStep",
      "name": "Review Your Margin Requirement",
      "text": "The calculator will display the exact margin needed based on leverage and contract specifications."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between margin and equity?","acceptedAnswer":{"@type":"Answer","text":"Margin is the amount locked by the broker, while equity is your total balance including your current open profits or losses. Free margin is what you have left to open new trades."}},{"@type":"Question","name":"Does leverage increase the cost of a trade?","acceptedAnswer":{"@type":"Answer","text":"No. Leverage only changes the amount of margin you need to provide. Costs like spreads and commissions are usually based on the position size, regardless of your leverage."}},{"@type":"Question","name":"Why is gold margin higher than forex?","acceptedAnswer":{"@type":"Answer","text":"Many brokers require more margin for volatile assets like Gold or Bitcoin to protect themselves from sudden market gaps. This tool helps you see those requirements before you enter."}}]};

export default async function MarginPage() {
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
        { label: 'Margin Calculator', href: '/tools/margin-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Margin Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Leverage is a double edged sword that allows you to control large positions with a small amount of capital. To use it safely, you must understand exactly how much margin your broker requires for each trade. This tool calculates your required deposit and total market exposure instantly so you can stay in control of your account.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <MarginCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">What is Margin in Trading?</h2>
          <p>
            Margin is essentially a security deposit that you provide to your broker to keep a leveraged position open. It is not a fee or a transaction cost. Instead, it is a portion of your account balance that is "locked" while your trade is active. Once you close the trade, the margin is released back to your usable balance.
          </p>
          <p>
            The amount of margin you need depends on the leverage offered by your broker. For example, if you have 1 to 100 leverage, you only need to provide 1% of the total position value as margin. While this allows for higher potential returns, it also increases the risk of a "margin call" if the market moves against you and your usable capital runs low.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Why Margin Matters for Gold and Bitcoin</h2>
          <p>
            Gold and Bitcoin have different margin requirements compared to traditional Forex pairs because their price movements are significantly larger in dollar terms. A single standard lot of Gold (100 ounces) can swing hundreds of dollars with a small price movement, which means brokers require more margin to protect against the increased risk. Understanding these differences is essential for managing your account across multiple asset classes.
          </p>
          <p>
            Bitcoin trading adds another layer of complexity because of its extreme volatility. A 5% move in Bitcoin can happen within minutes, which means the margin required to maintain a position can change rapidly. Brokers often adjust margin requirements during periods of extreme volatility, and traders need to be aware of these adjustments to avoid unexpected margin calls.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Margin Requirements by Asset</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li><strong>Forex (Major Pairs):</strong> Typically 1% to 3.33% margin required at 1:100 to 1:30 leverage</li>
              <li><strong>Gold (XAU/USD):</strong> Usually 2% to 5% margin required due to higher volatility per lot</li>
              <li><strong>Bitcoin (BTC/USD):</strong> Often 5% to 10% margin required because of extreme price swings</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How to Calculate Required Margin</h2>
          <p>
            The formula for calculating margin is based on the total value of the contract you are trading.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-4 text-base">
            <p className="font-bold text-slate-900">The Margin Formula</p>
            <p className="text-slate-600">
              Required Margin = Total Position Value / Leverage Ratio
            </p>
            <p className="text-sm italic">Example: A $100,000 position with 1:100 leverage requires $1,000 in margin.</p>
          </div>
          <p>
            Position value varies depending on the asset. For Forex, it is the size of the base currency units. For Gold, it is the current price multiplied by the number of ounces. For Bitcoin, it is the current price multiplied by the number of units. This calculator handles these details to give you a precise number for any setup.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Margin Management Strategies</h2>
          <p>
            Effective margin management goes beyond simply calculating the required margin for a single trade. It involves understanding how your total account margin is distributed across all open positions and ensuring you have enough free margin to withstand adverse market moves without triggering a margin call. Professional traders typically use a margin allocation strategy that reserves at least 50% of their account equity as free margin at all times.
          </p>
          <p>
            One effective approach is the percentage-based margin rule, where you never allow your used margin to exceed a certain percentage of your total account equity. For example, if you set a 30% margin cap and have a $10,000 account, your total used margin across all positions should never exceed $3,000. This ensures that even if multiple trades move against you simultaneously, you have enough buffer to avoid a margin call.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Margin Management Tips</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>Never use more than 30% of your account equity as used margin</li>
              <li>Always calculate margin before opening a position, not after</li>
              <li>Monitor your free margin in real time during volatile periods</li>
              <li>Reduce position sizes before major news events to preserve free margin</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Risks of High Leverage</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Overexposure</h3>
              <p className="text-sm text-slate-600">
                Low margin requirements can tempt traders into opening positions that are too large for their account. Always focus on your risk percentage, not just the margin required.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Margin Calls</h3>
              <p className="text-sm text-slate-600">
                If your account equity drops below a certain level, the broker may close your trades automatically. Keeping a healthy "free margin" buffer is essential for safety.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Common Margin Mistakes to Avoid</h2>
          <div className="space-y-6">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Ignoring Free Margin</h3>
              <p className="text-sm text-slate-600">
                Many traders focus solely on the margin required for their open positions and forget to track their free margin. When free margin drops to zero, a margin call is triggered. Always monitor both used margin and free margin to understand your true account health.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Using Maximum Leverage</h3>
              <p className="text-sm text-slate-600">
                Just because your broker offers 1:500 leverage does not mean you should use it. Maximum leverage means maximum risk. A single adverse move can wipe out your entire account when using maximum leverage. Professional traders use conservative leverage of 1:10 or less to protect their capital.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Not Adjusting for Volatility</h3>
              <p className="text-sm text-slate-600">
                Margin requirements can increase during periods of high volatility, such as major news releases or market openings. If you are not aware of these adjustments, you may find yourself with insufficient margin even though your positions have not moved against you.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">What is the difference between margin and equity?</h3>
              <p className="text-base">Margin is the amount locked by the broker, while equity is your total balance including your current open profits or losses. Free margin is what you have left to open new trades.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does leverage increase the cost of a trade?</h3>
              <p className="text-base">No. Leverage only changes the amount of margin you need to provide. Costs like spreads and commissions are usually based on the position size, regardless of your leverage.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Why is gold margin higher than forex?</h3>
              <p className="text-base">Many brokers require more margin for volatile assets like Gold or Bitcoin to protect themselves from sudden market gaps. This tool helps you see those requirements before you enter.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Utility Library</Link>
        <Link href="/tools/drawdown-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Drawdown Calculator &rarr;</Link>
      </footer>
    </article>
      </>
  );
}
