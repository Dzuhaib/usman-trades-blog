import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import SmartText from '@/components/SmartText';

export const metadata: Metadata = {
  title: "Lot Size Calculator | How to Calculate Position Size Safely",
  description: "Learn how to calculate your correct trade size for Forex, Gold, and Bitcoin. Our free tool helps you manage risk by defining exactly how many lots to trade based on your account balance.",
  alternates: {
    canonical: '/tools/lot-size-calculator',
  },
};

import Breadcrumbs from '@/components/Breadcrumbs';
import LotSizeCalculator from './LotSizeCalculator';

export default async function LotSizeCalculatorPage() {
  const image1 = await getPexelsImage('trading planning');
  const image2 = await getPexelsImage('financial calculation');

  const pageSchema = generateWebPageSchema({
    name: "Lot Size Calculator",
    description: "Free trading tool to calculate the exact trade size based on your account balance and stop loss pips.",
    url: "/tools/lot-size-calculator",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <article className="max-w-[800px] mx-auto space-y-12 py-8">
        <Breadcrumbs items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Lot Size Calculator', href: '/tools/lot-size-calculator' }
        ]} />

        <header className="border-b border-slate-100 pb-8 space-y-4">
          <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Lot Size Calculator</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            <SmartText text="The most important part of trading isn't finding the perfect entry. It is making sure you don't risk too much of your money on a single trade. Our lot size tool tells you exactly how many units to buy or sell so you stay within your risk limits." />
          </p>
        </header>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <LotSizeCalculator />
        </section>

        <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Why Position Sizing Matters</h2>
            <p>
              <SmartText text="Many new traders make the mistake of using the same lot size for every trade. This is dangerous because every trade has a different stop loss distance. If you use the same size on a trade with a wide stop loss as you do on one with a tight stop loss, you are actually risking much more money on the first trade." />
            </p>
            <p>
              <SmartText text="By using a calculator, you ensure that your risk stays consistent. If you decide to risk 1% of your account, you will lose exactly 1% whether your stop loss is 10 pips or 100 pips away. This consistency is what allows professional traders to survive losing streaks and stay in the game long enough to see their strategy work." />
            </p>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
              <Image 
                src={image1.url} 
                alt="Trading planning and risk management illustration" 
                fill 
                className="object-cover"
              />
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">The Simple Lot Size Formula</h2>
            <p>
              <SmartText text="You can calculate your trade size manually using a simple mathematical approach. Understanding the logic behind the numbers helps you become a more confident trader." />
            </p>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-4">
              <p className="font-bold text-slate-900 text-center text-xl">
                Lot Size = Risk Amount / (Stop Loss &times; Pip Value)
              </p>
              <ul className="text-base space-y-2 list-none p-0">
                <li className="flex gap-2"><strong>Risk Amount:</strong> The cash value you are willing to lose (Balance &times; Risk %).</li>
                <li className="flex gap-2"><strong>Stop Loss:</strong> The distance in pips between your entry and exit.</li>
                <li className="flex gap-2"><strong>Pip Value:</strong> The dollar value of a single pip for one standard lot.</li>
              </ul>
            </div>
            <p>
              <SmartText text="For a standard Forex pair like EUR/USD, the pip value is usually $10 for a full lot. If you want to risk $100 with a 20 pip stop loss, the math would be $100 divided by 200, which equals 0.50 lots. Our tool handles all these conversions for you instantly." />
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Real World Examples</h2>
            <div className="grid gap-6">
              <div className="p-6 border border-slate-100 rounded-xl bg-white">
                <h3 className="font-bold text-slate-900 mb-2">Forex Example (EUR/USD)</h3>
                <p className="text-base text-slate-600">
                  <SmartText text="You have $5,000 and risk 1% ($50). Your stop loss is 25 pips. The calculator will recommend 0.20 lots. If you hit your stop loss, you lose exactly $50." />
                </p>
              </div>
              <div className="p-6 border border-slate-100 rounded-xl bg-white">
                <h3 className="font-bold text-slate-900 mb-2">Gold Example (XAU/USD)</h3>
                <p className="text-base text-slate-600">
                  <SmartText text="Gold moves in larger dollar amounts. If you have $10,000 and risk 1% ($100) with a $5 move stop loss, the calculator ensures your position size respects that $100 limit." />
                </p>
              </div>
              <div className="p-6 border border-slate-100 rounded-xl bg-white">
                <h3 className="font-bold text-slate-900 mb-2">Bitcoin Example (BTC/USD)</h3>
                <p className="text-base text-slate-600">
                  <SmartText text="Since Bitcoin is priced in whole dollars, the calculation is even simpler. If Bitcoin is at $60,000 and your stop loss is at $59,000, your risk distance is $1,000. The tool tells you exactly how many BTC units to buy." />
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Common Questions about Lot Sizes</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">What is a standard lot in Forex?</h3>
                <p className="text-base"><SmartText text="A standard lot represents 100,000 units of the base currency. For most pairs, this means every pip of movement is worth about $10." /></p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">How much should I risk per trade?</h3>
                <p className="text-base"><SmartText text="Most experienced traders recommend risking no more than 1% or 2% of your account balance. This allows you to handle several losses in a row without damaging your capital too much." /></p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Does this tool work for micro lots?</h3>
                <p className="text-base"><SmartText text="Yes. The calculator provides the exact decimal value. For example, 0.01 is one micro lot, and 0.10 is one mini lot. You can use these values with any broker." /></p>
              </div>
            </div>
          </section>
        </div>

        <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
          <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Explore All Tools</Link>
          <Link href="/tools/risk-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Risk Calculator &rarr;</Link>
        </footer>
      </article>
    </>
  );
}
