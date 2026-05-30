import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import PipValueCalculator from './PipValueCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Pip Value Calculator | Calculate Point Value for Forex and Gold",
  description: "Understand the dollar value of every pip movement in your trades. Our free pip calculator works for all major currency pairs, Gold, and Bitcoin across different lot sizes.",
  alternates: {
    canonical: '/tools/pip-calculator',
  },
};

export default async function PipValueCalculatorPage() {
  const image1 = await getPexelsImage('currency mathematics');
  const image2 = await getPexelsImage('gold market bars');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Pip Value Calculator', href: '/tools/pip-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Pip Value Calculator</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The speed at which your account balance changes depends entirely on the value of a single pip. Whether you trade Forex, Gold, or Bitcoin, knowing your pip value is essential for accurate trade planning. This tool calculates the exact dollar value of market movements for any position size.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <PipValueCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">What is Pip Value?</h2>
          <p>
            A pip is the smallest price move that an exchange rate can make. For most currency pairs, a pip is the fourth decimal place, such as 0.0001. Because professional trading involves large amounts of money, even these tiny price changes have a real impact on your profit or loss.
          </p>
          <p>
            The value of a pip tells you how much money you gain or lose for every point the market moves. This value changes based on the size of your trade. A larger position means every pip is worth more money. By understanding this relationship, you can better manage the volatility of the markets.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image1.url} 
              alt="Financial mathematics and currency exchange concepts" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How Pip Calculation Works</h2>
          <p>
            For many popular trades, the math is consistent. However, for some assets, the calculation requires an extra step to convert the value into your account currency.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Standard Forex Pairs</h3>
              <p className="text-base text-slate-600">On a standard lot of 100,000 units for pairs like EUR/USD, every pip is worth exactly $10. If you trade a micro lot of 1,000 units, that same pip is worth $0.10.</p>
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">JPY and Cross Pairs</h3>
              <p className="text-base text-slate-600">For pairs where the US Dollar is not the second currency, the pip value fluctuates with the current exchange rate. Our tool handles this conversion automatically to give you a precise dollar amount.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Gold and Bitcoin Pips</h2>
          <p>
            Precious metals and cryptocurrencies use slightly different definitions for movement, but the logic remains the same.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Gold (XAU/USD)</h3>
              <p className="text-sm text-slate-600">
                In gold trading, a pip is typically defined as a $0.10 change in the price of an ounce. For a standard lot of 100 ounces, this results in a $10 move per pip.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Bitcoin (BTC/USD)</h3>
              <p className="text-sm text-slate-600">
                Bitcoin is usually calculated based on whole dollar moves. Every $1 change in the price of one Bitcoin equals $1 of gain or loss for the trader.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image2.url} 
              alt="Gold market bars and financial asset valuation" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does pip value stay the same forever?</h3>
              <p className="text-base">For pairs like EUR/USD, the value is fixed if your account is in USD. For JPY or GBP pairs, the value changes slightly as the exchange rate moves.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Why should I care about pip value?</h3>
              <p className="text-base">If you don&apos;t know your pip value, you cannot calculate your risk accurately. Knowing this number is the only way to ensure your stop loss respects your risk limits.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">What is the difference between a pip and a point?</h3>
              <p className="text-base">A pip is usually the fourth decimal place, while a point is the fifth decimal place (also called a pipette). There are 10 points in every 1 pip.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Explore All Tools</Link>
        <Link href="/tools/profit-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Profit Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
