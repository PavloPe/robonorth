import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { robots } from '@/data/robots';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import RobotCard from '@/components/ui/RobotCard';

const availabilityVariant: Record<string, 'success' | 'warning' | 'info' | 'default' | 'danger'> = {
  shipping: 'success', preorder: 'info', pilot: 'warning', announced: 'default', prototype: 'default',
};
const availabilityLabels: Record<string, string> = {
  shipping: 'Shipping Now', preorder: 'Pre-Order', pilot: 'Pilot Program', announced: 'Announced', prototype: 'Prototype',
};

export function generateStaticParams() {
  return robots.map(r => ({ slug: r.id }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const robot = robots.find(r => r.id === slug);
    if (!robot) return { title: 'Robot Not Found' };
    return {
      title: `${robot.name} — ${robot.price}`,
      description: robot.description,
    };
  });
}

export default async function RobotDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const robot = robots.find(r => r.id === slug);
  if (!robot) notFound();

  const related = robots
    .filter(r => r.id !== robot.id && (r.manufacturerSlug === robot.manufacturerSlug || r.category === robot.category))
    .slice(0, 3);

  const specs = [
    { label: 'Height', value: robot.specs.height ? `${robot.specs.height} cm` : null },
    { label: 'Weight', value: robot.specs.weight ? `${robot.specs.weight} kg` : null },
    { label: 'Degrees of Freedom', value: robot.specs.dof ? `${robot.specs.dof}` : null },
    { label: 'Battery', value: robot.specs.battery },
    { label: 'Payload', value: robot.specs.payload ? `${robot.specs.payload} kg` : null },
    { label: 'Speed', value: robot.specs.speed ? `${robot.specs.speed} km/h` : null },
    { label: 'Country', value: robot.country },
    { label: 'Category', value: robot.category },
    { label: 'Use Cases', value: robot.useCase.join(', ') },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/robots" className="hover:text-gray-300">Robots</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-300">{robot.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="aspect-square bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center">
          <span className="text-9xl opacity-30">🤖</span>
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{robot.manufacturer}</p>
          <h1 className="text-4xl font-bold text-white mb-4">{robot.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <Badge text={availabilityLabels[robot.availability] || robot.availability} variant={availabilityVariant[robot.availability] || 'default'} />
            {robot.canadaAvailable && <Badge text="🇨🇦 Ships to Canada" variant="success" />}
          </div>
          <div className="text-3xl font-bold text-cyan-400 mb-6">{robot.price}</div>
          <p className="text-gray-400 leading-relaxed mb-8">{robot.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={`/inquiry?robot=${robot.id}`} size="lg">Inquire About This Robot</Button>
            <Button href={`/compare?robots=${robot.id}`} variant="outline" size="lg">Compare</Button>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {specs.filter(s => s.value).map((spec, i) => (
            <div key={spec.label} className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? '' : 'bg-gray-800/30'}`}>
              <span className="text-sm text-gray-400">{spec.label}</span>
              <span className="text-sm font-medium text-white">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Related Robots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
