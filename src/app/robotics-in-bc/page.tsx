import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robotics in British Columbia — Companies, Grants & Events | RoboNorth',
  description: 'BC\'s humanoid robotics ecosystem: Sanctuary AI, local companies, provincial grants, case studies, and events in Canada\'s west coast tech hub.',
  alternates: { canonical: 'https://robonorth.ca/robotics-in-bc' },
};

export default function RoboticsInBCPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/canadian-robotics" className="hover:text-gray-600 transition-colors">Canadian Robotics</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">British Columbia</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 Provincial Spotlight</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robotics in British Columbia</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">BC is home to Sanctuary AI — makers of the world&apos;s most advanced humanoid robot — and a vibrant ecosystem of AI and robotics innovators.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '200+', label: 'Robotics & AI companies' },
          { stat: '$3.2B', label: 'Tech sector value' },
          { stat: '8,000+', label: 'Robotics & AI jobs' },
          { stat: '#1', label: 'For humanoid robot R&D' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏭 BC Robotics Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Sanctuary AI', city: 'Vancouver', desc: 'Creating the world\'s first human-like intelligence in general-purpose robots. Phoenix humanoid robot.', flag: '🇨🇦 Made in Canada' },
            { name: 'Corvus Robotics', city: 'Vancouver', desc: 'Autonomous drone robots for warehouse inventory management.' },
            { name: 'Carbon Robotics', city: 'Vancouver', desc: 'AI-powered agricultural robots for precision weeding.' },
            { name: 'General Fusion', city: 'Burnaby', desc: 'Fusion energy with robotics-assisted plasma injection systems.' },
            { name: 'D-Wave Systems', city: 'Burnaby', desc: 'Quantum computing systems that power next-gen robot AI.' },
            { name: 'Starship Technologies (BC office)', city: 'Vancouver', desc: 'Autonomous delivery robots operating in BC communities.' },
          ].map(c => (
            <div key={c.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</h3>
                {c.flag && <span className="text-[10px] bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">{c.flag}</span>}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">📍 {c.city}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 BC Case Studies</h2>
        <div className="space-y-4">
          {[
            { title: 'Vancouver General Hospital — Pharmacy Automation', desc: 'Deployed robotic dispensing system reducing medication errors by 60% and freeing pharmacists for patient consultations.', result: '60% error reduction' },
            { title: 'Port of Vancouver — Container Inspection', desc: 'AI-powered inspection robots scanning containers for damage and compliance, processing 200+ containers per shift.', result: '200+ containers/shift' },
            { title: 'BC Hydro — Dam Inspection Robotics', desc: 'Using autonomous robots for underwater dam inspection, eliminating dangerous diver deployments.', result: 'Zero diver risk' },
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💰 BC Grants & Incentives</h2>
        <div className="space-y-3">
          {[
            { name: 'Innovate BC — Ignite Program', amount: 'Up to $300K', desc: 'Funding for BC tech companies commercializing innovative technologies' },
            { name: 'BC Tech Fund', amount: '$100M fund', desc: 'Venture capital for BC-based technology companies' },
            { name: 'BCIT Applied Research', amount: 'Varies', desc: 'Partnership funding for applied research projects with industry' },
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
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Ready to deploy robots in BC? We understand the local market.</p>
        <Button href="/contact" size="sm">Talk to Our BC Team</Button>
      </div>
    </div>
  );
}
