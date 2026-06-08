'use client';
import { useState, useEffect } from 'react';
import { Sparkles, AlertCircle, FileText, Search, MapPin, Target, Loader2, RefreshCw } from 'lucide-react';

export default function AuditDashboard() {
  const [audit, setAudit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const loadData = () => {
    setLoading(true);
    fetch('/api/seo-os/audit').then(res => res.json()).then(data => {
      setAudit(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const runManualAudit = async () => {
    let cronSecret = localStorage.getItem('dsh_pw') || '';
    
    // Fallback prompt if token is missing
    if (!cronSecret) {
        cronSecret = prompt('Authentication missing. Please enter your Dashboard Password:') || '';
    }
    
    if (!cronSecret) {
        alert('Audit cannot run without a password.');
        return;
    }

    setRunning(true);
    console.log('[DEBUG] Token being sent to API:', cronSecret);
    try {
        const res = await fetch('/api/seo-os/audit/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: cronSecret })
        });
        const data = await res.json();
        if(res.ok) {
            alert('Audit complete!');
            loadData();
        } else {
            console.error('[DEBUG] Audit API Error response:', data);
            alert(`Error: ${data.error}`);
        }
    } catch (e) {
        alert('Network error while running audit.');
    }
    setRunning(false);
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin w-10 h-10 mx-auto" /></div>;

  return (
    <div className="p-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold">Comprehensive SEO Audit</h1>
        <button 
            onClick={runManualAudit}
            disabled={running}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-accent/90 transition-all disabled:opacity-50"
        >
            {running ? <Loader2 className="animate-spin w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
            {running ? 'Running Audit...' : 'Run Audit Now'}
        </button>
      </div>
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
