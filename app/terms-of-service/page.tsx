import type { Metadata } from 'next';
import Link from 'next/link';

const LAST_UPDATED = 'October 2026';

export const metadata: Metadata = {
  title: 'Terms of Service | Usman Trades Usage Agreement',
  description: 'Read the Terms of Service governing your use of Usman Trades. Understand your responsibilities when using our free Forex, Gold, and Bitcoin trading calculators, editorial content, and advertising-supported educational resources.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfService() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Terms of Service</h1>
        <p className="text-sm text-secondary">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding legal agreement between you and <strong className="text-primary">Usman Trades</strong> regarding your access to and use of the website{' '}
          <a href="https://usmantrades.co.uk" className="text-accent underline font-semibold">usmantrades.co.uk</a> (the &ldquo;Site&rdquo;). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, you must not use the Site.
        </p>
        <p>
          These Terms apply to all visitors. We may update these Terms from time to time; continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. Eligibility</h2>
        <p>
          By using the Site, you confirm that you are at least 18 years of age and legally capable of entering into a binding contract. If you are under 18, you must not use the Site.
        </p>
        <p>
          You also confirm that you will only use the Site in a jurisdiction where doing so is permitted by law. The Site is not directed to any person whose use would violate the laws of their country of residence, including any restriction on the promotion or distribution of trading-related content.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Educational Purpose Only &mdash; Not Financial Advice</h2>
        <p>
          <strong className="text-primary">Nothing on this Site constitutes investment, financial, legal, tax, accounting, or trading advice, or a recommendation to buy, sell, or hold any financial instrument.</strong>
        </p>
        <p>
          All content, articles, tools, calculators, formulas, and market commentary are provided for educational and informational purposes only. Trading foreign exchange (Forex), contracts for differences (CFDs), precious metals such as gold (XAUUSD), and digital assets such as Bitcoin involves a high level of risk and may not be suitable for all investors. Leveraged trading can amplify both profits and losses, and you could lose some or all of your deposited capital.
        </p>
        <p>
          You are solely responsible for any trading decisions you make. You should not trade with money you cannot afford to lose. Past performance is not indicative of future results. Our risk framework, position sizing formulas, and calculator outputs are educational estimates, not predictions of future price movement.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. No Trading Signals, Broker Relationships, or Affiliation</h2>
        <p>
          Usman Trades does not provide trade signals, managed accounts, VIP groups, signal distribution, or brokerage services. We are not a broker, fund, investment adviser, or introducing broker, and we are not affiliated with, endorsed by, or acting on behalf of any broker, exchange, or regulated financial institution.
        </p>
        <p>
          Any broker or platform referenced in our educational articles is mentioned for general illustration and context only. Any such reference is not a recommendation, and we accept no responsibility or liability for any dealings you have with any third-party provider you may choose to use.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Our Services</h2>
        <p>
          Usman Trades provides free access to financial calculators, trading educational materials, and market commentary. Our tools operate client-side in your browser. We may modify, suspend, replace, or discontinue any tool, article, or feature at any time without prior notice.
        </p>
        <p>
          We do not guarantee that the Site will be available or uninterrupted, that any calculator will be accurate or error-free, or that any content will remain current. Contract specifications, spreads, and exchange rates change over time, and you should always verify parameters with your own broker before trading.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Site, or any calculator on it, for any unlawful purpose or in violation of any applicable regulation.</li>
          <li>Rely on our calculators as your sole basis for executing live trades, or as a substitute for your own due diligence, analysis, or professional advice.</li>
          <li>Attempt to gain unauthorised access to the Site, its servers, or any connected system, or to probe, scan, or test the vulnerability of our infrastructure without written permission.</li>
          <li>Introduce malicious code, viruses, or any harmful technology.</li>
          <li>Use automated scripts, bots, scrapers, crawlers, or framing techniques to copy, republish, mirror, or replicate our calculators or content without our prior written consent.</li>
          <li>Redistribute, resell, or commercially exploit our content or tools.</li>
          <li>Misrepresent your identity or the origin of any content you post.</li>
          <li>Incite or participate in any activity that is unlawful, defamatory, or abusive toward others.</li>
        </ul>
      </section>

      <section className="text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary mb-4">6. Intellectual Property Rights</h2>
        <p>
          The original guides, articles, site layout, branding, calculation logic, formulas, and software code on the Site are the sole property of Usman Trades or its licensors, and are protected by intellectual property laws. All rights are reserved.
        </p>
        <p>
          You may reference our guides or link to our articles and tools for personal, non-commercial educational use. You may not reproduce, republish, or commercially exploit our content without our prior written consent. If you wish to request permission, please contact us via our{' '}
          <Link href="/contact" className="text-accent underline font-semibold">Contact page</Link>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">7. Advertising and Third-Party Content</h2>
        <p>
          The Site is supported by advertising. We use Google AdSense, and we and our advertising partners may use cookies or similar technologies to serve and measure ads. For details on how advertising cookies are used, how to opt out, and how to manage your consent, please read our{' '}
          <Link href="/privacy-policy" className="text-accent underline font-semibold">Privacy Policy</Link> and{' '}
          <Link href="/cookie-policy" className="text-accent underline font-semibold">Cookie Policy</Link>.
        </p>
        <p>
          <strong className="text-primary">
            Advertising cookies are only set after you provide consent, and you may withdraw or change your consent at any time via the &ldquo;Cookie Settings&rdquo; link in our footer.
          </strong>
        </p>
        <p>
          Advertisements are provided by third parties who may use technologies to collect information such as your IP address, device type, and interaction with the ad. The content of any advertisement is controlled by the advertiser and its networks, not by us. We do not endorse, warrant, or control any advertised product, service, or offer. Your dealings with any advertiser are between you and that advertiser.
        </p>
        <p>
          Google is not a party to these Terms and does not endorse or have any responsibility for our Site, our content, or any advertising displayed on it. The use of advertising technologies does not imply any endorsement of, or arrangement with, any broker, product, or service mentioned in our content.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">8. Our Editorial Standards</h2>
        <p>
          We are committed to accuracy, independence, and transparency. Because content may occasionally contain errors, we may correct or update any article at any time and change its &ldquo;updated&rdquo; timestamp to reflect the change. If you believe you have found an error, please report it through our{' '}
          <Link href="/contact" className="text-accent underline font-semibold">Contact page</Link>. Our full editorial standards are set out in our{' '}
          <Link href="/editorial-policy" className="text-accent underline font-semibold">Editorial Policy</Link>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">9. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We do not control these websites and we are not responsible for their content, accuracy, availability, or privacy practices. Your use of a third-party website is governed by that website&rsquo;s own terms and privacy policy. Links do not imply endorsement.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">10. Limitation of Liability</h2>
        <p>
          <strong className="text-primary">
            To the maximum extent permitted by law, Usman Trades and its founder, editors, and contributors shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, trading losses, loss of data, or goodwill, arising out of or in connection with your use of, or inability to use, the Site.
          </strong>
        </p>
        <p>
          This includes any loss resulting from reliance on content or calculator outputs, from market movements, from decisions you make based on our educational material, or from the availability, unavailability, or inaccuracies of third-party platforms, brokers, feeds, or links.
        </p>
        <p>
          Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited. Some jurisdictions do not allow the exclusion of certain warranties or liabilities, so parts of this section may not apply to you.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">11. Indemnity</h2>
        <p>
          You agree to indemnify and hold harmless Usman Trades from and against any claim, demand, loss, or expense (including reasonable legal fees) arising out of your use of the Site, your breach of these Terms, or your infringement of any third-party rights.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">12. Disclaimer of Warranties</h2>
        <p>
          The Site and all content and tools are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Site will be error-free, uninterrupted, or free of harmful components.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">13. Suspension and Termination</h2>
        <p>
          We may, at our sole discretion, restrict, suspend, or terminate your access to the Site at any time, without prior notice, if you breach these Terms, or if we are required to do so by law or a third party. We may also modify or discontinue any part of the Site for any reason.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">14. Governing Law and Jurisdiction</h2>
        <p>
          These Terms are governed by the laws of England and Wales, and you submit to the exclusive jurisdiction of the courts of England and Wales. If any provision of these Terms is found unenforceable, the remaining provisions will continue in full effect.
        </p>
        <p>
          If you are a resident of another country, nothing in these Terms affects the consumer protections available to you under the mandatory laws of your country of residence.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">15. Changes to These Terms</h2>
        <p>
          We may revise these Terms at any time by posting an updated version on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Site after such changes constitutes acceptance of the updated Terms. We encourage you to review this page periodically.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">16. Contact Us</h2>
        <p>
          If you have questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a> or by phone on{' '}
          <a href="tel:+923390349804" className="text-accent underline font-semibold">+923390349804</a>. For information about how we handle data, please see our{' '}
          <Link href="/privacy-policy" className="text-accent underline font-semibold">Privacy Policy</Link> and{' '}
          <Link href="/disclaimer" className="text-accent underline font-semibold">Risk Disclaimer</Link>.
        </p>
      </section>
    </article>
  );
}