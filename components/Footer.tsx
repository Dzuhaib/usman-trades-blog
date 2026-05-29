import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-100 bg-slate-50 mt-auto">
      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Column 1: Mission */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xl font-bold text-slate-900 block font-serif italic">Usman Trades<span className="text-accent not-italic">.</span></span>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              We provide practical, math-based trading education and professional-grade risk management tools. Our mission is to simplify the complexities of the financial markets for traders at all levels.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase block">Platform</span>
              <ul className="list-none p-0 m-0 space-y-2.5">
                <li><Link href="/" className="text-sm text-slate-500 hover:text-accent no-underline font-medium transition-colors">Home</Link></li>
                <li><Link href="/blog" className="text-sm text-slate-500 hover:text-accent no-underline font-medium transition-colors">Library</Link></li>
                <li><Link href="/tools" className="text-sm text-slate-500 hover:text-accent no-underline font-medium transition-colors">Trading Tools</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase block">About</span>
              <ul className="list-none p-0 m-0 space-y-2.5">
                <li><Link href="/about" className="text-sm text-slate-500 hover:text-accent no-underline font-medium transition-colors">Our Mission</Link></li>
                <li><Link href="/contact" className="text-sm text-slate-500 hover:text-accent no-underline font-medium transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <span className="text-[10px] font-black text-slate-900 tracking-[0.2em] uppercase block">Get In Touch</span>
            <p className="text-sm text-slate-500">
              Editorial & Support:<br />
              <a href="mailto:zuhaibahmed3213951@gmail.com" className="text-slate-900 font-bold hover:text-accent transition-colors no-underline">zuhaibahmed3213951@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Area: Legal Links */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {currentYear} Usman Trades. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
            <Link href="/privacy-policy" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 no-underline uppercase tracking-wider transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 no-underline uppercase tracking-wider transition-colors">Risk Disclaimer</Link>
            <Link href="/terms-of-service" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 no-underline uppercase tracking-wider transition-colors">Terms of Service</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-300 leading-normal max-w-2xl mx-auto">
            Trading involves significant risk. All tools and content are for educational purposes only. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
