'use client';

import { useEffect, useSyncExternalStore } from 'react';
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  loadAdSenseScript,
  removeAdSenseScript,
  subscribeConsent,
} from '@/lib/adsense-consent';

export default function AdSenseScript() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  useEffect(() => {
    if (consent === 'accepted') {
      loadAdSenseScript();
    } else {
      removeAdSenseScript();
    }
  }, [consent]);

  return null;
}