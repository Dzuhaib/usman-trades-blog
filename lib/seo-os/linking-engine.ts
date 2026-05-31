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
  { keyword: "lot size", href: "/tools/lot-size-calculator", label: "Lot Size Calculator" },
  { keyword: "position sizing", href: "/tools/lot-size-calculator", label: "Position Sizing Tool" },
  { keyword: "risk management", href: "/blog/posts/best-risk-percentage", label: "Risk Management Guide" },
  { keyword: "stop loss", href: "/tools/risk-calculator", label: "Risk Calculator" },
  { keyword: "pip value", href: "/tools/pip-calculator", label: "Pip Value Estimator" },
  { keyword: "profit", href: "/tools/profit-calculator", label: "Profit Projection Tool" },
  { keyword: "gold", href: "/blog/posts/xauusd-guide", label: "Gold Trading Guide" },
  { keyword: "bitcoin", href: "/blog/posts/bitcoin-risk-management", label: "Bitcoin Risk Guide" },
  { keyword: "drawdown", href: "/tools/drawdown-calculator", label: "Drawdown Calculator" },
  { keyword: "compound", href: "/tools/compound-growth-calculator", label: "Compound Growth Tool" },
  { keyword: "margin", href: "/tools/margin-calculator", label: "Margin Calculator" },
  { keyword: "spread", href: "/tools/spread-cost-calculator", label: "Spread Cost Tool" },
  { keyword: "session", href: "/tools/session-timer", label: "Market Session Timer" },
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
