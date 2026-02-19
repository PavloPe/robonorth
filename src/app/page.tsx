import HeroSection from '@/components/ui/HeroSection';
import RobotCard from '@/components/ui/RobotCard';
import ManufacturerCard from '@/components/ui/ManufacturerCard';
import PartCategoryCard from '@/components/ui/PartCategoryCard';
import Button from '@/components/ui/Button';
import { getFeaturedRobots, getFeaturedManufacturers, getAllPartCategories } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featuredRobots, featuredManufacturers, partCategories] = await Promise.all([
    getFeaturedRobots(),
    getFeaturedManufacturers(),
    getAllPartCategories(),
  ]);

  return (
    <>
      <HeroSection />

      {/* Featured Robots */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Robots</h2>
            <p className="text-gray-500 mt-1 text-sm">The most popular humanoid robots available or coming soon</p>
          </div>
          <Button href="/robots" variant="ghost" size="sm">View All →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredRobots.map(robot => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </section>

      {/* Top Manufacturers */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Brands</h2>
              <p className="text-gray-500 mt-1 text-sm">Leading companies building the future of robotics</p>
            </div>
            <Button href="/manufacturers" variant="ghost" size="sm">View All →</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredManufacturers.map(m => (
              <ManufacturerCard key={m.id} manufacturer={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Parts & Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Parts & Components</h2>
            <p className="text-gray-500 mt-1 text-sm">Everything you need to build, maintain, or upgrade</p>
          </div>
          <Button href="/parts" variant="ghost" size="sm">Browse Parts →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partCategories.slice(0, 4).map(cat => (
            <PartCategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Why RoboNorth */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Shop With RoboNorth?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🇨🇦', title: 'Canadian-Focused', desc: 'Built for Canadian buyers. Shipping info for all provinces, duties guidance included.' },
              { icon: '✅', title: 'Verified Listings', desc: 'Every robot verified with real specs, real prices. No inflated claims or hype.' },
              { icon: '💰', title: 'Price Transparency', desc: 'Complete pricing with TCO breakdowns. Know exactly what you\'re paying.' },
              { icon: '🔔', title: 'Early Access', desc: 'Be first in line for new releases. Exclusive pre-order access to upcoming models.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-blue-600 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to explore the future?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm">
            Join hundreds of Canadians already on our early access list. No payment required.
          </p>
          <Button href="/inquiry" variant="secondary" size="lg">Get Early Access →</Button>
        </div>
      </section>
    </>
  );
}
