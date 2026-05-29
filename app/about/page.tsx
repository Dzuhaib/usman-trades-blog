import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Mail, BookOpen, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Usman Trades | Our Mission and Trading Philosophy',
  description: 'Usman Trades is an independent trading education platform focused on mathematical risk management, position sizing, and free professional calculators for Forex, Gold, and Bitcoin traders.',
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <article className="max-w-[720px] mx-auto py-8 space-y-16">
      <Breadcrumbs items={[
        { label: 'About', href: '/about' }
      ]} />

      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight leading-tight">
          Trading education built on <span className="text-accent italic">clarity.</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          We strip away the noise and hype of the trading world to focus on what actually matters: mathematics, risk management, and market mechanics.
        </p>
      </header>

      <section className="space-y-8">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white font-serif font-bold text-2xl">U</div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">A Note from the Founder</h2>
              <p className="text-sm text-slate-500">Usman Ahmed, Lead Analyst</p>
            </div>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed italic">
            <p>
              &ldquo;I started this platform because I was tired of seeing new traders lose their hard-earned capital to complex strategies and &apos;get rich quick&apos; schemes. Most retail trading failures aren&apos;t due to a lack of a good strategy; they happen because of a lack of risk management.&rdquo;
            </p>
            <p>
              &ldquo;My goal is to give you the same mathematical frameworks used by professionals, but in a way that actually makes sense. We don&apos;t sell dreams; we provide the tools and education you need to trade responsibly.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-accent">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-900">Our Core Principles</h2>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">1. Mathematics Over Emotion</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Trading is a game of probabilities. We believe every decision should be backed by math—from your lot size to your reward-to-risk ratio. Our calculators are built to remove the emotional guesswork that leads to big losses.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">2. Editorial Integrity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We commit to high-integrity, human-written content only. We do not use AI generators to churn out articles. Every guide in our library is written and reviewed by experienced analysts to ensure accuracy and clarity.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">3. Absolute Transparency</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are an independent educational resource. We do not sell signals, we do not operate speculative VIP groups, and we do not act as an introducing broker for high-spread entities. We exist solely to help you understand the markets better.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Our Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3 p-6 border border-slate-100 rounded-xl">
              <Calculator className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Risk Tools</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our suite of tools is designed to provide instantaneous, client-side calculations for Forex, Gold, and Bitcoin. We prioritize your privacy and performance above all else.
              </p>
            </div>
            <div className="space-y-3 p-6 border border-slate-100 rounded-xl">
              <BookOpen className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Education</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our guides focus on structural market understanding—liquidity, order flow, and macroeconomic logic—rather than arbitrary retail patterns that fail over time.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-slate-900 text-white p-10 md:p-16 rounded-3xl space-y-6 text-center">
        <h2 className="text-2xl font-bold font-serif">Have questions or feedback?</h2>
        <p className="text-slate-400 text-sm max-w-[500px] mx-auto leading-relaxed">
          We want to make sure you fully understand our platform structure and mission. Feel free to reach out to us directly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/contact" className="bg-white text-slate-900 font-bold px-8 py-3 rounded hover:bg-slate-100 transition-all text-sm">
            Contact Us
          </Link>
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="border border-white/20 text-white font-bold px-8 py-3 rounded hover:bg-white/5 transition-all text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Support
          </a>
        </div>
      </section>
    </article>
  );
}
