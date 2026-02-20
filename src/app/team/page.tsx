import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Meet the Team — RoboNorth',
  description: 'Meet the people behind Canada\'s humanoid robot marketplace. Our mission, team culture, and commitment to Canadian robotics.',
  alternates: { canonical: 'https://robonorth.ca/team' },
};

const team = [
  { name: 'Pavlo Petrovskyi', role: 'Founder & CEO', avatar: 'PP', bio: 'Robotics enthusiast and tech entrepreneur based in Calgary, AB. Built RoboNorth to make humanoid robots accessible to Canadian businesses and researchers.' },
  { name: 'Operations Team', role: 'Logistics & Support', avatar: 'OT', bio: 'Our operations team handles shipping, customs clearance, and customer support from our Calgary headquarters.' },
  { name: 'Technical Team', role: 'Engineering & Integration', avatar: 'TT', bio: 'Robot installation, maintenance, and technical support. Certified to work with all major humanoid robot platforms.' },
  { name: 'Sales Team', role: 'Customer Success', avatar: 'ST', bio: 'Dedicated sales specialists who understand your industry and can recommend the right robot for your needs.' },
];

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Team</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">👥 Our Team</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet the People Behind RoboNorth</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">We&apos;re a small but dedicated team based in Calgary, Alberta. Passionate about making Canada a leader in humanoid robotics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {team.map(member => (
          <div key={member.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 text-lg font-bold">
                {member.avatar}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{member.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
          </div>
        ))}
      </div>

      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🇨🇦', title: 'Canadian First', desc: 'Built for Canadian buyers. We understand the market, regulations, and logistics.' },
            { icon: '🤝', title: 'Transparency', desc: 'Honest pricing, real specs, no hype. We tell you exactly what to expect.' },
            { icon: '🚀', title: 'Innovation', desc: 'We\'re building the future marketplace for human-robot collaboration.' },
          ].map(v => (
            <div key={v.title} className="text-center">
              <span className="text-3xl">{v.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-2 mb-1">{v.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Want to join our team?</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">We&apos;re always looking for talented people who share our passion for robotics.</p>
        <Link href="/careers" className="inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          View Open Positions →
        </Link>
      </div>
    </div>
  );
}
