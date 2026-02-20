import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Canadian Robotics Compliance Guide — CSA, OHSA, ESA Requirements',
  description: 'Complete guide to Canadian compliance requirements for humanoid robots: CSA certification, occupational health and safety, and electrical safety.',
  alternates: { canonical: 'https://robonorth.ca/compliance' },
};

const standards = [
  {
    name: 'CSA Z434 — Industrial Robots and Robot Systems',
    org: 'Canadian Standards Association',
    desc: 'The primary Canadian standard for robot safety. Covers risk assessment, safeguarding, and safety system requirements for industrial and collaborative robots.',
    applies: 'All workplace robots',
    icon: '🛡️',
  },
  {
    name: 'CSA C22.1 — Canadian Electrical Code',
    org: 'Canadian Standards Association',
    desc: 'Robots must comply with electrical safety requirements. Includes grounding, wiring methods, and electrical component standards.',
    applies: 'All electrically powered robots',
    icon: '⚡',
  },
  {
    name: 'OHSA — Occupational Health and Safety Act',
    org: 'Provincial (varies)',
    desc: 'Each province has its own OHSA. Employers must ensure robots don\'t pose hazards to workers. Requires risk assessments and safety training.',
    applies: 'All workplace deployments',
    icon: '👷',
  },
  {
    name: 'ISO 10218 — Safety of Industrial Robots',
    org: 'International (adopted in Canada)',
    desc: 'International standard adopted by CSA. Covers robot design, integration, and installation safety. Part 1: Robot, Part 2: Robot system.',
    applies: 'Industrial robot deployments',
    icon: '🌍',
  },
  {
    name: 'ISO/TS 15066 — Collaborative Robot Safety',
    org: 'International (adopted in Canada)',
    desc: 'Specific to collaborative robots that work alongside humans. Defines force limits, speed limits, and safety-rated monitored stop.',
    applies: 'Collaborative and humanoid robots',
    icon: '🤝',
  },
  {
    name: 'ESA — Electrical Safety Authority (Ontario)',
    org: 'Province of Ontario',
    desc: 'In Ontario, the ESA must approve electrical installations. Robots require inspection and approval for permanent workplace installation.',
    applies: 'Ontario installations',
    icon: '🏛️',
  },
];

export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Compliance Guide</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">📋 Compliance</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Canadian Robotics Compliance Guide</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to know about deploying humanoid robots legally and safely in Canadian workplaces.</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-10">
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">⚠️ Important Disclaimer</p>
        <p className="text-xs text-amber-700 dark:text-amber-400">This guide is for informational purposes only and does not constitute legal advice. Consult a qualified professional for your specific compliance requirements.</p>
      </div>

      <div className="space-y-6 mb-12">
        {standards.map(s => (
          <div key={s.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{s.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{s.org}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{s.desc}</p>
                <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded font-medium">Applies to: {s.applies}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔍 RoboNorth Compliance Support</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">We help Canadian buyers navigate compliance requirements:</p>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Pre-purchase compliance assessment for your industry and province</li>
          <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>CSA certification status verification for all listed robots</li>
          <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Risk assessment templates for humanoid robot deployment</li>
          <li className="flex items-start gap-2"><span className="text-emerald-500">✓</span>Connection to certified safety consultants across Canada</li>
        </ul>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Need compliance guidance?</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Our team can connect you with certified safety professionals.</p>
        <Button href="/contact" size="sm">Request Compliance Consultation</Button>
      </div>
    </div>
  );
}
