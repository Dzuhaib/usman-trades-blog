import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column: Mission */}
          <div>
            <span className="text-lg font-bold text-primary block mb-3">Usman Trades</span>
            <p className="text-sm text-secondary leading-relaxed">
              A professional financial education and utility tools platform. Delivering clear, actionable, and mathematically accurate insights without speculative hype.
            </p>
          </div>

          {/* Middle Column: Nav Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-3">Platform</span>
              <ul className="list-none p-0 m-0 space-y-2">
                <li><Link href="/" className="text-sm text-secondary hover:text-primary no-underline transition-none">Home</Link></li>
                <li><Link href="/blog" className="text-sm text-secondary hover:text-primary no-underline transition-none">Blog</Link></li>
                <li><Link href="/tools" className="text-sm text-secondary hover:text-primary no-underline transition-none">Trading Tools</Link></li>
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-3">Company</span>
              <ul className="list-none p-0 m-0 space-y-2">
                <li><Link href="/about" className="text-sm text-secondary hover:text-primary no-underline transition-none">About</Link></li>
                <li><Link href="/contact" className="text-sm text-secondary hover:text-primary no-underline transition-none">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact info / trust disclosures */}
          <div>
            <span className="text-xs font-semibold text-muted tracking-wider uppercase block mb-3">Contact & Legal</span>
            <p className="text-sm text-secondary mb-2">
              Email: <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-primary hover:text-accent transition-none">zuhaibahmed3213951@gmail.com</a>
            </p>
            <p className="text-[11px] text-muted leading-normal">
              High-risk trading education platform. All calculations and content are for educational purposes only. No trading guarantees.
            </p>
          </div>
        </div>

        {/* Bottom Area: Legal Links */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {currentYear} Usman Trades. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="text-xs text-muted hover:text-primary no-underline transition-none">Privacy Policy</Link>
            <Link href="/disclaimer" className="text-xs text-muted hover:text-primary no-underline transition-none">Disclaimer</Link>
            <Link href="/terms-of-service" className="text-xs text-muted hover:text-primary no-underline transition-none">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
