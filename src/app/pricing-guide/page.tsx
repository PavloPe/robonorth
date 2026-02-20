import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllRobots } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'How Much Does a Humanoid Robot Cost in 2026? — Complete Pricing Guide',
  description: 'Complete humanoid robot pricing guide for 2026. Budget ($1K–$15K), mid-range ($15K–$50K), enterprise ($50K–$250K), and premium ($250K+) tiers with CAD pricing, import costs, and maintenance estimates.',
  keywords: ['humanoid robot cost', 'humanoid robot price 2026', 'how much does a robot cost', 'robot price Canada', 'buy humanoid robot'],
  openGraph: {
    title: 'How Much Does a Humanoid Robot Cost in 2026? — Complete Pricing Guide',
    description: 'From $5,900 to $500K+ — every price tier explained with CAD estimates, import duties, and total cost of ownership.',
    url: 'https://robonorth.ca/pricing-guide',
    type: 'article',
  },
  alternates: { canonical: 'https://robonorth.ca/pricing-guide' },
};

const tiers = [
  {
    name: 'Budget',
    range: '$1,000 – $15,000 USD',
    cadRange: '$1,380 – $20,700 CAD',
    colour: 'emerald',
    description: 'Entry-level humanoid robots for education, hobbyists, and development. These robots offer basic locomotion, programmable interfaces, and learning-friendly SDKs.',
    idealFor: ['Universities & colleges', 'STEM education programmes', 'Hobbyist developers', 'Robotics competitions', 'Proof-of-concept projects'],
    considerations: [
      'Limited payload (typically 1–3 kg)',
      'Shorter battery life (1–2 hours)',
      'Basic manipulation — grippers rather than dexterous hands',
      'Smaller form factor (under 140 cm)',
      'May require programming skills for useful operation',
    ],
    maintenanceCost: '$200–$800/year',
    importNotes: 'At these price points, most units ship via courier (DHL/FedEx). Import duties from China are 0–8%. GST/HST applies on landed cost. No freight forwarder needed.',
  },
  {
    name: 'Mid-Range',
    range: '$15,000 – $50,000 USD',
    cadRange: '$20,700 – $69,000 CAD',
    colour: 'blue',
    description: 'Capable humanoid robots for serious development, light commercial applications, and early-adopter consumers. This tier offers meaningful dexterity, better battery life, and real-world utility.',
    idealFor: ['R&D labs & startups', 'Light commercial deployment', 'Home assistance (early adopter)', 'Small-business automation', 'Advanced research'],
    considerations: [
      'Better DOF (35–75) for complex tasks',
      '2–4 hour battery life',
      'Some models include dexterous hands',
      'ROS 2 support common',
      'Growing ecosystem of compatible parts',
    ],
    maintenanceCost: '$1,000–$3,000/year',
    importNotes: 'Courier or small freight. 0% duty from USA (CUSMA), 0% from EU/UK (CETA/continuity agreements), 0–8% from China/Asia. Budget $500–$2,000 for shipping.',
  },
  {
    name: 'Enterprise',
    range: '$50,000 – $250,000 USD',
    cadRange: '$69,000 – $345,000 CAD',
    colour: 'purple',
    description: 'Industrial-grade humanoid robots for manufacturing, logistics, and healthcare. These units are designed for sustained commercial deployment with fleet management, extended battery life, and enterprise support.',
    idealFor: ['Manufacturing lines', 'Warehouse & logistics', 'Healthcare facilities', 'Automotive plants', 'Large-scale deployment'],
    considerations: [
      'Designed for 4–8 hour continuous operation',
      '15–30 kg payload capacity',
      'Fleet management platforms',
      'Enterprise support contracts available',
      'Hot-swappable batteries common',
    ],
    maintenanceCost: '$5,000–$15,000/year',
    importNotes: 'Freight shipping (sea or air). Import broker recommended. 0% under CUSMA (US) or CETA (EU). Chinese-origin robots may face 0–8% duty. Budget $2,000–$10,000 for international shipping + brokerage.',
  },
  {
    name: 'Premium',
    range: '$250,000+ USD',
    cadRange: '$345,000+ CAD',
    colour: 'amber',
    description: 'The most advanced humanoid robots available — cutting-edge research platforms, exhibition units, and ultra-capable industrial systems. These represent the current pinnacle of humanoid robotics technology.',
    idealFor: ['Advanced research institutions', 'Exhibition & entertainment', 'Heavy industrial automation', 'Government & military R&D', 'Large enterprise fleet deployment'],
    considerations: [
      '50+ DOF for maximum versatility',
      'Custom-built or limited production',
      'World-class support and commissioning',
      'May include fleet learning / cloud platform',
      'Insurance and facility requirements apply',
    ],
    maintenanceCost: '$15,000–$50,000+/year',
    importNotes: 'Custom freight arrangements. Each unit is typically shipped crated with on-site commissioning. Budget $10,000–$25,000 for shipping, brokerage, and installation. Import duties usually 0% under trade agreements.',
  },
];

const faqItems = [
  { q: 'What is the cheapest humanoid robot I can buy in 2026?', a: 'The Unitree R1 starts at $5,900 USD (~$8,150 CAD), making it the most affordable full-body humanoid robot available. It ships worldwide and is available in Canada.' },
  { q: 'Are humanoid robot prices dropping?', a: 'Yes, dramatically. In 2020, a capable humanoid cost $200K+. By 2026, you can get one for under $16K (Unitree G1). Tesla targets sub-$20K. Prices are falling 30–50% per year as manufacturing scales.' },
  { q: 'Do I pay import duties on robots in Canada?', a: 'It depends on origin. Robots from the USA are 0% duty (CUSMA). EU/UK robots are 0% (CETA). Chinese-origin robots face 0–8% duty depending on HS code classification. GST/HST always applies.' },
  { q: 'What are the ongoing costs of owning a humanoid robot?', a: 'Annual maintenance runs 5–10% of purchase price. Add energy costs ($200–$800/year), software licenses ($0–$5,000/year for enterprise), insurance ($1,000–$5,000/year for commercial use), and periodic part replacements.' },
  { q: 'Can I lease a humanoid robot instead of buying?', a: 'Yes. 1X offers the NEO at $499/month. Agility Robotics operates a RaaS (Robot as a Service) model. Several manufacturers offer pilot programmes with monthly fees. See our RaaS page for details.' },
  { q: 'Is financing available for humanoid robots in Canada?', a: 'Traditional equipment financing applies — most business lenders will finance robotics equipment over 24–60 months. Government programmes like SR&ED, IRAP, and CDAP can offset costs. See our financing and grants pages.' },
];

export default async function PricingGuidePage() {
  const robots = await getAllRobots();
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Pricing Guide', url: 'https://robonorth.ca/pricing-guide' },
  ]);
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const budgetRobots = robots.filter(r => r.priceMin > 0 && r.priceMin < 15000);
  const midRobots = robots.filter(r => r.priceMin >= 15000 && r.priceMin < 50000);
  const enterpriseRobots = robots.filter(r => r.priceMin >= 50000 && r.priceMin < 250000);
  const premiumRobots = robots.filter(r => r.priceMin >= 250000);

  const tierRobots = [budgetRobots, midRobots, enterpriseRobots, premiumRobots];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Pricing Guide</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Updated February 2026</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">How Much Does a Humanoid Robot Cost in 2026?</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          From $5,900 to $500,000+ — the humanoid robot market spans a massive range. This guide breaks down every price tier with Canadian dollar estimates, import costs, maintenance, and which robots fit each budget.
        </p>
      </div>

      {/* Quick Price Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {tiers.map(tier => (
          <div key={tier.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 text-center">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{tier.name}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{tier.range}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{tier.cadRange}</p>
          </div>
        ))}
      </div>

      {/* Detailed Tiers */}
      {tiers.map((tier, idx) => (
        <section key={tier.name} className="mb-16" id={tier.name.toLowerCase()}>
          <div className="flex items-centre gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
              tier.colour === 'emerald' ? 'bg-emerald-500' :
              tier.colour === 'blue' ? 'bg-blue-500' :
              tier.colour === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
            }`}>{idx + 1}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name} Tier: {tier.range}</h2>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{tier.cadRange}</p>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{tier.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Ideal For</h3>
              <ul className="space-y-1.5">
                {tier.idealFor.map(item => (
                  <li key={item} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Considerations</h3>
              <ul className="space-y-1.5">
                {tier.considerations.map(item => (
                  <li key={item} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-blue-500">→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Est. Annual Maintenance</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{tier.maintenanceCost}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Import Notes (Canada)</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tier.importNotes}</p>
              </div>
            </div>
          </div>

          {/* Robots in this tier */}
          {tierRobots[idx].length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Robots in this tier</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tierRobots[idx].map(robot => (
                  <Link key={robot.id} href={`/robots/${robot.id}`} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{robot.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{robot.manufacturer}</p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{robot.price}</p>
                    <div className="flex gap-1.5 mt-2">
                      <Badge text={robot.availability === 'shipping' ? 'In Stock' : robot.availability === 'preorder' ? 'Pre-Order' : 'Coming Soon'} variant={robot.availability === 'shipping' ? 'success' : 'default'} />
                      {robot.canadaAvailable && <Badge text="🇨🇦" variant="success" />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Total Cost of Ownership */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💰 Total Cost of Ownership (5-Year Estimate)</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The purchase price is just the beginning. Here&apos;s what a 5-year ownership costs for each tier:</p>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Cost Component</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-emerald-600">Budget</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-blue-600">Mid-Range</th>
                <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider text-purple-600">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Purchase Price (CAD)</td>
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$8K–$21K</td>
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$21K–$69K</td>
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">$69K–$345K</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Shipping & Import</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$200–$1K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$500–$3K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$2K–$15K</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">5-Year Maintenance</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$1K–$4K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$5K–$15K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$25K–$75K</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Energy (5 years)</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$500–$1K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$1K–$3K</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">$3K–$8K</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/30 font-bold">
                <td className="py-3 px-4 text-gray-900 dark:text-white">5-Year Total (CAD)</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400">$10K–$27K</td>
                <td className="py-3 px-4 text-blue-600 dark:text-blue-400">$28K–$90K</td>
                <td className="py-3 px-4 text-purple-600 dark:text-purple-400">$99K–$443K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">❓ Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <details key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {faq.q}
                <svg className="w-4 h-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-centre text-white">
        <h2 className="text-2xl font-bold mb-2">Need Help Choosing?</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">Take our 2-minute quiz to get a personalized robot recommendation based on your budget, use case, and requirements.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/quiz" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Take the Quiz</Button>
          <Button href="/robots" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">Browse All Robots</Button>
          <Button href="/tco-calculator" variant="outline" className="!text-white !border-white/30 hover:!bg-white/10">TCO Calculator</Button>
        </div>
      </div>
    </div>
  );
}
