import type { Metadata } from 'next';
import Link from 'next/link';

const LAST_UPDATED = 'October 2026';

export const metadata: Metadata = {
  title: 'Privacy Policy | Usman Trades Data and Advertising Practices',
  description: 'Read the privacy policy of Usman Trades. Learn how we handle cookies, Google AdSense and DoubleClick advertising cookies, analytics, and personal data under UK GDPR.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-secondary">Last updated: {LAST_UPDATED}</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <p>
          This Privacy Policy explains how <strong className="text-primary">Usman Trades</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and shares information when you visit{' '}
          <a href="https://usmantrades.co.uk" className="text-accent underline font-semibold">usmantrades.co.uk</a> (the &ldquo;Site&rdquo;). It also explains the choices you have regarding our use of cookies and advertising technologies.
        </p>
        <p>
          We have designed this policy to be transparent about data practices, including the advertising cookies used by Google AdSense. We are not a financial institution and we do not sell, trade, or rent your personal information.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. Who We Are and How to Contact Us</h2>
        <p>
          Usman Trades is an independent trading education platform. The data controller responsible for your personal data under the UK GDPR and EU GDPR is <strong className="text-primary">Muhammad Usman</strong>, based in DHA Phase 5, Karachi, Pakistan.
        </p>
        <p>
          If you have any questions about this policy or wish to exercise any of your rights, you can contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a> or by phone on{' '}
          <a href="tel:+923390349804" className="text-accent underline font-semibold">+923390349804</a>. We aim to respond to all data requests within 30 days.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Information We Collect</h2>
        <p>
          We do not require account registration, email sign-ups, or personal logins to access our tools or guides. This means we do not ask for your name, address, payment details, or identity documents.
        </p>
        <p>
          We do collect limited technical information automatically through your browser when you visit the Site. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your IP address (which may be truncated or anonymised by our hosting provider).</li>
          <li>Your browser type, device type, and operating system.</li>
          <li>Referring pages and the pages you navigate to on our Site.</li>
          <li>The approximate region or country derived from your IP address.</li>
        </ul>
        <p>
          This information is collected through our hosting server logs and standard web technologies. We use it to keep the Site secure, to measure traffic and performance, and to improve our content. It is not used to build a profile of you for our own purposes.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. Calculator Inputs Remain on Your Device</h2>
        <p>
          Every calculator on Usman Trades operates entirely client-side using JavaScript. Any account balance, lot size, contract specification, exchange rate, stop-loss distance, or position value you enter into our risk, pip, profit, or position sizing tools stays entirely inside your browser.
        </p>
        <p>
          <strong className="text-primary">Your calculator inputs are not transmitted to, stored on, or reviewed by our servers.</strong> We do not know what you type into our tools.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Advertising and Google AdSense</h2>
        <p>
          We use <strong className="text-primary">Google AdSense</strong> to display advertisements on the Site. Google AdSense allows us to earn revenue by displaying ads. When you view or click an advertisement, your browser may contact Google or its partners directly (not through us), and Google and its partners may use cookies or similar technologies to serve and measure ads.
        </p>

        <h3 className="font-bold text-primary">4.1 Third-Party Vendors and Advertising Cookies</h3>
        <p>
          <strong className="text-primary">Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to your website or other websites.</strong>
        </p>
        <p>
          Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site(s) and/or other sites on the Internet.
        </p>
        <p>
          Google AdSense also uses third-party advertising cookies to serve ads based on your visit to this and other websites. You can opt out of personalised advertising at any time through the links in{' '}
          <a href="https://support.google.com/adsense/answer/1348695?hl=en-GB" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google Ads Settings</a> or by visiting{' '}
          <a href="https://www.aboutads.info/choices/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">www.aboutads.info</a>.
        </p>

        <h3 className="font-bold text-primary">4.2 Google-Specific Disclosures</h3>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s previous visits to your website or other websites. Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site(s) and/or other sites on the Internet.
        </p>
        <p>
          If you have not opted out of third-party ad serving, the cookies of other third-party vendors or ad networks may also be used to serve ads on our site. These may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://policies.google.com/technologies/ads" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google</a> &mdash; Advertising cookies, including the DoubleClick cookie, used to serve ads based on your prior visits.
          </li>
          <li>
            <a href="https://www.aboutads.info" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">aboutads.info</a> &mdash; A resource for opting out of participating vendors&rsquo; use of cookies for personalised advertising.
          </li>
        </ul>
        <p>
          You may visit the websites of any participating third-party vendor or ad network listed above to opt out of the use of cookies for personalised advertising, where that vendor offers that capability. Opting out of personalised advertising does not mean you will no longer see advertisements; it means that the advertisements you see may be less relevant to you.
        </p>
        <p>
          Google&rsquo;s use of advertising cookies is described in more detail at{' '}
          <a href="https://policies.google.com/technologies/ads?hl=en-GB" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">policies.google.com/technologies/ads</a>. You can also manage how Google uses data from sites and apps that use its services at{' '}
          <a href="https://myadcenter.google.com/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google My Ad Center</a>, which lets you change your ad settings and delete your advertiser profile.
        </p>

        <h3 className="font-bold text-primary">4.3 How Google Shares Data With Us</h3>
        <p>
          When Google serves an advertisement on our Site, your browser may send your IP address and advertising cookie(s) directly to Google, and Google may use this information to serve the ad, measure the ad&rsquo;s performance, and determine whether you have interacted with it. We do not receive your name, email address, or contact details from Google, and we do not control what Google does with this data. Google&rsquo;s handling of it is governed by the{' '}
          <a href="https://policies.google.com/technologies/ads" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google Privacy &amp; Terms</a> and the{' '}
          <a href="https://policies.google.com/privacy" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google Privacy Policy</a>.
        </p>

        <h3 className="font-bold text-primary">4.4 Advertising and Your Rights (EEA, UK, and US)</h3>
        <p>
          If you are in the European Economic Area, the United Kingdom, or Switzerland, you have the right not to be subject to personalised advertising, and to object to or restrict processing of your data. You may exercise these rights through{' '}
          <a href="https://www.aboutads.info/choices/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">aboutads.info/choices</a> or Google Ads Settings, as described above.
        </p>
        <p>
          Certain US states also provide the right to opt out of the sale or sharing of personal information for targeted advertising. Google supports the Global Privacy Control (GPC). If your browser sends a GPC signal, Google will limit the use of your data for personalised advertising where required by law. To manage this preference directly, visit{' '}
          <a href="https://myadcenter.google.com/" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer nofollow">Google My Ad Center</a>.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. How We Use Cookies and Your Consent</h2>
        <p>
          We use cookies and similar technologies for the purposes set out in our{' '}
          <Link href="/cookie-policy" className="text-accent underline font-semibold">Cookie Policy</Link>, which forms part of this policy. In summary, we and our third-party partners use cookies for essential site operation, to understand aggregate usage, and to serve advertising.
        </p>
        <p>
          <strong className="text-primary">Where required by law (including the UK GDPR and the ePrivacy Rules), we will only set non-essential cookies, including advertising cookies, after you give us consent.</strong> You can accept or reject non-essential cookies using the consent banner when you first visit the Site, and you can change your mind at any time afterwards using the &ldquo;Cookie Settings&rdquo; link in our footer.
        </p>
        <p>
          If you do not consent to advertising cookies, the Site will still function normally and all of our calculators and guides will remain fully available. We will not serve personalised advertising on the basis of your prior browsing without your agreement.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">6. Legal Bases for Processing (UK GDPR)</h2>
        <p>Where the UK GDPR or EU GDPR applies, we rely on the following legal bases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-primary">Legitimate interests</strong> &mdash; for securing the Site, understanding aggregate usage, and improving our content. We have assessed that this does not override your rights and freedoms given the limited nature of the data.
          </li>
          <li>
            <strong className="text-primary">Consent</strong> &mdash; for setting non-essential and advertising cookies, and for any personalised advertising, where required by law. You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.
          </li>
          <li>
            <strong className="text-primary">Compliance with a legal obligation</strong> &mdash; where we are required to retain or disclose information.
          </li>
        </ul>
        <p>
          Where we rely on legitimate interests, you have the right to object to that processing. Where we rely on consent, you have the right to withdraw it at any time.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">7. How We Share Information</h2>
        <p>We share limited information only with the following categories of recipients:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-primary">Advertising partners</strong> &mdash; Google AdSense, which may receive your IP address and advertising cookies as described in Section 4. We do not share personal information with other ad networks.
          </li>
          <li>
            <strong className="text-primary">Hosting and infrastructure providers</strong> &mdash; our hosting provider processes server logs on our behalf to keep the Site online.
          </li>
          <li>
            <strong className="text-primary">Professional advisers and authorities</strong> &mdash; where we are legally required to disclose information.
          </li>
        </ul>
        <p>
          We do not sell your personal information. We do not share personal information with third parties for their own independent marketing purposes.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">8. International Data Transfers</h2>
        <p>
          Our hosting and advertising partners operate globally. Your information may therefore be processed outside the United Kingdom or European Economic Area, including in the United States. Where data is transferred outside the UK/EEA, we rely on an appropriate safeguard such as the UK International Data Transfer Addendum or the EU Standard Contractual Clauses, together with a transfer risk assessment. You may request details of the safeguards used by contacting us.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">9. Data Retention</h2>
        <p>
          We do not store your personal account data, because we do not ask for it and you do not create an account. Server logs are retained for a maximum of 30 days for security and aggregate analytics purposes, after which they are deleted. Any data handled on your behalf by an advertising partner is subject to that partner&rsquo;s own retention policy.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">10. Your Rights</h2>
        <p>
          Under the UK GDPR and EU GDPR you have the right to access, rectify, erase, restrict, or object to the processing of your personal data, to data portability, and to withdraw consent at any time. You also have the right to lodge a complaint with your supervisory authority &mdash; in the UK, the Information Commissioner&rsquo;s Office (<a href="https://ico.org.uk" className="text-accent underline font-semibold" target="_blank" rel="noopener noreferrer">ico.org.uk</a>).
        </p>
        <p>
          In practice, because we operate a site with no user accounts and our calculators run entirely in your browser, the personal data we hold is limited to short-lived server logs. If you would like us to delete any log data associated with you, or you want to withdraw consent for advertising cookies, contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a> and we will action your request.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">11. Children&rsquo;s Privacy</h2>
        <p>
          The Site is not directed to children under the age of 13, and we do not knowingly collect personal information from them. Because this site relates to trading and financial markets, users must be 18 or older to rely on its content. If you are under 18, please do not use the Site or provide any personal information. If you believe a child has provided us with personal information, contact us and we will delete it.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">12. Third-Party Links</h2>
        <p>
          Our articles and disclaimer may link to third-party websites. We do not control these sites and we are not responsible for their content, privacy practices, or technical accuracy. A link to a third-party site does not imply endorsement or recommendation, and you should review the privacy policy of any third-party site you visit.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">13. Security</h2>
        <p>
          The Site is served over HTTPS. We apply reasonable technical and organisational measures to protect the Site, but no method of transmission or storage is completely secure. We cannot guarantee the absolute security of data transmitted over the internet.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time, for example to reflect changes in our practices or in legal requirements. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically. Continuing to use the Site after changes are published constitutes acceptance of the updated policy.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">15. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, contact us at{' '}
          <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a> or visit our{' '}
          <Link href="/contact" className="text-accent underline font-semibold">Contact page</Link>. For information about the educational content we publish, please also see our{' '}
          <Link href="/editorial-policy" className="text-accent underline font-semibold">Editorial Policy</Link> and{' '}
          <Link href="/disclaimer" className="text-accent underline font-semibold">Risk Disclaimer</Link>.
        </p>
      </section>
    </article>
  );
}