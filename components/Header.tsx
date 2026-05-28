'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Calculator, ShieldAlert, BarChart3, TrendingUp } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { 
    href: '/tools', 
    label: 'Tools',
    submenu: [
      { href: '/tools/lot-size-calculator', label: 'Lot Size Calculator', icon: Calculator },
      { href: '/tools/risk-calculator', label: 'Risk Calculator', icon: ShieldAlert },
      { href: '/tools/pip-calculator', label: 'Pip Calculator', icon: BarChart3 },
      { href: '/tools/profit-calculator', label: 'Profit Calculator', icon: TrendingUp },
    ]
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full border-b border-border bg-white sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-extrabold text-primary no-underline tracking-tight hover:opacity-90 transition-opacity">
          Usman Trades<span className="text-accent font-black">.</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5 md:hidden justify-center items-center rounded-md hover:bg-surface transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span className={`block h-[2px] w-[22px] bg-primary transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
          <span className={`block h-[2px] w-[22px] bg-primary transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-[2px] w-[22px] bg-primary transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isDropdown = !!link.submenu;

            return isDropdown ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-[0.9375rem] font-medium no-underline transition-all duration-200 relative py-4 hover:text-primary ${
                    active ? 'text-accent font-semibold' : 'text-secondary'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full animate-fade-in" />
                  )}
                </Link>
                
                {/* Desktop Submenu Dropdown */}
                <div className="absolute top-full left-0 w-64 bg-white border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 space-y-1">
                    {link.submenu!.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-slate-50 text-sm font-medium text-secondary hover:text-primary transition-colors no-underline"
                      >
                        <sub.icon className="w-4 h-4 text-accent" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.9375rem] font-medium no-underline transition-all duration-200 relative py-4 hover:text-primary ${
                  active ? 'text-accent font-semibold' : 'text-secondary'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full animate-fade-in" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-border bg-white px-4 pb-4 md:hidden animate-slide-down">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            
            return (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => !link.submenu && setMenuOpen(false)}
                  className={`block py-3 text-[0.9375rem] font-medium no-underline border-b border-border last:border-b-0 transition-colors duration-150 ${
                    active ? 'text-accent font-semibold' : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="pl-4 py-2 space-y-2 border-b border-border">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 py-2 text-sm text-secondary hover:text-primary no-underline"
                      >
                        <sub.icon className="w-4 h-4 text-accent" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
