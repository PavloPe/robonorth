import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import RobotCard from '@/components/ui/RobotCard';
import ManufacturerCard from '@/components/ui/ManufacturerCard';
import PartCategoryCard from '@/components/ui/PartCategoryCard';
import Button from '@/components/ui/Button';
import { getFeaturedRobots, getFeaturedManufacturers, getAllPartCategories, getFeaturedParts } from '@/lib/queries';
import { getAllBlogPosts } from '@/data/blog';
import StatsCounter from '@/components/ui/StatsCounter';
import RobotOfMonth from '@/components/ui/RobotOfMonth';
import PartCard from '@/components/ui/PartCard';
import PartnerLogoBanner from '@/components/ui/PartnerLogoBanner';
import MadeInCanada from '@/components/ui/MadeInCanada';
import CrossBorderComparison from '@/components/ui/CrossBorderComparison';
// import MediaMentions from '@/components/ui/MediaMentions';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [featuredRobots, featuredManufacturers, partCategories, featuredParts] = await Promise.all([
    getFeaturedRobots(),
    getFeaturedManufacturers(),
    getAllPartCategories(),
    getFeaturedParts(6),
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

      {/* Partner brand logos — Task 32 */}
      <PartnerLogoBanner />

      {/* Top Manufacturers */}
      <section className="bg-slate-50/80 dark:bg-gray-900/50 border-y border-gray-200/60 dark:border-gray-800/60 wave-divider wave-divider-bottom">
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
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Components</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Featured Parts & Components</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg">Top-selling actuators, sensors, controllers, and more — all with Canadian shipping</p>
          </div>
          <Button href="/parts" variant="ghost" size="sm">Browse All 71+ Parts →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredParts.map(part => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>

        {/* Category quick links */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {partCategories.slice(0, 7).map(cat => (
            <a
              key={cat.id}
              href={`/parts?category=${cat.id.split('-')[0]}`}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </section>

      {/* Robot of the Month — Improvement #44 */}
      <RobotOfMonth />

      {/* Stats Counter */}
      <StatsCounter />

      {/* How It Works */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Four Steps to Your First Robot</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Browse', desc: 'Explore 32+ humanoid robots with real specs, real prices, and Canadian availability info.' },
              { step: '02', icon: '⚖️', title: 'Compare', desc: 'Use our side-by-side comparison tool to find the perfect match for your needs and budget.' },
              { step: '03', icon: '📝', title: 'Inquire', desc: 'Submit an inquiry with your requirements. No payment, no commitment — just information.' },
              { step: '04', icon: '🤝', title: 'Connect', desc: 'We connect you directly with the manufacturer or authorized dealer. You deal with them, not us.' },
            ].map(item => (
              <div key={item.step} className="relative text-center">
                <div className="text-5xl font-black text-gray-100 absolute top-0 right-4">{item.step}</div>
                <div className="relative pt-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-blue-100">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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

      {/* Made in Canada — Task 22 */}
      <MadeInCanada />

      {/* Cross-border comparison — Task 30 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <CrossBorderComparison />
      </section>

      {/* Testimonials — hidden until we have real testimonials */}
      {/* TODO: Add real customer testimonials and Google reviews when available */}

      {/* Latest Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">News & Updates</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest from the Blog</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">Guides, analysis, and insights for the Canadian robot buyer</p>
          </div>
          <Button href="/blog" variant="ghost" size="sm">All Articles →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllBlogPosts().slice(0, 3).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 p-6 h-full flex flex-col">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{post.category}</span>
                <h3 className="text-base font-bold text-gray-900 mt-2 mb-2 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                  <span className="text-xs font-semibold text-blue-600">Read →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon Timeline */}
      <section className="bg-slate-50/80 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Roadmap</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Coming Soon: 2026–2027</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg mx-auto">Expected robot releases and milestones we&apos;re tracking</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-0">
              {[
                { date: 'Q2 2026', title: 'Tesla Optimus Pre-Orders Open', desc: 'Expected initial commercial availability through Tesla stores.', tag: '🔥 Hot' },
                { date: 'Q3 2026', title: '1X NEO Shipping Begins', desc: 'First home humanoid robots ship to pre-order customers globally.', tag: '📦 Shipping' },
                { date: 'Q3 2026', title: 'Figure 02 Canadian Pilot', desc: 'Figure AI expands enterprise pilot program to Canadian manufacturers.', tag: '🇨🇦 Canada' },
                { date: 'Q4 2026', title: 'Unitree G1 Gen 2', desc: 'Next-generation G1 expected with improved battery and dexterous hands.', tag: '🆕 New' },
                { date: 'Q1 2027', title: 'Sanctuary AI Phoenix Mass Production', desc: 'Vancouver-based Sanctuary AI targets volume production of Phoenix humanoid.', tag: '🇨🇦 Canada' },
                { date: 'Q2 2027', title: 'Cold-Weather Robot Variants', desc: 'Several manufacturers expected to release models rated for Canadian winters.', tag: '❄️ Winter' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full shrink-0 mt-1.5" />
                    {i < 5 && <div className="w-px flex-1 bg-gray-200" />}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-blue-600">{item.date}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <Button href="/inquiry" variant="outline" size="sm">Get Notified About Releases →</Button>
          </div>
        </div>
      </section>

      {/* Media mentions — hidden until we have real coverage */}
      {/* <MediaMentions /> */}

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
