import type { Metadata } from 'next';
import { InstagramIcon, FacebookIcon } from '@/components/SocialIcons';

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/joyfx.official/',
    label: 'Instagram',
    handle: '@joyfx.official',
    icon: InstagramIcon,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61588218661763',
    label: 'Facebook',
    handle: 'Usman Trades',
    icon: FacebookIcon,
  },
];

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
            <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-1">Phone</span>
            <a href="tel:+923390349804" className="text-lg font-bold text-accent hover:underline">
              +923390349804
            </a>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-1">Availability</span>
            <p className="text-sm text-secondary">
              We typically review incoming inquiries within 24–48 hours, Monday through Friday, GMT.
            </p>
          </div>
        </div>

        <div className="border border-border p-6 rounded-[4px] bg-surface space-y-4">
          <span className="text-xs font-semibold text-muted tracking-wider uppercase block">Follow Us</span>
          <div className="flex flex-col sm:flex-row gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-border px-4 py-3 rounded-[4px] hover:border-accent transition-colors no-underline"
              >
                <social.icon className="w-5 h-5 text-accent" />
                <span>
                  <span className="block text-sm font-bold text-primary">{social.label}</span>
                  <span className="block text-xs text-muted">{social.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Please note: We strictly ignore requests for signal selling collaborations, premium account management inquiries, affiliate partnership proposals with unlicensed brokers, and speculative crypto trading signals distribution.
        </p>
      </section>
    </article>
  );
}
