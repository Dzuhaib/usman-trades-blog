'use client';

import { useState, useEffect } from 'react';

export default function MarginCalculator() {
  const [leverage, setLeverage] = useState<number>(100);
  const [lotSize, setLotSize] = useState<number>(1.00);
  const [instrument, setInstrument] = useState<string>('forex'); // forex, gold, btc
  const [assetPrice, setAssetPrice] = useState<number>(1.0850); // Specifically for pairs not starting with USD

  const [requiredMargin, setRequiredMargin] = useState<number>(0);
  const [totalExposure, setTotalExposure] = useState<number>(0);

  useEffect(() => {
    let contractSize = 100000; // Default Forex
    if (instrument === 'gold') contractSize = 100;
    if (instrument === 'btc') contractSize = 1;

    const exposure = lotSize * contractSize * (instrument === 'forex' || instrument === 'gold' ? assetPrice : 1);
    const margin = exposure / leverage;

    setTotalExposure(Math.round(exposure * 100) / 100);
    setRequiredMargin(Math.round(margin * 100) / 100);
  }, [leverage, lotSize, instrument, assetPrice]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Account & Trade Setup</h2>
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5">Broker Leverage (e.g. 100 for 1:100)</label>
          <input
            type="number"
            value={leverage || ''}
            onChange={(e) => setLeverage(parseFloat(e.target.value) || 1)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary text-sm"
          />
        </div>
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
          <label className="text-xs font-semibold text-secondary block mb-1.5">Current Price of Asset</label>
          <input
            type="number"
            value={assetPrice || ''}
            onChange={(e) => setAssetPrice(parseFloat(e.target.value) || 0)}
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
        <h2 className="text-lg font-bold text-primary mb-2">2. Margin Requirements</h2>
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5 text-center">
          <span className="text-xs text-accent font-semibold block mb-1 uppercase tracking-widest">Required Margin</span>
          <span className="text-4xl font-black text-primary block">${requiredMargin.toLocaleString()}</span>
        </div>
        <div className="border border-border p-5 rounded-[4px] bg-surface text-center">
          <span className="text-xs text-muted block mb-1 uppercase tracking-widest">Total Market Exposure</span>
          <span className="text-2xl font-bold text-slate-700">${totalExposure.toLocaleString()}</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-[4px] border border-slate-100 text-[11px] text-slate-500 leading-relaxed italic">
          Margin is the "good faith deposit" required by your broker to maintain a leveraged position. It is not a cost, but it does limit how many trades you can have open at once.
        </div>
      </section>
    </div>
  );
}
