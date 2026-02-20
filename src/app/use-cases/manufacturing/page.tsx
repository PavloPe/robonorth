import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Improvement #22: Individual use-case landing page — Manufacturing

export const metadata: Metadata = {
  title: 'Robots for Manufacturing — Assembly, Inspection & Material Handling',
  description: 'Discover the best humanoid robots for Canadian manufacturing. Assembly line assistance, quality inspection, material handling, and warehouse automation.',
  alternates: { canonical: 'https://robonorth.ca/use-cases/manufacturing' },
};

const benefits = [
  { icon: '⚡', title: 'Increased Throughput', desc: 'Handle repetitive tasks 24/7 without fatigue, breaks, or overtime costs.' },
  { icon: '🛡️', title: 'Improved Safety', desc: 'Remove workers from hazardous tasks — heavy lifting, chemical exposure, extreme temperatures.' },
  { icon: '📊', title: 'Consistent Quality', desc: 'AI-powered visual inspection catches defects that human eyes miss. Zero variability.' },
  { icon: '💰', title: 'Reduced Labour Costs', desc: 'Fill the 80,000+ unfilled manufacturing positions in Canada without competing for scarce workers.' },
];

const recommendedRobots = [
  { name: 'Figure 02', slug: 'figure-02', price: 'Enterprise', why: 'AI-powered conversational control, 5hr battery, BMW partnership proven' },
  { name: 'Tesla Optimus Gen 2', slug: 'tesla-optimus-gen-2', price: '~$30K', why: 'Best value for general manufacturing tasks, Tesla service network' },
  { name: 'Unitree H1', slug: 'unitree-h1', price: '~$90K', why: 'High payload capacity, ruggedized for industrial environments' },
  { name: 'Boston Dynamics Atlas', slug: 'boston-dynamics-atlas', price: 'Enterprise', why: 'Most agile humanoid, handles complex manipulation tasks' },
];

export default function ManufacturingUseCasePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/use-cases" className="hover:text-gray-600 transition-colors">Use Cases</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Manufacturing</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl px-8 sm:px-12 py-12 sm:py-16 text-white mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="relative max-w-2xl">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-3">🏭 Manufacturing</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Robots for Canadian Manufacturing</h1>
          <p className="text-blue-100 text-lg mb-8">Transform your production line with humanoid robots that handle assembly, inspection, and material handling — filling the labour gaps that hold Canadian manufacturers back.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/inquiry?use-case=manufacturing" size="lg" className="!bg-white !text-blue-700 hover:!bg-blue-50 !font-bold">Get a Manufacturing Quote →</Button>
            <Button href="/robots/category/enterprise" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">Browse Enterprise Robots</Button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Why Humanoid Robots in Manufacturing?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(b => (
            <div key={b.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <span className="text-2xl">{b.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-2">{b.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Tasks Humanoid Robots Handle</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {['Assembly line assistance', 'Quality inspection', 'Material handling', 'Machine tending', 'Palletizing', 'Warehouse picking', 'Tool operation', 'Screw driving', 'Welding support', 'Part sorting', 'Inventory management', 'Loading/unloading'].map(task => (
            <div key={task} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium text-center">
              {task}
            </div>
          ))}
        </div>
      </section>

      {/* Recommended robots */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recommended Robots for Manufacturing</h2>
        <div className="space-y-4">
          {recommendedRobots.map(robot => (
            <Link key={robot.slug} href={`/robots/${robot.slug}`} className="block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{robot.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{robot.why}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{robot.price}</span>
                  <p className="text-xs text-blue-600 font-semibold mt-1">View Details →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Ready to automate your manufacturing?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">Our team will help you identify the right robot, navigate import logistics, and plan your pilot deployment.</p>
        <Button href="/inquiry?use-case=manufacturing" size="lg">Request a Consultation →</Button>
      </div>
    </div>
  );
}
