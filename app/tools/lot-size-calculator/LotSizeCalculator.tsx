'use client';

import { useState, useEffect } from 'react';

export default function LotSizeCalculator() {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [instrument, setInstrument] = useState<string>('forex-usd'); // forex-usd, gold, btc, custom
  const [customPipValue, setCustomPipValue] = useState<number>(10); // Default $10 for standard lot EURUSD

  const [riskAmount, setRiskAmount] = useState<number>(100);
  const [lotSize, setLotSize] = useState<number>(0.5);
  const [units, setUnits] = useState<number>(50000);
  const [error, setError] = useState<string | null>(null);

  // Auto-set standard pip values based on selection
  useEffect(() => {
    if (instrument === 'forex-usd') {
      setCustomPipValue(10); // Standard lot 100k, 1 pip = $10 USD
    } else if (instrument === 'forex-jpy') {
      setCustomPipValue(6.45); // Approximate for JPY pairs at 155 USDJPY
    } else if (instrument === 'gold') {
      setCustomPipValue(10); // Standard lot 100oz, 1 pip ($0.10) = $10 USD
    } else if (instrument === 'btc') {
      setCustomPipValue(1); // Standard lot 1 BTC, $1 change = $1 USD
    }
  }, [instrument]);

  // Recalculate lot size instantly on input changes
  useEffect(() => {
    setError(null);

    if (balance <= 0) {
      setError('Account balance must be greater than 0.');
      setRiskAmount(0);
      setLotSize(0);
      setUnits(0);
      return;
    }
    if (riskPercent <= 0 || riskPercent > 100) {
      setError('Risk percentage must be between 0.1% and 100%.');
      setRiskAmount(0);
      setLotSize(0);
      setUnits(0);
      return;
    }
    if (stopLossPips <= 0) {
      setError('Stop loss distance must be greater than 0.');
      setRiskAmount(0);
      setLotSize(0);
      setUnits(0);
      return;
    }
    if (customPipValue <= 0) {
      setError('Pip value must be greater than 0.');
      setRiskAmount(0);
      setLotSize(0);
      setUnits(0);
      return;
    }

    const computedRiskAmount = balance * (riskPercent / 100);
    setRiskAmount(computedRiskAmount);

    let computedLotSize = 0;
    if (instrument === 'btc') {
      computedLotSize = computedRiskAmount / stopLossPips;
    } else {
      computedLotSize = computedRiskAmount / (stopLossPips * customPipValue);
    }

    const finalLotSize = Math.max(0, Math.round(computedLotSize * 100) / 100);
    setLotSize(finalLotSize);

    let computedUnits = 0;
    if (instrument === 'forex-usd' || instrument === 'forex-jpy') {
      computedUnits = finalLotSize * 100000;
    } else if (instrument === 'gold') {
      computedUnits = finalLotSize * 100;
    } else if (instrument === 'btc') {
      computedUnits = finalLotSize;
    } else {
      computedUnits = finalLotSize * 100000; 
    }
    setUnits(computedUnits);
  }, [balance, riskPercent, stopLossPips, instrument, customPipValue]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left Hand side: Form */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-primary mb-2">1. Input Parameters</h2>

        {/* Account Balance */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="balance">
            Account Balance (USD)
          </label>
          <input
            id="balance"
            type="number"
            value={balance || ''}
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 10000"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

        {/* Risk Percentage */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="risk-percent">
            Risk Percentage (%)
          </label>
          <input
            id="risk-percent"
            type="number"
            step="0.1"
            value={riskPercent || ''}
            onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 1"
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

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
            <option value="custom">Custom Parameters (Advanced)</option>
          </select>
        </div>

        {/* Stop Loss (Pips or USD depending on selection) */}
        <div>
          <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="stop-loss">
            {instrument === 'btc' ? 'Stop Loss (USD Price Distance)' : 'Stop Loss (Pips)'}
          </label>
          <input
            id="stop-loss"
            type="number"
            value={stopLossPips || ''}
            onChange={(e) => setStopLossPips(parseFloat(e.target.value) || 0)}
            placeholder={instrument === 'btc' ? 'e.g. 500' : 'e.g. 20'}
            className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
          />
        </div>

        {/* Custom Pip Value (Only visible if advanced is selected) */}
        {(instrument === 'custom' || instrument === 'forex-jpy') && (
          <div>
            <label className="text-xs font-semibold text-secondary block mb-1.5" htmlFor="pip-value">
              Pip Value per Standard Lot (USD)
            </label>
            <input
              id="pip-value"
              type="number"
              value={customPipValue || ''}
              onChange={(e) => setCustomPipValue(parseFloat(e.target.value) || 0)}
              placeholder="e.g. 10"
              className="w-full p-2 border border-border rounded-[4px] bg-background text-primary"
            />
            <p className="text-[10px] text-muted mt-1">
              For JPY pairs, pip value varies with USDJPY exchange rate. Standard is approx $6.45.
            </p>
          </div>
        )}
      </section>

      {/* Right Hand side: Outputs */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-primary mb-2">2. Calculated Risk Metrics</h2>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-[4px] text-xs font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Target Cash Loss */}
        <div className="border border-border p-5 rounded-[4px] bg-surface">
          <span className="text-xs text-muted block mb-1">Max Cash Risk Allowed</span>
          <span className="text-2xl font-bold text-primary block">${riskAmount.toFixed(2)} USD</span>
          <span className="text-xs text-secondary mt-1 block">Exactly {riskPercent}% of account balance.</span>
        </div>

        {/* Calculated Lots */}
        <div className="border border-accent/20 border-l-accent border-l-4 p-5 rounded-[4px] bg-accent/5">
          <span className="text-xs text-accent font-semibold block mb-1">Calculated Lot Size</span>
          <span className="text-3xl font-extrabold text-primary block">
            {lotSize} {instrument === 'btc' ? 'BTC' : 'Lots'}
          </span>
          <span className="text-xs text-secondary mt-1 block">
            Equivalent to: <strong>{units.toLocaleString()}</strong> {instrument === 'gold' ? 'ounces' : instrument === 'btc' ? 'units' : 'units of base currency'}
          </span>
        </div>

        {/* Technical Note */}
        <div className="bg-surface border border-border p-4 rounded-[4px] text-[11px] text-muted leading-relaxed">
          <strong>Formula Applied:</strong> <br />
          {instrument === 'btc' ? (
            <code>BTC size = Risk Amount ($) / Invalidation Distance ($)</code>
          ) : (
            <code>Lot size = Risk Amount ($) / (Stop Loss in Pips &times; Pip Value per Standard Lot)</code>
          )}
          <br />
          <span className="mt-2 block">
            Verify your broker contract specification: standard lot size represents 100,000 currency units (Forex) or 100 ounces (Gold).
          </span>
        </div>
      </section>
    </div>
  );
}
