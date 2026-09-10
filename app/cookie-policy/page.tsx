import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Usman Trades Data Usage',
  description: 'Read our cookie policy for Usman Trades. Learn about the types of cookies we use, including essential, analytics, and advertising cookies.',
  alternates: {
    canonical: '/cookie-policy',
  },
};

export default function CookiePolicy() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Cookie Policy</h1>
        <p className="text-sm text-secondary">Effective Date: January 2026</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device (computer or mobile) when you visit our website. They help us understand how you use our site, improve your experience, and serve relevant advertisements.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Types of Cookies We Use</h2>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-900">Essential Cookies</h3>
          <p>These cookies are strictly necessary for our website to function. They enable core features such as page navigation, secure access to areas, and basic functionality. Our website cannot operate properly without these cookies.</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-900">Analytics Cookies</h3>
          <p>We use analytics cookies to understand how visitors interact with our website. These cookies help us track which pages are visited, how long users stay on each page, and where they click. This data helps us improve our educational content and tools.</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-900">Advertising Cookies</h3>
          <p>We use advertising cookies, including Google AdSense cookies, to deliver ads that are relevant to your interests. These cookies track your interactions with ads and help us and our advertising partners serve more targeted advertisements across the internet.</p>
        </div>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Third-Party Cookies</h2>
        <p>
          Our website may contain cookies from third-party service providers, including Google LLC (for advertising via Google AdSense), and other analytics platforms. These third parties may use this information to build a profile of your interests and show you relevant ads on other websites.
        </p>
        <p>
          Google AdSense uses the DoubleClick cookie to enable Google and our advertising partners to serve ads based on your past visits to this site or other sites on the Internet.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Your Cookie Choices</h2>
        <p>
          You have the right to choose whether to accept or decline cookies. You can set your browser preferences to accept all cookies, notify you when a cookie is issued, or reject all cookies. Please note that disabling essential cookies may prevent our website from functioning correctly.
        </p>
        <p>
          You can manage your cookie preferences at any time by clicking the cookie consent banner at the bottom of our website. You can also clear your browser cookies manually through your browser settings.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. How to Control Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through the browser settings. You can review and delete cookies from your device at any time. Please visit your browser&rsquo;s help documentation for more information on how to manage cookies.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">6. Changes to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">7. Contact Information</h2>
        <p>
          If you have any questions or require clarification regarding our cookie practices, you can contact us at: <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
