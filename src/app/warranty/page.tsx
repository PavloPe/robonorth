import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Warranty & Support Information',
  description: 'Understanding humanoid robot warranties, support options, and after-sales service for Canadian buyers.',
  alternates: { canonical: 'https://robonorth.ca/warranty' },
};

const warrantyInfo = [
  {
    manufacturer: 'Unitree Robotics',
    warranty: '1 year standard warranty',
    support: 'Email support, online documentation, ROS 2 community',
    notes: 'Extended warranty available for EDU models. Parts available for order.',
  },
  {
    manufacturer: '1X Technologies',
    warranty: '2 year comprehensive warranty (expected)',
    support: 'Dedicated support team, OTA software updates',
    notes: 'Consumer-focused support expected with home robot launch.',
  },
  {
    manufacturer: 'Boston Dynamics',
    warranty: 'Custom enterprise agreements',
    support: '24/7 enterprise support, on-site service available',
    notes: 'Full maintenance contracts available for fleet deployments.',
  },
  {
    manufacturer: 'Sanctuary AI',
    warranty: 'Custom pilot program terms',
    support: 'On-site deployment support (Canadian HQ in Vancouver)',
    notes: 'Local Canadian support is a major advantage.',
  },
  {
    manufacturer: 'SoftBank Robotics',
    warranty: '1 year hardware, ongoing software subscription',
    support: 'Global support network, app ecosystem',
    notes: 'Monthly subscription model includes software updates.',
  },
  {
    manufacturer: 'Engineered Arts',
    warranty: '1 year standard, extended options available',
    support: 'Remote support via Tritium platform',
    notes: 'Custom installations include setup and training.',
  },
];

export default function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Warranty & Support</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Warranty & Support</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-2xl">
        Understanding warranty coverage and support options is critical when investing in humanoid robotics. Here&rsquo;s what you need to know as a Canadian buyer.
      </p>

      {/* Key considerations */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Considerations for Canadian Buyers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🇨🇦', title: 'Import Warranty', desc: 'Warranties from international manufacturers typically apply globally, but verify coverage extends to Canada before purchasing.' },
            { icon: '🔧', title: 'Local Service', desc: 'Check if the manufacturer has authorized service partners in Canada. Some brands offer remote diagnostics and OTA updates.' },
            { icon: '📦', title: 'Parts Availability', desc: 'Replacement parts may need to be imported. Ask about parts lead times and shipping to Canada.' },
            { icon: '⚖️', title: 'Consumer Protection', desc: 'Canadian consumer protection laws (provincial) may provide additional warranty rights beyond manufacturer terms.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturer warranty table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Warranty by Manufacturer</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Manufacturer</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Warranty</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Support</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Notes</th>
                </tr>
              </thead>
              <tbody>
                {warrantyInfo.map((item, i) => (
                  <tr key={item.manufacturer} className={`border-b border-gray-100 dark:border-gray-800 ${i % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.manufacturer}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item.warranty}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{item.support}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          * Warranty information is based on publicly available data and may change. Always confirm terms directly with the manufacturer before purchase.
        </p>
      </section>

      {/* RoboNorth support */}
      <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need Help With Your Purchase?</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-md mx-auto">
          RoboNorth can help you understand warranty terms, navigate import logistics, and connect with manufacturer support teams.
        </p>
        <Button href="/inquiry">Contact Our Team</Button>
      </section>
    </div>
  );
}
