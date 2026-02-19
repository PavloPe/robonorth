import type { Metadata } from 'next';
import { manufacturers } from '@/data/manufacturers';
import ManufacturerCard from '@/components/ui/ManufacturerCard';

export const metadata: Metadata = {
  title: 'Robot Manufacturers',
  description: 'Explore all humanoid robot manufacturers. From Tesla and Boston Dynamics to Unitree and Sanctuary AI — learn about the companies building the future.',
};

export default function ManufacturersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Robot Manufacturers</h1>
        <p className="text-gray-400 text-lg">
          The world&apos;s leading companies building humanoid robots — from Silicon Valley startups to Chinese giants.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {manufacturers.map(m => (
          <ManufacturerCard key={m.id} manufacturer={m} />
        ))}
      </div>
    </div>
  );
}
