import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Extended Warranty Plans — Robot Protection | RoboNorth',
  description: 'Protect your investment with RoboNorth extended warranty plans. 1-year included, plus 2-year and 3-year options.',
  alternates: { canonical: 'https://robonorth.ca/warranty-plans' },
};

export default function WarrantyPlansPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Warranty Plans</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🛡️ Protection</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Extended Warranty Plans</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Protect your robot investment with comprehensive coverage. Every robot includes 1-year standard warranty.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            name: 'Standard', duration: '1 Year', price: 'Included', priceNote: 'with every purchase',
            features: ['Manufacturing defects', 'Component replacement', 'Email support', 'Remote diagnostics'],
            current: false, popular: false,
          },
          {
            name: 'Extended', duration: '2 Years', price: '+10%', priceNote: 'of robot purchase price',
            features: ['Everything in Standard', 'Accidental damage cover', 'Priority phone support', 'On-site repair (major cities)', 'Annual inspection included'],
            current: false, popular: true,
          },
          {
            name: 'Premium', duration: '3 Years', price: '+15%', priceNote: 'of robot purchase price',
            features: ['Everything in Extended', 'Full replacement guarantee', '24/7 emergency support', 'Loaner robot during repairs', 'Software updates included', 'Annual preventive maintenance'],
            current: false, popular: false,
          },
        ].map(plan => (
          <div key={plan.name} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 relative ${plan.popular ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Recommended</div>}
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{plan.duration}</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{plan.price}</p>
              <p className="text-xs text-gray-400">{plan.priceNote}</p>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button href="/contact?type=warranty" variant={plan.popular ? 'primary' : 'outline'} size="sm" className="w-full">
              {plan.name === 'Standard' ? 'Included Free' : 'Add to Order'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">Questions about warranty coverage? Call <a href="tel:+15873250017" className="text-blue-600 font-semibold hover:underline">+1 (587) 325-0017</a></p>
      </div>
    </div>
  );
}
