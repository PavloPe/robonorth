import Link from 'next/link';
import type { Robot } from '@/types';
import Badge from './Badge';

const availabilityConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' }> = {
  shipping: { label: 'In Stock', variant: 'success' },
  preorder: { label: 'Pre-Order', variant: 'info' },
  pilot: { label: 'Pilot Program', variant: 'warning' },
  announced: { label: 'Coming Soon', variant: 'default' },
  prototype: { label: 'Prototype', variant: 'default' },
};

export default function RobotCard({ robot }: { robot: Robot }) {
  const badge = availabilityConfig[robot.availability] ?? availabilityConfig.announced;

  return (
    <Link
      href={`/robots/${robot.id}`}
      className="group block bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-300">🤖</div>
        </div>
        <div className="absolute top-3 right-3">
          <Badge text={badge.label} variant={badge.variant} />
        </div>
        {robot.canadaAvailable && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 border border-gray-200">
            🇨🇦 Ships to CA
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {robot.manufacturer}
        </p>
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {robot.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 min-h-[2.5rem]">
          {robot.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-900">
            {robot.price}
          </span>
          <span className="text-xs text-blue-600 font-medium group-hover:underline">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
