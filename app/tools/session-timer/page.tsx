import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SessionTimer from './SessionTimer';

export const metadata: Metadata = {
  title: "Live Trading Session Timer | Global Forex Market Hours",
  description: "Track active trading sessions across London, New York, Tokyo, and Sydney. Our live timer helps you identify market overlaps and high liquidity periods for Forex and Gold.",
  alternates: {
    canonical: '/tools/session-timer',
  },
  keywords: "session timer, trading hours calculator, forex market hours, trading session tracker, market overlap tool",
};

const image1 = { url: 'https://images.pexels.com/photos/2879837/pexels-photo-2879837.jpeg', alt: 'Global city skylines representing major financial centers' };
const image2 = { url: 'https://images.pexels.com/photos/4370598/pexels-photo-4370598.jpeg', alt: 'Digital world map showing global financial connectivity' };

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does the market close on weekends?","acceptedAnswer":{"@type":"Answer","text":"Yes. For Forex and Gold, the market closes on Friday evening and reopens on Sunday afternoon (UTC). However, Bitcoin and other cryptocurrencies trade 24 hours a day, 7 days a week."}},{"@type":"Question","name":"What time zone does this tool use?","acceptedAnswer":{"@type":"Answer","text":"Our tool uses Coordinated Universal Time (UTC). This is the standard used by major banks and institutional traders to ensure everyone is looking at the same market clock."}},{"@type":"Question","name":"When is the best time to trade?","acceptedAnswer":{"@type":"Answer","text":"For most people, the London and New York overlap is the best time due to the high volume. However, the best time for you depends on your specific strategy and your personal schedule."}}]};

export default async function SessionTimerPage() {
  return (
      <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="max-w-[800px] mx-auto space-y-12 py-8">
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Session Timer', href: '/tools/session-timer' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Session Timer</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The financial markets never sleep, but they do move differently depending on the time of day. Success in trading often depends on being active when liquidity and volatility are at their highest. This tool tracks global market hours in real time so you can plan your day around the most productive trading windows.
        </p>
      </header>

      <section className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm max-w-[500px] mx-auto">
        <SessionTimer />
      </section>

      <div className="article-content space-y-12 text-slate-700 leading-relaxed text-lg">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Four Major Sessions</h2>
          <p>
            The Forex market is decentralized and operates across four main geographic regions. Each session has its own unique characteristics. The Sydney and Tokyo sessions are often quieter and move in smaller ranges. The London and New York sessions are where the majority of global volume is traded, leading to larger price moves and more opportunities.
          </p>
          <p>
            Knowing which session is active helps you choose the right strategy. For example, a breakout strategy might work better during the London open, while a range trading approach might be more suitable for the late Tokyo session. Our timer keeps you synchronized with the global flow of capital regardless of your local time zone.
          </p>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">The Importance of Overlaps</h2>
          <p>
            The most volatile times in the market occur when two major sessions are open at the same time. These periods are known as overlaps.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-6 text-base">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">London & New York Overlap</h3>
              <p className="text-slate-600">This is the most active period of the day. Thousands of banks and funds are trading simultaneously, creating the highest liquidity and the most significant price trends.</p>
            </div>
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">Tokyo & London Overlap</h3>
              <p className="text-slate-600">While shorter and slightly less volatile, this period often sets the tone for the European morning and can provide early clues about market direction.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Trading with the Clock</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Planning Your Entry</h3>
              <p className="text-sm text-slate-600">
                Wait for a session open to look for new setups. The influx of new orders often provides the momentum needed to push the price toward your targets.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">Managing Risk</h3>
              <p className="text-sm text-slate-600">
                Be aware that spreads can widen during the "roll over" period between the New York close and the Sydney open. It is often safer to avoid entering new trades during this gap.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 my-8">
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Does the market close on weekends?</h3>
              <p className="text-base">Yes. For Forex and Gold, the market closes on Friday evening and reopens on Sunday afternoon (UTC). However, Bitcoin and other cryptocurrencies trade 24 hours a day, 7 days a week.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">What time zone does this tool use?</h3>
              <p className="text-base">Our tool uses Coordinated Universal Time (UTC). This is the standard used by major banks and institutional traders to ensure everyone is looking at the same market clock.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">When is the best time to trade?</h3>
              <p className="text-base">For most people, the London and New York overlap is the best time due to the high volume. However, the best time for you depends on your specific strategy and your personal schedule.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-100 pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-slate-500 no-underline hover:text-slate-900 font-bold uppercase tracking-widest">Utility Suite</Link>
        <Link href="/blog" className="text-accent font-bold no-underline hover:text-accent-dark uppercase tracking-widest">Learning Library &rarr;</Link>
      </footer>
    </article>
      </>
  );
}
