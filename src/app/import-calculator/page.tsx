'use client';

import { useState } from 'react';
import Link from 'next/link';

const USD_TO_CAD = 1.38;

const countries = [
  { name: 'United States', code: 'US', duty: 0, agreement: 'CUSMA', note: '0% duty under Canada-US-Mexico Agreement' },
  { name: 'China', code: 'CN', duty: 6, agreement: 'MFN', note: '0–8% depending on HS code classification' },
  { name: 'Germany', code: 'DE', duty: 0, agreement: 'CETA', note: '0% under Canada-EU CETA' },
  { name: 'United Kingdom', code: 'UK', duty: 0, agreement: 'CUKTCA', note: '0% under UK-Canada Trade Continuity' },
  { name: 'Norway', code: 'NO', duty: 0, agreement: 'CETA/EFTA', note: '0% under CETA-adjacent EFTA terms' },
  { name: 'Japan', code: 'JP', duty: 0, agreement: 'CPTPP', note: '0% under CPTPP' },
  { name: 'South Korea', code: 'KR', duty: 0, agreement: 'CKFTA', note: '0% under Canada-Korea FTA' },
  { name: 'Israel', code: 'IL', duty: 0, agreement: 'CIFTA', note: '0% under Canada-Israel FTA' },
  { name: 'Poland', code: 'PL', duty: 0, agreement: 'CETA', note: '0% under CETA (EU member)' },
  { name: 'Other', code: 'XX', duty: 8, agreement: 'MFN', note: 'Most Favoured Nation rate applies' },
];

const provinces = [
  { name: 'Alberta', code: 'AB', gst: 5, pst: 0, total: 5, type: 'GST' },
  { name: 'British Columbia', code: 'BC', gst: 5, pst: 7, total: 12, type: 'GST + PST' },
  { name: 'Manitoba', code: 'MB', gst: 5, pst: 7, total: 12, type: 'GST + RST' },
  { name: 'New Brunswick', code: 'NB', gst: 0, pst: 0, total: 15, type: 'HST' },
  { name: 'Newfoundland', code: 'NL', gst: 0, pst: 0, total: 15, type: 'HST' },
  { name: 'Nova Scotia', code: 'NS', gst: 0, pst: 0, total: 15, type: 'HST' },
  { name: 'Ontario', code: 'ON', gst: 0, pst: 0, total: 13, type: 'HST' },
  { name: 'PEI', code: 'PE', gst: 0, pst: 0, total: 15, type: 'HST' },
  { name: 'Quebec', code: 'QC', gst: 5, pst: 9.975, total: 14.975, type: 'GST + QST' },
  { name: 'Saskatchewan', code: 'SK', gst: 5, pst: 6, total: 11, type: 'GST + PST' },
];

export default function ImportCalculatorPage() {
  const [productValue, setProductValue] = useState(25000);
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  const [countryCode, setCountryCode] = useState('US');
  const [provinceCode, setProvinceCode] = useState('ON');
  const [shippingCost, setShippingCost] = useState(1000);
  const [brokerageFee, setBrokerageFee] = useState(300);

  const country = countries.find(c => c.code === countryCode)!;
  const province = provinces.find(p => p.code === provinceCode)!;

  const valueCAD = currency === 'USD' ? productValue * USD_TO_CAD : productValue;
  const dutyAmount = valueCAD * (country.duty / 100);
  const landedCost = valueCAD + dutyAmount + shippingCost + brokerageFee;
  const taxAmount = landedCost * (province.total / 100);
  const totalCost = landedCost + taxAmount;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-CA')}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Import Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🏛️ Canadian Import Duty Calculator</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Estimate customs duty, GST/HST, and total landed cost for importing a humanoid robot to Canada.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4 h-fit">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Value</label>
            <div className="flex gap-2 mt-1">
              <input type="number" value={productValue} onChange={e => setProductValue(Number(e.target.value))} className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <select value={currency} onChange={e => setCurrency(e.target.value as 'USD' | 'CAD')} className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm">
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country of Origin</label>
            <select value={countryCode} onChange={e => setCountryCode(e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.name} — {c.duty}% ({c.agreement})</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">{country.note}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Destination Province</label>
            <select value={provinceCode} onChange={e => setProvinceCode(e.target.value)} className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name} — {p.total}% {p.type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shipping Cost (CAD)</label>
            <input type="number" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Customs Brokerage Fee (CAD)</label>
            <input type="number" value={brokerageFee} onChange={e => setBrokerageFee(Number(e.target.value))} className="w-full mt-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <p className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-1">Total Landed Cost</p>
            <p className="text-4xl font-bold">{fmt(totalCost)} <span className="text-xl font-normal text-blue-200">CAD</span></p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Breakdown</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Product Value (CAD)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(valueCAD)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Customs Duty ({country.duty}%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(dutyAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">{fmt(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Brokerage Fee</span>
                <span className="text-gray-900 dark:text-white">{fmt(brokerageFee)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Landed Cost</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(landedCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{province.type} ({province.total}%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(taxAmount)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-blue-600 dark:text-blue-400">{fmt(totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <strong>HS Code:</strong> Most humanoid robots are classified under HS 8479.50 (Industrial robots). Some educational models may qualify under 9503.00. Proper classification can save 0–8% in duties. <Link href="/grants" className="text-blue-600 dark:text-blue-400 font-semibold">See available grants →</Link>
            </p>
          </div>

          <p className="text-xs text-gray-400">* Estimates only. Actual duties depend on CBSA classification. Exchange rate: 1 USD = {USD_TO_CAD} CAD. Consult a customs broker for exact costs.</p>
        </div>
      </div>
    </div>
  );
}
