import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Usman Trades | Get in Touch With Our Team',
  description: 'Contact the Usman Trades team for editorial inquiries, calculator suggestions, bug reports, or general questions about our free Forex, Gold, and Bitcoin trading education platform.',
  alternates: {
    canonical: '/contact',
  },
};

export default function Contact() {
  return (
    <article className="max-w-[640px] mx-auto space-y-8">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-2 md:text-4xl">Contact Usman Trades</h1>
        <p className="text-sm text-secondary">Get in touch directly with our team.</p>
      </header>

      <section className="space-y-6">
        <p className="text-secondary leading-relaxed">
          We welcome editorial feedback, suggestions for new trading tools, bug reports on calculations, and general educational inquiries.
        </p>

        <div className="border border-border p-6 rounded-[4px] bg-surface space-y-4">
          <div>
            <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-1">Direct Email Address</span>
            <a 
              href="mailto:zuhaibahmed3213951@gmail.com" 
              className="text-lg font-bold text-accent hover:underline break-all"
            >
              zuhaibahmed3213951@gmail.com
            </a>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-1">Availability</span>
            <p className="text-sm text-secondary">
              We typically review incoming inquiries within 24–48 hours, Monday through Friday, GMT.
            </p>
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Please note: We strictly ignore requests for signal selling collaborations, premium account management inquiries, affiliate partnership proposals with unlicensed brokers, and speculative crypto trading signals distribution.
        </p>
      </section>
    </article>
  );
}
