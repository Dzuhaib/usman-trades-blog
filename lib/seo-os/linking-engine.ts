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
  
  // Sort by keyword length descending to match longer phrases first (e.g., "lot size calculator" before "lot size")
  const sortedLinks = [...LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);

  const linkedKeywords = new Set<string>();

  for (const link of sortedLinks) {
    const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
    
    // Check if keyword exists and hasn't been linked yet in this text
    if (regex.test(result) && !linkedKeywords.has(link.keyword)) {
      // Very simple injection - in a real app, this would need to be much more robust 
      // (e.g., not injecting inside existing <a> tags or HTML attributes)
      result = result.replace(regex, `<a href="${link.href}" class="text-accent hover:underline font-medium">${link.label}</a>`);
      linkedKeywords.add(link.keyword);
    }
  }

  return result; 
}
