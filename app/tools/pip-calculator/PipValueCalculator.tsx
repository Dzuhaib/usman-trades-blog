'use client';

import { useState, useEffect } from 'react';

export default function PipValueCalculator() {
  const [lotSize, setLotSize] = useState<number>(1);
  const [instrument, setInstrument] = useState<string>('forex-usd'); // forex-usd, forex-jpy, gold, btc
  const [exchangeRate, setExchangeRate] = useState<number>(155.50); // Specifically for JPY pairs

  const [pipValue, setPipValue] = useState<number>(10);
  const [miniValue, setMiniValue] = useState<number>(1);
  const [microValue, setMicroValue] = useState<number>(0.1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    if (lotSize <= 0) {
      setError('Lot size must be greater than 0.');
      setPipValue(0);
      setMiniValue(0);
      setMicroValue(0);
      return;
    }

    let calculatedStandardPip = 10; // Default EURUSD $10

    if (instrument === 'forex-usd') {
      calculatedStandardPip = 10;
    } else if (instrument === 'forex-jpy') {
      if (exchangeRate <= 0) {
        setError('Exchange rate must be greater than 0.');
        setPipValue(0);
        setMiniValue(0);
        setMicroValue(0);
        return;
      }
      // Formula for JPY crosses to USD: (0.01 / USDJPY) * 100,000
      calculatedStandardPip = (0.01 / exchangeRate) * 100000;
    } else if (instrument === 'gold') {
      calculatedStandardPip = 10;
    } else if (instrument === 'btc') {
      calculatedStandardPip = 1;
    }

    setPipValue(Math.round(calculatedStandardPip * lotSize * 100) / 100);
    setMiniValue(Math.round(calculatedStandardPip * 0.1 * 100) / 100);
    setMicroValue(Math.round(calculatedStandardPip * 0.01 * 100) / 100);
  }, [lotSize, instrument, exchangeRate]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left Side: Form */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Contract Parameters</h2>

        {/* Instrument Selector */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="instrument">
            Trading Instrument
          </label>
          <select
            id="instrument"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          >
            <option value="forex-usd">Forex USD Counter (EURUSD, GBPUSD, AUDUSD)</option>
            <option value="forex-jpy">Forex JPY Counter (USDJPY, EURJPY, GBPJPY)</option>
            <option value="gold">Gold (XAUUSD)</option>
            <option value="btc">Bitcoin (BTCUSD)</option>
          </select>
        </div>

        {/* Exchange Rate Input for JPY */}
        {instrument === 'forex-jpy' && (
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="exchange-rate">
              Current USD/JPY Exchange Rate
            </label>
            <input
              id="exchange-rate"
              type="number"
              step="0.01"
              value={exchangeRate || ''}
              onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 155.50"
              className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
            />
          </div>
        )}

        {/* Planned Lot Size */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="lot-size">
            Planned Lot Size
          </label>
          <input
            id="lot-size"
            type="number"
            step="0.01"
            value={lotSize || ''}
            onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 1.00"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>
      </section>

      {/* Right Side: Outputs */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Valuation Output</h2>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-[4px] text-xs font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Standard Pip Value Result */}
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5">
          <span className="text-xs text-accent font-semibold block mb-1">
            Pip Value for {lotSize} {instrument === 'btc' ? 'Units' : 'Lots'}
          </span>
          <span className="text-3xl font-extrabold text-primary block">
            ${pipValue.toFixed(2)} USD
          </span>
          <span className="text-xs text-secondary mt-1 block">
            Based on standard exchange contract parameters.
          </span>
        </div>

        {/* Standard scale grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border p-4 rounded-[4px] bg-surface text-center">
            <span className="text-xs text-muted block mb-0.5">Mini Lot (0.10 Lots)</span>
            <span className="text-base font-bold text-primary">${miniValue.toFixed(2)} USD</span>
          </div>
          <div className="border border-border p-4 rounded-[4px] bg-surface text-center">
            <span className="text-xs text-muted block mb-0.5">Micro Lot (0.01 Lots)</span>
            <span className="text-base font-bold text-primary">${microValue.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Technical definition box */}
        <div className="bg-surface border border-border p-4 rounded-[4px] text-[11px] text-muted leading-relaxed">
          <strong>Standard Contract Parameters Used:</strong>
          <ul className="list-disc pl-4 mt-1.5 space-y-1">
            <li><strong>Forex:</strong> 1 Standard Lot = 100,000 base units. Pip size = 0.0001 (or 0.01 for JPY).</li>
            <li><strong>Gold:</strong> 1 Standard Lot = 100 troy ounces. Pip size = $0.10 price change.</li>
            <li><strong>Bitcoin:</strong> 1 Standard Unit = 1 BTC. Pip size = $1.00 USD price change.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
