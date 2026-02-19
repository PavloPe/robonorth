import HeroSection from '@/components/ui/HeroSection';
import RobotCard from '@/components/ui/RobotCard';
import ManufacturerCard from '@/components/ui/ManufacturerCard';
import PartCategoryCard from '@/components/ui/PartCategoryCard';
import Button from '@/components/ui/Button';
import { robots } from '@/data/robots';
import { manufacturers } from '@/data/manufacturers';
import { partCategories } from '@/data/parts';

export default function HomePage() {
  const featuredRobots = robots.filter(r => r.featured).slice(0, 6);
  const featuredManufacturers = manufacturers.filter(m => m.featured).slice(0, 6);

  return (
    <>
      <HeroSection />

      {/* Featured Robots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Robots</h2>
            <p className="text-gray-400 mt-2">The most notable humanoid robots available or coming soon</p>
          </div>
          <Button href="/robots" variant="ghost" size="sm">View All →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRobots.map(robot => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </section>

      {/* Top Manufacturers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Top Manufacturers</h2>
            <p className="text-gray-400 mt-2">Leading companies building the future of robotics</p>
          </div>
          <Button href="/manufacturers" variant="ghost" size="sm">View All →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredManufacturers.map(m => (
            <ManufacturerCard key={m.id} manufacturer={m} />
          ))}
        </div>
      </section>

      {/* Parts & Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Parts & Components</h2>
            <p className="text-gray-400 mt-2">Everything you need to build, maintain, or upgrade robots</p>
          </div>
          <Button href="/parts" variant="ghost" size="sm">Browse Parts →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partCategories.slice(0, 4).map(cat => (
            <PartCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Why RoboNorth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why RoboNorth?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🇨🇦', title: 'Canadian-Focused', desc: 'Built for Canadian buyers. All prices in CAD/USD, shipping info for all provinces.' },
            { icon: '🔍', title: 'Expert Curation', desc: 'Every robot verified and documented. Real specs, real prices, no hype.' },
            { icon: '💰', title: 'Price Transparency', desc: 'Complete pricing breakdowns including TCO. No hidden costs or surprise fees.' },
            { icon: '🚀', title: 'Pre-Order Access', desc: 'Be first in line for new releases. Exclusive early access to upcoming models.' },
          ].map(item => (
            <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to explore the future?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of Canadians already on our early access list. No payment required — just tell us what you&apos;re looking for.
          </p>
          <Button href="/inquiry" size="lg">Get Early Access →</Button>
        </div>
      </section>
    </>
  );
}
