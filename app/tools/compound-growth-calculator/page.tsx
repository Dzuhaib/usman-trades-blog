import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import CompoundGrowthCalculator from './CompoundGrowthCalculator';

export const metadata: Metadata = {
  title: "Trading Compound Growth Calculator | Project Your Account Growth",
  description: "Visualize how your trading account can grow over time through the power of compounding. Our free calculator helps you project long term results based on consistent monthly gains.",
  alternates: {
    canonical: '/tools/compound-growth-calculator',
  },
  keywords: "compound growth calculator, trading compounding tool, account growth calculator, forex compounding, investment growth planner",
};

const image1 = { url: 'https://images.pexels.com/photos/14902702/pexels-photo-14902702.jpeg', alt: 'Concept of wealth accumulation and compounding growth' };
const image2 = { url: 'https://images.pexels.com/photos/38877603/pexels-photo-38877603.jpeg', alt: 'Financial charts and long term growth analysis' };

const pageSchema = generateWebPageSchema({
  name: "Trading Compound Growth Calculator",
  description: "Project your trading account growth over time through consistent compounding. Calculate future balances based on monthly returns and starting capital.",
  url: "/tools/compound-growth-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Use the Compound Growth Calculator",
  "description": "Learn how to project your trading account growth through the power of compounding.",
  "totalTime": "PT3M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter Your Starting Balance",
      "text": "Input the current amount of money in your trading account to establish your baseline."
    },
    {
      "@type": "HowToStep",
      "name": "Set Your Monthly Return Target",
      "text": "Enter the average percentage gain you aim to achieve each month through disciplined trading."
    },
    {
      "@type": "HowToStep",
      "name": "Review Your Projected Growth",
      "text": "The calculator will display your projected account balance over your chosen time horizon, showing the exponential effect of compounding."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is a 10% monthly return realistic?","acceptedAnswer":{"@type":"Answer","text":"While some months might offer high returns, maintaining 10% every single month is extremely difficult and requires taking significant risk. Professional traders often aim for more conservative targets to ensure account longevity."}},{"@type":"Question","name":"How often should I reinvest my profits?","acceptedAnswer":{"@type":"Answer","text":"Reinvesting after every trade or every month is the most common approach. This calculator assumes monthly reinvestment, which provides a realistic view of how a trading account grows over time."}},{"@type":"Question","name":"Can I lose money while compounding?","acceptedAnswer":{"@type":"Answer","text":"Yes. Compounding works in both directions. If you have a losing streak and your account balance drops, your future gains will be based on that smaller balance. This is why risk management is the most important part of the process."}}]};

export default async function CompoundGrowthPage() {
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
        { label: 'Compound Growth Calculator', href: '/tools/compound-growth-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Compound Growth Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
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
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
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
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">The Psychology of Compounding</h2>
            <p>
              Compounding is as much a mental challenge as it is a mathematical one. The temptation to withdraw profits after a winning streak is powerful, but doing so breaks the chain that makes compounding effective. Traders who understand this psychological aspect develop the discipline to leave their gains invested, allowing the exponential curve to do its work.
            </p>
            <p>
              One of the most common mistakes traders make is expecting linear growth when the reality is exponential. In the early months, the gains may seem modest and discouraging. It is only after months or years of consistent reinvestment that the curve begins to steepen dramatically. This is why patience is perhaps the most valuable trait a compound growth trader can possess.
            </p>
            <p>
              Another psychological hurdle is dealing with the inevitable losing months. Even the best strategies will have periods where the monthly return is negative. The key is not to abandon the compounding strategy during these periods. Instead, focus on reducing risk, reviewing your approach, and staying the course. The math of compounding works best when you give it time to recover from setbacks.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">The Role of Consistency Over Intensity</h2>
            <p>
              Many new traders believe that the path to wealth requires finding the ultimate strategy that produces massive returns every month. The truth is that consistent, moderate returns compounded over time will almost always outperform sporadic big winners. A trader who averages 3% per month with low drawdowns will build a larger account over a year than someone who makes 20% in one month and then loses 15% the next two months.
            </p>
            <p>
              This is why the compound growth calculator is such a valuable tool. It strips away the excitement and shows you the raw mathematics of consistency. When you see that a modest 2% monthly return can grow your account by over 26% in a year, the appeal of high risk, high reward trades diminishes significantly.
            </p>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-slate-900">Key Principles for Compounding Success</h3>
              <ul className="space-y-2 list-disc list-inside text-slate-600">
                <li>Reinvest all profits to maintain the compounding chain</li>
                <li>Aim for consistent monthly returns rather than occasional home runs</li>
                <li>Keep drawdowns shallow to protect the compounding base</li>
                <li>Be patient and give the exponential curve time to develop</li>
                <li>Review and adjust your strategy periodically, but do not abandon compounding</li>
              </ul>
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
      </>
  );
}
