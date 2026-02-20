import type { Metadata } from 'next';
import { getAllManufacturers } from '@/lib/queries';
import ManufacturerCard from '@/components/ui/ManufacturerCard';

export const metadata: Metadata = {
  title: 'Robot Manufacturers — 18+ Leading Brands',
  description: 'Explore all humanoid robot manufacturers. Tesla, Boston Dynamics, Unitree, Figure AI, Sanctuary AI, and more. Company profiles, robot lineups, and Canadian availability.',
  openGraph: {
    title: 'Robot Manufacturers | RoboNorth',
    description: 'Profiles of 18+ humanoid robot manufacturers. See their robots, history, and Canadian availability.',
    url: 'https://robonorth.ca/manufacturers',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'RoboNorth Robot Manufacturers' }],
  },
  alternates: {
    canonical: 'https://robonorth.ca/manufacturers',
  },
};

export const revalidate = 3600; // ISR: rebuild every hour

export default async function ManufacturersPage() {
  const manufacturers = await getAllManufacturers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Robot Manufacturers</h1>
        <p className="text-gray-500 text-sm mt-1">
          The world&apos;s leading companies building humanoid robots
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {manufacturers.map(m => (
          <ManufacturerCard key={m.id} manufacturer={m} />
        ))}
      </div>
    </div>
  );
}
