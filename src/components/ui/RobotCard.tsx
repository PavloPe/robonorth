import Link from 'next/link';
import type { Robot } from '@/types';

const availabilityConfig: Record<string, { label: string; variant: string }> = {
  shipping: { label: 'Shipping Now', variant: 'bg-green-500/20 text-green-400 border-green-500/30' },
  preorder: { label: 'Pre-Order', variant: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  pilot: { label: 'Pilot Program', variant: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  announced: { label: 'Announced', variant: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  prototype: { label: 'Prototype', variant: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

export default function RobotCard({ robot }: { robot: Robot }) {
  const badge = availabilityConfig[robot.availability] ?? availabilityConfig.announced;

  return (
    <Link
      href={`/robots/${robot.id}`}
      className="group block bg-gray-900 rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/5"
    >
      <div className="aspect-[4/3] bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
          🤖
        </div>
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${badge.variant}`}>
            {badge.label}
          </span>
        </div>
        {robot.canadaAvailable && (
          <div className="absolute top-3 left-3 text-sm" title="Available in Canada">
            🇨🇦
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {robot.manufacturer}
        </p>
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
          {robot.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {robot.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-cyan-400">
            {robot.price}
          </span>
          <span className="text-xs text-gray-500 capitalize">{robot.category}</span>
        </div>
      </div>
    </Link>
  );
}
