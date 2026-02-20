import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #30: Maintenance & support plans page

export const metadata: Metadata = {
  title: 'Maintenance & Support Plans — Keep Your Robot Running',
  description: 'RoboNorth maintenance and support plans for humanoid robots. Choose from Basic, Professional, and Enterprise tiers.',
  alternates: { canonical: 'https://robonorth.ca/support-plans' },
};

const plans = [
  {
    name: 'Basic',
    price: '$199/mo',
    desc: 'Essential support for research and small-scale deployments.',
    features: [
      'Email support (48hr response)',
      'Monthly maintenance checklist',
      'Software update notifications',
      'Knowledge base access',
      'Community forum access',
    ],
    notIncluded: ['Phone support', 'On-site service', 'Emergency repairs', 'Spare parts inventory'],
    cta: 'Start Basic Plan',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$599/mo',
    desc: 'Full support for production deployments and business-critical operations.',
    features: [
      'Phone & email support (4hr response)',
      'Weekly maintenance reports',
      'Remote diagnostics & troubleshooting',
      'Priority software updates',
      'Quarterly performance reviews',
      'Spare parts priority ordering',
      '1 annual on-site inspection',
    ],
    notIncluded: ['24/7 emergency line', 'Unlimited on-site visits'],
    cta: 'Start Professional Plan',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'White-glove service for fleet deployments and mission-critical operations.',
    features: [
      '24/7 emergency support line',
      'Dedicated account manager',
      'Real-time fleet monitoring dashboard',
      'Unlimited remote diagnostics',
      'Quarterly on-site inspections',
      'Priority spare parts (48hr delivery)',
      'Annual comprehensive overhaul',
      'Custom SLA (up to 99.5% uptime)',
      'Staff training programs',
    ],
    notIncluded: [],
    cta: 'Contact Enterprise Sales',
    popular: false,
  },
];

export default function SupportPlansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Support Plans</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🔧 Support</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Maintenance & Support Plans</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Keep your humanoid robots running at peak performance with our comprehensive support plans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {plans.map(plan => (
          <div key={plan.name} className={`bg-white dark:bg-gray-900 border rounded-2xl p-6 relative ${plan.popular ? 'border-blue-500 dark:border-blue-500 shadow-lg shadow-blue-500/10' : 'border-gray-200 dark:border-gray-700'}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
            <div className="mb-3">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-xs text-gray-400 ml-1">per robot</span>}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">{plan.desc}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-emerald-500 mt-0.5">✓</span> {f}
                </li>
              ))}
              {plan.notIncluded.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="mt-0.5">✗</span> {f}
                </li>
              ))}
            </ul>
            <Button href="/inquiry?type=support" variant={plan.popular ? 'primary' : 'outline'} className="w-full !justify-center">
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* What's included */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Support Covers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🔍', title: 'Diagnostics', desc: 'Remote and on-site diagnostic capabilities to identify issues before they cause downtime.' },
            { icon: '🔧', title: 'Repairs', desc: 'Certified technicians for mechanical, electrical, and software repairs.' },
            { icon: '📦', title: 'Spare Parts', desc: 'Priority access to OEM spare parts with fast shipping across Canada.' },
            { icon: '📊', title: 'Monitoring', desc: 'Real-time performance monitoring and predictive maintenance alerts.' },
          ].map(item => (
            <div key={item.title} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Need a Custom Support Plan?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">For fleet deployments or special requirements, we create custom maintenance agreements.</p>
        <Button href="/inquiry?type=custom-support" size="lg">Talk to Support Sales →</Button>
      </div>
    </div>
  );
}
