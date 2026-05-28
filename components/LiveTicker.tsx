'use client';

import { useState, useEffect } from 'react';

export default function LiveTicker() {
  const [rates, setRates] = useState([
    { symbol: 'EURUSD', rate: '1.0852', change: '+0.12%', isPositive: true },
    { symbol: 'XAUUSD', rate: '2,354.20', change: '-0.45%', isPositive: false },
    { symbol: 'BTCUSD', rate: '67,420.50', change: '+2.31%', isPositive: true },
    { symbol: 'GBPUSD', rate: '1.2740', change: '+0.08%', isPositive: true },
    { symbol: 'US10Y', rate: '4.425%', change: '+0.80%', isPositive: true },
    { symbol: 'DXY', rate: '104.75', change: '-0.15%', isPositive: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRates((prevRates) =>
        prevRates.map((r) => {
          const changeVal = (Math.random() - 0.5) * 0.04;
          const currentRate = parseFloat(r.rate.replace(/,/g, ''));
          const newRate = (currentRate * (1 + changeVal / 100)).toFixed(
            r.symbol === 'BTCUSD' ? 2 : r.symbol === 'XAUUSD' ? 2 : 4
          );
          const currentPct = parseFloat(r.change.replace('%', ''));
          const newPct = (currentPct + changeVal).toFixed(2);
          return {
            ...r,
            rate: parseFloat(newRate).toLocaleString('en-US', {
              minimumFractionDigits: r.symbol === 'BTCUSD' || r.symbol === 'XAUUSD' ? 2 : 4,
            }),
            change: `${parseFloat(newPct) >= 0 ? '+' : ''}${newPct}%`,
            isPositive: parseFloat(newPct) >= 0,
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white overflow-hidden shadow-inner select-none">
      <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-2 border-r border-slate-800 pr-4 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">LIVE TICKER</span>
        </div>
        <div className="flex items-center gap-8 text-xs font-mono w-full justify-around">
          {rates.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 font-bold">{item.symbol}</span>
              <span className="text-white font-semibold">{item.rate}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.isPositive ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
