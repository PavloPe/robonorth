import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robotics in Alberta — Energy, Agriculture & Innovation | RoboNorth',
  description: 'Alberta\'s robotics ecosystem: energy sector automation, agricultural robots, provincial grants, and the emerging tech hub in Calgary and Edmonton.',
  alternates: { canonical: 'https://robonorth.ca/robotics-in-alberta' },
};

export default function RoboticsInAlbertaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/canadian-robotics" className="hover:text-gray-600 transition-colors">Canadian Robotics</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Alberta</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 Provincial Spotlight</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robotics in Alberta</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">Alberta&apos;s energy sector is driving massive adoption of robotics for inspection, maintenance, and safety. Calgary and Edmonton are emerging as robotics innovation hubs.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '150+', label: 'Robotics & AI companies' },
          { stat: '$2.1B', label: 'Automation investment' },
          { stat: '5,000+', label: 'Tech & robotics jobs' },
          { stat: '#1', label: 'For energy robotics' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏭 Alberta Robotics Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Invica Robotics', city: 'Calgary', desc: 'Industrial inspection robots for oil & gas pipelines and storage tanks.' },
            { name: 'Attabotics', city: 'Calgary', desc: '3D robotics supply chain technology for compact warehouse automation.' },
            { name: 'Davyn Technologies', city: 'Edmonton', desc: 'Autonomous inspection robots for power generation facilities.' },
            { name: 'Enverus / AI Robotics', city: 'Calgary', desc: 'AI-driven predictive maintenance for energy infrastructure.' },
            { name: 'DOT Technology', city: 'Regina/Alberta', desc: 'Autonomous agricultural platform for seeding, spraying, and harvest.' },
            { name: 'Alberta Machine Intelligence Institute (Amii)', city: 'Edmonton', desc: 'World-leading AI research institute driving robotics intelligence.' },
          ].map(c => (
            <div key={c.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">📍 {c.city}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Alberta Case Studies</h2>
        <div className="space-y-4">
          {[
            { title: 'Suncor Energy — Fort McMurray, AB', desc: 'Deployed autonomous inspection robots across oil sands operations. Robots perform tank inspections in hazardous environments, eliminating worker exposure to H2S.', result: 'Zero confined-space injuries' },
            { title: 'Alberta Wheat Commission — Southern AB', desc: 'Piloting autonomous robot scouts for crop health monitoring across 10,000 acres. AI-powered disease detection catches issues 2 weeks earlier than manual scouting.', result: '2-week early detection' },
            { title: 'EPCOR Utilities — Edmonton, AB', desc: 'Robotic pipeline inspection reducing downtime and enabling preventive maintenance across the municipal water system.', result: '35% less downtime' },
          ].map(cs => (
            <div key={cs.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{cs.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cs.desc}</p>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">Result: {cs.result}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💰 Alberta Grants & Incentives</h2>
        <div className="space-y-3">
          {[
            { name: 'Alberta Innovates', amount: '$50K–$2M', desc: 'Grants for applying robotics to energy, agriculture, and environmental monitoring' },
            { name: 'Emissions Reduction Alberta (ERA)', amount: 'Up to $5M', desc: 'Funding for technologies that reduce emissions — including autonomous systems' },
            { name: 'Alberta Enterprise Corporation', amount: 'Venture funding', desc: 'Investment fund supporting Alberta tech companies including robotics' },
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
        <div className="mt-4"><Button href="/grants" variant="outline" size="sm">View All Canadian Grants →</Button></div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Ready to deploy robots in Alberta? We understand the local market.</p>
        <Button href="/contact" size="sm">Talk to Our Alberta Team</Button>
      </div>
    </div>
  );
}
