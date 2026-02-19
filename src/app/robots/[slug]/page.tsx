import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRobotBySlug, getRelatedRobots, getAllRobotSlugs } from '@/lib/queries';
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

export default async function RobotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = await getRobotBySlug(slug);
  if (!robot) notFound();

  const related = await getRelatedRobots(robot);

  const specs = [
    { label: 'Height', value: robot.specs.height ? `${robot.specs.height} cm` : null },
    { label: 'Weight', value: robot.specs.weight ? `${robot.specs.weight} kg` : null },
    { label: 'Degrees of Freedom', value: robot.specs.dof ? `${robot.specs.dof}` : null },
    { label: 'Battery', value: robot.specs.battery },
    { label: 'Payload', value: robot.specs.payload ? `${robot.specs.payload} kg` : null },
    { label: 'Speed', value: robot.specs.speed ? `${robot.specs.speed} km/h` : null },
    { label: 'Country of Origin', value: robot.country },
    { label: 'Category', value: robot.category.charAt(0).toUpperCase() + robot.category.slice(1) },
    { label: 'Use Cases', value: robot.useCase.join(', ') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/robots" className="hover:text-gray-600">Robots</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{robot.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="aspect-square bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center">
          <span className="text-[120px] opacity-30">🤖</span>
        </div>

        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">{robot.manufacturer}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{robot.name}</h1>
          <div className="flex items-center gap-2 mb-5">
            <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={availabilityVariant[robot.availability] || 'default'} />
            {robot.canadaAvailable && <Badge text="🇨🇦 Ships to Canada" variant="success" />}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-5">{robot.price}</div>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">{robot.description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={`/inquiry?robot=${robot.id}`} size="lg">Inquire Now</Button>
            <Button href={`/compare?robots=${robot.id}`} variant="outline" size="lg">Compare</Button>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {specs.filter(s => s.value).map((spec, i) => (
            <div key={spec.label} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : ''}`}>
              <span className="text-gray-500">{spec.label}</span>
              <span className="font-medium text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
