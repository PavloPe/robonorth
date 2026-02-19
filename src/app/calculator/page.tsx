'use client';

import { useState } from 'react';
import Link from 'next/link';
import { USD_TO_CAD_RATE, CUSTOMS_DUTY_RATE, GST_RATE } from '@/lib/constants';

const provinces = [
  { name: 'Alberta', pst: 0 },
  { name: 'British Columbia', pst: 0.07 },
  { name: 'Manitoba', pst: 0.07 },
  { name: 'New Brunswick', pst: 0.10 },
  { name: 'Newfoundland & Labrador', pst: 0.10 },
  { name: 'Northwest Territories', pst: 0 },
  { name: 'Nova Scotia', pst: 0.10 },
  { name: 'Nunavut', pst: 0 },
  { name: 'Ontario', pst: 0.08 },
  { name: 'Prince Edward Island', pst: 0.10 },
  { name: 'Quebec', pst: 0.09975 },
  { name: 'Saskatchewan', pst: 0.06 },
  { name: 'Yukon', pst: 0 },
];

const shippingOptions = [
  { label: 'Ocean Freight (China)', cost: 2200, time: '3-5 weeks' },
  { label: 'Air Freight (China)', cost: 5500, time: '7-10 days' },
  { label: 'Ground (USA)', cost: 1000, time: '3-7 days' },
  { label: 'Ground (Europe)', cost: 3000, time: '2-4 weeks' },
];

function fmt(n: number): string {
  return n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function CalculatorPage() {
  const [usdPrice, setUsdPrice] = useState(16000);
  const [province, setProvince] = useState('Alberta');
  const [shipping, setShipping] = useState(0);
  const [dutyRate, setDutyRate] = useState(CUSTOMS_DUTY_RATE);
  const [brokerage, setBrokerage] = useState(250);
  const [insurance, setInsurance] = useState(350);

  const prov = provinces.find(p => p.name === province) || provinces[0];
  const cadPrice = usdPrice * USD_TO_CAD_RATE;
  const shippingCost = shippingOptions[shipping].cost;
  const goodsValue = cadPrice + shippingCost + insurance;
  const duty = goodsValue * dutyRate;
  const gst = (goodsValue + duty) * GST_RATE;
  const pst = (goodsValue + duty) * prov.pst;
  const total = goodsValue + duty + gst + pst + brokerage;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium">Price Calculator</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Calculator</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Robot Import Price Calculator</h1>
        <p className="text-gray-500 max-w-2xl">
          Estimate the total landed cost of importing a humanoid robot to Canada — including customs duties, taxes, shipping, and brokerage fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Robot Price (USD)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={usdPrice}
                onChange={e => setUsdPrice(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={0}
                step={1000}
              />
              <span className="absolute right-3.5 top-2.5 text-gray-400 text-xs">USD</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Province</label>
            <select
              value={province}
              onChange={e => setProvince(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {provinces.map(p => (
                <option key={p.name} value={p.name}>{p.name} {p.pst > 0 ? `(PST ${(p.pst * 100).toFixed(p.pst === 0.09975 ? 3 : 0)}%)` : '(no PST)'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Shipping Method</label>
            <select
              value={shipping}
              onChange={e => setShipping(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {shippingOptions.map((opt, i) => (
                <option key={i} value={i}>{opt.label} — {fmt(opt.cost)} ({opt.time})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Customs Duty Rate: {(dutyRate * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={0.15}
              step={0.01}
              value={dutyRate}
              onChange={e => setDutyRate(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0% (USMCA)</span>
              <span>8% (typical)</span>
              <span>15%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brokerage Fee (CAD)</label>
              <input
                type="number"
                value={brokerage}
                onChange={e => setBrokerage(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Insurance (CAD)</label>
              <input
                type="number"
                value={insurance}
                onChange={e => setInsurance(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Estimated Landed Cost</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Robot price ({fmt(cadPrice / USD_TO_CAD_RATE)} USD × {USD_TO_CAD_RATE})</span>
              <span className="font-medium text-gray-900">{fmt(cadPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping ({shippingOptions[shipping].label})</span>
              <span className="font-medium text-gray-900">{fmt(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Insurance</span>
              <span className="font-medium text-gray-900">{fmt(insurance)}</span>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customs Duty ({(dutyRate * 100).toFixed(0)}% on {fmt(goodsValue)})</span>
                <span className="font-medium text-gray-900">{fmt(duty)}</span>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST (5%)</span>
              <span className="font-medium text-gray-900">{fmt(gst)}</span>
            </div>
            {prov.pst > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{province === 'Quebec' ? 'QST' : 'PST'} ({(prov.pst * 100).toFixed(prov.pst === 0.09975 ? 3 : 0)}%)</span>
                <span className="font-medium text-gray-900">{fmt(pst)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Brokerage</span>
              <span className="font-medium text-gray-900">{fmt(brokerage)}</span>
            </div>

            <div className="border-t-2 border-gray-300 pt-4 mt-4">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Landed Cost</span>
                <span className="text-2xl font-bold text-blue-700">{fmt(total)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                That&apos;s {((total / cadPrice - 1) * 100).toFixed(0)}% above the converted purchase price
              </p>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-800">
              <strong>⚠️ Estimate only.</strong> Actual costs depend on exact HS classification, exchange rate at time of purchase, and specific shipping arrangements. Consult a customs broker for precise figures.
            </p>
          </div>

          <div className="mt-4">
            <Link
              href="/inquiry"
              className="block text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Get a Detailed Quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
