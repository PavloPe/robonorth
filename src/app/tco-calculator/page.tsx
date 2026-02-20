'use client';

import { useState } from 'react';
import Link from 'next/link';

const USD_TO_CAD = 1.38;

export default function TCOCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(25000);
  const [currency, setCurrency] = useState<'USD' | 'CAD'>('USD');
  const [maintenanceRate, setMaintenanceRate] = useState(7);
  const [energyCostPerYear, setEnergyCostPerYear] = useState(400);
  const [trainingCost, setTrainingCost] = useState(2000);
  const [insuranceCostPerYear, setInsuranceCostPerYear] = useState(1000);
  const [importDuty, setImportDuty] = useState(0);
  const [shippingCost, setShippingCost] = useState(1000);
  const [years, setYears] = useState(5);
  const [softwareLicense, setSoftwareLicense] = useState(0);

  const priceCAD = currency === 'USD' ? purchasePrice * USD_TO_CAD : purchasePrice;
  const annualMaintenance = priceCAD * (maintenanceRate / 100);
  const dutyAmount = priceCAD * (importDuty / 100);
  const gstHst = (priceCAD + dutyAmount + shippingCost) * 0.13;

  const yearOneTotal = priceCAD + dutyAmount + shippingCost + gstHst + trainingCost + insuranceCostPerYear + energyCostPerYear + softwareLicense;
  const annualOngoing = annualMaintenance + insuranceCostPerYear + energyCostPerYear + softwareLicense;
  const totalTCO = yearOneTotal + annualOngoing * (years - 1);

  const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
    if (i === 0) return { year: 1, cost: yearOneTotal };
    return { year: i + 1, cost: annualOngoing };
  });

  const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-CA')}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">TCO Calculator</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Total Cost of Ownership Calculator</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Estimate the true 5-year cost of owning a humanoid robot in Canada — including purchase, import, maintenance, energy, insurance, and training.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Purchase Details</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Purchase Price</label>
                <div className="flex gap-2 mt-1">
                  <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  <select value={currency} onChange={e => setCurrency(e.target.value as 'USD' | 'CAD')} className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
                {currency === 'USD' && <p className="text-xs text-gray-400 mt-1">≈ {fmt(priceCAD)} CAD</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Import Duty (%)</label>
                <input type="range" min={0} max={15} value={importDuty} onChange={e => setImportDuty(Number(e.target.value))} className="w-full mt-1" />
                <p className="text-xs text-gray-400">{importDuty}% — {importDuty === 0 ? 'CUSMA/CETA (USA/EU/UK)' : importDuty <= 8 ? 'China/Asia origin' : 'Other'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shipping Cost (CAD)</label>
                <input type="number" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">One-Time Training Cost (CAD)</label>
                <input type="number" value={trainingCost} onChange={e => setTrainingCost(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Annual Costs</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Maintenance Rate (% of purchase)</label>
                <input type="range" min={3} max={15} value={maintenanceRate} onChange={e => setMaintenanceRate(Number(e.target.value))} className="w-full mt-1" />
                <p className="text-xs text-gray-400">{maintenanceRate}% = {fmt(annualMaintenance)}/year</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy Cost (CAD/year)</label>
                <input type="number" value={energyCostPerYear} onChange={e => setEnergyCostPerYear(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Insurance (CAD/year)</label>
                <input type="number" value={insuranceCostPerYear} onChange={e => setInsuranceCostPerYear(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Software License (CAD/year)</label>
                <input type="number" value={softwareLicense} onChange={e => setSoftwareLicense(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Ownership Period</label>
                <select value={years} onChange={e => setYears(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white mt-1">
                  <option value={3}>3 Years</option>
                  <option value={5}>5 Years</option>
                  <option value={7}>7 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <p className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-1">{years}-Year Total Cost of Ownership</p>
            <p className="text-4xl font-bold">{fmt(totalTCO)} <span className="text-xl font-normal text-blue-200">CAD</span></p>
            <p className="text-sm text-blue-200 mt-2">≈ {fmt(totalTCO / years)}/year · {fmt(totalTCO / years / 12)}/month</p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Robot (CAD)', value: priceCAD },
                { label: 'Import Duty', value: dutyAmount },
                { label: 'Shipping', value: shippingCost },
                { label: 'GST/HST (13%)', value: gstHst },
                { label: 'Training', value: trainingCost },
                { label: `Maintenance (${years} years)`, value: annualMaintenance * years },
                { label: `Insurance (${years} years)`, value: insuranceCostPerYear * years },
                { label: `Energy (${years} years)`, value: energyCostPerYear * years },
                { label: `Software (${years} years)`, value: softwareLicense * years },
              ].filter(item => item.value > 0).map(item => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{fmt(item.value)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex items-center justify-between text-sm font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-blue-600 dark:text-blue-400">{fmt(totalTCO)}</span>
              </div>
            </div>
          </div>

          {/* Year by year */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Year-by-Year Projection</h3>
            <div className="space-y-2">
              {yearlyBreakdown.map(({ year, cost }) => {
                const pct = (cost / yearOneTotal) * 100;
                return (
                  <div key={year}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Year {year}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{fmt(cost)}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, pct)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            * Estimates only. Actual costs vary by model, usage, and location. GST/HST calculated at 13% (Ontario). Exchange rate: 1 USD = {USD_TO_CAD} CAD.
          </p>
        </div>
      </div>
    </div>
  );
}
