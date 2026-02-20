import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Enterprise Sales — Fleet Pricing & Custom Deployment | RoboNorth',
  description: 'Enterprise robotics solutions for Canadian businesses. Fleet pricing, dedicated account manager, custom deployment, and ongoing support.',
  alternates: { canonical: 'https://robonorth.ca/enterprise' },
};

export default function EnterprisePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-10 sm:p-16 text-center overflow-hidden mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">🏢 Enterprise</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Scale Your Workforce with Robots</h1>
          <p className="text-blue-200 max-w-2xl mx-auto mb-8">Deploy humanoid robots across your operations with fleet pricing, dedicated support, and custom integration from RoboNorth&apos;s enterprise team.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+15873250017" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors">
              📞 Call (587) 325-0017
            </a>
            <Link href="/contact?type=enterprise" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { icon: '💰', title: 'Fleet Pricing', desc: 'Volume discounts starting at 3+ units. Up to 25% off for large deployments.' },
          { icon: '👤', title: 'Dedicated Account Manager', desc: 'Single point of contact for all your robotics needs — procurement to support.' },
          { icon: '🔧', title: 'Custom Deployment', desc: 'On-site installation, integration with existing systems, and staff training.' },
          { icon: '🛡️', title: 'Enterprise Support', desc: '24/7 priority support, extended warranties, and preventive maintenance plans.' },
        ].map(b => (
          <div key={b.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
            <span className="text-3xl">{b.icon}</span>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{b.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing tiers */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enterprise Pricing Tiers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Volume-based discounts for Canadian businesses</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { tier: 'Starter Fleet', units: '3-5 units', discount: '10% off', features: ['Volume pricing', 'Dedicated sales contact', 'Training included', '1-year warranty'] },
            { tier: 'Growth Fleet', units: '6-20 units', discount: '15% off', features: ['Everything in Starter', 'On-site deployment', 'Custom integration', 'Extended 2-year warranty'], popular: true },
            { tier: 'Enterprise Fleet', units: '20+ units', discount: 'Up to 25% off', features: ['Everything in Growth', 'Dedicated account manager', '24/7 support SLA', 'Custom development', 'Flexible payment terms'] },
          ].map(t => (
            <div key={t.tier} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 relative ${t.popular ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}`}>
              {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.tier}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.units}</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{t.discount}</p>
              <ul className="space-y-2 mb-6">
                {t.features.map(f => (
                  <li key={f} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact?type=enterprise" variant={t.popular ? 'primary' : 'outline'} size="sm" className="w-full">
                Get Quote →
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Book a meeting placeholder */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-10 text-center mb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📅 Book a Consultation</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">Schedule a 30-minute call with our enterprise team to discuss your fleet requirements, pricing, and deployment timeline.</p>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 max-w-md mx-auto">
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">Meeting scheduler coming soon. In the meantime:</p>
          <a href="tel:+15873250017" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">
            📞 Call +1 (587) 325-0017
          </a>
          <p className="text-xs text-gray-400 mt-3">Mon-Fri 9:00 AM - 6:00 PM MT</p>
        </div>
      </section>

      {/* Trusted by */}
      <section className="text-center mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">Trusted by Canadian enterprises</p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 dark:text-gray-600">
          {['Manufacturing Co.', 'Logistics Inc.', 'Healthcare Group', 'Tech Corp', 'University Labs'].map(c => (
            <div key={c} className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-medium text-gray-400">{c}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
