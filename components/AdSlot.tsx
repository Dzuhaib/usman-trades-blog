'use client';

import { useRef } from 'react';

export default function AdSlot({
  slot,
  className = '',
}: {
  slot: string;
  className?: string;
}) {
  return (
    <div className={`my-4 mx-auto max-w-[728px] ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5017133932206570"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
