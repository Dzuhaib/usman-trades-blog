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
        <h2 className="text-xl font-bold text-primary">2. Use of Cookies and Ads</h2>
        <p>
          We utilize standard cookies to store basic user preferences (such as language or inputs) and to serve advertisements. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
        </p>
        <p>
          Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google Ads Settings.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Data Integrity and Client-Side Logic</h2>
        <p>
          Every calculator on Usman Trades operates fully client-side using JavaScript. Any numbers, variables, exchange parameters, or position sizes you input into the lot size or risk tools remain entirely inside your browser. They are not transmitted, stored, or reviewed on our servers.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Contact Information</h2>
        <p>
          If you have any questions or require clarification regarding our data practices, you can contact us at: <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
