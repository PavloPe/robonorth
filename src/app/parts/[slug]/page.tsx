import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPartBySlug, getRelatedParts, getAllPartSlugs, getRobotBySlug } from '@/lib/queries';
import { partCategoryLabels, partCategoryIcons } from '@/data/parts-catalog';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PartCard from '@/components/ui/PartCard';
import AddToBasketButton from '@/components/ui/AddToBasketButton';

export async function generateStaticParams() {
  const slugs = await getAllPartSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const part = await getPartBySlug(slug);
  if (!part) return { title: 'Part Not Found' };

  const priceStr = part.priceCAD > 0 ? `$${part.priceCAD.toLocaleString('en-CA')} CAD` : 'Free';
  const title = `${part.name} — ${priceStr}`;
  const description = `${part.name} by ${part.manufacturer}. ${priceStr}. ${part.description.slice(0, 140)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${part.name} — ${priceStr} | RoboNorth`,
      description,
      url: `https://robonorth.ca/parts/${part.id}`,
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: part.name }],
    },
    alternates: {
      canonical: `https://robonorth.ca/parts/${part.id}`,
    },
  };
}

function formatPrice(cad: number): string {
  if (cad === 0) return 'Free';
  return `$${cad.toLocaleString('en-CA')} CAD`;
}

export default async function PartDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const part = await getPartBySlug(slug);
  if (!part) notFound();

  const related = await getRelatedParts(part);
  const categoryLabel = partCategoryLabels[part.category] || part.category;
  const categoryIcon = partCategoryIcons[part.category] || '🔧';

  // Resolve compatible robots
  const compatibleRobots: Array<{ id: string; name: string; manufacturer: string; price: string }> = [];
  for (const robotSlug of part.compatibility) {
    const robot = await getRobotBySlug(robotSlug);
    if (robot) {
      compatibleRobots.push({ id: robot.id, name: robot.name, manufacturer: robot.manufacturer, price: robot.price });
    }
  }

  const specEntries = Object.entries(part.specifications);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/parts" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Parts</Link>
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href={`/parts?category=${part.category}`} className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{categoryLabel}</Link>
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{part.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
        {/* Image area */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-30" />
          <div className="text-center z-10">
            <span className="text-8xl opacity-40">{categoryIcon}</span>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">{categoryLabel}</p>
          </div>
          {part.featured && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg">⭐ Featured</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
              {part.manufacturer}
            </span>
            {part.subcategory && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{part.subcategory}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{part.name}</h1>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {part.inStock ? (
              <Badge text="In Stock" variant="success" dot />
            ) : (
              <Badge text={part.leadTimeDays ? `${part.leadTimeDays}-day lead time` : 'Out of Stock'} variant="warning" dot />
            )}
            <Badge text={categoryLabel} variant="default" />
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(part.priceCAD)}</div>
            {part.priceUSD > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ~${part.priceUSD.toLocaleString('en-US')} USD
              </p>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{part.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button href={`/inquiry?part=${part.id}`} size="lg">
              <span className="flex items-center gap-2">
                Request a Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Button>
            <AddToBasketButton
              itemType="part"
              itemId={part.id}
              itemName={part.name}
              price={formatPrice(part.priceCAD)}
            />
          </div>

          {part.datasheetUrl && (
            <a href={part.datasheetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download Datasheet
            </a>
          )}
        </div>
      </div>

      {/* Specifications */}
      {specEntries.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Technical</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Specifications</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {specEntries.map(([key, value], i) => (
                  <tr key={key} className={i < specEntries.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/3 bg-gray-50/50 dark:bg-gray-800/30">
                      {key}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Compatible Robots */}
      {compatibleRobots.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Compatibility</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Works with these Robots</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibleRobots.map(robot => (
              <Link
                key={robot.id}
                href={`/robots/${robot.id}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-xl hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  🤖
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {robot.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{robot.manufacturer} · {robot.price}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Parts */}
      {related.length > 0 && (
        <section className="mb-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Related</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Similar Parts</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(p => <PartCard key={p.id} part={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
