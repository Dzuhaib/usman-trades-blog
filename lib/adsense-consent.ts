export const ADSENSE_CLIENT = 'ca-pub-5017133932206570';
export const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
export const CONSENT_KEY = 'cookie_consent';

export type ConsentValue = 'accepted' | 'declined';

const CONSENT_EVENT = 'cookie-consent-change';
const OPEN_EVENT = 'open-cookie-consent';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

export function readConsent(): ConsentValue | null {
  if (!hasWindow()) return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function subscribeConsent(onChange: () => void): () => void {
  if (!hasWindow()) return () => {};
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener(OPEN_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener(OPEN_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function getConsentSnapshot(): ConsentValue | null {
  return readConsent();
}

export function getConsentServerSnapshot(): null {
  return null;
}

export function writeConsent(value: ConsentValue): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

export function openConsentBanner(): void {
  if (!hasWindow()) return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function loadAdSenseScript(): void {
  if (!hasWindow()) return;
  if (document.getElementById('adsense-script')) return;

  const script = document.createElement('script');
  script.id = 'adsense-script';
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = ADSENSE_SRC;
  document.head.appendChild(script);
}

export function removeAdSenseScript(): void {
  if (!hasWindow()) return;
  const script = document.getElementById('adsense-script');
  if (script) {
    script.remove();
    document.getElementById('google_ads_container_slot')?.remove();
  }
}