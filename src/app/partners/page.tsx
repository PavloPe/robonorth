import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partners & Integrators — Robot Deployment Support',
  description: 'RoboNorth partners with system integrators, customs brokers, insurance providers, and training companies to ensure successful humanoid robot deployments across Canada.',
  alternates: { canonical: 'https://robonorth.ca/partners' },
};

const partnerCategories = [
  {
    title: 'System Integrators',
    icon: '⚙️',
    description: 'Expert firms that help deploy, configure, and maintain humanoid robots in your facility.',
    partners: [
      { name: 'Kinova Robotics', location: 'Montreal, QC', specialty: 'Robot integration & custom automation' },
      { name: 'AIS Technologies Group', location: 'Windsor, ON', specialty: 'Industrial automation & AI integration' },
      { name: 'Clearpath Robotics', location: 'Kitchener, ON', specialty: 'Autonomous mobile robot solutions' },
    ],
  },
  {
    title: 'Customs & Logistics',
    icon: '🚢',
    description: 'Licensed customs brokers and freight forwarders experienced in importing robotics equipment to Canada.',
    partners: [
      { name: 'Livingston International', location: 'National', specialty: 'Licensed customs brokerage (CSCB)' },
      { name: 'PCB Group', location: 'Vancouver, BC', specialty: 'Asia-Canada freight forwarding' },
      { name: 'TFI International', location: 'National', specialty: 'Last-mile and white-glove delivery' },
    ],
  },
  {
    title: 'Insurance & Finance',
    icon: '🛡️',
    description: 'Specialty insurance and financing providers for commercial robot deployments.',
    partners: [
      { name: 'Marsh Canada', location: 'National', specialty: 'Commercial robot insurance' },
      { name: 'BDC (Business Development Bank)', location: 'National', specialty: 'SME financing for automation' },
      { name: 'Export Development Canada', location: 'National', specialty: 'Trade finance & insurance' },
    ],
  },
  {
    title: 'Training & Certification',
    icon: '🎓',
    description: 'Organizations providing robot operator training, safety certification, and workforce development.',
    partners: [
      { name: 'NAIT', location: 'Edmonton, AB', specialty: 'Robotics technician training' },
      { name: 'Humber College', location: 'Toronto, ON', specialty: 'Robotics & automation programs' },
      { name: 'Polytechnique Montréal', location: 'Montreal, QC', specialty: 'Advanced robotics research & training' },
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Partners</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Ecosystem</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Partners & Integrators</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          Deploying a humanoid robot is a team effort. We work with Canada&apos;s best integrators, brokers, insurers, and training providers to ensure your deployment succeeds.
        </p>
      </div>

      <div className="space-y-12">
        {partnerCategories.map(cat => (
          <section key={cat.title}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cat.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cat.partners.map(p => (
                <div key={p.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{p.location}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{p.specialty}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Become a Partner</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-lg mx-auto">
          Are you a system integrator, broker, or service provider? Join the RoboNorth partner network and help Canadian businesses deploy humanoid robots.
        </p>
        <Link href="/contact?subject=partnership" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors">
          Apply to Partner Program →
        </Link>
      </div>
    </div>
  );
}
