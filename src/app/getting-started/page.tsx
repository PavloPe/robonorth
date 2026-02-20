import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #26: "Getting Started" guide page for first-time robot buyers

export const metadata: Metadata = {
  title: 'Getting Started — First-Time Robot Buyer Guide',
  description: 'A complete guide for first-time humanoid robot buyers in Canada. From identifying your use case to deployment and maintenance.',
  alternates: { canonical: 'https://robonorth.ca/getting-started' },
};

const steps = [
  {
    number: '01',
    title: 'Define Your Use Case',
    description: 'Start with the problem, not the robot. Identify the specific tasks you want to automate.',
    details: [
      'List the tasks that are hardest to staff or most physically demanding',
      'Calculate the current cost of these tasks (labour + overtime + turnover)',
      'Determine if the environment is indoor-only or needs outdoor capability',
      'Identify any safety or regulatory requirements specific to your industry',
    ],
    cta: { label: 'Explore Use Cases →', href: '/use-cases' },
  },
  {
    number: '02',
    title: 'Research Available Robots',
    description: 'Not all humanoid robots are created equal. Match your requirements to available models.',
    details: [
      'Browse our catalog of 32+ robots with detailed specs and pricing',
      'Use the comparison tool to evaluate 2-3 models side by side',
      'Take the Robot Quiz for personalized recommendations',
      'Read case studies from similar industries',
    ],
    cta: { label: 'Browse Robot Catalog →', href: '/robots' },
  },
  {
    number: '03',
    title: 'Understand the Costs',
    description: 'Robot cost is just the starting point. Budget for the full deployment.',
    details: [
      'Hardware cost: $16K (research) to $250K+ (enterprise)',
      'Shipping & customs: $1K-$6K depending on origin country',
      'Integration: Software setup, safety assessment, workflow redesign (40-60% of hardware cost)',
      'Annual maintenance: 10-15% of purchase price per year',
      'Training: Staff training on robot operation and safety procedures',
    ],
    cta: { label: 'Use Cost Calculator →', href: '/calculator' },
  },
  {
    number: '04',
    title: 'Start with a Pilot',
    description: 'Never go full deployment first. Start small, prove value, then scale.',
    details: [
      'Request a pilot program (many manufacturers offer 3-6 month pilots)',
      'Set clear success metrics before the pilot begins',
      'Involve frontline workers in the planning — they know the tasks best',
      'Document everything: throughput, safety incidents, worker feedback',
    ],
    cta: { label: 'Request a Pilot →', href: '/inquiry?type=pilot' },
  },
  {
    number: '05',
    title: 'Navigate Canadian Requirements',
    description: 'Compliance, import logistics, and Canadian-specific considerations.',
    details: [
      'Safety certification: Ensure the robot meets CSA Z434 / ISO 10218 standards',
      'Import process: HS code classification, customs duties (8-14%), brokerage',
      'Insurance: Work with specialty brokers for commercial robot insurance',
      'Provincial regulations: Workers\' compensation implications, bilingual requirements (Quebec)',
    ],
    cta: { label: 'Read Import Guide →', href: '/blog/complete-robot-buying-guide-canada-2026' },
  },
  {
    number: '06',
    title: 'Deploy and Optimize',
    description: 'Go live with your robot and continuously improve.',
    details: [
      'Phase the deployment: Start with one shift, one task, one area',
      'Monitor performance metrics weekly during the first 3 months',
      'Schedule regular maintenance (daily, weekly, monthly checks)',
      'Plan software updates and capability expansions over time',
    ],
    cta: { label: 'Read Maintenance Guide →', href: '/blog/humanoid-robot-maintenance-guide' },
  },
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Getting Started</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🚀 New to Robotics?</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Getting Started with Humanoid Robots</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">A step-by-step guide for first-time robot buyers in Canada. From identifying your use case to successful deployment.</p>
      </div>

      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={step.number} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{step.description}</p>
                <ul className="space-y-2 mb-4">
                  {step.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link href={step.cta.href} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition-colors">
                  {step.cta.label}
                </Link>
              </div>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[2.25rem] bottom-0 w-0.5 h-8 bg-blue-200 dark:bg-blue-800 translate-y-full" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">Our team is here to guide you through every step. No commitment required.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/inquiry" size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50 !font-bold">Get Personalized Guidance →</Button>
          <Button href="/quiz" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">Take the Robot Quiz</Button>
        </div>
      </div>
    </div>
  );
}
