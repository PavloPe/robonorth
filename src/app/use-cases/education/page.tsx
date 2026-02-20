import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Robots for Education — Teaching, Research & STEM Programs',
  description: 'Explore humanoid robots for Canadian universities, colleges, and K-12 programs. Affordable platforms for robotics education and research.',
  alternates: { canonical: 'https://robonorth.ca/use-cases/education' },
};

export default function EducationUseCasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link><span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 transition-colors">Use Cases</Link><span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Education</span>
      </nav>

      <div className="bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl">
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-wider mb-3">🎓 Education</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Robots for Education & Research</h1>
          <p className="text-purple-100 text-lg mb-8">Affordable humanoid robot platforms for Canadian universities, colleges, and STEM programs. From $16K research bots to advanced platforms.</p>
          <Button href="/inquiry?use-case=education" size="lg" className="!bg-white !text-purple-700 hover:!bg-purple-50 !font-bold">Explore Academic Programs →</Button>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Education Applications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🔬', title: 'Research Platforms', desc: 'Full-scale humanoid robots for locomotion, manipulation, and AI research at a fraction of historical costs.' },
            { icon: '👨‍🏫', title: 'Teaching Tool', desc: 'Hands-on robotics education — students program real humanoid robots with open SDKs.' },
            { icon: '🏆', title: 'Competition Prep', desc: 'Train for RoboCup, DARPA challenges, and national robotics competitions with real hardware.' },
            { icon: '🤖', title: 'STEM Outreach', desc: 'Inspire the next generation with visible, tangible robotics demonstrations at schools and events.' },
            { icon: '🧠', title: 'AI/ML Training', desc: 'Real-world test environments for reinforcement learning, computer vision, and NLP on physical robots.' },
            { icon: '📝', title: 'Thesis Projects', desc: 'Graduate students publish papers using affordable humanoid platforms instead of expensive proprietary systems.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Picks for Education</h2>
        <div className="space-y-4">
          {[
            { name: 'Unitree G1 EDU', slug: 'unitree-g1', price: 'From $16,000', note: 'Best value — 43 DOF, open SDK, affordable enough for student labs' },
            { name: 'Unitree G1 Pro', slug: 'unitree-g1', price: 'From $22,000', note: 'Advanced research config with dexterous hands and enhanced sensors' },
            { name: 'Fourier GR-1', slug: 'fourier-gr-1', price: '~$55,000', note: 'Full-size humanoid with excellent documentation for research' },
          ].map(r => (
            <Link key={r.name} href={`/robots/${r.slug}`} className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
              <div className="flex items-center justify-between">
                <div><h3 className="text-sm font-bold text-gray-900 dark:text-white">{r.name}</h3><p className="text-xs text-gray-500 mt-1">{r.note}</p></div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{r.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Academic Pricing Available</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Many manufacturers offer discounted pricing for accredited Canadian educational institutions.</p>
        <Button href="/inquiry?use-case=education" size="lg">Request Academic Quote →</Button>
      </div>
    </div>
  );
}
