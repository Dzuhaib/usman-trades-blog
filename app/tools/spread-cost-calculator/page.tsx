import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import SpreadCostCalculator from './SpreadCostCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Trading Spread Cost Calculator | Calculate Real Trading Costs",
  description: "Calculate the hidden cost of spreads on your trades. Our free tool helps you understand how the bid ask spread affects your entry price and overall profitability.",
  alternates: {
    canonical: '/tools/spread-cost-calculator',
  },
};

export default async function SpreadCostPage() {
  const image1 = await getPexelsImage('financial expense math');
  const image2 = await getPexelsImage('exchange rate board');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Spread Cost Calculator', href: '/tools/spread-cost-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Spread Cost Calculator</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The spread is one of the most overlooked costs in trading. Every time you enter a position, you start slightly in the red because of the difference between the buy and sell price. This tool helps you calculate the real dollar cost of that spread so you can better understand your total trading expenses.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <SpreadCostCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">What is a Trading Spread?</h2>
          <p>
            In the financial markets, there are always two prices for an asset: the bid price (at which you can sell) and the ask price (at which you can buy). The difference between these two numbers is called the spread. This is essentially the fee that brokers and liquidity providers charge for executing your trade.
          </p>
          <p>
            While a spread might only be one or two pips, it can add up to a significant amount of money over time, especially if you trade frequently or use large position sizes. By knowing your spread cost upfront, you can factor it into your reward to risk calculations and ensure that your strategy remains profitable after all expenses.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image1.url} 
              alt="Conceptual representation of financial expenses and spread calculation" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Calculating the Cost of Entry</h2>
          <p>
            The formula for calculating your spread cost is based on the value of a single pip for your specific trade size.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-4 text-base">
            <p className="font-bold text-slate-900">The Spread Formula</p>
            <p className="text-slate-600">
              Spread Cost = Spread in Pips &times; Pip Value &times; Position Size
            </p>
            <p className="text-sm italic">Example: A 2 pip spread on a standard lot ($10/pip) costs exactly $20.</p>
          </div>
          <p>
            This cost is incurred the moment you open a trade. This means the market must move in your direction by at least the amount of the spread before you even reach the break even point. Our calculator automates this math for Forex, Gold, and Bitcoin to give you a clear view of your immediate costs.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Impact on Profitability</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">High Frequency Trading</h3>
              <p className="text-sm text-slate-600">
                If you take multiple trades a day, even small spreads can eat a large portion of your profits. Choosing assets with tight spreads is essential for scalpers.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Volatile Markets</h3>
              <p className="text-sm text-slate-600">
                Spreads often widen during major news events or times of low liquidity. Always check the current spread before entering a trade during these periods.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image2.url} 
              alt="Financial exchange rate board showing bid and ask prices" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Why do some pairs have higher spreads?</h3>
              <p className="text-base">Pairs that are traded less frequently (minor or exotic pairs) usually have higher spreads because there are fewer participants willing to buy and sell at any given time. Major pairs like EUR/USD have the tightest spreads.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Is a commission better than a spread?</h3>
              <p className="text-base">Many professional "ECN" brokers charge a fixed commission instead of a large spread. In these cases, you still have a tiny spread cost plus the commission. Both should be factored into your total expense calculation.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does this tool work for crypto?</h3>
              <p className="text-base">Yes. Bitcoin spreads are usually quoted in whole dollars rather than pips. The calculator adjusts the math to show you the dollar cost of entering a BTC position.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Tool Directory</Link>
        <Link href="/tools/compound-growth-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Growth Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
