import Link from 'next/link';
import { ShieldCheck, Link as LinkIcon, FileJson, CheckCircle2, AlertTriangle, Search, ExternalLink } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';

export default function TechnicalAuditPage() {
  const pages = [
    { name: 'Homepage', status: 'Optimal', schema: ['WebSite', 'Organization'], links: 12 },
    { name: 'Trading Tools', status: 'Optimal', schema: ['WebPage', 'Breadcrumbs'], links: 45 },
    { name: 'Learning Library', status: 'Optimal', schema: ['WebPage', 'Breadcrumbs'], links: 18 },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Technical SEO Audit</h1>
        <p className="text-slate-500">Phase 2: Automated Schema & Internal Linking Analysis</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Health Overview */}
        <section className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Target Page</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Schema Integrity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Link Density</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pages.map((page) => (
                  <tr key={page.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{page.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5">
                        {page.schema.map(s => (
                          <span key={s} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600">{page.links} Contextual Links</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        {page.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Linking Opportunities */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-6">
            <div className="flex items-center gap-3">
              <LinkIcon className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold font-serif">Internal Linking Suggestions</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">New Article Detected</span>
                <p className="text-sm font-medium text-slate-200">"Best Risk Percentage" lacks links to "Drawdown Calculator".</p>
                <button className="text-[10px] font-black uppercase text-white hover:text-accent transition-colors">Apply Auto-Link &rarr;</button>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Keyword Opportunity</span>
                <p className="text-sm font-medium text-slate-200">"Gold Guide" mentions "pip value" 3 times without linking to the tool.</p>
                <button className="text-[10px] font-black uppercase text-white hover:text-accent transition-colors">Apply Auto-Link &rarr;</button>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Sidebar Audit */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileJson className="w-3.5 h-3.5" />
              Schema Health
            </h3>
            <div className="space-y-4">
               {[
                 { label: 'JSON-LD Validity', status: '100%', icon: CheckCircle2, color: 'text-emerald-500' },
                 { label: 'Breadcrumb Sync', status: 'Verified', icon: CheckCircle2, color: 'text-emerald-500' },
                 { label: 'Author Markup', status: 'Complete', icon: CheckCircle2, color: 'text-emerald-500' },
                 { label: 'Missing FAQ Schema', status: '0 Pages', icon: AlertTriangle, color: 'text-slate-300' },
               ].map((item) => (
                 <div key={item.label} className="flex items-center justify-between text-xs">
                   <span className="text-slate-500">{item.label}</span>
                   <span className={`font-bold uppercase tracking-widest flex items-center gap-1 ${item.color}`}>
                     {item.status}
                   </span>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
              Automated Files
            </h3>
            <div className="space-y-3">
              <Link href="/sitemap.xml" target="_blank" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl no-underline group">
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">sitemap.xml</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </Link>
              <Link href="/robots.txt" target="_blank" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl no-underline group">
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">robots.txt</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
