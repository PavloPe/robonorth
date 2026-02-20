import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Certified Robot Operator Program — RoboNorth Academy',
  description: 'Become a Certified Robot Operator (CRO). Professional certification program for humanoid robot operation, maintenance, and safety.',
  alternates: { canonical: 'https://robonorth.ca/certification' },
};

const modules = [
  { num: '01', title: 'Robot Fundamentals', hours: '8h', topics: ['Humanoid robot architecture', 'Actuators, sensors, and controllers', 'Power systems and battery management', 'Operating system basics'] },
  { num: '02', title: 'Safety & Compliance', hours: '6h', topics: ['CSA Z434 requirements', 'Risk assessment methodology', 'Emergency stop procedures', 'Canadian workplace safety regulations'] },
  { num: '03', title: 'Operation & Programming', hours: '12h', topics: ['Robot startup and shutdown', 'Basic programming and task assignment', 'Teleoperation and remote control', 'Collaborative work zone management'] },
  { num: '04', title: 'Maintenance & Troubleshooting', hours: '8h', topics: ['Preventive maintenance schedules', 'Common failure modes and diagnostics', 'Component replacement procedures', 'Software updates and calibration'] },
  { num: '05', title: 'Practical Assessment', hours: '6h', topics: ['Hands-on robot operation', 'Safety scenario response', 'Maintenance task completion', 'Written certification exam'] },
];

export default function CertificationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Certification</span>
      </nav>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-5 py-2 mb-4">
          <span className="text-lg">📜</span>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-400">Now Accepting Applications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Certified Robot Operator (CRO)</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Canada&apos;s first professional certification for humanoid robot operation. 40-hour program covering operation, safety, maintenance, and compliance.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '40 hrs', label: 'Total program' },
          { stat: '$2,495', label: 'Tuition' },
          { stat: '5 days', label: 'Intensive format' },
          { stat: '2 years', label: 'Certification validity' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{s.stat}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📚 Curriculum</h2>
        <div className="space-y-4">
          {modules.map(mod => (
            <div key={mod.num} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">{mod.num}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{mod.title}</h3>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">{mod.hours}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {mod.topics.map(t => (
                      <li key={t} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <span className="text-blue-500">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Register for Next Cohort</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <input type="email" placeholder="Email *" required className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Company / Organization" className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            <select className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option value="">Preferred Location</option>
              <option value="toronto">Toronto</option>
              <option value="vancouver">Vancouver</option>
              <option value="calgary">Calgary</option>
              <option value="montreal">Montreal</option>
              <option value="online">Online</option>
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm">Reserve Your Spot — $2,495</button>
        </form>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">Group rates available for 5+ participants. <a href="tel:+15873250017" className="text-blue-600 font-semibold hover:underline">Call (587) 325-0017</a></p>
      </div>
    </div>
  );
}
