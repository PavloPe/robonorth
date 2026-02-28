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

export const revalidate = 3600; // ISR: rebuild every hour

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

      {/* Featured Robots — wide section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Featured</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Top Robots</h2>
          </div>
          <Button href="/robots" variant="ghost" size="sm">View All →</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredRobots.map(robot => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </section>

      {/* Partner brand logos — Task 32 */}
      <PartnerLogoBanner />

      {/* Top Manufacturers — editorial split layout */}
      <section className="border-y border-gray-200/60 dark:border-gray-800/60 bg-slate-50/50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[280px,1fr] gap-10 lg:gap-16">
            {/* Left — section intro */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Partners</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Top Brands</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">Leading companies building the next generation of humanoid robotics.</p>
              <Button href="/manufacturers" variant="ghost" size="sm">View All →</Button>
            </div>
            {/* Right — cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featuredManufacturers.map(m => (
                <ManufacturerCard key={m.id} manufacturer={m} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parts & Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Components</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Parts & Components</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg">Actuators, sensors, controllers — all with Canadian shipping</p>
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
              className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-slate-400 dark:hover:border-slate-600 hover:text-gray-900 dark:hover:text-white transition-all"
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

      {/* How It Works — horizontal editorial layout */}
      <section className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Process</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              { step: '01', title: 'Browse', desc: 'Explore 32+ humanoid robots with real specs, real prices, and Canadian availability info.' },
              { step: '02', title: 'Compare', desc: 'Use our side-by-side comparison tool to find the perfect match for your needs and budget.' },
              { step: '03', title: 'Inquire', desc: 'Submit an inquiry with your requirements. No payment, no commitment — just information.' },
              { step: '04', title: 'Connect', desc: 'We connect you directly with the manufacturer or authorized dealer.' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="text-[64px] font-black text-gray-100 dark:text-gray-800/80 leading-none mb-2 tracking-tighter">{item.step}</div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-gray-200 dark:text-gray-800">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RoboNorth — full-width dark panel */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-slate-600" />
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em]">Why Us</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Shop With RoboNorth?</h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">We&apos;re building Canada&apos;s most comprehensive robotics marketplace — transparent, verified, and built for Canadian buyers.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: 'Canadian-Focused', desc: 'Built for Canadian buyers. Shipping info for all provinces, duties guidance included.' },
                { title: 'Verified Listings', desc: 'Every robot verified with real specs, real prices. No inflated claims or hype.' },
                { title: 'Price Transparency', desc: 'Complete pricing with TCO breakdowns. Know exactly what you\'re paying.' },
                { title: 'Early Access', desc: 'Be first in line for new releases. Exclusive pre-order access to upcoming models.' },
              ].map(item => (
                <div key={item.title} className="border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors">
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Made in Canada — Task 22 */}
      <MadeInCanada />

      {/* Cross-border comparison — Task 30 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <CrossBorderComparison />
      </section>

      {/* Latest Blog Posts — editorial layout */}
      <section className="border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Insights</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Latest from the Blog</h2>
            </div>
            <Button href="/blog" variant="ghost" size="sm">All Articles →</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getAllBlogPosts().slice(0, 3).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className={`h-full flex flex-col ${i === 0 ? 'lg:col-span-1' : ''}`}>
                  <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">{post.category}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Read →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Timeline — cleaner */}
      <section className="bg-slate-50/80 dark:bg-gray-950/50 border-y border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[280px,1fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Roadmap</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Coming Soon</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">Expected robot releases and milestones we&apos;re tracking for 2026–2027.</p>
              <Button href="/inquiry" variant="outline" size="sm">Get Notified →</Button>
            </div>
            <div>
              <div className="space-y-0">
                {[
                  { date: 'Q2 2026', title: 'Tesla Optimus Pre-Orders Open', desc: 'Expected initial commercial availability through Tesla stores.', tag: 'Hot' },
                  { date: 'Q3 2026', title: '1X NEO Shipping Begins', desc: 'First home humanoid robots ship to pre-order customers globally.', tag: 'Shipping' },
                  { date: 'Q3 2026', title: 'Figure 02 Canadian Pilot', desc: 'Figure AI expands enterprise pilot program to Canadian manufacturers.', tag: 'Canada' },
                  { date: 'Q4 2026', title: 'Unitree G1 Gen 2', desc: 'Next-generation G1 expected with improved battery and dexterous hands.', tag: 'New' },
                  { date: 'Q1 2027', title: 'Sanctuary AI Phoenix Mass Production', desc: 'Vancouver-based Sanctuary AI targets volume production of Phoenix humanoid.', tag: 'Canada' },
                  { date: 'Q2 2027', title: 'Cold-Weather Robot Variants', desc: 'Several manufacturers expected to release models rated for Canadian winters.', tag: 'Winter' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full shrink-0 mt-2" />
                      {i < 5 && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-800" />}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">{item.date}</span>
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded font-medium">{item.tag}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media mentions — hidden until we have real coverage */}
      {/* <MediaMentions /> */}

      {/* CTA Banner — clean, no orbs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="relative bg-slate-950 rounded-2xl p-10 sm:p-16 overflow-hidden">
          {/* Subtle accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          
          <div className="relative grid lg:grid-cols-[1fr,auto] gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Ready to explore?
              </h2>
              <p className="text-slate-400 max-w-lg text-sm sm:text-base">
                Join hundreds of Canadians already on our early access list. No payment required.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/inquiry" size="lg" className="!bg-white !text-slate-900 hover:!bg-slate-100 !font-bold !rounded-lg !shadow-none">
                Get Early Access
              </Button>
              <Button href="/robots" variant="outline" size="lg" className="!border-slate-700 !text-slate-300 hover:!bg-slate-800 !rounded-lg">
                Browse Robots
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
