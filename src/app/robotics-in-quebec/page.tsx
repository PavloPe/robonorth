import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robotique au Québec — Entreprises, Subventions & Événements | RoboNorth',
  description: 'Quebec\'s robotics ecosystem: Kinova, MILA, local companies, provincial grants, AI research excellence, and the Montreal robotics scene.',
  alternates: { canonical: 'https://robonorth.ca/robotics-in-quebec' },
};

export default function RoboticsInQuebecPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/canadian-robotics" className="hover:text-gray-600 transition-colors">Canadian Robotics</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Quebec</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🇨🇦 Provincial Spotlight</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robotics in Quebec</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">Quebec is a global AI powerhouse and home to Kinova Robotics, MILA, and a thriving ecosystem of robotics startups in Montréal and Québec City.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '250+', label: 'AI & Robotics companies' },
          { stat: '$4.8B', label: 'AI ecosystem value' },
          { stat: '10,000+', label: 'AI & robotics researchers' },
          { stat: '#1', label: 'Global AI talent density' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏭 Quebec Robotics Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Kinova Robotics', city: 'Montréal', desc: 'World-leading collaborative robotic arms used in healthcare, research, and industry. Canadian-made.', flag: '🇨🇦 Made in Canada' },
            { name: 'MILA — Quebec AI Institute', city: 'Montréal', desc: 'World\'s largest academic AI lab. Founded by Yoshua Bengio. Driving robot intelligence research.' },
            { name: 'Robotiq', city: 'Lévis (Québec City)', desc: 'Collaborative robot grippers and sensors. Deployed in 10,000+ factories worldwide.' },
            { name: 'Osedea', city: 'Montréal', desc: 'AI and robotics software development. Custom robot intelligence solutions.' },
            { name: 'Bluewrist', city: 'Montréal', desc: '3D vision-guided robotics for precision manufacturing applications.' },
            { name: 'ARA Robotique', city: 'Québec City', desc: 'Military and security robotics for hazardous environment operations.' },
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Quebec Case Studies</h2>
        <div className="space-y-4">
          {[
            { title: 'CHUM Hospital — Montréal, QC', desc: 'Deploying autonomous delivery robots for pharmacy-to-ward medication transport. Integrated with hospital AI systems for optimal routing.', result: '45% faster medication delivery' },
            { title: 'Bombardier Aerospace — Montréal, QC', desc: 'Collaborative robots assisting technicians with aircraft assembly tasks, improving ergonomics and reducing repetitive strain injuries.', result: '30% reduction in RSI claims' },
            { title: 'Québec AI Lab — Autonomous Research', desc: 'Multi-university collaboration using humanoid robots for elderly care research. Developing socially-aware robot behaviours.', result: 'Leading eldercare AI research' },
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💰 Quebec Grants & Incentives</h2>
        <div className="space-y-3">
          {[
            { name: 'Investissement Québec', amount: 'Loans & equity', desc: 'Financial support for Quebec companies investing in robotics and automation' },
            { name: 'SCALE AI Supercluster', amount: 'Up to $2M', desc: 'AI supply chain projects, including robotics integration' },
            { name: 'PROMPT-Innov', amount: 'Up to $500K', desc: 'Funding for IT/telecom innovation, including AI-powered robotics' },
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
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Prêt à déployer des robots au Québec? Notre équipe bilingue est là pour vous aider.</p>
        <Button href="/contact" size="sm">Parler à Notre Équipe / Talk to Our Team</Button>
      </div>
    </div>
  );
}
