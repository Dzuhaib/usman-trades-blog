import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
      <Link href="/" className="hover:text-accent transition-colors">
        <Home className="w-3 h-3" />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3 text-slate-200" />
          <Link 
            href={item.href} 
            className={`hover:text-accent transition-colors ${index === items.length - 1 ? 'text-slate-600' : ''}`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
