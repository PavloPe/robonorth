import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robotics in Ontario — Companies, Grants & Events | RoboNorth',
  description: 'Ontario\'s humanoid robotics ecosystem: local companies, government grants, case studies, and upcoming events in Canada\'s largest robotics market.',
  alternates: { canonical: 'https://robonorth.ca/robotics-in-ontario' },
};

export default function RoboticsInOntarioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/canadian-robotics" className="hover:text-gray-600 transition-colors">Canadian Robotics</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Ontario</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 Provincial Spotlight</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robotics in Ontario</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">Ontario is Canada&apos;s largest robotics market, home to major automotive manufacturers, world-class universities, and a thriving tech ecosystem.</p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '400+', label: 'Robotics companies' },
          { stat: '$8.5B', label: 'Industry value' },
          { stat: '15,000+', label: 'Robotics jobs' },
          { stat: '#1', label: 'In Canada for automation' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Companies */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏭 Ontario Robotics Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Clearpath Robotics / OTTO Motors', city: 'Kitchener', desc: 'Autonomous mobile robots for industrial applications. Acquired by Rockwell Automation.' },
            { name: 'MDA Space', city: 'Brampton', desc: 'Creators of the Canadarm. Advanced space robotics and satellite systems.' },
            { name: 'Myant Inc.', city: 'Toronto', desc: 'Smart textile robotics and wearable technology for healthcare.' },
            { name: 'Kindred AI', city: 'Toronto', desc: 'AI-powered robotic picking systems for e-commerce and logistics.' },
            { name: 'Avidbots', city: 'Kitchener', desc: 'Autonomous floor-cleaning robots for commercial spaces.' },
            { name: 'Think Research', city: 'Toronto', desc: 'Healthcare automation and robotic-assisted clinical workflows.' },
          ].map(c => (
            <div key={c.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">📍 {c.city}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Ontario Case Studies</h2>
        <div className="space-y-4">
          {[
            { title: 'Toyota Motor Manufacturing — Woodstock, ON', desc: 'Deployed humanoid robots for quality inspection on the RAV4 assembly line. Reduced defect rates by 40% and freed 12 workers for higher-value tasks.', result: '40% defect reduction' },
            { title: 'GTA Logistics Corp — Brampton, ON', desc: 'Fleet of 8 mobile robots handling warehouse picking and packing. ROI achieved within 14 months.', result: '14-month ROI' },
            { title: 'Southlake Regional Health Centre — Newmarket, ON', desc: 'Piloting humanoid robots for patient transport and supply delivery across 3 floors.', result: '25% faster deliveries' },
          ].map(cs => (
            <div key={cs.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{cs.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cs.desc}</p>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">Result: {cs.result}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Grants */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💰 Ontario Grants & Incentives</h2>
        <div className="space-y-3">
          {[
            { name: 'Ontario Made Manufacturing Investment Tax Credit', amount: '10% of investment', desc: 'Tax credit on qualifying capital investments including robots' },
            { name: 'Ontario Centres of Innovation (OCI)', amount: 'Up to $500K', desc: 'Funding for technology adoption and industry-academic partnerships' },
            { name: 'Next Generation Network Program', amount: 'Varies', desc: 'Support for Ontario manufacturers adopting advanced technologies' },
          ].map(g => (
            <div key={g.name} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex items-start gap-3">
              <span className="text-lg">💰</span>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{g.name}</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{g.amount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button href="/grants" variant="outline" size="sm">View All Canadian Grants →</Button>
        </div>
      </section>

      {/* Events */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📅 Upcoming Ontario Robotics Events</h2>
        <div className="space-y-3">
          {[
            { name: 'Automate Canada Conference', location: 'Toronto', date: 'October 2026', desc: 'Canada\'s largest automation trade show' },
            { name: 'MaRS Robotics Demo Day', location: 'Toronto', date: 'November 2026', desc: 'Startup demos and investor networking' },
            { name: 'Waterloo AI+Robotics Summit', location: 'Waterloo', date: 'March 2027', desc: 'Academic and industry collaboration forum' },
          ].map(e => (
            <div key={e.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2 text-center min-w-[80px]">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{e.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{e.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">📍 {e.location} — {e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Ready to deploy robots in Ontario? We understand the local market.</p>
        <Button href="/contact" size="sm">Talk to Our Ontario Team</Button>
      </div>
    </div>
  );
}
