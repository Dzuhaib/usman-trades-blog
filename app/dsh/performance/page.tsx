import { 
  BarChart3, 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  Globe, 
  ArrowUpRight,
  Filter,
  Download,
  AlertCircle
} from 'lucide-react';
import { getPerformanceReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

export default async function PerformancePage() {
  const reports = await getPerformanceReport();
  
  const metrics = [
    { label: 'Total Impressions', value: reports.reduce((a, b) => a + b.impressions, 0).toLocaleString(), change: '+12.4%', icon: Eye },
    { label: 'Total Clicks', value: reports.reduce((a, b) => a + b.clicks, 0).toLocaleString(), change: '+8.1%', icon: MousePointer2 },
    { label: 'Average CTR', value: `${((reports.reduce((a, b) => a + b.ctr, 0) / reports.length) * 100).toFixed(2)}%`, change: '+0.4%', icon: TrendingUp },
    { label: 'Average Position', value: (reports.reduce((a, b) => a + b.position, 0) / reports.length).toFixed(1), change: '-1.2', icon: BarChart3 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                   <m.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                  m.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {m.change}
                </span>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 font-serif">{m.value}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400">
                 <Globe className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-slate-900 font-serif">Search Console Deep Dive</h3>
                 <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Top 10 High-Impact Pages</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200"><Filter className="w-4 h-4" /></button>
              <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200"><Download className="w-4 h-4" /></button>
           </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Target URL</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Clicks</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Impressions</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">CTR</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Avg Pos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 bg-white">
            {reports.map((report) => (
              <tr key={report.url} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                     <span className="text-sm font-bold text-slate-900">{report.url}</span>
                     <ArrowUpRight className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-medium text-slate-600">{report.clicks}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-medium text-slate-600">{report.impressions.toLocaleString()}</span>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                     <span className="text-sm font-bold text-slate-900">{(report.ctr * 100).toFixed(1)}%</span>
                     <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${Math.min(report.ctr * 500, 100)}%` }}></div>
                     </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                     report.position < 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                   }`}>
                      #{report.position}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reports.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
             <AlertCircle className="w-12 h-12 text-slate-200" />
             <p className="text-slate-400 italic text-sm">Data pipeline initializing... Check back in 10 minutes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
