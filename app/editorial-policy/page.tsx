import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, UserCheck, BookOpen, PenTool } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy | Our Commitment to High Integrity Content',
  description: 'Read the Usman Trades Editorial Policy. We commit to human written, mathematically accurate, and independent trading education without AI generated fluff.',
  alternates: {
    canonical: '/editorial-policy',
  },
};

export default function EditorialPolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Editorial Policy",
    "description": "The official editorial standards for Usman Trades, focusing on human written content and mathematical accuracy.",
    "publisher": {
      "@type": "Organization",
      "name": "Usman Trades",
      "url": "https://usmantrades.co.uk"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[720px] mx-auto py-8 space-y-16">
        <Breadcrumbs items={[
          { label: 'Editorial Policy', href: '/editorial-policy' }
        ]} />

        <header className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.2em]">
            <ShieldCheck className="w-4 h-4" />
            Integrity Standards
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 tracking-tight leading-tight">
            Our Editorial <span className="text-accent italic">Commitment.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            We believe that financial education must be grounded in reality, accuracy, and human experience. Our policy ensures that every guide you read is trustworthy and useful.
          </p>
        </header>

        <section className="space-y-12">
          {/* AEO: Direct Answer Section */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">What is the Usman Trades Editorial Policy?</h2>
            <p className="text-slate-600 leading-relaxed">
              Our policy is a strict set of rules that governs how we create content. We prioritize human authorship over automation, mathematical proof over speculation, and educational clarity over marketing hype. We do not publish AI generated articles or unverified trading signals.
            </p>
          </div>

          <div className="grid gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <UserCheck className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">1. Human Centric Authorship</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Every piece of educational material on this platform is written by a real person with actual market experience. We strictly forbid the use of artificial intelligence tools to generate our core articles. We believe that AI lacks the nuanced understanding and biological risk awareness required to teach trading effectively. When you read a guide here, you are reading the thoughts of an experienced analyst.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <BookOpen className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">2. Mathematical Accuracy</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Trading education is dangerous if the math is wrong. We verify all formulas and calculations used in our guides against industry standards for Forex, Gold, and Bitcoin contracts. Our calculators are tested to ensure they provide precise estimates for position sizing and risk management. We focus on the logic of the numbers because math does not have emotions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <PenTool className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">3. Objectivity and Independence</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We are an independent educational provider. We do not accept payments from brokers to promote their services, and we do not operate hidden affiliate schemes that compromise our advice. Our goal is to provide a conflict free environment where you can learn how to manage your own risk without being pushed toward a specific trading platform.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 border-t border-slate-100 pt-12">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Updating Our Content</h2>
          <p className="text-slate-600 leading-relaxed">
            The financial markets are constantly changing. We review our core educational library every quarter to ensure that the examples and data remain relevant to current market conditions. If we find an error or an outdated concept, we correct it immediately and update the timestamp on the article to maintain transparency with our readers.
          </p>
        </section>

        <section className="bg-slate-900 text-white p-10 md:p-16 rounded-3xl space-y-6 text-center">
          <h2 className="text-2xl font-bold font-serif">Questions about our standards?</h2>
          <p className="text-slate-400 text-sm max-w-[500px] mx-auto leading-relaxed">
            If you have feedback or would like to report an inaccuracy in our content, please reach out to our team directly.
          </p>
          <div className="pt-4">
            <Link href="/contact" className="bg-white text-slate-900 font-bold px-8 py-3 rounded hover:bg-slate-100 transition-all text-sm inline-block">
              Contact Editorial Team
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
