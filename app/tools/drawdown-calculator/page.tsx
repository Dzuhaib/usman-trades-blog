import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import DrawdownCalculator from './DrawdownCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Trading Drawdown Calculator | Understanding Recovery Math",
  description: "See how much your account needs to gain to recover from a loss. Our free drawdown calculator illustrates the mathematical reality of trading losses and the importance of capital preservation.",
  alternates: {
    canonical: '/tools/drawdown-calculator',
  },
};

export default async function DrawdownPage() {
  const image1 = await getPexelsImage('financial recovery math');
  const image2 = await getPexelsImage('downward trend chart');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Drawdown Calculator', href: '/tools/drawdown-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Drawdown Calculator</h1>
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
            <Image 
              src={image1.url} 
              alt="Mathematical representation of financial recovery and drawdown" 
              fill 
              className="object-cover"
            />
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
            <Image 
              src={image2.url} 
              alt="Downward trend chart showing market volatility" 
              fill 
              className="object-cover"
            />
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
  );
}
