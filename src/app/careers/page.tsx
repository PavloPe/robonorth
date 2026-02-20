import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers — Join the RoboNorth Team',
  description: 'Join Canada\'s first humanoid robot marketplace. We\'re hiring passionate people who want to shape the future of robotics in Canada.',
  alternates: { canonical: 'https://robonorth.ca/careers' },
};

const openings = [
  {
    title: 'Robotics Solutions Engineer',
    location: 'Calgary, AB (hybrid)',
    type: 'Full-time',
    description: 'Help Canadian businesses evaluate, import, and deploy humanoid robots. You\'ll work directly with manufacturers and enterprise customers.',
  },
  {
    title: 'Full-Stack Developer',
    location: 'Remote (Canada)',
    type: 'Full-time',
    description: 'Build and scale the RoboNorth marketplace platform. Next.js, React, TypeScript. Contribute to the future of robot e-commerce.',
  },
  {
    title: 'Content & Marketing Lead',
    location: 'Remote (Canada)',
    type: 'Full-time',
    description: 'Create compelling content about humanoid robotics. Write buying guides, industry analysis, and manufacturer profiles.',
  },
  {
    title: 'Partnerships Manager',
    location: 'Toronto, ON or Calgary, AB',
    type: 'Full-time',
    description: 'Develop relationships with robot manufacturers, Canadian distributors, and enterprise clients. Drive the B2B side of the marketplace.',
  },
];

export default function CareersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Careers</span>
      </nav>

      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Join Us</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Careers at RoboNorth</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
          We&apos;re building Canada&apos;s first humanoid robot marketplace. If you&apos;re passionate about robotics, AI, and making cutting-edge technology accessible to Canadians — we want to hear from you.
        </p>
      </div>

      {/* Why work here */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Why RoboNorth?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🚀', title: 'Early Stage', desc: 'Join a fast-moving startup at the ground floor of a multi-billion dollar industry.' },
            { icon: '🇨🇦', title: 'Canadian-First', desc: 'Help shape the robotics landscape in Canada — a market with enormous untapped potential.' },
            { icon: '🏠', title: 'Remote-Friendly', desc: 'Work from anywhere in Canada. We believe in results, not office hours.' },
            { icon: '🤖', title: 'Cutting Edge', desc: 'Work with the most advanced humanoid robots in the world. Handle hardware others only read about.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-2 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open positions */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
        <div className="space-y-4">
          {openings.map(job => (
            <div key={job.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{job.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{job.location}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Link
                  href={`/contact?subject=careers&position=${encodeURIComponent(job.title)}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                >
                  Apply →
                </Link>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Don&apos;t see your role? We&apos;re always looking for talented people.</p>
        <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 font-semibold">Send us your resume →</Link>
      </div>
    </div>
  );
}
