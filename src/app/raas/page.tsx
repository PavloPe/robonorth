import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Robots as a Service (RaaS) in Canada — Lease Humanoid Robots | RoboNorth',
  description: 'Robots as a Service (RaaS) in Canada — lease humanoid robots instead of buying. Monthly subscription model with maintenance, updates, and fleet management included. See pricing and available robots.',
  keywords: ['robots as a service', 'RaaS Canada', 'lease humanoid robot', 'robot subscription', 'robot lease Canada', 'Agility RaaS'],
  openGraph: {
    title: 'Robots as a Service (RaaS) in Canada — Lease Humanoid Robots',
    description: 'Monthly subscriptions for humanoid robots. No capital expenditure, included maintenance, scale up or down.',
    url: 'https://robonorth.ca/raas',
    type: 'website',
  },
  alternates: { canonical: 'https://robonorth.ca/raas' },
};

const raasProviders = [
  {
    name: 'Agility Robotics — Digit RaaS',
    robot: 'Agility Digit / Digit V2',
    pricing: 'Custom enterprise pricing (est. $8K–$15K/month per unit)',
    minTerm: '12 months',
    includes: ['Digit hardware', 'Arc cloud fleet management', 'Preventive maintenance', 'Software updates', 'On-site support (initial phase)', 'Training for operators'],
    idealFor: 'Warehouse, logistics, manufacturing',
    highlight: 'Toyota Woodstock deployment uses this exact model — 7 Digit robots on RaaS.',
    link: '/robots/agility-digit-v2',
  },
  {
    name: '1X Technologies — NEO Lease',
    robot: '1X NEO',
    pricing: '$499 USD/month (~$690 CAD/month)',
    minTerm: '12 months',
    includes: ['NEO hardware', 'Maintenance and repairs', 'Software updates', 'Companion app access', 'Remote diagnostics'],
    idealFor: 'Home assistance, elderly care, personal use',
    highlight: 'Most affordable RaaS option. Option to purchase at end of lease.',
    link: '/robots/1x-neo',
  },
  {
    name: 'Sanctuary AI — Phoenix Deployment',
    robot: 'Sanctuary AI Phoenix / Phoenix Gen 2',
    pricing: 'Custom enterprise pricing (est. $5K–$10K/month)',
    minTerm: '6 months pilot, 12+ months deployment',
    includes: ['Phoenix hardware', 'Carbon AI platform', 'Task learning and customization', 'Maintenance', 'On-site integration support', 'Performance analytics'],
    idealFor: 'Manufacturing, automotive, retail, healthcare',
    highlight: 'Canadian-made. No import duties. Carbon AI learns new tasks in 24 hours.',
    link: '/robots/sanctuary-ai-phoenix-gen2',
  },
];

const buyVsLease = [
  { factor: 'Upfront Cost', buy: 'Full purchase price ($16K–$250K+)', lease: 'First month\'s payment only' },
  { factor: 'Monthly Cost', buy: 'Maintenance only ($200–$1,200/mo)', lease: 'All-inclusive ($500–$15K/mo)' },
  { factor: 'Technology Risk', buy: 'You own depreciating hardware', lease: 'Provider upgrades hardware' },
  { factor: 'Maintenance', buy: 'Your responsibility', lease: 'Included in subscription' },
  { factor: 'Flexibility', buy: 'Permanent commitment', lease: 'Scale up/down at renewal' },
  { factor: 'Accounting', buy: 'Capital expenditure (CAPEX)', lease: 'Operating expense (OPEX)' },
  { factor: 'Ownership', buy: 'Full ownership and control', lease: 'No equity — return at end' },
  { factor: 'Tax Treatment', buy: 'CCA depreciation over years', lease: 'Full deduction as expense' },
];

export default function RaaSPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Robots as a Service', url: 'https://robonorth.ca/raas' },
  ]);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is Robots as a Service (RaaS)?', acceptedAnswer: { '@type': 'Answer', text: 'Robots as a Service (RaaS) is a subscription model where businesses lease humanoid robots instead of purchasing them. Monthly fees typically include the hardware, software updates, maintenance, and fleet management. It\'s similar to SaaS (Software as a Service) but for physical robots.' } },
      { '@type': 'Question', name: 'Is RaaS available in Canada?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Several RaaS providers serve Canadian customers. Agility Robotics offers enterprise RaaS for Digit (as demonstrated by Toyota\'s Woodstock, ON deployment). 1X Technologies offers NEO leases at $499/month. Sanctuary AI is developing RaaS offerings from their Vancouver headquarters.' } },
      { '@type': 'Question', name: 'How much does RaaS cost in Canada?', acceptedAnswer: { '@type': 'Answer', text: 'Consumer RaaS starts at ~$690 CAD/month (1X NEO at $499 USD). Enterprise RaaS typically ranges from $5,000 to $15,000 CAD/month per unit, depending on the robot model and service level. Custom enterprise pricing is common for fleet deployments.' } },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Robots as a Service</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">RaaS in Canada</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robots as a Service (RaaS) in Canada</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          Don&apos;t want to buy a $50,000+ robot outright? Lease one. The Robot-as-a-Service model lets you deploy humanoid robots with predictable monthly costs — maintenance, updates, and support included.
        </p>
      </div>

      {/* News Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-12 flex items-start gap-3">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white">Breaking: Toyota deploys 7 Agility Digit robots via RaaS in Ontario</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">On February 19, 2026, Toyota Motor Manufacturing Canada began operating 7 Digit humanoid robots at their Woodstock, Ontario plant under Agility&apos;s RaaS model. <Link href="/blog/toyota-agility-robots-ontario-2026" className="text-blue-600 dark:text-blue-400 font-semibold">Read the full story →</Link></p>
        </div>
      </div>

      {/* What is RaaS */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is RaaS?</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          <strong>Robots as a Service (RaaS)</strong> is a subscription model where businesses lease humanoid robots instead of purchasing them outright. Think of it as the Netflix of robotics — you pay a monthly fee that covers everything: the hardware, software updates, maintenance, fleet management, and often on-site support.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          The model has gained massive traction in 2026 because humanoid robot technology is evolving so rapidly that buying hardware risks immediate depreciation. By leasing, businesses can upgrade to newer models, scale deployments up or down, and convert a large capital expenditure into a predictable operating expense.
        </p>
      </section>

      {/* Buy vs Lease */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Buy vs. Lease Comparison</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Factor</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-600">Purchase</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-emerald-600">RaaS (Lease)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {buyVsLease.map((row, i) => (
                <tr key={row.factor} className={i < buyVsLease.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{row.factor}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{row.buy}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{row.lease}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RaaS Providers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🤖 Available RaaS Providers in Canada</h2>
        <div className="space-y-6">
          {raasProviders.map(provider => (
            <div key={provider.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{provider.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Robot: {provider.robot}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{provider.pricing}</p>
                  <p className="text-xs text-gray-500">Min. term: {provider.minTerm}</p>
                </div>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-4">💡 {provider.highlight}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Includes</p>
                  <ul className="space-y-1">
                    {provider.includes.map(item => (
                      <li key={item} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <span className="text-emerald-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Ideal For</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{provider.idealFor}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link href={provider.link} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700">
                  View Robot Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Interested in RaaS for Your Business?</h2>
        <p className="text-blue-100 mb-6">Contact us to discuss RaaS options tailored to your industry, use case, and budget.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/inquiry" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Request a Consultation</Button>
          <Button href="/roi-calculator" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Calculate ROI</Button>
        </div>
      </div>
    </div>
  );
}
