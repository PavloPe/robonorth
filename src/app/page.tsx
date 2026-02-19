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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Browse</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Robots</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">The most popular humanoid robots available or coming soon to Canada</p>
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
      <section className="bg-slate-50/80 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Partners</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Brands</h2>
              <p className="text-gray-500 mt-2 text-sm max-w-lg">Leading companies building the future of robotics</p>
            </div>
            <Button href="/manufacturers" variant="ghost" size="sm">View All →</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredManufacturers.map(m => (
              <ManufacturerCard key={m.id} manufacturer={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Parts & Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Components</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Parts & Components</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">Everything you need to build, maintain, or upgrade</p>
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
      <section className="bg-slate-50/80 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Why Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Shop With RoboNorth?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🇨🇦', title: 'Canadian-Focused', desc: 'Built for Canadian buyers. Shipping info for all provinces, duties guidance included.', color: 'from-red-50 to-red-50/50' },
              { icon: '✅', title: 'Verified Listings', desc: 'Every robot verified with real specs, real prices. No inflated claims or hype.', color: 'from-emerald-50 to-emerald-50/50' },
              { icon: '💰', title: 'Price Transparency', desc: 'Complete pricing with TCO breakdowns. Know exactly what you\'re paying.', color: 'from-amber-50 to-amber-50/50' },
              { icon: '🔔', title: 'Early Access', desc: 'Be first in line for new releases. Exclusive pre-order access to upcoming models.', color: 'from-blue-50 to-blue-50/50' },
            ].map(item => (
              <div key={item.title} className={`bg-gradient-to-br ${item.color} rounded-2xl border border-gray-200/60 p-6 text-center card-hover`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to explore the future?
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto text-base">
              Join hundreds of Canadians already on our early access list. No payment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/inquiry" size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100 !font-bold">
                Get Early Access →
              </Button>
              <Button href="/robots" variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
                Browse Robots
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
