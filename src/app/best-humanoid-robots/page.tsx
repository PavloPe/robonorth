import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllRobots } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { Robot } from '@/types';

export const metadata: Metadata = {
  title: 'Best Humanoid Robots 2026 — Top 32 Ranked & Compared',
  description: 'The definitive ranked list of the best humanoid robots in 2026. 32 robots scored on value, capability, availability, and support. Updated monthly. Compare specs, prices, and find your ideal robot.',
  keywords: ['best humanoid robots 2026', 'top humanoid robots', 'humanoid robot ranking', 'best robots to buy', 'humanoid robot comparison 2026'],
  openGraph: {
    title: 'Best Humanoid Robots 2026 — Top 32 Ranked',
    description: '32 humanoid robots ranked by value, capability, availability, and support. The most comprehensive ranking online.',
    url: 'https://robonorth.ca/best-humanoid-robots',
    type: 'article',
  },
  alternates: { canonical: 'https://robonorth.ca/best-humanoid-robots' },
};

function scoreRobot(robot: Robot): { total: number; deployment: number; capability: number; availability: number; value: number; impact: number } {
  // Use pre-computed scores if available
  if (robot.scores) {
    const total = Math.round(
      (robot.scores.deployment * 0.20 +
       robot.scores.capability * 0.25 +
       robot.scores.availability * 0.20 +
       robot.scores.value * 0.20 +
       robot.scores.impact * 0.15) * 10
    ) / 10;
    return { total, ...robot.scores };
  }
  // Fallback scoring for robots without pre-computed scores
  let value = 5;
  if (robot.priceMin > 0 && robot.priceMin < 10000) value = 10;
  else if (robot.priceMin >= 10000 && robot.priceMin < 25000) value = 9;
  else if (robot.priceMin >= 25000 && robot.priceMin < 50000) value = 7;
  else if (robot.priceMin >= 50000 && robot.priceMin < 100000) value = 6;
  else if (robot.priceMin >= 100000 && robot.priceMin < 250000) value = 5;
  else if (robot.priceMin >= 250000) value = 4;
  if (robot.priceMin === 0) value = 3;

  let capability = 5;
  const dof = robot.specs.dof || 0;
  if (dof >= 50) capability = 10;
  else if (dof >= 40) capability = 9;
  else if (dof >= 30) capability = 7;
  else if (dof >= 20) capability = 6;
  else if (dof > 0) capability = 5;

  let availability = 3;
  if (robot.availability === 'shipping') availability = 10;
  else if (robot.availability === 'preorder') availability = 7;
  else if (robot.availability === 'pilot') availability = 5;
  else if (robot.availability === 'announced') availability = 3;
  else if (robot.availability === 'prototype') availability = 2;

  const deployment = availability >= 7 ? 6 : 3;
  const impact = robot.featured ? 7 : 5;

  const total = Math.round(
    (deployment * 0.20 + capability * 0.25 + availability * 0.20 + value * 0.20 + impact * 0.15) * 10
  ) / 10;
  return { total, deployment, capability, availability, value, impact };
}

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};
const availabilityVariant: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
  shipping: 'success', preorder: 'info', pilot: 'warning', announced: 'default', prototype: 'default',
};

export default async function BestHumanoidRobotsPage() {
  const robots = await getAllRobots();
  const scored = robots.map(r => ({ robot: r, scores: scoreRobot(r) }))
    .sort((a, b) => b.scores.total - a.scores.total);

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Best Humanoid Robots 2026', url: 'https://robonorth.ca/best-humanoid-robots' },
  ]);

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Humanoid Robots 2026',
    description: 'Ranked list of the top humanoid robots available in 2026',
    numberOfItems: scored.length,
    itemListElement: scored.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: item.robot.name,
        description: item.robot.description,
        brand: { '@type': 'Organization', name: item.robot.manufacturer },
        url: `https://robonorth.ca/robots/${item.robot.id}`,
        ...(item.robot.priceMin > 0 ? {
          offers: { '@type': 'Offer', price: item.robot.priceMin, priceCurrency: 'USD' },
        } : {}),
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />

      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Best Humanoid Robots 2026</span>
      </nav>

      <div className="mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Updated February 2026</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Best Humanoid Robots 2026 — Top {scored.length} Ranked</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl">
          Every humanoid robot available or coming soon, scored on value, capability, availability, and Canadian support. Updated monthly by the RoboNorth team.
        </p>
      </div>

      {/* Scoring Methodology */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📊 How We Score</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div><span className="font-semibold text-gray-900 dark:text-white">Deployment (20%)</span><p className="text-gray-500 dark:text-gray-400">Real-world deployments</p></div>
          <div><span className="font-semibold text-gray-900 dark:text-white">Capability (25%)</span><p className="text-gray-500 dark:text-gray-400">DOF, payload, speed, AI</p></div>
          <div><span className="font-semibold text-gray-900 dark:text-white">Availability (20%)</span><p className="text-gray-500 dark:text-gray-400">Can you buy it today?</p></div>
          <div><span className="font-semibold text-gray-900 dark:text-white">Value (20%)</span><p className="text-gray-500 dark:text-gray-400">Price-to-capability ratio</p></div>
          <div><span className="font-semibold text-gray-900 dark:text-white">Impact (15%)</span><p className="text-gray-500 dark:text-gray-400">Industry significance</p></div>
        </div>
      </div>

      {/* Rankings */}
      <div className="space-y-4">
        {scored.map((item, rank) => {
          const { robot, scores } = item;
          const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : null;
          return (
            <div key={robot.id} className={`bg-white dark:bg-gray-900 border rounded-2xl p-5 sm:p-6 transition-all hover:shadow-md ${
              rank < 3 ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-2xl font-bold text-gray-300 dark:text-gray-600">#{rank + 1}</span>
                  {medal && <span className="text-2xl">{medal}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link href={`/robots/${robot.id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                      {robot.name}
                    </Link>
                    <Badge text={availabilityLabels[robot.availability]} variant={availabilityVariant[robot.availability] || 'default'} />
                    {robot.canadaAvailable && <Badge text="🇨🇦" variant="success" />}
                    {robot.reviewSlug && <Link href={`/reviews/${robot.reviewSlug}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium ml-1">📝 Review</Link>}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {robot.manufacturer} · {robot.price} · {robot.country}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{robot.description}</p>
                  {/* Category Winner Badges */}
                  {robot.categoryWinners && robot.categoryWinners.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {robot.categoryWinners.map(badge => (
                        <span key={badge} className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">🏆 {badge}</span>
                      ))}
                    </div>
                  )}
                  {/* Score bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {[
                      { label: 'Deployment', score: scores.deployment, colour: 'emerald' },
                      { label: 'Capability', score: scores.capability, colour: 'blue' },
                      { label: 'Availability', score: scores.availability, colour: 'purple' },
                      { label: 'Value', score: scores.value, colour: 'amber' },
                      { label: 'Impact', score: scores.impact, colour: 'rose' },
                    ].map(({ label, score, colour }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-500 dark:text-gray-400">{label}</span>
                          <span className="font-bold text-gray-900 dark:text-white">{score}/10</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${
                            colour === 'emerald' ? 'bg-emerald-500' :
                            colour === 'blue' ? 'bg-blue-500' :
                            colour === 'purple' ? 'bg-purple-500' :
                            colour === 'rose' ? 'bg-rose-500' : 'bg-amber-500'
                          }`} style={{ width: `${score * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 hidden sm:flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{scores.total}</div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">/ 10</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Not sure which robot is right for you?</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/quiz">Take the Robot Quiz</Button>
          <Button href="/compare" variant="outline">Compare Side-by-Side</Button>
          <Button href="/pricing-guide" variant="outline">Pricing Guide</Button>
        </div>
      </div>
    </div>
  );
}
