import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Installation & Training Services — On-Site Robot Setup | RoboNorth',
  description: 'Professional on-site robot installation, commissioning, and staff training. $2,500-$10,000 depending on complexity.',
  alternates: { canonical: 'https://robonorth.ca/services/installation' },
};

export default function InstallationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Installation & Training</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🔧 Services</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Installation & Training</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Professional on-site setup, commissioning, and comprehensive staff training for your humanoid robot deployment.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {[
          {
            name: 'Basic Setup', price: 'From $2,500', desc: 'Single robot deployment',
            features: ['On-site delivery & unboxing', 'Physical setup & calibration', 'Basic operator training (4h)', 'Safety walkthrough', 'Documentation handover'],
          },
          {
            name: 'Standard Deployment', price: 'From $5,000', desc: 'Integration with existing systems', popular: true,
            features: ['Everything in Basic', 'System integration', 'Network/Wi-Fi configuration', 'Extended training (8h)', 'Custom workflow setup', '30-day remote support'],
          },
          {
            name: 'Enterprise Commissioning', price: 'From $10,000', desc: 'Fleet deployment & training',
            features: ['Everything in Standard', 'Multi-robot deployment', 'Custom safety assessment', 'Train-the-trainer program (16h)', 'CSA compliance documentation', '90-day on-site support', 'Dedicated project manager'],
          },
        ].map(plan => (
          <div key={plan.name} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 relative ${plan.popular ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{plan.price}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{plan.desc}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button href="/contact?type=installation" variant={plan.popular ? 'primary' : 'outline'} size="sm" className="w-full">
              Request Quote
            </Button>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Coverage Across Canada</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">On-site installation is available in all major Canadian cities:</p>
        <div className="flex flex-wrap gap-2">
          {['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Halifax', 'Kitchener-Waterloo', 'Quebec City'].map(city => (
            <span key={city} className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300">📍 {city}</span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">Remote locations available with travel surcharge. Contact us for a quote.</p>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Ready to schedule your installation?</p>
        <a href="tel:+15873250017" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">📞 Call +1 (587) 325-0017</a>
      </div>
    </div>
  );
}
