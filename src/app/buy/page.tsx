import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllRobots } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Humanoid Robots for Sale in Canada — Buy Direct | RoboNorth',
  description: 'Buy humanoid robots in Canada. 32+ models from $5,900 to enterprise-grade. Free shipping assistance, import support, financing options, and Canadian-dollar pricing.',
  keywords: ['buy humanoid robot Canada', 'humanoid robot for sale', 'robot for sale Canada', 'buy robot online Canada', 'humanoid robot purchase'],
  openGraph: {
    title: 'Humanoid Robots for Sale in Canada — Buy Direct',
    description: '32+ humanoid robots available. CAD pricing, shipping to all provinces, financing options.',
    url: 'https://robonorth.ca/buy',
    type: 'website',
  },
  alternates: { canonical: 'https://robonorth.ca/buy' },
};

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};

export default async function BuyPage() {
  const robots = await getAllRobots();
  const available = robots.filter(r => r.availability === 'shipping' || r.availability === 'preorder');
  const featured = robots.filter(r => r.featured && (r.availability === 'shipping' || r.availability === 'preorder'));
  const budgetRobots = available.filter(r => r.priceMin > 0 && r.priceMin < 30000).sort((a, b) => a.priceMin - b.priceMin);
  const enterpriseRobots = available.filter(r => r.priceMin >= 30000).sort((a, b) => a.priceMin - b.priceMin);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Buy', url: 'https://robonorth.ca/buy' },
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Buy Humanoid Robots</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Humanoid Robots <span className="text-blue-600 dark:text-blue-400">for Sale in Canada</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Browse {available.length}+ humanoid robots available for purchase or pre-order. All prices shown with CAD estimates. Shipping to all Canadian provinces.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="#featured">Featured Picks</Button>
          <Button href="/pricing-guide" variant="outline">Pricing Guide</Button>
          <Button href="/financing" variant="outline">Financing Options</Button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { icon: '🇨🇦', title: 'Ships to Canada', desc: 'All 10 provinces + 3 territories' },
          { icon: '💰', title: 'CAD Pricing', desc: 'Transparent Canadian dollar estimates' },
          { icon: '🛡️', title: 'Import Assistance', desc: 'Customs broker referrals included' },
          { icon: '📋', title: 'Financing Available', desc: '12–48 month payment plans' },
        ].map(badge => (
          <div key={badge.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
            <span className="text-2xl block mb-2">{badge.icon}</span>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{badge.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured Picks */}
      <section id="featured" className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">⭐ Featured Picks</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Our top recommendations for Canadian buyers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(robot => (
            <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-3">
                <Badge text={availabilityLabels[robot.availability]} variant={robot.availability === 'shipping' ? 'success' : 'info'} dot />
                {robot.canadaAvailable && <span className="text-sm">🇨🇦</span>}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{robot.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{robot.manufacturer}</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-3">{robot.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">{robot.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {robot.specs.dof && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{robot.specs.dof} DOF</span>}
                {robot.specs.height && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{robot.specs.height} cm</span>}
                {robot.specs.payload && <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{robot.specs.payload} kg payload</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Budget Range */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">💚 Budget-Friendly (Under $30K USD)</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Accessible humanoid robots for education, development, and early adoption</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetRobots.map(robot => (
            <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white">{robot.name}</h3>
              <p className="text-xs text-gray-500">{robot.manufacturer} · {robot.country}</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-2">{robot.price}</p>
              <div className="flex gap-1.5 mt-2">
                <Badge text={availabilityLabels[robot.availability]} variant={robot.availability === 'shipping' ? 'success' : 'info'} />
                {robot.canadaAvailable && <Badge text="🇨🇦" variant="success" />}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Enterprise Range */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🏢 Enterprise (From $30K USD)</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Industrial-grade humanoids for manufacturing, logistics, and commercial deployment</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enterpriseRobots.map(robot => (
            <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white">{robot.name}</h3>
              <p className="text-xs text-gray-500">{robot.manufacturer} · {robot.country}</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">{robot.price}</p>
              <div className="flex gap-1.5 mt-2">
                <Badge text={availabilityLabels[robot.availability]} variant={robot.availability === 'shipping' ? 'success' : 'info'} />
                {robot.canadaAvailable && <Badge text="🇨🇦" variant="success" />}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Buy From RoboNorth */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Buy Through RoboNorth?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Canadian-First Expertise', desc: 'We understand Canadian import regulations, duty classifications, provincial tax implications, and the unique challenges of deploying robots in Canadian facilities — including cold weather operation.' },
            { title: 'Import Assistance', desc: 'First time importing a robot? We connect you with experienced customs brokers, advise on HS code classification, and help navigate CUSMA, CETA, and other trade agreements to minimize duties.' },
            { title: 'Financing & Grants', desc: 'We help identify applicable government incentives (SR&ED, IRAP, CDAP, provincial programmes) and connect you with equipment financing partners for 12–48 month payment plans.' },
          ].map(item => (
            <div key={item.title} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Not Sure Which Robot to Buy?</h2>
        <p className="text-blue-100 mb-6">Take our 2-minute quiz or speak with a RoboNorth advisor for a personalized recommendation.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/quiz" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Take the Quiz</Button>
          <Button href="/inquiry" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Contact an Advisor</Button>
          <Button href="/compare" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Compare Robots</Button>
        </div>
      </div>
    </div>
  );
}
