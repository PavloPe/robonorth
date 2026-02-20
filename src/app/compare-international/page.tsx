'use client';

// Improvement #49: "Compare to International" — Canada vs US/EU pricing

import Link from 'next/link';

const USD_TO_CAD = 1.37;
const USD_TO_EUR = 0.92;
const DUTY_RATE = 0.08;
const GST_RATE = 0.05;

interface RobotPricing {
  name: string;
  slug: string;
  usdPrice: number;
  origin: string;
  shippingUS: number;
  shippingCA: number;
  shippingEU: number;
}

const robots: RobotPricing[] = [
  { name: 'Unitree G1 EDU', slug: 'unitree-g1', usdPrice: 16000, origin: 'China', shippingUS: 800, shippingCA: 2200, shippingEU: 1800 },
  { name: 'Unitree G1 Pro', slug: 'unitree-g1', usdPrice: 27000, origin: 'China', shippingUS: 800, shippingCA: 2200, shippingEU: 1800 },
  { name: 'Tesla Optimus Gen 2', slug: 'tesla-optimus-gen-2', usdPrice: 30000, origin: 'USA', shippingUS: 0, shippingCA: 1000, shippingEU: 2500 },
  { name: '1X NEO', slug: '1x-neo', usdPrice: 30000, origin: 'Norway', shippingUS: 2000, shippingCA: 2500, shippingEU: 800 },
  { name: 'Unitree H1', slug: 'unitree-h1', usdPrice: 90000, origin: 'China', shippingUS: 1200, shippingCA: 3000, shippingEU: 2500 },
  { name: 'Fourier GR-2', slug: 'fourier-gr-2', usdPrice: 55000, origin: 'China', shippingUS: 1000, shippingCA: 2500, shippingEU: 2000 },
];

function fmt(n: number, currency: 'CAD' | 'USD' | 'EUR') {
  const symbols = { CAD: 'CA$', USD: 'US$', EUR: '€' };
  return `${symbols[currency]}${Math.round(n).toLocaleString()}`;
}

export default function CompareInternationalPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">International Pricing</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🌍 Pricing</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Canada vs International Robot Pricing</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">See how Canadian landed costs compare to US and EU pricing. Includes shipping, duties, and taxes.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
        <p className="text-xs text-amber-700 dark:text-amber-400">💡 Estimates based on current exchange rates (1 USD = {USD_TO_CAD} CAD, 1 USD = {USD_TO_EUR} EUR), average customs duties ({DUTY_RATE * 100}%), and GST ({GST_RATE * 100}%). Actual costs may vary.</p>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Robot</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">🇺🇸 US Total</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">🇨🇦 Canada Total</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">🇪🇺 EU Total</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">CA vs US</th>
            </tr>
          </thead>
          <tbody>
            {robots.map(robot => {
              const usTotal = robot.usdPrice + robot.shippingUS;
              const caBase = robot.usdPrice * USD_TO_CAD;
              const caDuty = caBase * DUTY_RATE;
              const caGst = (caBase + caDuty) * GST_RATE;
              const caShipping = robot.shippingCA * USD_TO_CAD;
              const caTotal = caBase + caDuty + caGst + caShipping;
              const euTotal = (robot.usdPrice + robot.shippingEU) * USD_TO_EUR;
              const caPremium = ((caTotal / USD_TO_CAD - usTotal) / usTotal) * 100;

              return (
                <tr key={robot.name} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="py-4 px-4">
                    <Link href={`/robots/${robot.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors">{robot.name}</Link>
                    <p className="text-[10px] text-gray-400">From {robot.origin}</p>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">{fmt(usTotal, 'USD')}</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">{fmt(caTotal, 'CAD')}</td>
                  <td className="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">{fmt(euTotal, 'EUR')}</td>
                  <td className={`py-4 px-4 text-right font-semibold ${caPremium > 15 ? 'text-red-500' : caPremium > 5 ? 'text-amber-500' : 'text-emerald-500'}`}>
                    +{caPremium.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Key insights */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: '📊', title: 'Average Canada Premium', value: '10-20%', desc: 'Canadian landed costs are typically 10-20% higher than US prices due to exchange rates, duties, and shipping.' },
          { icon: '💡', title: 'Best Value Routes', value: 'US Origin', desc: 'Robots shipping from the US (Tesla, Figure AI) have the lowest Canadian premiums due to CUSMA trade benefits.' },
          { icon: '🇨🇦', title: 'Canadian-Made Advantage', value: 'Sanctuary AI', desc: 'Sanctuary AI Phoenix avoids import complexities entirely — manufactured in Vancouver, BC.' },
        ].map(insight => (
          <div key={insight.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
            <span className="text-2xl">{insight.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1">{insight.title}</h3>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">{insight.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{insight.desc}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 text-center">
        <Link href="/calculator" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Use Full Cost Calculator →
        </Link>
      </div>
    </div>
  );
}
