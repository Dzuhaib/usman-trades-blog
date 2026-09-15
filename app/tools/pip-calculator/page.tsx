import Link from 'next/link';
import { Metadata } from 'next';
import { generateWebPageSchema } from '@/lib/seo-os/schema-engine';
import Breadcrumbs from '@/components/Breadcrumbs';
import PipValueCalculator from './PipValueCalculator';

export const metadata: Metadata = {
  title: "Pip Value Calculator | Calculate Point Value for Forex and Gold",
  description: "Understand the dollar value of every pip movement in your trades. Our free pip calculator works for all major currency pairs, Gold, and Bitcoin across different lot sizes.",
  alternates: {
    canonical: '/tools/pip-calculator',
  },
  keywords: "pip value calculator, forex pip calculator, gold pip calculator, trading calculator, currency pair pip value",
};

const image1 = { url: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg', alt: 'Financial mathematics and currency exchange concepts' };
const image2 = { url: 'https://images.pexels.com/photos/47047/gold-ingots-golden-treasure-47047.jpeg', alt: 'Gold market bars and financial asset valuation' };

const pageSchema = generateWebPageSchema({
  name: "Trading Pip Value Calculator",
  description: "Calculate the exact dollar value of every pip movement in your trades. Works for all major currency pairs, Gold, and Bitcoin.",
  url: "/tools/pip-calculator",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Pip Value",
  "description": "Learn how to determine the monetary value of each pip movement for accurate trade planning.",
  "totalTime": "PT2M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select Your Asset",
      "text": "Choose whether you are trading a Forex pair, Gold, or Bitcoin to determine the correct pip calculation method."
    },
    {
      "@type": "HowToStep",
      "name": "Enter Your Position Size",
      "text": "Input the lot size you are trading or planning to trade."
    },
    {
      "@type": "HowToStep",
      "name": "Review Your Pip Value",
      "text": "The calculator will display the exact dollar value of each pip movement for your selected position size."
    }
  ]
};

const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does pip value stay the same forever?","acceptedAnswer":{"@type":"Answer","text":"For pairs like EUR/USD, the value is fixed if your account is in USD. For JPY or GBP pairs, the value changes slightly as the exchange rate moves."}},{"@type":"Question","name":"Why should I care about pip value?","acceptedAnswer":{"@type":"Answer","text":"If you don't know your pip value, you cannot calculate your risk accurately. Knowing this number is the only way to ensure your stop loss respects your risk limits."}},{"@type":"Question","name":"What is the difference between a pip and a point?","acceptedAnswer":{"@type":"Answer","text":"A pip is usually the fourth decimal place, while a point is the fifth decimal place (also called a pipette). There are 10 points in every 1 pip."}}]};

export default async function PipValueCalculatorPage() {
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
        { label: 'Pip Value Calculator', href: '/tools/pip-calculator' }
      ]} />

      <header className="border-b border-slate-100 pb-8 space-y-4">
        <h1 className="text-4xl font-bold font-serif text-slate-900 md:text-5xl tracking-tight">Trading Pip Value Calculator</h1>
        <p className="text-sm text-slate-400">Last Updated: September 2026</p>
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
            <img src={image1.url} alt={image1.alt} className="w-full h-full object-cover" />
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
            <img src={image2.url} alt={image2.alt} className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Pip Value Across Different Account Currencies</h2>
          <p>
            The examples we have discussed so far assume your trading account is denominated in US dollars. In reality, many traders have accounts in GBP, EUR, AUD, or other currencies. When your account currency differs from the quote currency of the pair you are trading, the pip value calculation requires an additional conversion step.
          </p>
          <p>
            For example, if you have a GBP-denominated account and trade EUR/USD, the pip value calculated in USD must be converted to GBP using the current GBP/USD exchange rate. This means your actual pip value in GBP terms will fluctuate not only with the EUR/USD pair but also with the GBP/USD rate. Our calculator handles all currency conversions automatically, ensuring that your risk calculations are accurate regardless of your account currency.
          </p>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900">Pip Value Calculation by Account Currency</h3>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li><strong>USD Account:</strong> Pip values are calculated directly in USD for most pairs</li>
              <li><strong>EUR Account:</strong> USD pip values are converted to EUR using the EUR/USD rate</li>
              <li><strong>GBP Account:</strong> USD pip values are converted to GBP using the GBP/USD rate</li>
              <li><strong>JPY Account:</strong> Additional conversion may be required depending on the pair</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Using Pip Value for Trade Planning</h2>
          <p>
            Knowing your pip value is not just an academic exercise. It is a practical tool that you should use every time you plan a trade. By combining your pip value with your stop loss distance, you can calculate your exact dollar risk before entering the trade. This allows you to make informed decisions about whether a setup is worth taking based on your risk parameters.
          </p>
          <p>
            For example, if your pip value is $10 per standard lot and your stop loss is 30 pips away, your risk on one lot is $300. If you have a $10,000 account and follow the 1% rule, you can afford to risk $100, which means you should trade 0.33 lots rather than a full lot. This simple calculation, done before every trade, ensures that you never risk more than your account can handle.
          </p>
          <p>
            Advanced traders also use pip value analysis to compare the relative risk of different pairs. A pair with a higher pip value per lot represents more risk per unit of position size. By understanding these differences, you can allocate your risk budget more efficiently across multiple trades and diversify your exposure appropriately.
          </p>
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
              <p className="text-base">If you do not know your pip value, you cannot calculate your risk accurately. Knowing this number is the only way to ensure your stop loss respects your risk limits.</p>
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
      </>
  );
}
