"use client";

import { useState } from 'react';
import SidebarFilters from './SidebarFilters';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface MobileFiltersProps {
  categories: FilterOption[];
  availabilities: FilterOption[];
  manufacturers: FilterOption[];
  countries: FilterOption[];
  priceRanges: FilterOption[];
  totalCount: number;
  filteredCount: number;
}

export default function MobileFilters(props: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button - only visible on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {props.filteredCount !== props.totalCount && (
          <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {props.totalCount - props.filteredCount > 0 ? '!' : ''}
          </span>
        )}
      </button>

      {/* Backdrop + slide-in panel */}
      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="text-base font-bold text-gray-900">Filters</h2>
              <button 
                onClick={() => setOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <SidebarFilters {...props} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
