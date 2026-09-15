import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import DrawdownCalculator from './DrawdownCalculator';

export const metadata: Metadata = {
  title: "Trading Drawdown Calculator | Understanding Recovery Math",
  description: "See how much your account needs to gain to recover from a loss. Our free drawdown calculator illustrates the mathematical reality of trading losses and the importance of capital preservation.",
  alternates: {
    canonical: '/tools/drawdown-calculator',
  },
  keywords: "drawdown calculator, trading drawdown tool, recovery calculator, account drawdown, loss recovery trading",
};

const image1 = { url: 'https://images.pexels.com/photos/28682356/pexels-photo-28682356.jpeg', alt: 'Mathematical representation of financial recovery and drawdown' };
const image2 = { url: 'https://images.pexels.com/photos/38963051/pexels-photo-38963051.jpeg', alt: 'Downward trend chart showing market volatility' };

const pageSchema = generateWebPageSchema({
  name: "Trading Drawdown Calculator",
  description: "Understand the math behind recovering from trading losses. Calculate exactly how much you need to gain to get back to breakeven after a drawdown.",
  url: "/tools/drawdown-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use the Drawdown Calculator",
  "description": "Learn how to calculate the recovery required after trading losses and why capital preservation matters.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Drawdown Percentage",
      "text": "Input the percentage your account has declined from its peak. This could be the result of a single bad trade or a series of losses."
    },
    {
      "@type": "HowToStep",
      "name": "Review the Recovery Requirement",
      "text": "The calculator will show you the exact percentage gain needed to return to your previous account balance."
    },
    {
      "@type": "HowToStep",
      "name": "Adjust Your Risk Management",
      "text": "Use this information to tighten your risk parameters and prevent future deep drawdowns."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is some drawdown normal?","acceptedAnswer":{"@type":"Answer","text":"Yes. Even the best strategies have periods where they lose money. Professional traders expect drawdowns and build their plans to handle them without emotion."}},{"@type":"Question","name":"When should I stop trading during a drawdown?","acceptedAnswer":{"@type":"Answer","text":"Many traders use a \"circuit breaker\" rule. If they lose a certain percentage of their account in a week or month, they stop trading to review their strategy and clear their head."}},{"@type":"Question","name":"How do I recover from a 50% loss?","acceptedAnswer":{"@type":"Answer","text":"The best way is to slow down. Trying to \"make it all back\" quickly usually leads to more mistakes. Focus on following your process and let the small wins build up over time."}}]};

export default async function DrawdownPage() {
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
        { label: 'Drawdown Calculator', href: '/tools/drawdown-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Drawdown Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
        <p className="text-lg text-slate-600 leading-relaxed">
          The hardest part of trading is not making money. It is keeping the money you have already made. A drawdown is a natural part of the business, but if it gets too deep, the math required to recover becomes extremely difficult. This tool shows you the hidden cost of large losses and why protecting your downside is your most important job.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <DrawdownCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">What is a Drawdown?</h2>
          <p>
            In trading, a drawdown is the peak to trough decline during a specific period for an investment or trading account. It is usually expressed as a percentage between the highest point your account balance reached and the current lower point. While every trader experiences drawdowns, the goal of a professional is to keep them shallow.
          </p>
          <p>
            The reason depth matters is due to the asymmetrical nature of mathematical recovery. If you lose 10% of your account, you need an 11% gain to get back to where you started. However, if you lose 50% of your account, you need a 100% gain just to break even. This tool helps you visualize these requirements so you can better appreciate the value of tight risk management.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Recovery Table</h2>
          <p>
            To understand the impact of losses, look at how the required gain grows as your drawdown deepens.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 text-slate-900 font-bold">Loss Amount</th>
                  <th className="py-3 text-slate-900 font-bold">Gain Needed to Recover</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-100">
                  <td className="py-3">10% Drawdown</td>
                  <td className="py-3">11.1% Gain</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3">20% Drawdown</td>
                  <td className="py-3">25% Gain</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3">30% Drawdown</td>
                  <td className="py-3">42.9% Gain</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3">50% Drawdown</td>
                  <td className="py-3">100% Gain</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-rose-600">90% Drawdown</td>
                  <td className="py-3 font-bold text-rose-600">900% Gain</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This table illustrates why avoiding large losses is more productive than searching for massive winners. A single bad week where you ignore your stop loss rules can take months or even years of perfect trading to fix.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How to Prevent Deep Drawdowns</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Strict Stop Losses</h3>
              <p className="text-sm text-slate-600">
                Never enter a trade without a pre defined exit point. A stop loss is your insurance against a drawdown becoming a disaster.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Risk Percentage</h3>
              <p className="text-sm text-slate-600">
                Limit your risk to 1% per trade. Even a long losing streak will not result in a catastrophic drawdown if your sizing is correct.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Emotional Cost of Drawdowns</h2>
          <p>
            Beyond the mathematics, drawdowns take a significant toll on a trader's emotional wellbeing. After a deep drawdown, it is common to experience fear, doubt, and frustration. These emotions can lead to second-guessing your strategy, moving your stop losses, or abandoning your plan entirely. Understanding that drawdowns are a statistical inevitability rather than a personal failure can help you maintain emotional equilibrium.
          </p>
          <p>
            Many professional traders keep a trading journal specifically to track their drawdowns. By recording the emotional state during each drawdown period, they can identify patterns in their behavior and develop coping strategies. This practice turns a potentially devastating experience into a learning opportunity that strengthens your overall trading psychology.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Emotional Recovery After a Drawdown</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>Accept the loss as part of the trading process</li>
              <li>Review your trades objectively without judgment</li>
              <li>Reduce position sizes temporarily to rebuild confidence</li>
              <li>Stick to your predefined trading plan</li>
              <li>Remember that drawdowns are temporary and recoverable</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Drawdown and Position Sizing</h2>
          <p>
            The relationship between position sizing and drawdown depth is direct and unforgiving. When you risk too much on a single trade, you dramatically increase the potential depth of a drawdown. Professional traders understand that position sizing is not just about maximizing gains but about controlling the maximum possible loss in any given scenario.
          </p>
          <p>
            A practical approach is to use a variable position sizing strategy that adjusts based on your current drawdown level. When you are in a profitable period, you can afford to take slightly larger positions. When you are experiencing a drawdown, you should reduce your position sizes to limit further losses and give your account time to recover. This dynamic approach helps smooth the equity curve and keeps drawdowns shallow.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Position Sizing Rules During Drawdowns</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>Reduce risk per trade by 50% during a drawdown</li>
              <li>Never add to a losing position to average down</li>
              <li>Take a break from trading if your drawdown exceeds your weekly limit</li>
              <li>Increase position size gradually as your account recovers</li>
              <li>Always calculate position size before entering a trade</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Is some drawdown normal?</h3>
              <p className="text-base">Yes. Even the best strategies have periods where they lose money. Professional traders expect drawdowns and build their plans to handle them without emotion.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">When should I stop trading during a drawdown?</h3>
              <p className="text-base">Many traders use a "circuit breaker" rule. If they lose a certain percentage of their account in a week or month, they stop trading to review their strategy and clear their head.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">How do I recover from a 50% loss?</h3>
              <p className="text-base">The best way is to slow down. Trying to "make it all back" quickly usually leads to more mistakes. Focus on following your process and let the small wins build up over time.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Utility Suite</Link>
        <Link href="/tools/margin-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Margin Calculator &rarr;</Link>
      </footer>
    </article>
      </>
  );
}
