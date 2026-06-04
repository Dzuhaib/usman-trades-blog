import React from 'react';
import Link from 'next/link';
import { LINK_MAP } from '@/lib/seo-os/linking-engine';
import LotSizeCalculator from '@/app/tools/lot-size-calculator/LotSizeCalculator';
import RiskCalculator from '@/app/tools/risk-calculator/RiskCalculator';
import PipValueCalculator from '@/app/tools/pip-calculator/PipValueCalculator';
import MarginCalculator from '@/app/tools/margin-calculator/MarginCalculator';
import ProfitCalculator from '@/app/tools/profit-calculator/ProfitCalculator';

interface SmartTextProps {
  text: string;
}

const TOOL_COMPONENTS: Record<string, React.ReactNode> = {
  'lot-size-calculator': <LotSizeCalculator />,
  'risk-calculator': <RiskCalculator />,
  'pip-calculator': <PipValueCalculator />,
  'margin-calculator': <MarginCalculator />,
  'profit-calculator': <ProfitCalculator />,
};

export default function SmartText({ text }: SmartTextProps) {
  if (!text) return null;

  // Split text into blocks based on double newlines
  const blocks = text.split(/\n\n+/);

  const processText = (content: string) => {
    // 0. Ruthless Cleanup: Remove all LaTeX, raw HTML, and Markdown artifacts
    let cleanContent = content
      .replace(/\\\[|\\\]|\\text\{|\}/g, '') // Remove basic LaTeX
      .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '$1 / $2') // Convert fractions to plain division
      .replace(/\\times/g, 'x') // Convert times symbol to 'x'
      .replace(/\\/g, '') // Strip remaining backslashes
      .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1') // Strip raw <a> tags
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    let parts: (string | React.ReactNode)[] = [cleanContent];
    
    // 1. Handle Bold (**text**)
    let tempParts: (string | React.ReactNode)[] = [];
    for (const part of parts) {
      if (typeof part !== 'string') {
        tempParts.push(part);
        continue;
      }
      const segments = part.split(/(\*\*.*?\*\*)/);
      for (const segment of segments) {
        if (segment.startsWith('**') && segment.endsWith('**')) {
          tempParts.push(<strong key={Math.random()} className="font-bold text-slate-900">{segment.slice(2, -2)}</strong>);
        } else if (segment) {
          // Clean paragraph-level symbols like hashtags or stars
          tempParts.push(segment.replace(/[#*]/g, ''));
        }
      }
    }
    parts = tempParts;

    // 2. Handle Internal Link Placeholders [LINK_url:label]
    const linkParts: (string | React.ReactNode)[] = [];
    for (const part of parts) {
      if (typeof part !== 'string') {
        linkParts.push(part);
        continue;
      }

      const segments = part.split(/(\[LINK_.*?:.*?\])/);
      for (const segment of segments) {
        if (segment.startsWith('[LINK_') && segment.endsWith(']')) {
          const content = segment.slice(6, -1);
          const [href, label] = content.split(':');
          linkParts.push(
            <Link 
              key={Math.random()} 
              href={href} 
              className="text-accent hover:underline font-medium"
            >
              {label}
            </Link>
          );
        } else if (segment) {
          linkParts.push(segment);
        }
      }
    }
    parts = linkParts;

    // 3. Handle Auto-Keywords (Strict 5 total links limit)
    const sortedLinks = [...LINK_MAP].sort((a, b) => b.keyword.length - a.keyword.length);
    let autoLinksInjected = parts.filter(p => React.isValidElement(p)).length;

    for (const link of sortedLinks) {
      if (autoLinksInjected >= 5) break;

      let keywordFound = false;
      const nextParts: (string | React.ReactNode)[] = [];

      for (const part of parts) {
        if (typeof part !== 'string' || keywordFound) {
          nextParts.push(part);
          continue;
        }

        const regex = new RegExp(`\\b(${link.keyword})\\b`, 'i');
        const match = part.match(regex);

        if (match) {
          const index = match.index!;
          const before = part.substring(0, index);
          const keyword = part.substring(index, index + match[0].length);
          const after = part.substring(index + match[0].length);

          if (before) nextParts.push(before);
          nextParts.push(
            <Link 
              key={`${link.keyword}-${autoLinksInjected}`} 
              href={link.href} 
              className="text-accent hover:underline font-medium"
            >
              {keyword}
            </Link>
          );
          if (after) nextParts.push(after);
          
          keywordFound = true;
          autoLinksInjected++;
        } else {
          nextParts.push(part);
        }
      }
      parts = nextParts;
    }
    return parts;
  };

  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        
        // Headers
        if (trimmed.startsWith('# ')) {
          return <h1 key={idx} className="text-3xl md:text-5xl font-bold font-serif text-slate-900 leading-tight mt-12 mb-6">{processText(trimmed.replace('# ', ''))}</h1>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl md:text-3xl font-bold font-serif text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">{processText(trimmed.replace('## ', ''))}</h2>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-bold font-serif text-slate-800 mt-8 mb-3">{processText(trimmed.replace('### ', ''))}</h3>;
        }

        // Lists
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || /^\d+\. /.test(trimmed)) {
          const items = trimmed.split('\n');
          return (
            <ul key={idx} className="space-y-3 my-6">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                  <span className="text-accent font-bold">•</span>
                  <span>{processText(item.replace(/^(\* |- |\d+\. )/, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Horizontal Rule
        if (trimmed === '---') {
          return <hr key={idx} className="border-t border-slate-100 my-12" />;
        }

        // Blockquotes or Expert Tips
        if (trimmed.startsWith('> ')) {
          return (
            <div key={idx} className="bg-slate-50 border-l-4 border-accent p-6 rounded-r-xl my-8 italic text-slate-700 leading-relaxed">
              {processText(trimmed.replace('> ', ''))}
            </div>
          );
        }

        // Image Placeholders
        if (trimmed.includes('[IMAGE_PROMPT:')) {
          return (
             <div key={idx} className="hidden">
                {/* We handle images in the main page component, so we hide the raw prompt here */}
             </div>
          );
        }

        // Tool Embeds
        if (trimmed.startsWith('[TOOL_') && trimmed.endsWith(']')) {
          const slug = trimmed.slice(6, -1);
          const tool = TOOL_COMPONENTS[slug];
          if (tool) {
            return (
              <div key={idx} className="my-12 p-8 bg-slate-50 border-2 border-slate-100 rounded-2xl shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Interactive Technical Terminal</h4>
                  <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded">LIVE TOOL</span>
                </div>
                {tool}
              </div>
            );
          }
        }

        // Regular Paragraph
        return (
          <p key={idx} className="text-slate-600 leading-relaxed text-lg mb-4">
            {processText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
