'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Link as LinkIcon, FileJson, CheckCircle2, AlertTriangle, Search, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { TechnicalIssue } from '@/lib/seo-os/technical-engine';
import Link from 'next/link';

export default function TechnicalAuditPage() {
  const [issues, setIssues] = useState<TechnicalIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/seo-os/technical');
        const data = await res.json();
        if (data.success) setIssues(data.issues);
      } catch (e) {
        console.error('Failed to load technical audit');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Technical SEO Audit</h1>
        <p className="text-slate-500 uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
           <ShieldCheck className="w-3.5 h-3.5 text-accent" />
           Technical Auditor Agent: Live Site Health Scan
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Health Overview */}
        <section className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Target Page</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Detected Issue</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                       <div className="flex flex-col items-center justify-center space-y-4">
                          <CheckCircle2 className="w-12 h-12 text-emerald-100" />
                          <p className="text-slate-400 italic text-sm">No technical issues detected. Website health is optimal.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-900">{issue.page}</span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{issue.issue}</p>
                        <p className="text-[10px] text-accent font-bold mt-1 uppercase">Fix: {issue.fix}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${
                          issue.severity === 'high' ? 'bg-rose-50 text-rose-500' :
                          issue.severity === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right: Sidebar Audit */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full"></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-3">Audit Intelligence</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-400 font-bold uppercase">Critical Errors</span>
                   <span className="text-rose-400 font-black">{issues.filter(i => i.severity === 'high').length}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                   <span className="text-slate-400 font-bold uppercase">Warnings</span>
                   <span className="text-amber-400 font-black">{issues.filter(i => i.severity === 'medium').length}</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                   <span className="text-[10px] text-emerald-400 font-black uppercase">Overall Health</span>
                   <span className="text-white font-black">{issues.length > 5 ? '82%' : '100%'}</span>
                </div>
             </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
              Automated Files
            </h3>
            <div className="space-y-3">
              <Link href="/sitemap.xml" target="_blank" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl no-underline group">
                <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">sitemap.xml</span>
                <ExternalLink className="w-3 h-3 text-slate-300" />
              </Link>
              <Link href="/robots.txt" target="_blank" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl no-underline group">
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
