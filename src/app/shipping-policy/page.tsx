import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping Policy — RoboNorth',
  description: 'Canadian shipping details for humanoid robots. Shipping times by province, insurance, international shipping, and cold-weather packaging.',
  alternates: { canonical: 'https://robonorth.ca/shipping-policy' },
};

const provinceTimes = [
  { province: 'Ontario', standard: '2-4 days', express: '1-2 days' },
  { province: 'Quebec', standard: '3-5 days', express: '1-2 days' },
  { province: 'British Columbia', standard: '3-5 days', express: '1-3 days' },
  { province: 'Alberta', standard: '3-5 days', express: '1-2 days' },
  { province: 'Manitoba', standard: '4-6 days', express: '2-3 days' },
  { province: 'Saskatchewan', standard: '4-6 days', express: '2-3 days' },
  { province: 'Nova Scotia', standard: '5-7 days', express: '2-3 days' },
  { province: 'New Brunswick', standard: '5-7 days', express: '2-3 days' },
  { province: 'Newfoundland & Labrador', standard: '6-8 days', express: '3-4 days' },
  { province: 'Prince Edward Island', standard: '5-7 days', express: '2-3 days' },
  { province: 'Northwest Territories', standard: '7-10 days', express: '4-5 days' },
  { province: 'Yukon', standard: '7-10 days', express: '4-5 days' },
  { province: 'Nunavut', standard: '8-12 days', express: '5-7 days' },
];

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Shipping Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shipping Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Last updated: January 2026</p>

      <div className="prose dark:prose-invert max-w-none space-y-10">
        {/* Overview */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🚚 Shipping Overview</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 not-prose">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">🇨🇦</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Ships from Canada</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">When available in Canadian inventory</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">📦</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Fully Insured</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">All shipments include full replacement insurance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">❄️</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">Cold-Weather Packaging</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Oct-Apr: thermal protection included free</p>
              </div>
            </div>
          </div>
        </section>

        {/* Provincial times */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📍 Estimated Delivery Times by Province</h2>
          <div className="not-prose overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Province</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Standard</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Express</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {provinceTimes.map(p => (
                  <tr key={p.province} className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-2.5 font-medium text-gray-900 dark:text-white">{p.province}</td>
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{p.standard}</td>
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{p.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">Times are estimates from ship date. Actual delivery may vary based on carrier conditions.</p>
        </section>

        {/* Carriers */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ Shipping Partners</h2>
          <p className="text-gray-600 dark:text-gray-300">We work with trusted Canadian carriers:</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1.5 mt-3">
            <li><strong>Canada Post</strong> — Standard and expedited parcels</li>
            <li><strong>Purolator</strong> — Express and freight shipments</li>
            <li><strong>FedEx Canada</strong> — International and heavy equipment</li>
            <li><strong>Dedicated freight</strong> — For robots over 50kg, white-glove delivery available</li>
          </ul>
        </section>

        {/* International */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🌍 International Shipping</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-3">Many robots ship directly from international manufacturers. RoboNorth handles customs clearance and import duties on your behalf.</p>
          <div className="not-prose bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm"><span className="text-emerald-500">✓</span><span className="text-gray-700 dark:text-gray-300">Customs brokerage included</span></div>
            <div className="flex items-center gap-2 text-sm"><span className="text-emerald-500">✓</span><span className="text-gray-700 dark:text-gray-300">CUSMA duty reduction for US-made robots</span></div>
            <div className="flex items-center gap-2 text-sm"><span className="text-emerald-500">✓</span><span className="text-gray-700 dark:text-gray-300">Full transit insurance</span></div>
            <div className="flex items-center gap-2 text-sm"><span className="text-emerald-500">✓</span><span className="text-gray-700 dark:text-gray-300">Real-time tracking provided</span></div>
          </div>
        </section>

        {/* Contact */}
        <section className="not-prose bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">Questions about shipping? Call <a href="tel:+15873250017" className="text-blue-600 font-semibold hover:underline">+1 (587) 325-0017</a> or <Link href="/contact" className="text-blue-600 font-semibold hover:underline">contact us</Link>.</p>
        </section>
      </div>
    </div>
  );
}
