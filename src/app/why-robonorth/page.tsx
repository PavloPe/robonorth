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
