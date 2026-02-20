'use client';

import Link from 'next/link';
import type { Part } from '@/types';
import Badge from './Badge';
import { partCategoryLabels, partCategoryIcons } from '@/data/parts-catalog';

function formatPrice(cad: number): string {
  if (cad === 0) return 'Free';
  return `$${cad.toLocaleString('en-CA')} CAD`;
}

export default function PartCard({ part }: { part: Part }) {
  const categoryIcon = partCategoryIcons[part.category] || '🔧';

  return (
    <Link
      href={`/parts/${part.id}`}
      className="group block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300 overflow-hidden"
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
            {categoryIcon}
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {part.inStock ? (
            <Badge text="In Stock" variant="success" />
          ) : (
            <Badge text={part.leadTimeDays ? `${part.leadTimeDays}d lead` : 'Out of Stock'} variant="warning" />
          )}
          {part.featured && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[10px] font-semibold text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
          {partCategoryLabels[part.category] || part.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wider mb-1">
          {part.manufacturer}
        </p>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 line-clamp-2 min-h-[2.5rem]">
          {part.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 min-h-[2rem]">
          {part.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {formatPrice(part.priceCAD)}
            </span>
            {part.priceUSD > 0 && (
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block">
                ~${part.priceUSD.toLocaleString('en-US')} USD
              </span>
            )}
          </div>
          <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            View
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
