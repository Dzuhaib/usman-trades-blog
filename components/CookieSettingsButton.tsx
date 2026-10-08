'use client';

import { openConsentBanner } from '@/lib/adsense-consent';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="text-[11px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wider transition-colors bg-transparent border-0 cursor-pointer p-0"
    >
      Cookie Settings
    </button>
  );
}