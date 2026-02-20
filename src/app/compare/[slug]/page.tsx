import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getComparisonBySlug, getAllComparisonSlugs } from '@/data/comparisons';
import { getRobotBySlug } from '@/lib/queries';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import type { Robot } from '@/types';

export function generateStaticParams() {
  return getAllComparisonSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: 'Comparison Not Found' };
  return {
    title: comparison.title,
    description: comparison.metaDescription,
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      type: 'article',
      url: `https://robonorth.ca/compare/${slug}`,
    },
    alternates: { canonical: `https://robonorth.ca/compare/${slug}` },
  };
}

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};

function SpecRow({ label, val1, val2, unit = '' }: { label: string; val1: string | number | null; val2: string | number | null; unit?: string }) {
  const v1 = val1 != null ? `${val1}${unit ? ` ${unit}` : ''}` : '—';
  const v2 = val2 != null ? `${val2}${unit ? ` ${unit}` : ''}` : '—';
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="py-3.5 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</td>
      <td className="py-3.5 px-4 text-sm font-semibold text-gray-900 dark:text-white text-centre">{v1}</td>
      <td className="py-3.5 px-4 text-sm font-semibold text-gray-900 dark:text-white text-centre">{v2}</td>
    </tr>
  );
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const [r1, r2] = await Promise.all([
    getRobotBySlug(comparison.robot1),
    getRobotBySlug(comparison.robot2),
  ]);
  if (!r1 || !r2) notFound();

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://robonorth.ca' },
    { name: 'Compare', url: 'https://robonorth.ca/compare' },
    { name: `${r1.name} vs ${r2.name}`, url: `https://robonorth.ca/compare/${slug}` },
  ]);

  const comparisonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: comparison.title,
    description: comparison.metaDescription,
    url: `https://robonorth.ca/compare/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 2,
      itemListElement: [r1, r2].map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: r.name,
          description: r.description,
          brand: { '@type': 'Organization', name: r.manufacturer },
          offers: r.priceMin > 0 ? {
            '@type': 'Offer',
            price: r.priceMin,
            priceCurrency: 'USD',
          } : undefined,
        },
      })),
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonLd) }} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link href="/compare" className="hover:text-gray-600 dark:hover:text-gray-300">Compare</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{r1.name} vs {r2.name}</span>
      </nav>

      {/* Title */}
      <div className="text-centre mb-12">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Head-to-Head Comparison</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {r1.name} <span className="text-gray-400 dark:text-gray-500">vs</span> {r2.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{comparison.metaDescription}</p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[r1, r2].map(robot => (
          <div key={robot.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{robot.manufacturer}</p>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{robot.name}</h2>
              </div>
              <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={robot.availability === 'shipping' ? 'success' : robot.availability === 'preorder' ? 'info' : 'default'} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{robot.price}</div>
            {robot.canadaAvailable && <Badge text="🇨🇦 Ships to Canada" variant="success" />}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-3">{robot.description}</p>
            <Link href={`/robots/${robot.id}`} className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
              View Full Details →
            </Link>
          </div>
        ))}
      </div>

      {/* Specs Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Specifications Comparison</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specification</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{r1.name}</th>
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{r2.name}</th>
              </tr>
            </thead>
            <tbody>
              <SpecRow label="Price" val1={r1.price} val2={r2.price} />
              <SpecRow label="Height" val1={r1.specs.height} val2={r2.specs.height} unit="cm" />
              <SpecRow label="Weight" val1={r1.specs.weight} val2={r2.specs.weight} unit="kg" />
              <SpecRow label="Degrees of Freedom" val1={r1.specs.dof} val2={r2.specs.dof} />
              <SpecRow label="Payload" val1={r1.specs.payload} val2={r2.specs.payload} unit="kg" />
              <SpecRow label="Max Speed" val1={r1.specs.speed} val2={r2.specs.speed} unit="km/h" />
              <SpecRow label="Battery" val1={r1.specs.battery} val2={r2.specs.battery} />
              <SpecRow label="Country of Origin" val1={r1.country} val2={r2.country} />
              <SpecRow label="Availability" val1={availabilityLabels[r1.availability]} val2={availabilityLabels[r2.availability]} />
              <SpecRow label="Ships to Canada" val1={r1.canadaAvailable ? '✅ Yes' : '❌ No'} val2={r2.canadaAvailable ? '✅ Yes' : '❌ No'} />
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚖️ Pros & Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { robot: r1, pros: comparison.robot1Pros, cons: comparison.robot1Cons },
            { robot: r2, pros: comparison.robot2Pros, cons: comparison.robot2Cons },
          ].map(({ robot, pros, cons }) => (
            <div key={robot.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{robot.name}</h3>
              <div className="mb-4">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Pros</p>
                <ul className="space-y-1.5">
                  {pros.map((p, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">Cons</p>
                <ul className="space-y-1.5">
                  {cons.map((c, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">✗</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Case Recommendations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 Use Case Recommendations</h2>
        <div className="space-y-3">
          {comparison.useCaseRecommendations.map((rec, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{rec.useCase}</h3>
                <Badge text={`Winner: ${rec.winner}`} variant="info" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{rec.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🏆 Our Verdict</h2>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comparison.verdict}</p>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📝 Bottom Line for Canadian Buyers</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{comparison.summary}</p>
      </section>

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <Button href={`/robots/${r1.id}`} size="lg">View {r1.name}</Button>
        <Button href={`/robots/${r2.id}`} variant="dark" size="lg">View {r2.name}</Button>
      </div>

      {/* Other Comparisons */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">More Comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {getAllComparisonSlugs().filter(s => s !== slug).map(s => {
            const c = getComparisonBySlug(s);
            if (!c) return null;
            return (
              <Link key={s} href={`/compare/${s}`} className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/30 px-3 py-1.5 rounded-lg font-medium">
                {c.title.replace(': Complete Comparison 2026', '').replace(': Enterprise Humanoid Showdown 2026', '').replace(': Which Unitree Humanoid Is Right for You?', '').replace(': Battle of the American Humanoids 2026', '').replace(': Best Consumer Humanoid Robot 2026', '')}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
