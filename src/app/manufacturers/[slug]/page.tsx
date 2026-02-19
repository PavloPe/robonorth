import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { manufacturers } from '@/data/manufacturers';
import { robots } from '@/data/robots';
import RobotCard from '@/components/ui/RobotCard';

export function generateStaticParams() {
  return manufacturers.map(m => ({ slug: m.id }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const m = manufacturers.find(x => x.id === slug);
    if (!m) return { title: 'Manufacturer Not Found' };
    return {
      title: m.name,
      description: m.description,
    };
  });
}

export default async function ManufacturerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const manufacturer = manufacturers.find(m => m.id === slug);
  if (!manufacturer) notFound();

  const theirRobots = robots.filter(r => manufacturer.robotIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/manufacturers" className="hover:text-gray-300">Manufacturers</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-300">{manufacturer.name}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">{manufacturer.name}</h1>
        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <span>{manufacturer.country}</span>
          <span>·</span>
          <span>Founded {manufacturer.founded}</span>
          <span>·</span>
          <a href={manufacturer.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
            Website ↗
          </a>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">{manufacturer.description}</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">
          Robots by {manufacturer.name} ({theirRobots.length})
        </h2>
        {theirRobots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {theirRobots.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        ) : (
          <p className="text-gray-500">No robots listed yet for this manufacturer.</p>
        )}
      </section>
    </div>
  );
}
