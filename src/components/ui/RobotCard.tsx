'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Robot } from '@/types';
import Badge from './Badge';
import QuickViewModal from './QuickViewModal';
import { useCompare } from './CompareBar';
import { useInquiryBasket } from './InquiryBasketProvider';

const availabilityConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' }> = {
  shipping: { label: 'In Stock', variant: 'success' },
  preorder: { label: 'Pre-Order', variant: 'info' },
  pilot: { label: 'Pilot Program', variant: 'warning' },
  announced: { label: 'Coming Soon', variant: 'default' },
  prototype: { label: 'Prototype', variant: 'default' },
};

const categoryGradients: Record<string, string> = {
  consumer: 'from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30',
  enterprise: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  research: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30',
  announced: 'from-slate-50 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30',
};

const categoryIcons: Record<string, string> = {
  consumer: '🏠',
  enterprise: '🏭',
  research: '🔬',
  announced: '📢',
};

// Robots added "recently" (placeholder — in production, check date field)
const newArrivals = new Set([
  '1x-neo-beta', 'apptronik-apollo-2', 'figure-04', 'unitree-h1-2',
  'sanctuary-ai-phoenix-gen2', 'kepler-forerunner-k2', 'agility-digit-v2',
  'nvidia-gr00t', 'galbot-g1', 'menteebot',
]);

export default function RobotCard({ robot }: { robot: Robot }) {
  const [quickView, setQuickView] = useState(false);
  const { addItem: addCompare, removeItem: removeCompare, isInCompare } = useCompare();
  const { addItem: addToCart, hasItem: inCart, removeItem: removeFromCart } = useInquiryBasket();
  const badge = availabilityConfig[robot.availability] ?? availabilityConfig.announced;
  const gradient = categoryGradients[robot.category] || 'from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-900/30';
  const isNew = newArrivals.has(robot.id);
  const inCompare = isInCompare(robot.id);
  const isInCart = inCart(robot.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeCompare(robot.id);
    } else {
      addCompare({ id: robot.id, name: robot.name, manufacturer: robot.manufacturer });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(robot.id);
    } else {
      addToCart({ itemType: 'robot', itemId: robot.id, itemName: robot.name, price: robot.price });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(true);
  };

  return (
    <>
      <Link
        href={`/robots/${robot.id}`}
        className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-200 dark:hover:border-blue-800 card-hover card-3d overflow-hidden relative"
      >
        {/* Improvement #9: Featured ribbon badge for premium robots */}
        {robot.featured && (
          <div className="featured-ribbon">⭐ Featured</div>
        )}
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
            {isNew && (
              <span className="badge-new bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                ✨ New
              </span>
            )}
            {robot.categoryWinners && robot.categoryWinners.length > 0 && robot.categoryWinners.map(badge => (
              <span key={badge} className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md shadow-sm">
                🏆 {badge}
              </span>
            ))}
          </div>
          {robot.canadaAvailable && (
            <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/50 shadow-sm">
              🇨🇦 Ships to CA
            </div>
          )}

          {/* Quick View button */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-center text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:shadow-md"
            title="Quick View"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

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
            <p className="text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider">
              {robot.manufacturer}
            </p>
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
            {robot.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2.5rem] leading-relaxed">
            {robot.description}
          </p>
          {/* Score bar (if scores available) */}
          {robot.scores && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  style={{ width: `${(robot.scores.deployment * 0.20 + robot.scores.capability * 0.25 + robot.scores.availability * 0.20 + robot.scores.value * 0.20 + robot.scores.impact * 0.15) * 10}%` }}
                />
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">
                {(robot.scores.deployment * 0.20 + robot.scores.capability * 0.25 + robot.scores.availability * 0.20 + robot.scores.value * 0.20 + robot.scores.impact * 0.15).toFixed(1)}
              </span>
            </div>
          )}
          {/* Price & stock */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {robot.price}
            </span>
            {robot.availability === 'shipping' && (
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">● In Stock</span>
            )}
            {robot.availability === 'preorder' && (
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">Pre-Order</span>
            )}
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                isInCart
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInCart ? (
                <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> In Cart</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.872l1.946-8.522A1.125 1.125 0 0018.16 2.25H6.228" /></svg> Add to Cart</>
              )}
            </button>
            <button
              onClick={handleCompare}
              className={`p-2 rounded-lg transition-colors ${
                inCompare
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              ⚖️
            </button>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {quickView && <QuickViewModal robot={robot} onClose={() => setQuickView(false)} />}
    </>
  );
}
