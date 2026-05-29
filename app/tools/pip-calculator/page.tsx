import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getPexelsImage } from '@/lib/pexels';
import PipValueCalculator from './PipValueCalculator';

export const metadata: Metadata = {
  title: "Pip Value Calculator | Contract Specifications for Forex & Gold",
  description: "Verify the exact monetary value of single pip movements for standard, mini, and micro lots. Essential for accurate trade planning across different currency pairs.",
};

export default async function PipValueCalculatorPage() {
  const image1 = await getPexelsImage('currency exchange mathematics');
  const image2 = await getPexelsImage('gold trading');

  return (
    <article className="max-w-[800px] mx-auto space-y-12 py-8">
      {/* Header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/tools" className="text-xs text-muted hover:text-primary no-underline uppercase tracking-wider font-semibold">&larr; Back to Tools</Link>
        </div>
        <h1 className="text-4xl font-black text-primary md:text-5xl mb-4 tracking-tight">Pip Value Calculator</h1>
        <p className="text-lg text-secondary leading-relaxed">
          Understanding the monetary value of a single pip is the foundation of precise trade planning. Whether you are trading major forex pairs, precious metals like Gold, or volatile cryptocurrencies, this calculator provides an instant breakdown of your risk per tick across various lot sizes.
        </p>
      </header>

      {/* Main Calculator Component */}
      <section className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <PipValueCalculator />
      </section>

      {/* Educational Content */}
      <section className="prose prose-invert max-w-none space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Understanding Contract Sizes</h2>
            <p className="text-secondary leading-relaxed">
              In the world of institutional finance, trading is conducted in "contracts" or "lots." A standard lot in Forex represents 100,000 units of the base currency. Because of this large volume, even a tiny 1-pip movement (0.0001) results in a $10 change on pairs like EUR/USD.
            </p>
            <p className="text-secondary leading-relaxed">
              Mini lots (10,000 units) and micro lots (1,000 units) scale this value down to $1 and $0.10 respectively. Knowing your contract size is the first step in ensuring your account can handle the inherent leverage of the market.
            </p>
          </div>
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src={image1.url} 
              alt={image1.alt} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Why Pip Values Vary Across Pairs</h2>
          <p className="text-secondary leading-relaxed">
            A common point of confusion for new traders is why a pip on EUR/USD is worth exactly $10, while a pip on USD/JPY or GBP/CAD fluctuates. The reason lies in the "counter currency." If the counter currency (the second currency in the pair) is not USD, the pip value must be converted back into USD based on the current exchange rate.
          </p>
          <p className="text-secondary leading-relaxed">
            For JPY pairs, the pip is the second decimal place (0.01). This tool handles the cross-currency mathematics automatically, ensuring your risk calculations are always accurate to the cent, regardless of which pair you are analyzing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
            <Image 
              src={image2.url} 
              alt={image2.alt} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <h2 className="text-2xl font-bold text-primary">Cross-Currency Mathematics</h2>
            <p className="text-secondary leading-relaxed">
              For pairs that do not involve the US Dollar at all (known as "crosses"), the math becomes even more complex. For example, trading EUR/GBP requires knowing the GBP/USD exchange rate to find the dollar value of a pip.
            </p>
            <p className="text-secondary leading-relaxed">
              By mastering these calculations, you gain a deeper understanding of how global capital flows affect your bottom line. This calculator simplifies the process, allowing for more sophisticated multi-asset portfolio management and helping you avoid unexpected exposure in non-USD pairs.
            </p>
          </div>
        </div>
      </section>

      {/* Internal SEO links */}
      <footer className="border-t border-border pt-8 flex justify-between items-center text-sm">
        <Link href="/tools" className="text-secondary no-underline hover:text-primary font-medium transition-colors">&larr; Back to Tools</Link>
        <Link href="/tools/profit-calculator" className="bg-accent/10 text-accent px-4 py-2 rounded-full no-underline hover:bg-accent hover:text-white transition-all font-bold">Open Profit Calculator &rarr;</Link>
      </footer>
    </article>
  );
}
