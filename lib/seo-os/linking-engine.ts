/**
 * SEO-OS Internal Linking Engine
 * Suggests contextual internal links based on content keywords.
 */

interface InternalLink {
  keyword: string;
  href: string;
  label: string;
}

export const LINK_MAP: InternalLink[] = [
  { keyword: "lot size calculator", href: "/tools/lot-size-calculator", label: "Lot Size Calculator" },
  { keyword: "risk management guide", href: "/blog/posts/best-risk-percentage", label: "Risk Management Guide" },
  { keyword: "pip value calculator", href: "/tools/pip-calculator", label: "Pip Value Estimator" },
  { keyword: "drawdown calculator", href: "/tools/drawdown-calculator", label: "Drawdown Calculator" },
  { keyword: "bitcoin risk guide", href: "/blog/posts/bitcoin-risk-management", label: "Bitcoin Risk Guide" },
];

export function getLinkSuggestions(text: string): InternalLink[] {
  const lowercaseText = text.toLowerCase();
  return LINK_MAP.filter(link => lowercaseText.includes(link.keyword));
}

export function injectContextualLinks(text: string): string {
  let result = text;
  
  // Sort by keyword length descending to match longer phrases first
  const sortedLinks = [...LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);

  const linkedKeywords = new Set<string>();
  let linksCount = 0;

  for (const link of sortedLinks) {
    if (linksCount >= 5) break;

    const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
    
    if (regex.test(result) && !linkedKeywords.has(link.keyword)) {
      // Use custom placeholder [LINK_URL:LABEL] instead of raw HTML
      // This will be parsed by SmartText to use Next.js <Link> tags
      result = result.replace(regex, `[LINK_${link.href}:${link.label}]`);
      linkedKeywords.add(link.keyword);
      linksCount++;
    }
  }

  return result; 
}
