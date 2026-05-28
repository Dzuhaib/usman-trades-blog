'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MiniRiskTerminal() {
  const [balance, setBalance] = useState<number>(10000);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [asset, setAsset] = useState<string>('forex');
  const [suggestedLots, setSuggestedLots] = useState<number>(0.5);

  useEffect(() => {
    if (balance <= 0 || stopLoss <= 0 || riskPercent <= 0) {
      setSuggestedLots(0);
      return;
    }
    const cashRisk = balance * (riskPercent / 100);
    let lots = 0;
    if (asset === 'btc') {
      lots = cashRisk / stopLoss;
    } else {
      lots = cashRisk / (stopLoss * 10);
    }
    setSuggestedLots(Math.max(0, Math.round(lots * 100) / 100));
  }, [balance, stopLoss, riskPercent, asset]);

  return (
    <div className="bg-slate-900 border border-slate-950 text-white rounded-lg p-6 shadow-md space-y-4">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase">
          QUICK POSITION SIZER
        </span>
        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
      </div>

      <div className="space-y-3.5 text-xs">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Asset Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setAsset('forex'); setStopLoss(20); }}
              className={`py-1.5 rounded font-mono text-[10px] border transition-all ${
                asset === 'forex'
                  ? 'bg-accent border-accent text-white font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              FOREX/GOLD
            </button>
            <button
              onClick={() => { setAsset('btc'); setStopLoss(500); }}
              className={`py-1.5 rounded font-mono text-[10px] border transition-all ${
                asset === 'btc'
                  ? 'bg-accent border-accent text-white font-bold'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              BITCOIN
            </button>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
            Account Balance (USD)
          </label>
          <input
            type="number"
            value={balance || ''}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white font-mono text-xs focus:border-accent outline-none"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
            {asset === 'btc' ? 'Stop Loss (USD Gap)' : 'Stop Loss (Pips)'}
          </label>
          <input
            type="number"
            value={stopLoss || ''}
            onChange={(e) => setStopLoss(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white font-mono text-xs focus:border-accent outline-none"
            placeholder={asset === 'btc' ? '500' : '20'}
          />
        </div>

        <div className="bg-slate-950/70 border border-slate-850 p-4 rounded text-center">
          <span className="text-[10px] text-slate-400 block mb-1 uppercase font-mono">Suggested Size</span>
          <span className="text-2xl font-extrabold text-white font-mono block">
            {suggestedLots} {asset === 'btc' ? 'BTC' : 'Lots'}
          </span>
          <span className="text-[9px] text-emerald-400 font-mono mt-1.5 block">
            Allocating strictly {riskPercent}% risk (${balance * (riskPercent / 100)} USD)
          </span>
        </div>
      </div>

      <Link
        href="/tools"
        className="block w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-2.5 rounded transition-colors no-underline font-mono"
      >
        Open Full Terminals &rarr;
      </Link>
    </div>
  );
}
