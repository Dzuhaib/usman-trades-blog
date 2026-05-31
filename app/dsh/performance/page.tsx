import { 
  BarChart3, 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  Globe, 
  ArrowUpRight,
  Filter,
  Download,
  AlertCircle,
  Clock
} from 'lucide-react';
import { GSCReport } from '@/lib/seo-os/analytics-engine';

export const dynamic = 'force-dynamic';

async function fetchPerformanceData(): Promise<GSCReport[]> {
  // Use the absolute URL for the API to ensure it hits the serverless function
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://usmantrades.co.uk';
  try {
    const res = await fetch(`${baseUrl}/api/seo-os/performance`, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export default async function PerformancePage() {
  const reports = await fetchPerformanceData();
  
  const totalImpressions = reports.reduce((a, b) => a + b.impressions, 0);
  const totalClicks = reports.reduce((a, b) => a + b.clicks, 0);
  const avgCtr = reports.length > 0 ? (reports.reduce((a, b) => a + b.ctr, 0) / reports.length) : 0;
  const avgPos = reports.length > 0 ? (reports.reduce((a, b) => a + b.position, 0) / reports.length) : 0;

  const metrics = [
    { label: 'Total Impressions', value: totalImpressions.toLocaleString(), change: totalImpressions > 0 ? 'Live' : 'Initializing', icon: Eye },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), change: totalClicks > 0 ? 'Live' : 'Initializing', icon: MousePointer2 },
    { label: 'Average CTR', value: `${(avgCtr * 100).toFixed(2)}%`, change: 'Real-time', icon: TrendingUp },
    { label: 'Average Position', value: avgPos.toFixed(1), change: 'Current', icon: BarChart3 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Page Header with Time */}
      <div className="flex justify-between items-center">
         <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-slate-900">Performance Intelligence</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
               <Clock className="w-3 h-3" />
               Last Updated: {new Date().toLocaleTimeString()}
            </p>
         </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-4 shadow-sm hover:shadow-md transition-all">
             <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                   <m.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-50 text-slate-500">
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
                 <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Live Data from GSC</p>
              </div>
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
            {reports.length > 0 ? (
              reports.map((report) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                   <div className="flex flex-col items-center justify-center space-y-4">
                      <AlertCircle className="w-12 h-12 text-slate-200" />
                      <p className="text-slate-400 italic text-sm">No live data found. Please check your GSC connection.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
