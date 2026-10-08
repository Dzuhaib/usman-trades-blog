'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
  writeConsent,
} from '@/lib/adsense-consent';

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white p-3 md:p-6 shadow-2xl"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-sm font-bold">We use cookies, including advertising cookies.</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            We use Google AdSense to display ads. Google and its partners may use cookies to serve ads based on your prior visits to this and other sites. You can accept or reject these cookies, and change your mind at any time via &ldquo;Cookie Settings&rdquo; in the footer. See our{' '}
            <Link href="/cookie-policy" className="text-accent underline">Cookie Policy</Link> and{' '}
            <Link href="/privacy-policy" className="text-accent underline">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => writeConsent('declined')}
            className="border border-white/30 text-white font-bold px-5 py-2.5 rounded text-sm hover:bg-white/10 transition-colors min-h-[44px] flex items-center"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={() => writeConsent('accepted')}
            className="bg-accent text-slate-900 font-bold px-5 py-2.5 rounded text-sm hover:bg-accent-dark transition-colors min-h-[44px] flex items-center"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}