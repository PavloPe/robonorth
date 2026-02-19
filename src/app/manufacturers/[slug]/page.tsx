import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getManufacturerBySlug, getAllManufacturerSlugs } from '@/lib/queries';
import prisma from '@/lib/db';
import { toRobot } from '@/lib/queries';
import RobotCard from '@/components/ui/RobotCard';

export async function generateStaticParams() {
  const slugs = await getAllManufacturerSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await getManufacturerBySlug(slug);
  if (!m) return { title: 'Manufacturer Not Found' };
  return { title: m.name, description: m.description };
}

export default async function ManufacturerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const manufacturer = await getManufacturerBySlug(slug);
  if (!manufacturer) notFound();

  const dbRobots = await prisma.robot.findMany({
    where: { manufacturerSlug: slug },
    orderBy: { name: 'asc' },
  });
  const theirRobots = dbRobots.map(toRobot);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/manufacturers" className="hover:text-gray-600">Brands</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{manufacturer.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{manufacturer.name}</h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span>{manufacturer.country}</span>
          <span>·</span>
          <span>Founded {manufacturer.founded}</span>
          <span>·</span>
          <a href={manufacturer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
            Website ↗
          </a>
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl">{manufacturer.description}</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Robots by {manufacturer.name} ({theirRobots.length})
        </h2>
        {theirRobots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {theirRobots.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No robots listed yet.</p>
        )}
      </section>
    </div>
  );
}
