import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Usman Trades | Our Mission and Trading Philosophy',
  description: 'Usman Trades is an independent trading education platform focused on mathematical risk management, position sizing, and free professional calculators for Forex, Gold, and Bitcoin traders.',
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <article className="max-w-[720px] mx-auto space-y-12">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">About Usman Trades</h1>
        <p className="text-sm text-secondary">Our mission, editorial philosophy, and core focus.</p>
      </header>

      <section className="space-y-6 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. Our Core Mission</h2>
        <p>
          At Usman Trades, we believe that modern retail trading is over-saturated with emotional marketing, speculative hype, and fake profitability screenshots. Our mission is to strip away this clutter and offer clear, mathematical guidance to help traders understand the fundamental mechanics of market math and risk management.
        </p>
        <p>
          We do not sell trading signals, we do not operate speculative VIP Telegram groups, and we do not act as an introducing broker for high-spread trading entities. We are an independent educational library and tool provider.
        </p>
      </section>

      <section className="space-y-6 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Scientific and Mathematical Approach</h2>
        <p>
          Every calculator on this platform is built with pure financial equations, using reliable standard metrics for Forex contracts, physical commodities (Gold), and digital assets (Bitcoin). We strongly believe that the difference between gambling and systematic trading lies entirely in risk control: position sizing, pip valuation, and reward-to-risk logic.
        </p>
        <p>
          We offer these tools client-side to ensure maximum performance, privacy, and utility. By keeping calculations instantaneous and zero-overhead, you can focus on validating your parameters precisely before execution.
        </p>
      </section>

      <section className="space-y-6 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Editorial Standards and Integrity</h2>
        <p>
          Our guides are compiled by seasoned financial analysts. We do not use automatic AI generators to churn out spam articles for search traffic. Every piece of analysis, chart review, or educational guide published here is meticulously written, reviewed, and references correct macroeconomic logic or risk paradigms.
        </p>
        <p>
          We strictly adhere to ethical publishing guidelines. If you have questions about our content, or would like to submit feedback, please feel free to reach out.
        </p>
      </section>

      <section className="bg-surface border border-border p-6 rounded-[4px] space-y-4">
        <h2 className="text-base font-bold text-primary">Need Clarification?</h2>
        <p className="text-sm text-secondary">
          We want to make sure you fully understand our platform structure. View our <Link href="/disclaimer" className="text-accent underline font-semibold">Risk Disclaimer</Link> or reach out directly via our <Link href="/contact" className="text-accent underline font-semibold">Contact Page</Link>.
        </p>
      </section>
    </article>
  );
}
