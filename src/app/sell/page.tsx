import type { Metadata } from 'next';
import Link from 'next/link';
import VendorForm from '@/components/ui/VendorForm';

export const metadata: Metadata = {
  title: 'Become a Seller — RoboNorth Marketplace',
  description: 'Sell your robots and components on Canada\'s largest humanoid robot marketplace. Join RoboNorth as a vendor.',
  alternates: { canonical: 'https://robonorth.ca/sell' },
};

export default function SellPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Become a Seller</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🏪 Vendor Program</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Sell on RoboNorth</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Reach thousands of Canadian buyers. List your humanoid robots, parts, and components on Canada&apos;s premier robotics marketplace.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: '🇨🇦', title: 'Canadian Market Access', desc: 'Tap into the growing Canadian robotics market — $2B+ by 2027' },
          { icon: '💰', title: 'Competitive Rates', desc: '5-8% commission. No listing fees. Pay only when you sell.' },
          { icon: '📦', title: 'Logistics Support', desc: 'We handle customs clearance, shipping, and returns for you' },
        ].map(b => (
          <div key={b.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
            <span className="text-3xl">{b.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1">{b.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
          </div>
        ))}
      </div>

      <VendorForm />
    </div>
  );
}
