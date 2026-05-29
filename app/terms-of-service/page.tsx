import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Usman Trades Usage Agreement',
  description: 'Read the Terms of Service governing your use of Usman Trades. Understand your responsibilities when using our free Forex, Gold, and Bitcoin trading calculators and educational resources.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfService() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Terms of Service</h1>
        <p className="text-sm text-secondary">Effective Date: January 2026</p>
      </header>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">1. Agreement to Terms</h2>
        <p>
          By accessing and using the website www.usmantrades.co.uk (the "Site"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our utility tools or educational resources.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">2. Description of Service</h2>
        <p>
          Usman Trades provides free access to financial calculators, trading educational materials, and market commentary. These resources are delivered fully client-side as-is. We reserve the right to modify, suspend, or discontinue any utility tool or article at any time without prior notice.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">3. User Responsibility and Account Limits</h2>
        <p>
          Users are solely responsible for verifying the accuracy of all parameters, lot sizes, contract specifications, and risk metrics generated on the site before executing any live market transactions.
        </p>
        <p>
          You agree not to use automated scripts, scrapers, or framing techniques to replicate our calculators or copy our educational content without explicit written consent from the site administration.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">4. Intellectual Property</h2>
        <p>
          The original guides, layout, calculations, script logic, and content are the sole property of Usman Trades. You may reference our guides or links for personal, non-commercial educational use only.
        </p>
      </section>

      <section className="space-y-4 text-secondary leading-relaxed">
        <h2 className="text-xl font-bold text-primary">5. Contact Information</h2>
        <p>
          Inquiries regarding our terms of service can be submitted directly to: <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-accent underline font-semibold">zuhaibahmed3213951@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}
