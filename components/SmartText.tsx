import React from 'react';
import Link from 'next/link';
import { LINK_MAP } from '@/lib/seo-os/linking-engine';

export default function SmartText({ text }: { text: string }) {
  if (!text) return null;

  // Simple implementation: only link the first occurrence of any keyword
  let parts: (string | React.ReactNode)[] = [text];
  const linkedKeywords = new Set<string>();

  // Sort by length descending to match longer phrases first
  const sortedLinks = [...LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);

  for (const link of sortedLinks) {
    if (linkedKeywords.has(link.keyword)) continue;

    const newParts: (string | React.ReactNode)[] = [];
    let keywordFound = false;

    for (const part of parts) {
      if (typeof part !== 'string' || keywordFound) {
        newParts.push(part);
        continue;
      }

      const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
      const match = part.match(regex);

      if (match) {
        const index = match.index!;
        const before = part.substring(0, index);
        const keyword = part.substring(index, index + match[0].length);
        const after = part.substring(index + match[0].length);

        if (before) newParts.push(before);
        newParts.push(
          <Link 
            key={`${link.keyword}-${index}`} 
            href={link.href} 
            className="text-accent hover:underline font-medium"
          >
            {keyword}
          </Link>
        );
        if (after) newParts.push(after);
        
        keywordFound = true;
        linkedKeywords.add(link.keyword);
      } else {
        newParts.push(part);
      }
    }
    parts = newParts;
  }

  return <>{parts}</>;
}
