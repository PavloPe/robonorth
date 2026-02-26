import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Why Humanoid-First? — Buy Humanoid Robots in Canada | RoboNorth',
  description:
    'Why a dedicated humanoid robot marketplace beats general robotics stores. Deep expertise, verified listings, Canadian import help, and a $38B market that deserves specialist attention. Buy humanoid robots in Canada.',
  keywords: [
    'buy humanoid robot Canada',
    'humanoid robot marketplace',
    'humanoid robot store Canada',
    'buy robot Canada',
    'humanoid robotics specialist',
  ],
  openGraph: {
    title: 'Why Humanoid-First? | RoboNorth — Canada\'s Humanoid Robot Marketplace',
    description:
      'The humanoid robot market is projected to reach $38B by 2035. It deserves dedicated expertise — not a corner of a drone catalog.',
    url: 'https://robonorth.ca/why-humanoid-first',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Why Humanoid-First — RoboNorth' }],
  },
  alternates: { canonical: 'https://robonorth.ca/why-humanoid-first' },
};

const specialistAdvantages = [
  {
    icon: '🎯',
    title: 'Deep Expertise > Wide Catalogs',
    description:
      'General robotics dealers list drones, ROVs, ground vehicles, sensors, and maybe one or two humanoids buried on page 12. We live and breathe humanoid robots — every model, every variant, every spec sheet. When you have questions about DOF counts, actuator torque, or ROS 2 compatibility, you\'re talking to specialists, not generalists reading a spec sheet for the first time.',
  },
  {
    icon: '✅',
    title: 'Every Listing Verified by Robotics Engineers',
    description:
      'We don\'t just copy-paste manufacturer marketing. Our team verifies specs against real-world testing, cross-references pricing across global markets, and provides honest assessments of each robot\'s readiness. If a robot isn\'t ready for Canadian deployment, we\'ll tell you — even if it means losing a sale.',
  },
  {
    icon: '🇨🇦',
    title: 'The Canadian Humanoid Community',
    description:
      'RoboNorth isn\'t just a store — it\'s a hub for Canada\'s growing humanoid robotics community. We connect buyers with university research labs, help navigate government grants (SR&ED, IRAP, CDAP), and provide Canadian-specific guidance on import duties, CUSMA benefits, and cold-weather deployment. You won\'t find that at a drone dealer.',
  },
  {
    icon: '⚖️',
    title: 'Brand-Neutral Recommendations',
    description:
      'Multi-category dealers often have exclusive distribution agreements that incentivize pushing specific brands. We carry 40+ humanoid robots from 18+ manufacturers and recommend based on your needs — not our commission structure. If a $5,900 Unitree R1 solves your problem, we won\'t upsell you to a $250K robot.',
  },
  {
    icon: '💰',
    title: 'Price Transparency, Not "Contact Us"',
    description:
      'In the traditional robotics industry, "contact for pricing" is the norm — sometimes on 60% or more of a dealer\'s catalog. We believe Canadian buyers deserve upfront pricing in both CAD and USD. You can compare costs before ever picking up the phone.',
  },
  {
    icon: '🔧',
    title: 'Parts & Accessories Ecosystem',
    description:
      'Humanoid robots need specific parts — actuators, LiDAR, dexterous hands, batteries, development kits. We curate 70+ components that are verified compatible with the robots we sell. General dealers stock drone propellers and camera gimbals; we stock Dynamixel servos and force/torque sensors.',
  },
];

const marketStats = [
  { value: '$38B', label: 'Projected humanoid robot market by 2035', source: 'Goldman Sachs' },
  { value: '1M+', label: 'Humanoid robots expected in deployment by 2030', source: 'Industry estimates' },
  { value: '40+', label: 'Humanoid robots tracked on RoboNorth', source: '' },
  { value: '$5.9K', label: 'Entry price for a full-body humanoid robot', source: 'Unitree R1' },
];

export default function WhyHumanoidFirstPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Why Humanoid-First?</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-blue-100 dark:border-blue-800">
          <span>🤖</span> A $38 Billion Market Deserves Dedicated Expertise
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
          Why <span className="text-blue-600 dark:text-blue-400">Humanoid-First</span>?
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          You wouldn&apos;t buy a car from a bicycle shop that happens to stock one sedan. 
          So why buy a humanoid robot from a drone dealer that lists it as product #147 of 192?
        </p>
      </div>

      {/* Generalist vs Specialist comparison */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Generalist */}
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl">
                📦
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Generalist Approach</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">General robotics dealers</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                '192 products across drones, ROVs, ground vehicles, sensors',
                'Humanoid robots: 1 out of 192 (0.5% of catalog)',
                'Staff expertise spread across 30+ product categories',
                '"Contact for pricing" on most robots',
                'No comparison tools for humanoid models',
                'Drone-focused training and support',
                'Humanoid listed as an afterthought',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-gray-400 dark:text-gray-500 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialist */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Our Approach
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-xl">
                🎯
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">The Specialist Approach</h2>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">RoboNorth — humanoid-first</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                '40+ humanoid robots — 100% of our focus',
                'Every robot researched, verified, and compared',
                'Team specialized exclusively in humanoid robotics',
                'Transparent pricing in CAD and USD',
                'Side-by-side comparison and scoring tools',
                'Humanoid-specific parts, training, and community',
                'This is all we do — and we do it well',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Market stats */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 sm:p-10 mb-16 text-white">
        <h2 className="text-2xl font-bold text-center mb-2">The Humanoid Robot Opportunity</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">A market this big deserves more than a footnote in a drone catalog.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {marketStats.map(stat => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400 leading-snug">{stat.label}</p>
              {stat.source && <p className="text-xs text-gray-500 mt-1">— {stat.source}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Six advantages */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
          Why Specialists Win
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          In a rapidly evolving $38B market, the depth of knowledge matters more than the breadth of a catalog.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialistAdvantages.map(adv => (
            <div key={adv.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg hover:shadow-blue-600/5 transition-all">
              <span className="text-3xl block mb-3">{adv.icon}</span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{adv.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who is this for? */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Who Benefits Most?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🏭', title: 'Manufacturers', desc: 'Looking to deploy humanoids in production lines and warehouses' },
            { emoji: '🎓', title: 'Universities', desc: 'Equipping robotics labs with research-grade humanoid platforms' },
            { emoji: '🏠', title: 'Consumers', desc: 'Early adopters ready for humanoid home assistants' },
            { emoji: '💼', title: 'Enterprise', desc: 'Evaluating humanoid robotics for operational efficiency' },
          ].map(item => (
            <div key={item.title} className="text-center p-4">
              <span className="text-3xl block mb-2">{item.emoji}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to Explore?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
          Browse Canada&apos;s most comprehensive humanoid robot catalog — with real prices, verified specs, and expert guidance.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/robots">Browse 40+ Robots</Button>
          <Button href="/compare" variant="outline">Compare Models</Button>
          <Button href="/why-robonorth" variant="outline">Why RoboNorth?</Button>
        </div>
      </div>
    </div>
  );
}
