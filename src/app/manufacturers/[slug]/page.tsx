import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getManufacturerBySlug, getAllManufacturerSlugs } from '@/lib/queries';
import prisma from '@/lib/db';
import { toRobot } from '@/lib/queries';
import { manufacturerJsonLd } from '@/lib/jsonld';
import RobotCard from '@/components/ui/RobotCard';
import Badge from '@/components/ui/Badge';

// Manufacturer verification status (placeholder — eventually from DB)
const verificationStatus: Record<string, { level: 'partner' | 'reseller' | 'verified' | 'listed'; note?: string }> = {
  'unitree-robotics': { level: 'verified', note: 'Direct manufacturer relationship' },
  'sanctuary-ai': { level: 'partner', note: 'Official Canadian partner' },
  'softbank-robotics': { level: 'reseller', note: 'Authorized reseller in Canada' },
  'boston-dynamics': { level: 'verified', note: 'Verified manufacturer listing' },
  'engineered-arts': { level: 'verified', note: 'Verified manufacturer listing' },
  '1x-technologies': { level: 'verified', note: 'Direct manufacturer relationship' },
};

const verificationBadges: Record<string, { label: string; icon: string; variant: 'success' | 'info' | 'default' }> = {
  partner: { label: '🤝 Official Partner', icon: '🤝', variant: 'success' },
  reseller: { label: '✅ Authorized Reseller', icon: '✅', variant: 'info' },
  verified: { label: '☑️ Verified Listing', icon: '☑️', variant: 'info' },
  listed: { label: 'Listed', icon: '📋', variant: 'default' },
};

export async function generateStaticParams() {
  const slugs = await getAllManufacturerSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await getManufacturerBySlug(slug);
  if (!m) return { title: 'Manufacturer Not Found' };

  const description = `${m.name} — ${m.country}. Founded ${m.founded}. ${m.description.slice(0, 130)}`;

  return {
    title: `${m.name} — Humanoid Robots`,
    description,
    openGraph: {
      title: `${m.name} — Humanoid Robots | RoboNorth`,
      description,
      url: `https://robonorth.ca/manufacturers/${m.id}`,
      images: [{ url: m.imageUrl || '/og-default.png', width: 1200, height: 630, alt: m.name }],
    },
    alternates: {
      canonical: `https://robonorth.ca/manufacturers/${m.id}`,
    },
  };
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

  const jsonLd = manufacturerJsonLd(manufacturer);
  const verification = verificationStatus[slug] || { level: 'listed' as const };
  const badge = verificationBadges[verification.level];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/manufacturers" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Brands</Link>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">{manufacturer.name}</span>
      </nav>

      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{manufacturer.name}</h1>
          <Badge text={badge.label} variant={badge.variant} />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{manufacturer.country}</span>
          <span>·</span>
          <span>Founded {manufacturer.founded}</span>
          <span>·</span>
          <a href={manufacturer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            Website ↗
          </a>
        </div>
        {verification.note && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {verification.note}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">{manufacturer.description}</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Robots by {manufacturer.name} ({theirRobots.length})
        </h2>
        {theirRobots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {theirRobots.map(r => <RobotCard key={r.id} robot={r} />)}
          </div>
        ) : (
          <p className="text-gray-400 dark:text-gray-500 text-sm">No robots listed yet.</p>
        )}
      </section>
    </div>
  );
}
