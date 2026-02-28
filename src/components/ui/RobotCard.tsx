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

// Distinctive visual per category — monogram + accent color
const categoryStyles: Record<string, { accent: string; bg: string; letter: string; label: string }> = {
  consumer: { accent: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', letter: 'C', label: 'Consumer' },
  enterprise: { accent: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40', letter: 'E', label: 'Enterprise' },
  research: { accent: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40', letter: 'R', label: 'Research' },
  announced: { accent: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900/40', letter: 'A', label: 'Announced' },
  quadruped: { accent: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40', letter: 'Q', label: 'Quadruped' },
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
  const style = categoryStyles[robot.category] || categoryStyles.announced;
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
        className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200/80 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 overflow-hidden relative hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-2xl"
      >
        {/* Featured indicator — subtle top bar instead of ribbon */}
        {robot.featured && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 z-10" />
        )}

        {/* Image area — clean with monogram */}
        <div className={`aspect-[4/3] ${style.bg} relative overflow-hidden`}>
          {/* Large category monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative text-center">
              {/* SVG robot silhouette */}
              <svg className="w-16 h-16 mx-auto opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-500" viewBox="0 0 64 64" fill="currentColor">
                <rect x="20" y="4" width="24" height="18" rx="4" className="text-gray-900 dark:text-white" />
                <circle cx="28" cy="13" r="2" className="text-gray-900 dark:text-white" />
                <circle cx="36" cy="13" r="2" className="text-gray-900 dark:text-white" />
                <rect x="16" y="26" width="32" height="24" rx="3" className="text-gray-900 dark:text-white" />
                <rect x="10" y="28" width="4" height="16" rx="2" className="text-gray-900 dark:text-white" />
                <rect x="50" y="28" width="4" height="16" rx="2" className="text-gray-900 dark:text-white" />
                <rect x="22" y="52" width="6" height="10" rx="2" className="text-gray-900 dark:text-white" />
                <rect x="36" y="52" width="6" height="10" rx="2" className="text-gray-900 dark:text-white" />
              </svg>
              <div className={`text-[10px] font-bold uppercase tracking-[0.15em] mt-2 ${style.accent} opacity-60`}>
                {robot.manufacturer}
              </div>
            </div>
          </div>

          {/* Category tag — top left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={`text-[9px] font-bold uppercase tracking-wider ${style.accent} bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-md`}>
              {style.label}
            </span>
            {robot.featured && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-900/40 backdrop-blur-sm px-2 py-1 rounded-md">
                Featured
              </span>
            )}
          </div>

          {/* Status badges — top right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            <Badge text={badge.label} variant={badge.variant} />
            {isNew && (
              <span className="text-[10px] font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-0.5 rounded-md">
                New
              </span>
            )}
            {robot.categoryWinners && robot.categoryWinners.length > 0 && robot.categoryWinners.map(badge => (
              <span key={badge} className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-md">
                🏆 {badge}
              </span>
            ))}
          </div>

          {robot.canadaAvailable && (
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
              🇨🇦 Ships to Canada
            </div>
          )}

          {/* Quick View button */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-md border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-center text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
            title="Quick View"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Quick specs strip */}
          {(robot.specs.height || robot.specs.dof || robot.specs.speed) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent px-3 pb-2.5 pt-6">
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
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.1em] mb-1">
            {robot.manufacturer}
          </p>
          <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5">
            {robot.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2.5rem] leading-relaxed">
            {robot.description}
          </p>

          {/* Score bar (if scores available) */}
          {robot.scores && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 dark:bg-white rounded-full"
                  style={{ width: `${(robot.scores.deployment * 0.20 + robot.scores.capability * 0.25 + robot.scores.availability * 0.20 + robot.scores.value * 0.20 + robot.scores.impact * 0.15) * 10}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0 tabular-nums">
                {(robot.scores.deployment * 0.20 + robot.scores.capability * 0.25 + robot.scores.availability * 0.20 + robot.scores.value * 0.20 + robot.scores.impact * 0.15).toFixed(1)}
              </span>
            </div>
          )}

          {/* Price & stock */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mb-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white tabular-nums">
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
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  : 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900'
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
              className={`p-2 rounded-lg transition-colors border ${
                inCompare
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </button>
          </div>
        </div>
      </Link>

      {/* Quick View Modal */}
      {quickView && <QuickViewModal robot={robot} onClose={() => setQuickView(false)} />}
    </>
  );
}
