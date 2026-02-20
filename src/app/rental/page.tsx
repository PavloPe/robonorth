import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Rent a Humanoid Robot — Short-Term Leases in Canada | RoboNorth',
  description: 'Rent humanoid robots in Canada. 1-week trials, 1-month pilots, and 6-month deployments. Try before you buy with flexible rental terms and included support.',
  keywords: ['rent humanoid robot', 'robot rental Canada', 'lease robot short term', 'humanoid robot trial'],
  openGraph: {
    title: 'Rent a Humanoid Robot — Short-Term Leases in Canada',
    description: 'Try before you buy. 1-week trials from $2,500, 1-month pilots from $5,000, 6-month deployments at reduced rates.',
    url: 'https://robonorth.ca/rental',
  },
  alternates: { canonical: 'https://robonorth.ca/rental' },
};

const rentalTiers = [
  {
    name: 'Trial',
    duration: '1 Week',
    price: 'From $2,500 CAD',
    priceNote: 'One-time fee',
    description: 'A hands-on introduction. Get a robot delivered, spend a week testing it with your team, and return it.',
    includes: ['Robot delivery & pickup', 'Remote setup support', 'Basic training session (1 hr)', 'Insurance included'],
    idealFor: 'Teams evaluating whether humanoid robotics fits their operation',
    colour: 'emerald',
  },
  {
    name: 'Pilot',
    duration: '1 Month',
    price: 'From $5,000 CAD/month',
    priceNote: 'Monthly billing',
    description: 'A real deployment test. Run the robot on actual tasks for a full month and measure results.',
    includes: ['Everything in Trial', 'On-site setup assistance', 'Extended training (4 hrs)', 'Weekly check-in calls', 'Performance analytics report'],
    idealFor: 'Companies building an internal business case for humanoid adoption',
    colour: 'blue',
  },
  {
    name: 'Deployment',
    duration: '6 Months',
    price: 'From $3,500 CAD/month',
    priceNote: 'Reduced rate, 6-month commitment',
    description: 'A sustained deployment. Six months gives you real data on ROI, reliability, and workforce integration.',
    includes: ['Everything in Pilot', 'Priority support', 'Quarterly maintenance visits', 'Option to purchase at reduced price', 'Custom task programming', 'ROI analysis report'],
    idealFor: 'Enterprises committed to humanoid integration with a clear use case',
    colour: 'purple',
  },
];

export default function RentalPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Robot Rental</span>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rent a Humanoid Robot
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Not ready to buy? Try before you commit. Our flexible rental programme lets you test humanoid robots in your actual environment with real tasks.
        </p>
      </div>

      {/* Rental Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {rentalTiers.map(tier => (
          <div key={tier.name} className={`bg-white dark:bg-gray-900 border-2 rounded-2xl p-6 ${
            tier.colour === 'blue' ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
          }`}>
            {tier.colour === 'blue' && (
              <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2 py-1 rounded-lg mb-3 uppercase tracking-wider">Most Popular</span>
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{tier.duration}</p>
            <div className="mt-4 mb-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tier.price}</p>
              <p className="text-xs text-gray-400">{tier.priceNote}</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{tier.description}</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Includes</p>
              <ul className="space-y-1.5">
                {tier.includes.map(item => (
                  <li key={item} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-gray-400 mb-4"><strong>Ideal for:</strong> {tier.idealFor}</p>
            <Button href="/inquiry?type=rental" size="lg" className="w-full">
              Get Started
            </Button>
          </div>
        ))}
      </div>

      {/* Available for Rental */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available for Rental</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Unitree G1 EDU', price: 'Trial: $2,500 · Pilot: $5,000/mo', link: '/robots/unitree-g1' },
            { name: 'Unitree R1', price: 'Trial: $1,500 · Pilot: $3,000/mo', link: '/robots/unitree-r1' },
            { name: 'SoftBank Pepper', price: 'Trial: $3,500 · Pilot: $6,000/mo', link: '/robots/softbank-pepper' },
            { name: 'Sanctuary AI Phoenix', price: 'Custom enterprise pricing', link: '/robots/sanctuary-ai-phoenix' },
            { name: 'Unitree H1-2', price: 'Pilot: $12,000/mo · Deploy: $8,500/mo', link: '/robots/unitree-h1-2' },
            { name: 'More Coming Soon', price: 'Contact for availability', link: '/inquiry' },
          ].map(robot => (
            <Link key={robot.name} href={robot.link} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <p className="font-bold text-gray-900 dark:text-white">{robot.name}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{robot.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rental FAQ</h2>
        <div className="space-y-3">
          {[
            { q: 'What happens if the robot is damaged?', a: 'All rentals include comprehensive insurance. Normal wear and tear is expected. Major damage due to misuse may incur repair charges (disclosed upfront in the rental agreement).' },
            { q: 'Can I apply rental payments towards a purchase?', a: 'Yes! On our 6-month Deployment tier, a portion of your rental payments can be applied to the purchase price if you decide to buy.' },
            { q: 'Do you deliver across Canada?', a: 'We deliver to all 10 provinces. Delivery is included for Trial and Pilot tiers within major metropolitan areas (GTA, Vancouver, Montreal, Calgary, Edmonton, Ottawa). Remote locations may incur additional shipping.' },
          ].map(faq => (
            <details key={faq.q} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {faq.q}
                <svg className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Prefer to lease long-term? Check out our RaaS options.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/raas" variant="outline">Robot as a Service (RaaS)</Button>
          <Button href="/buy" variant="outline">Buy New</Button>
        </div>
      </div>
    </div>
  );
}
