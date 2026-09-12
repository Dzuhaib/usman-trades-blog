'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
      setAccepted(true);
    }
  }, []);

  if (accepted) return null;

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setAccepted(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setAccepted(true);
  };

  return (
<div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white p-3 md:p-6 shadow-2xl">
       <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
         <div className="space-y-1.5">
           <p className="text-sm font-bold">We use cookies to enhance your browsing experience.</p>
           <p className="text-xs text-slate-400 leading-relaxed">
             By clicking &ldquo;Accept All,&rdquo; you consent to our use of cookies as described in our{' '}
             <a href="/cookie-policy" className="text-accent underline">Cookie Policy</a> and{' '}
             <a href="/privacy-policy" className="text-accent underline">Privacy Policy</a>.
           </p>
         </div>
         <div className="flex flex-wrap gap-2">
           <button
             onClick={handleAccept}
             className="bg-accent text-slate-900 font-bold px-5 py-2.5 rounded text-sm hover:bg-accent-dark transition-colors min-h-[44px] flex items-center"
           >
             Accept All
           </button>
           <button
             onClick={handleDecline}
             className="border border-white/30 text-white font-bold px-5 py-2.5 rounded text-sm hover:bg-white/10 transition-colors min-h-[44px] flex items-center"
           >
             Reject Non-Essential
           </button>
         </div>
       </div>
     </div>
  );
}
