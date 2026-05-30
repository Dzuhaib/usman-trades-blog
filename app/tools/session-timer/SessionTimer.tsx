'use client';

import { useState, useEffect } from 'react';

const SESSIONS = [
  { name: 'Sydney', start: 22, end: 7, color: 'bg-emerald-500' }, // 10 PM - 7 AM UTC
  { name: 'Tokyo', start: 0, end: 9, color: 'bg-blue-500' },     // 12 AM - 9 AM UTC
  { name: 'London', start: 8, end: 17, color: 'bg-orange-500' }, // 8 AM - 5 PM UTC
  { name: 'New York', start: 13, end: 22, color: 'bg-rose-500' }  // 1 PM - 10 PM UTC
];

export default function SessionTimer() {
  const [utcTime, setUtcTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const utcHour = utcTime.getUTCHours();
  const utcMin = utcTime.getUTCMinutes();

  const isSessionOpen = (start: number, end: number) => {
    if (start < end) {
      return utcHour >= start && utcHour < end;
    }
    // Handle wrap around midnight (e.g. Sydney 22-07)
    return utcHour >= start || utcHour < end;
  };

  return (
    <div className="space-y-8">
      <div className="text-center p-8 bg-slate-900 text-white rounded-3xl space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Market Time (UTC)</span>
        <div className="text-5xl font-black font-mono">
          {utcHour.toString().padStart(2, '0')}:{utcMin.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="grid gap-4">
        {SESSIONS.map((session) => {
          const isOpen = isSessionOpen(session.start, session.end);
          return (
            <div key={session.name} className={`p-5 rounded-2xl border transition-all ${
              isOpen ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-white opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isOpen ? session.color : 'bg-slate-300'} animate-pulse`}></div>
                  <span className={`font-bold ${isOpen ? 'text-slate-900' : 'text-slate-400'}`}>{session.name} Session</span>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-widest block ${isOpen ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {isOpen ? 'Currently Active' : 'Closed'}
                  </span>
                  <span className="text-xs text-slate-500">{session.start}:00 - {session.end}:00 UTC</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Market Overlaps</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">London & New York</span>
            <span className="text-slate-500">13:00 - 17:00 UTC</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Tokyo & London</span>
            <span className="text-slate-500">08:00 - 09:00 UTC</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 italic pt-2">Volatility and liquidity typically increase during session overlaps.</p>
      </div>
    </div>
  );
}
