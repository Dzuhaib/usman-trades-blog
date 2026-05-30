import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import MarginCalculator from './MarginCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Trading Margin Calculator | Calculate Leverage Requirements",
  description: "Find out exactly how much margin you need to open a trade. Our free calculator helps you understand leverage, contract sizes, and market exposure for Forex, Gold, and Bitcoin.",
  alternates: {
    canonical: '/tools/margin-calculator',
  },
};

export default async function MarginPage() {
  const image1 = await getPexelsImage('financial leverage concept');
  const image2 = await getPexelsImage('banking vault safety');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Margin Calculator', href: '/tools/margin-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Margin Calculator</h1>
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
            <Image 
              src={image1.url} 
              alt="Conceptual representation of financial leverage and market exposure" 
              fill 
              className="object-cover"
            />
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
            <Image 
              src={image2.url} 
              alt="Safe vault representing financial security and collateral" 
              fill 
              className="object-cover"
            />
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
        <Link href="/tools/spread-cost-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Spread Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
