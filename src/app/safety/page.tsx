import type { Metadata } from 'next';
import Link from 'next/link';

// Improvement #29: Safety certification information page

export const metadata: Metadata = {
  title: 'Robot Safety Certifications — CSA, ISO, UL & CE Explained',
  description: 'Understand robot safety certifications: CSA Z434, ISO 10218, UL 1740, and CE marking. What Canadian robot buyers need to know about compliance.',
  alternates: { canonical: 'https://robonorth.ca/safety' },
};

const certifications = [
  { name: 'CSA Z434', org: 'CSA Group (Canada)', icon: '🇨🇦', what: 'Canadian standard for industrial robot safety. Covers risk assessment, safeguarding, emergency stops, and operator training.', required: true, applies: 'All robots deployed in Canadian workplaces', key: ['Risk assessment methodology', 'Physical safeguarding requirements', 'Emergency stop functionality', 'Operator training standards', 'Periodic inspection protocols'] },
  { name: 'ISO 10218-1/2', org: 'ISO (International)', icon: '🌐', what: 'International safety standard. Part 1 covers robot design; Part 2 covers complete system integration. Adopted by CSA.', required: true, applies: 'Industrial robot manufacturers and integrators', key: ['Robot design safety (Part 1)', 'System integration safety (Part 2)', 'Control system reliability', 'Protective device requirements', 'Validation and verification'] },
  { name: 'ISO/TS 15066', org: 'ISO (International)', icon: '🤝', what: 'Specific to collaborative robots sharing workspace with humans. Defines force/pressure limits for safe human-robot contact.', required: true, applies: 'All humanoid robots working near humans', key: ['Allowable force/pressure limits', 'Four collaborative operation methods', 'Biomechanical safety data', 'Speed and separation monitoring', 'Hand guiding requirements'] },
  { name: 'UL 1740', org: 'Underwriters Laboratories', icon: '⚡', what: 'Covers electrical safety, mechanical stability, and environmental requirements for robots and robotic equipment.', required: false, applies: 'Electrical safety assessment', key: ['Electrical insulation testing', 'Overload protection', 'Ground fault protection', 'Mechanical stability', 'Environmental testing'] },
  { name: 'CE Marking', org: 'European Union', icon: '🇪🇺', what: 'European conformity marking indicating compliance with EU safety directives. Not legally required in Canada but widely recognized.', required: false, applies: 'Robots imported from EU or meeting EU standards', key: ['Machinery Directive 2006/42/EC', 'Low Voltage Directive', 'EMC Directive', 'Radio Equipment Directive', 'Declaration of Conformity'] },
  { name: 'NRTL Certification', org: 'Various (CSA, UL, ETL)', icon: '✅', what: 'Nationally Recognized Testing Laboratory certification. Required for electrical equipment in workplaces.', required: true, applies: 'Electrical components and systems', key: ['Independent lab testing', 'Product safety evaluation', 'Factory inspection', 'Ongoing surveillance', 'Field label program'] },
];

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Safety Certifications</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">🛡️ Compliance</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Robot Safety Certifications</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Understanding the safety standards and certifications that apply to humanoid robots in Canada.</p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">⚠️ Important: This page provides general guidance. Always consult with a qualified safety engineer and your provincial workplace safety authority before deploying a robot.</p>
      </div>

      <div className="space-y-6">
        {certifications.map(cert => (
          <div key={cert.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl shrink-0">{cert.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{cert.name}</h3>
                  {cert.required ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Required</span>
                  ) : (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Recommended</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{cert.org} — Applies to: {cert.applies}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{cert.what}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {cert.key.map(item => (
                    <span key={item} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span className="text-blue-500">✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Need Safety Compliance Help?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">We can connect you with certified safety assessors who specialize in humanoid robot deployment.</p>
        <Link href="/inquiry?type=safety" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Get Safety Assessment →
        </Link>
      </div>
    </div>
  );
}
