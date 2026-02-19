import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRobotBySlug, getRelatedRobots, getAllRobotSlugs } from '@/lib/queries';
import { robotJsonLd } from '@/lib/jsonld';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import RobotCard from '@/components/ui/RobotCard';

const availabilityVariant: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  shipping: 'success', preorder: 'info', pilot: 'warning', announced: 'default', prototype: 'default',
};
const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Coming Soon', prototype: 'Prototype',
};

export async function generateStaticParams() {
  const slugs = await getAllRobotSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) return { title: 'Robot Not Found' };
  return { title: `${robot.name} — ${robot.price}`, description: robot.description };
}

// Spec bar config: field, label, icon, unit, max for progress bar
const specBarConfig = [
  { key: 'height', label: 'Height', icon: '📏', unit: 'cm', max: 200 },
  { key: 'weight', label: 'Weight', icon: '⚖️', unit: 'kg', max: 100 },
  { key: 'dof', label: 'Degrees of Freedom', icon: '🦾', unit: '', max: 80 },
  { key: 'payload', label: 'Payload', icon: '📦', unit: 'kg', max: 50 },
  { key: 'speed', label: 'Max Speed', icon: '⚡', unit: 'km/h', max: 15 },
] as const;

export default async function RobotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) notFound();

  const related = await getRelatedRobots(robot);

  const numericSpecs = specBarConfig
    .map(cfg => {
      const val = robot.specs[cfg.key as keyof typeof robot.specs];
      return typeof val === 'number' && val > 0 ? { ...cfg, value: val } : null;
    })
    .filter(Boolean) as Array<{ key: string; label: string; icon: string; unit: string; max: number; value: number }>;

  const textSpecs = [
    { label: 'Battery', icon: '🔋', value: robot.specs.battery },
    { label: 'Country of Origin', icon: '🌍', value: robot.country },
    { label: 'Category', icon: '📂', value: robot.category.charAt(0).toUpperCase() + robot.category.slice(1) },
    { label: 'Use Cases', icon: '🎯', value: robot.useCase.join(', ') },
  ].filter(s => s.value);

  const jsonLd = robotJsonLd(robot);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/robots" className="hover:text-gray-600 transition-colors">Robots</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 font-medium">{robot.name}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 border border-gray-200/80 rounded-3xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-40" />
          <span className="text-[140px] opacity-25 relative">🤖</span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <Link href={`/manufacturers/${robot.manufacturerSlug}`} className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2 hover:text-blue-700 transition-colors inline-flex items-center gap-1.5 w-fit">
            {robot.manufacturer}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{robot.name}</h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={availabilityVariant[robot.availability] || 'default'} dot />
            {robot.canadaAvailable && <Badge text="🇨🇦 Ships to Canada" variant="success" />}
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">{robot.price}</div>
          
          <p className="text-gray-600 leading-relaxed mb-8">{robot.description}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/inquiry?robot=${robot.id}`} size="lg">
              <span className="flex items-center gap-2">
                Inquire Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </Button>
            <Button href={`/compare?robots=${robot.id}`} variant="outline" size="lg">Compare</Button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <section className="mb-16">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Technical</p>
          <h2 className="text-2xl font-bold text-gray-900">Specifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Numeric specs with progress bars */}
          {numericSpecs.length > 0 && (
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Performance</h3>
              <div className="space-y-5">
                {numericSpecs.map(spec => {
                  const pct = Math.min(100, (spec.value / spec.max) * 100);
                  return (
                    <div key={spec.key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="text-base">{spec.icon}</span>
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {spec.value}{spec.unit && ` ${spec.unit}`}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full spec-bar-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Text specs */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Details</h3>
            <div className="space-y-0">
              {textSpecs.map((spec, i) => (
                <div key={spec.label} className={`flex items-start justify-between py-3.5 ${i < textSpecs.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-sm text-gray-500 flex items-center gap-2 shrink-0">
                    <span className="text-base">{spec.icon}</span>
                    {spec.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 text-right ml-4">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related robots */}
      {related.length > 0 && (
        <section className="mb-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Similar</p>
            <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
