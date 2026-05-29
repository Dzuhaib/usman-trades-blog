'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Calculator, ShieldCheck, BarChart3, TrendingUp, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Library' },
  { 
    href: '/tools', 
    label: 'Trading Tools',
    submenu: [
      { href: '/tools/lot-size-calculator', label: 'Lot Size Calculator', icon: Calculator },
      { href: '/tools/risk-calculator', label: 'Risk & Invalidation', icon: ShieldCheck },
      { href: '/tools/pip-calculator', label: 'Pip Value Estimator', icon: BarChart3 },
      { href: '/tools/profit-calculator', label: 'Profit & Loss Projection', icon: TrendingUp },
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
    <header className="w-full border-b border-slate-100 bg-white sticky top-0 z-50 transition-all duration-300">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold text-slate-900 no-underline tracking-tight hover:opacity-80 transition-opacity font-serif italic">
          Usman Trades<span className="text-accent not-italic">.</span>
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 text-slate-900 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const isDropdown = !!link.submenu;

            return isDropdown ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-bold no-underline transition-all duration-200 py-2 hover:text-accent ${
                    active ? 'text-accent' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                
                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top translate-y-2 group-hover:translate-y-0">
                  <div className="p-3 space-y-1">
                    {link.submenu!.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 hover:text-accent transition-colors no-underline"
                      >
                        <sub.icon className="w-4 h-4 text-slate-400 group-hover:text-accent" />
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
                className={`text-sm font-bold no-underline transition-all duration-200 py-2 hover:text-accent ${
                  active ? 'text-accent' : 'text-slate-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-6 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              
              return (
                <div key={link.href} className="space-y-2">
                  <Link
                    href={link.href}
                    onClick={() => !link.submenu && setMenuOpen(false)}
                    className={`block py-2 text-base font-bold no-underline transition-colors ${
                      active ? 'text-accent' : 'text-slate-900 hover:text-accent'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.submenu && (
                    <div className="pl-4 space-y-3 border-l-2 border-slate-50 py-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 py-1 text-sm text-slate-500 font-bold hover:text-accent no-underline"
                        >
                          <sub.icon className="w-4 h-4 text-slate-300" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
