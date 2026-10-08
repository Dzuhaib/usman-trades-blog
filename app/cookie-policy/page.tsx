import type { Metadata } from 'next';
import Link from 'next/link';

const LAST_UPDATED = 'October 2026';

export const metadata: Metadata = {
  title: 'Cookie Policy | Usman Trades Advertising and Data Choices',
  description: 'Read the Usman Trades cookie policy. Learn about the specific cookies we and Google AdSense use, including advertising and DoubleClick cookies, and how to accept, reject, or withdraw your consent.',
  alternates: {
    canonical: '/cookie-policy',
  },
};

export default function CookiePolicy() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Cookie Policy</h1>
        <p className="text-sm text-secondary">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <p>
          This Cookie Policy explains what cookies and similar technologies (&ldquo;cookies&rdquo;) are, which ones we and our advertising partners use on{' '}
          <a href="https://usmantrades.co.uk" className="text-accent underline font-semibold">usmantrades.co.uk</a> (the &ldquo;Site&rdquo;), and how you can control them. It forms part of our{' '}
          <Link href="/privacy-policy" className="text-accent underline font-semibold">Privacy Policy</Link>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. What Cookies Are</h2>
        <p>
          Cookies are small text files placed on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information and to personalise content and advertising.
        </p>
        <p>
          Similar technologies that behave like cookies include web pixels, tracking pixels, and local storage. We refer to all of these as &ldquo;cookies&rdquo; throughout this policy.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. How We Use Cookies</h2>
        <p>We use a small number of categories of cookies:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-primary">Essential cookies</strong> &mdash; required for the Site to function and cannot be switched off.</li>
          <li><strong className="text-primary">Analytics cookies</strong> &mdash; help us understand aggregate usage so we can improve the Site.</li>
          <li><strong className="text-primary">Advertising cookies</strong> &mdash; used by Google AdSense and its partners to serve and measure ads.</li>
        </ul>
        <p>
          We keep our use of cookies proportionate. We do not use cookies to store your name, contact details, or anything entered into our calculators &mdash; all calculator inputs run entirely in your browser and are never sent to our servers.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Essential Cookies</h2>
        <p>
          These cookies are strictly necessary for the Site to function. They enable core features such as page navigation, security, and load balancing, and they cannot be disabled without breaking the Site. We use one first-party cookie, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">cookie_consent</code>, to remember whether you have accepted or rejected advertising cookies, so that we do not ask you again on every visit.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Analytics Cookies</h2>
        <p>
          We use limited server logs and aggregated traffic information to understand which pages are visited, how long visitors stay, and where they click. This is performance monitoring rather than behavioural profiling, and it does not involve advertising cookies. Server logs are retained for no more than 30 days.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. Advertising Cookies and Google AdSense</h2>
        <p>
          We use <strong className="text-primary">Google AdSense</strong> to display advertisements on the Site. Like many publishers that support free content through advertising, we use cookies and similar technologies to collect information about your use of this and other sites in order to show you relevant advertising.
        </p>

        <h3 className="font-bold text-primary">5.1 How Google Uses Cookies to Serve Ads</h3>
        <p>
          <strong className="text-primary">
            Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to your website or other websites.
          </strong>
        </p>
        <p>
          Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site(s) and/or other sites on the Internet. When you view or click an advertisement, your browser may send information directly to Google, including your IP address, the advertising cookie(s) set on your device, and the ad&rsquo;s interaction data. We do not control or have access to this data, and we do not receive your name or email address through it.
        </p>
        <p>
          Google and its partners may set cookies from several domains, including <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">google.com</code>, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">doubleclick.net</code>, <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">googlesyndication.com</code>, and <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">googleadservices.com</code>, as well as country-specific Google domains. Some of these are known as &ldquo;third-party&rdquo; cookies because they are set by a domain other than the one you are visiting.
        </p>

        <h3 className="font-bold text-primary">5.2 Types of Advertising Cookies Used</h3>
        <p>Google AdSense may use cookies for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-primary">Ad serving and measurement</strong> &mdash; to serve, measure, and report on the performance of ads shown to you.</li>
          <li><strong className="text-primary">Frequency capping and rotation</strong> &mdash; to limit how often you see the same advertiser or ad.</li>
          <li><strong className="text-primary">Relevance and personalisation</strong> &mdash; to select ads based on your prior visits to this or other sites.</li>
          <li><strong className="text-primary">Fraud prevention and security</strong> &mdash; to detect invalid or fraudulent clicks and impressions.</li>
        </ul>
        <p>
          The advertising cookies themselves do not contain personally identifiable information. However, information associated with them may be added to your Google Account if you are signed in, depending on your settings.
        </p>

        <h3 className="font-bold text-primary">5.3 Opting Out of Personalised Advertising</h3>
        <p>
          You can opt out of personalised advertising from Google at any time through the following links:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-primary">Google Ads Settings</strong> &mdash;{' '}
            <a href="https://adssettings.google.com/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">adssettings.google.com</a>. You can review and change your ad personalisation settings.
          </li>
          <li>
            <strong className="text-primary">Google My Ad Center</strong> &mdash;{' '}
            <a href="https://myadcenter.google.com/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">myadcenter.google.com</a>. You can delete your advertiser profile and limit data use.
          </li>
          <li>
            <strong className="text-primary">Third-party vendor opt-out</strong> &mdash;{' '}
            <a href="https://www.aboutads.info/choices/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">aboutads.info/choices</a>. You can opt out of participating vendors&rsquo; use of cookies for personalised advertising, or <a href="https://www.aboutads.info/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">aboutads.info</a> for general information.
          </li>
        </ul>
        <p>
          Opting out of personalised advertising does not mean you will stop seeing ads. It means that the ads you see may be less relevant to you. Opting out also does not stop Google from serving ads; it stops the use of cookies for personalisation.
        </p>
        <p>
          If you live in the European Economic Area, the United Kingdom, or Switzerland, you have the right to object to personalised advertising entirely. You can exercise this right using the links above, by rejecting non-essential cookies on this Site, or by using the Global Privacy Control (GPC) signal in your browser, which Google honours for your region.
        </p>

        <h3 className="font-bold text-primary">5.4 Consent Before Advertising Cookies Are Set</h3>
        <p>
          <strong className="text-primary">
            We do not load the Google AdSense script, and we do not set advertising cookies, until you have actively accepted advertising cookies through our consent banner.
          </strong>
        </p>
        <p>
          If you accept, Google may set advertising cookies (including the DoubleClick cookie) and serve personalised advertising based on your prior visits to this and other websites. If you reject, we will not load the AdSense script at all, no advertising cookies will be set, and the Site will continue to work exactly as before with no loss of functionality.
        </p>
        <p>
          Because the advertising script is loaded only after acceptance, you can change your mind at any time without reloading the page.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">6. Managing Your Cookie Choices</h2>
        <p>
          You can change your decision at any time using the <strong className="text-primary">&ldquo;Cookie Settings&rdquo;</strong> link in our footer. This reopens the consent banner so you can accept or reject advertising cookies again. Your choice is stored on your device and will be respected on future visits to the Site.
        </p>
        <p>
          You can also delete or block cookies directly through your browser settings. Most browsers allow you to block third-party cookies, delete existing cookies, and clear browsing history. Please note that blocking essential cookies may prevent parts of the Site from functioning correctly.
        </p>
        <p>
          If you want to exercise your right to object to or restrict processing, or to withdraw consent, you can also contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>. Under the UK GDPR you also have the right to complain to the Information Commissioner&rsquo;s Office at{' '}
          <a href="https://ico.org.uk" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">7. Third-Party Websites</h2>
        <p>
          Our content may link to third-party websites that set their own cookies. We do not control or take responsibility for cookies set by those sites, and this policy does not apply to them. Please review the privacy policy of any third-party site you visit.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">8. Changes to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. If we introduce new cookies or change how we use them, we will update this policy and, where required, ask for your consent again before setting them.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">9. Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy or about the cookies we use, contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a> or visit our{' '}
          <Link href="/contact" className="text-accent underline font-semibold">Contact page</Link>. You may also read our{' '}
          <Link href="/privacy-policy" className="text-accent underline font-semibold">Privacy Policy</Link> for more detail on how we handle personal data.
        </p>
      </section>
    </article>
  );
}