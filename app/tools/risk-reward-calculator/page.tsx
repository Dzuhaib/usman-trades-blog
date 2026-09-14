import Link from 'next/link';
import { Metadata } from 'next';
import RiskRewardCalculator from './RiskRewardCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Risk Reward Ratio Calculator | Free Trading Tool for Forex, Gold and Bitcoin",
  description: "Calculate your risk to reward ratio before entering a trade. Our free risk reward calculator helps you visualize potential profit versus potential loss. Learn the risk reward ratio formula and strategy.",
  keywords: ["risk reward ratio calculator", "risk reward ratio trading", "risk reward ratio formula", "risk reward calculator forex", "trading risk management"],
  alternates: {
    canonical: '/tools/risk-reward-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best risk reward ratio for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many educators suggest starting with a 1 to 2 ratio. This provides a safety net while you learn market mechanics and build your discipline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a risk reward ratio be too high?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. While a 1 to 10 ratio looks amazing, it is very difficult to achieve because the market is more likely to hit your stop loss before reaching such a distant target.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool work for short selling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. The calculator detects if your take profit is below your entry and adjusts the math for a sell trade automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the risk reward ratio formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Risk Reward Ratio = (Take Profit Price minus Entry Price) divided by (Entry Price minus Stop Loss Price). A 1 to 2 ratio means you risk $1 to make $2.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Risk Reward Ratio',
  description: 'Step by step guide to calculating your risk reward ratio for any trade setup.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Define Risk',
      text: 'Subtract your stop loss price from your entry price to find your risk distance.',
    },
    {
      '@type': 'HowToStep',
      name: 'Define Reward',
      text: 'Subtract your entry price from your take profit price to find your reward distance.',
    },
    {
      '@type': 'HowToStep',
      name: 'Compare',
      text: 'Divide the reward distance by the risk distance to find your ratio.',
    },
  ],
};

export default async function RiskRewardPage() {
  const image1 = { url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg', alt: 'Strategic planning and business decision making' };
  const image2 = { url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg', alt: 'Balance scale representing financial risk and reward' };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <article className="max-w-[800px] mx-auto space-y-12 py-8">
        <Breadcrumbs items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Risk Reward Calculator', href: '/tools/risk-reward-calculator' }
        ]} />

        <header className="border-b border-slate-100 pb-8 space-y-4">
          <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Risk Reward Ratio Calculator</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            The secret to long term success in the markets is not winning every trade. It is making sure that your winning trades are larger than your losing trades. This tool calculates your risk reward ratio instantly so you can decide if a trade setup is worth your time and capital.
          </p>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <RiskRewardCalculator />
        </section>

        <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">What is a Risk Reward Ratio?</h2>
            <p>
              A risk reward ratio compares the amount of money you are willing to lose on a trade to the amount of money you expect to make. For example, if you risk $100 to make $200, your ratio is 1 to 2. This simple number is one of the most powerful metrics in a trader&apos;s arsenal.
            </p>
            <p>
              Having a positive ratio means you can be wrong more than half of the time and still build your account balance. Many professional traders prioritize setups that offer a high reward relative to the risk. This allows them to handle losing streaks without feeling emotional stress or damaging their long term growth. For a deeper understanding, read our complete guide on <Link href="/blog/posts/risk-reward-ratio" className="text-accent underline">Risk Reward Ratio in Trading</Link>.
            </p>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
              <img src={image1.url} alt="Strategic planning and business decision making" className="w-full h-full object-cover" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">How to Calculate the Ratio</h2>
            <p>
              Calculating the ratio manually involves finding the distance between your entry price and your exit points.
            </p>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-6 text-base">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Step 1: Define Risk</h3>
                <p className="text-slate-600">Subtract your stop loss price from your entry price. This is your risk distance.</p>
              </div>
              <div className="space-y-2 border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900">Step 2: Define Reward</h3>
                <p className="text-slate-600">Subtract your entry price from your take profit price. This is your reward distance.</p>
              </div>
              <div className="space-y-2 border-t border-slate-200 pt-4">
                <h3 className="font-bold text-slate-900">Step 3: Compare</h3>
                <p className="text-slate-600">Divide the reward distance by the risk distance to find your ratio.</p>
              </div>
            </div>
            <p>
              Our tool automates this process for Forex, Gold, and Bitcoin. It also shows you the exact dollar amounts based on your position size, giving you a complete view of your trade setup before you enter the market. Use the <Link href="/tools/risk-reward-calculator" className="text-accent underline">risk reward ratio calculator</Link> to evaluate every trade setup instantly.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">The Power of Positive Expectancy</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
                <h3 className="font-bold text-slate-900">The 1 to 2 Advantage</h3>
                <p className="text-sm text-slate-600">
                  If you use a 1 to 2 ratio, you only need to win 34% of your trades to break even. This takes the pressure off finding a perfect entry every time.
                </p>
              </div>
              <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
                <h3 className="font-bold text-slate-900">Filtering Trades</h3>
                <p className="text-sm text-slate-600">
                  Use the calculator to skip trades that offer poor returns. If a setup only offers a 1 to 1 ratio, it might be better to wait for a higher quality opportunity.
                </p>
              </div>
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
              <img src={image2.url} alt="Balance scale representing financial risk and reward" className="w-full h-full object-cover" />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">What is the best risk reward ratio for beginners?</h3>
                <p className="text-base">Many educators suggest starting with a 1 to 2 ratio. This provides a safety net while you learn market mechanics and build your discipline.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Can a ratio be too high?</h3>
                <p className="text-base">Yes. While a 1 to 10 ratio looks amazing, it is very difficult to achieve because the market is more likely to hit your stop loss before reaching such a distant target.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Does this tool work for short selling?</h3>
                <p className="text-base">Absolutely. The calculator detects if your take profit is below your entry and adjusts the math for a sell trade automatically.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">What is the risk reward ratio formula?</h3>
                <p className="text-base">Risk Reward Ratio = (Take Profit Price minus Entry Price) divided by (Entry Price minus Stop Loss Price). A 1 to 2 ratio means you risk $1 to make $2.</p>
              </div>
            </div>
          </section>
        </div>

        <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
          <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">All Utility Tools</Link>
          <Link href="/blog/posts/risk-reward-ratio" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Read Risk Reward Guide &rarr;</Link>
        </footer>
      </article>
    </>
  );
}
