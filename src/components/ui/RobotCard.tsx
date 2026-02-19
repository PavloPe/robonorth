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

const categoryGradients: Record<string, string> = {
  consumer: 'from-emerald-50 to-cyan-50',
  enterprise: 'from-blue-50 to-indigo-50',
  research: 'from-purple-50 to-pink-50',
  announced: 'from-slate-50 to-gray-100',
};

const categoryIcons: Record<string, string> = {
  consumer: '🏠',
  enterprise: '🏭',
  research: '🔬',
  announced: '📢',
};

export default function RobotCard({ robot }: { robot: Robot }) {
  const badge = availabilityConfig[robot.availability] ?? availabilityConfig.announced;
  const gradient = categoryGradients[robot.category] || 'from-gray-50 to-gray-100';

  return (
    <Link
      href={`/robots/${robot.id}`}
      className="group block bg-white rounded-2xl border border-gray-200/80 hover:border-blue-200 card-hover overflow-hidden"
    >
      {/* Image area */}
      <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="text-7xl opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">🤖</div>
            <div className="absolute -bottom-1 -right-1 text-lg">
              {categoryIcons[robot.category] || '🤖'}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <Badge text={badge.label} variant={badge.variant} />
        </div>
        {robot.canadaAvailable && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/50 shadow-sm">
            🇨🇦 Ships to CA
          </div>
        )}

        {/* Quick specs strip */}
        {(robot.specs.height || robot.specs.dof || robot.specs.speed) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent px-3 pb-2.5 pt-6">
            <div className="flex items-center gap-3 text-[11px] text-white/90 font-medium">
              {robot.specs.height && <span>{robot.specs.height}cm</span>}
              {robot.specs.dof && <span>{robot.specs.dof} DOF</span>}
              {robot.specs.speed && <span>{robot.specs.speed} km/h</span>}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-xs font-semibold text-blue-600/80 uppercase tracking-wider">
            {robot.manufacturer}
          </p>
        </div>
        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
          {robot.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 min-h-[2.5rem] leading-relaxed">
          {robot.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-900">
            {robot.price}
          </span>
          <span className="text-xs text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            Details
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
