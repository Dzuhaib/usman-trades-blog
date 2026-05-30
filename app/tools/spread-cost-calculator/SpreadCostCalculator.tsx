'use client';

import { useState, useEffect } from 'react';

export default function SpreadCostCalculator() {
  const [spreadPips, setSpreadPips] = useState<number>(1.2);
  const [lotSize, setLotSize] = useState<number>(1.00);
  const [instrument, setInstrument] = useState<string>('forex');
  const [pipValueUSD, setPipValueUSD] = useState<number>(10);

  const [totalCost, setTotalCost] = useState<number>(0);
  const [percentageCost, setPercentageCost] = useState<number>(0);

  useEffect(() => {
    let pValue = 10; // Default $10 for standard lot
    if (instrument === 'btc') pValue = 1;

    const cost = spreadPips * lotSize * pValue;
    setTotalCost(Math.round(cost * 100) / 100);

    // Percentage of total position value
    let contractSize = 100000;
    if (instrument === 'gold') contractSize = 100;
    if (instrument === 'btc') contractSize = 1;
    
    // Using a sample price for % calculation context
    const samplePrice = instrument === 'forex' ? 1.0850 : instrument === 'gold' ? 2350 : 65000;
    const exposure = lotSize * contractSize * (instrument === 'btc' ? 1 : samplePrice);
    const pct = (cost / exposure) * 100;
    setPercentageCost(Math.round(pct * 10000) / 10000);
  }, [spreadPips, lotSize, instrument]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Spread Variables</h2>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Asset Type</label>
          <select
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          >
            <option value="forex">Forex (Standard Lots)</option>
            <option value="gold">Gold (100oz Lots)</option>
            <option value="btc">Bitcoin (Whole Units)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">
            Current Spread ({instrument === 'btc' ? 'USD' : 'Pips'})
          </label>
          <input
            type="number"
            step="0.1"
            value={spreadPips || ''}
            onChange={(e) => setSpreadPips(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Position Size ({instrument === 'btc' ? 'Units' : 'Lots'})</label>
          <input
            type="number"
            value={lotSize || ''}
            onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Cost Analysis</h2>
        <div className="border border-rose-200 border-l-rose-500 border-l-4 p-5 rounded-[4px] bg-rose-50/30 text-center">
          <span className="text-xs text-rose-800 font-bold block mb-1 uppercase tracking-widest">Immediate Spread Cost</span>
          <span className="text-4xl font-black text-rose-900">${totalCost.toLocaleString()}</span>
        </div>
        <div className="border border-border p-5 rounded-[4px] bg-surface text-center">
          <span className="text-xs text-muted block mb-1 uppercase tracking-widest">Effective Entry Impact</span>
          <span className="text-xl font-bold text-slate-700">{percentageCost}% of Position</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100 text-[11px] text-slate-500 leading-relaxed italic">
          The spread is the difference between the buy and sell price. You start every trade "in the red" by this amount, which is why tight spreads are essential for short term strategies.
        </div>
      </section>
    </div>
  );
}
