import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Why Choose RoboNorth — Canada\'s Trusted Robot Marketplace',
  description: 'Why Canadian buyers choose RoboNorth: expert curation, import assistance, competitive pricing, Canadian-first support, and the largest humanoid robot selection in Canada.',
  openGraph: {
    title: 'Why Choose RoboNorth — Canada\'s Trusted Robot Marketplace',
    description: 'Expert curation, import assistance, financing support, and 32+ robots. Canada\'s first dedicated humanoid robot marketplace.',
    url: 'https://robonorth.ca/why-robonorth',
  },
  alternates: { canonical: 'https://robonorth.ca/why-robonorth' },
};

const reasons = [
  {
    icon: '🇨🇦',
    title: 'Canadian-First Focus',
    description: 'Every recommendation, price estimate, and import guide is built for Canadian buyers. We understand CUSMA, CETA, SR&ED, provincial taxes, and the unique challenges of deploying robots in Canadian conditions — including winter operation.',
  },
  {
    icon: '🤖',
    title: 'Expert Curation',
    description: 'We don\'t list every robot that exists. We curate 32+ models that are genuinely available, supported, and relevant to Canadian buyers. Every listing includes verified specs, real pricing, and honest assessments.',
  },
  {
    icon: '📦',
    title: 'Import Assistance',
    description: 'First time importing a robot? We connect you with experienced customs brokers, advise on HS code classification (8479.50 vs 9503.00 can mean 8% duty difference), and help navigate trade agreements.',
  },
  {
    icon: '💰',
    title: 'Financing & Grants Support',
    description: 'We help identify applicable government incentives — SR&ED, IRAP, CDAP, provincial programmes — and connect you with equipment financing partners. Many buyers recover 25–35% of costs through grants alone.',
  },
  {
    icon: '⚖️',
    title: 'Unbiased Comparison',
    description: 'We\'re not a single-brand dealership. Our comparisons, rankings, and recommendations are based on objective criteria — not commission structures. We tell you when a robot isn\'t right for you.',
  },
  {
    icon: '🛡️',
    title: 'Post-Purchase Support',
    description: 'Our relationship doesn\'t end at purchase. We offer maintenance referrals, software update guidance, community connections, and ongoing consultation. We\'re invested in your success with robotics.',
  },
];

export default function WhyRoboNorthPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Why RoboNorth</span>
      </nav>

      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose RoboNorth?</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Canada&apos;s first and most comprehensive humanoid robot marketplace. We help Canadians navigate the rapidly evolving world of humanoid robotics with expertise, transparency, and a commitment to your success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {reasons.map(reason => (
          <div key={reason.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <span className="text-3xl block mb-3">{reason.icon}</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{reason.description}</p>
          </div>
        ))}
      </div>

      {/* By the numbers */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">32+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humanoid Robots Listed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">71+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Parts & Components</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">18</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manufacturers Tracked</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">10</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Provinces Served</p>
          </div>
        </div>
      </div>

      {/* How We're Different — Competitor Comparison */}
      <div className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">How We&apos;re Different</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Not all robot sellers are the same. Here&apos;s how a dedicated humanoid marketplace compares to other ways of buying robots in Canada.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* RoboNorth */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Recommended
            </div>
            <div className="mt-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Humanoid-Focused Marketplace</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">e.g. RoboNorth</p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { check: true, text: '40+ humanoid robots — our entire focus' },
                { check: true, text: 'Transparent pricing in CAD & USD' },
                { check: true, text: 'Side-by-side comparison tools' },
                { check: true, text: 'Canadian import & customs guidance' },
                { check: true, text: 'Robotics engineer-verified listings' },
                { check: true, text: 'Government grant assistance (SR&ED, IRAP)' },
                { check: true, text: 'Dedicated community & support' },
                { check: true, text: 'Unbiased — not tied to one brand' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Dealers */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">General Drone/Robot Dealers</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Multi-category resellers</p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { check: false, text: 'Humanoids are an afterthought (1 of 192 products)' },
                { check: false, text: '"Contact for pricing" on 60%+ of products' },
                { check: false, text: 'No robot comparison tools' },
                { check: true, text: 'Physical offices for enterprise support' },
                { check: false, text: 'Staff focused on drones, not humanoids' },
                { check: true, text: 'Some government/defence experience' },
                { check: false, text: 'No humanoid-specific community' },
                { check: false, text: 'Tied to specific distributor agreements' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-2">
                  {item.check ? (
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct from Manufacturer */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Direct from Manufacturer</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Buying from Unitree, Figure, etc. directly</p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { check: false, text: 'Can only see one brand\'s products' },
                { check: true, text: 'Manufacturer-direct pricing' },
                { check: false, text: 'No cross-brand comparison' },
                { check: false, text: 'No Canadian import help — you\'re on your own' },
                { check: true, text: 'Deep product knowledge (their own)' },
                { check: false, text: 'No grant/incentive guidance' },
                { check: false, text: 'Limited post-purchase support in Canada' },
                { check: true, text: 'Access to latest models first' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-2">
                  {item.check ? (
                    <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/robots">Browse Robots</Button>
          <Button href="/quiz" variant="outline">Take the Quiz</Button>
          <Button href="/inquiry" variant="outline">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
