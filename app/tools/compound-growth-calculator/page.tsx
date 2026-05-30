import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import CompoundGrowthCalculator from './CompoundGrowthCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Trading Compound Growth Calculator | Project Your Account Growth",
  description: "Visualize how your trading account can grow over time through the power of compounding. Our free calculator helps you project long term results based on consistent monthly gains.",
  alternates: {
    canonical: '/tools/compound-growth-calculator',
  },
};

export default async function CompoundGrowthPage() {
  const image1 = await getPexelsImage('wealth accumulation growth');
  const image2 = await getPexelsImage('financial chart analysis');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Compound Growth Calculator', href: '/tools/compound-growth-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Compound Growth Calculator</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The most powerful force in the financial world is compounding. Many traders focus on getting rich quickly, but true wealth is built through consistent, small gains that build on top of each other over time. This tool helps you visualize your potential account path based on your monthly goals and discipline.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <CompoundGrowthCalculator />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Power of Compounding</h2>
          <p>
            Compounding happens when you reinvest your profits back into your trading account. Instead of withdrawing every dollar you make, you use that profit to slightly increase your trade size in the future. Over months and years, this process creates an exponential growth curve that can transform a small account into a significant balance.
          </p>
          <p>
            This strategy requires a shift in mindset. Instead of looking for one lucky trade, you look for a series of high probability setups that protect your capital while allowing for steady growth. The goal is to avoid large losses that interrupt the compounding process. By keeping your drawdowns small, you allow the math of growth to work in your favor.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image1.url} 
              alt="Concept of wealth accumulation and compounding growth" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">How to Project Your Growth</h2>
          <p>
            Our calculator uses a standard compounding formula to estimate your future balance based on your starting capital and expected returns.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-6 text-base">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Initial Balance</h3>
              <p className="text-slate-600">The amount of money you have in your account right now.</p>
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">Monthly Return</h3>
              <p className="text-slate-600">The average percentage gain you expect to achieve each month through disciplined trading.</p>
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">Time Horizon</h3>
              <p className="text-slate-600">The number of months you plan to follow your strategy and reinvest your gains.</p>
            </div>
          </div>
          <p>
            You can also add optional monthly deposits to see how adding fresh capital affects your journey. Even a small monthly contribution can significantly accelerate the growth of your trading business.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Realistic Growth Expectations</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Small Gains Add Up</h3>
              <p className="text-sm text-slate-600">
                A 5% monthly return might sound small, but it results in nearly 80% growth over a single year. Consistency is much more important than occasionally having a massive winning month.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Manage Your Risks</h3>
              <p className="text-sm text-slate-600">
                The biggest enemy of compounding is a large loss. Use our other tools to keep your risk per trade low, ensuring that no single mistake can reset your progress.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <Image 
              src={image2.url} 
              alt="Financial charts and long term growth analysis" 
              fill 
              className="object-cover"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Is a 10% monthly return realistic?</h3>
              <p className="text-base">While some months might offer high returns, maintaining 10% every single month is extremely difficult and requires taking significant risk. Professional traders often aim for more conservative targets to ensure account longevity.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">How often should I reinvest my profits?</h3>
              <p className="text-base">Reinvesting after every trade or every month is the most common approach. This calculator assumes monthly reinvestment, which provides a realistic view of how a trading account grows over time.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Can I lose money while compounding?</h3>
              <p className="text-base">Yes. Compounding works in both directions. If you have a losing streak and your account balance drops, your future gains will be based on that smaller balance. This is why risk management is the most important part of the process.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Utility Library</Link>
        <Link href="/tools/drawdown-calculator" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Drawdown Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
