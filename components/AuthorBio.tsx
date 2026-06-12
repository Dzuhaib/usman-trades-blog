import Link from 'next/link';
import { Mail } from 'lucide-react';

interface AuthorBioProps {
  author: {
    name: string;
    role: string;
    bio: string;
  };
  updatedAt: string;
}

export default function AuthorBio({ author, updatedAt }: AuthorBioProps) {
  return (
    <div className="border-t border-slate-100 mt-16 pt-10 space-y-8">
      <div className="bg-slate-50 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-20 h-20 rounded-full bg-slate-900 flex-shrink-0 flex items-center justify-center text-white font-serif font-bold text-3xl">
          {author.name[0]}
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-black text-accent uppercase tracking-widest block mb-1">Written By</span>
            <h3 className="text-xl font-bold text-slate-900">{author.name}</h3>
            <span className="text-sm text-slate-500 font-medium">{author.role}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed italic">
            &ldquo;{author.bio}&rdquo;
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-accent transition-colors no-underline"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
        <span>Editorial Policy: High-integrity, human-written content only.</span>
        <span>Last Updated: {updatedAt}</span>
      </div>
    </div>
  );
}
