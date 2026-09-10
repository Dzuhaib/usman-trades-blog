import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Usman Trades Data Practices',
  description: 'Read the privacy policy of Usman Trades. All calculators run locally in your browser. We explain how we handle cookies, analytics, and user data on our trading education platform.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-secondary">Effective Date: January 2026</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. Information We Collect</h2>
        <p>
          Usman Trades is designed to operate primarily client-side. We do not require account registration, email sign-ups, or personal logins to access our tools or guides.
        </p>
        <p>
          We do collect basic analytical data through server logs and standard cookies to analyze site traffic, monitor loading performance, and deliver relevant advertisements (such as Google AdSense).
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Data Controller</h2>
        <p>
          The data controller for Usman Trades is MUHAMMAD USMAN, located at usmantrades.co.uk. For any data protection inquiries, please contact us at <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Use of Cookies and Ads</h2>
        <p>
          We utilize standard cookies to store basic user preferences (such as language or inputs) and to serve advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this website or other websites on the Internet.
        </p>
        <p>
          Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">Google Ads Settings</a>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Your Consent and Cookie Choices</h2>
        <p>
          By using our website, you consent to our use of cookies as described in our Cookie Policy. You have the right to withdraw consent at any time by adjusting your browser settings or using our cookie consent banner.
        </p>
        <p>
          Essential cookies are necessary for the website to function and cannot be disabled. You may reject non-essential cookies (analytics, advertising) through the cookie consent banner at the bottom of our website.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. Data Retention</h2>
        <p>
          We do not store any personal data on our servers. All calculator tools operate entirely client-side in your browser. Server logs are retained for a maximum of 30 days for security and analytics purposes only.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">6. Data Integrity and Client-Side Logic</h2>
        <p>
          Every calculator on Usman Trades operates fully client-side using JavaScript. Any numbers, variables, exchange parameters, or position sizes you input into the lot size or risk tools remain entirely inside your browser. They are not transmitted, stored, or reviewed on our servers.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">7. Children&rsquo;s Privacy</h2>
        <p>
          Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, please do not use our website or provide any personal information.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">8. Your Rights</h2>
        <p>
          Under GDPR, you have the right to access, rectify, and erase your personal data, as well as the right to restrict processing, object to processing, and data portability. Since we do not collect personal data, these rights primarily relate to any server log information we may collect.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">9. Contact Information</h2>
        <p>
          If you have any questions or require clarification regarding our data practices, you can contact us at: <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
