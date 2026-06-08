'use client';
import { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, FileText, Search, MapPin, Target } from 'lucide-react';

export default function AuditDashboard() {
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/seo-os/audit').then(res => res.json()).then(data => {
      setAudit(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Audit Report...</div>;

  return (
    <div className="p-10 space-y-8">
      <h1 className="text-3xl font-serif font-bold">Comprehensive SEO Audit</h1>
      <div className="grid grid-cols-2 gap-6">
        <AuditCard icon={<FileText />} title="Technical Audit" content={audit?.technical} />
        <AuditCard icon={<Search />} title="SEO Audit" content={audit?.seo} />
        <AuditCard icon={<MapPin />} title="GEO Audit" content={audit?.geo} />
        <AuditCard icon={<Target />} title="AIO Audit" content={audit?.aio} />
      </div>
    </div>
  );
}

function AuditCard({ icon, title, content }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3 text-accent font-bold">
        {icon} {title}
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">{content}</p>
    </div>
  );
}
