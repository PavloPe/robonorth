"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface SidebarFiltersProps {
  categories: FilterOption[];
  availabilities: FilterOption[];
  manufacturers: FilterOption[];
  countries: FilterOption[];
  priceRanges: FilterOption[];
  totalCount: number;
  filteredCount: number;
}

export default function SidebarFilters({
  categories, availabilities, manufacturers, countries, priceRanges,
  totalCount, filteredCount,
}: SidebarFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || '';
  const currentAvailability = searchParams.get('availability') || '';
  const currentManufacturer = searchParams.get('manufacturer') || '';
  const currentCountry = searchParams.get('country') || '';
  const currentPrice = searchParams.get('price') || '';
  const currentSearch = searchParams.get('q') || '';
  const currentCanadaOnly = searchParams.get('canada') === '1';

  const updateFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`/robots?${params.toString()}`);
  }, [router, searchParams]);

  const clearAll = () => {
    router.push('/robots');
  };

  const hasFilters = currentCategory || currentAvailability || currentManufacturer || currentCountry || currentPrice || currentSearch || currentCanadaOnly;
  const activeCount = [currentCategory, currentAvailability, currentManufacturer, currentCountry, currentPrice, currentSearch, currentCanadaOnly ? '1' : ''].filter(Boolean).length;

  return (
    <aside className="w-full">
      {/* Results header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-gray-900">{filteredCount} robots</p>
          {filteredCount !== totalCount && (
            <p className="text-xs text-gray-400">of {totalCount} total</p>
          )}
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search robots..."
            value={currentSearch}
            onChange={e => updateFilter('q', e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {currentSearch && (
            <button 
              onClick={() => updateFilter('q', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Canada Only Toggle */}
      <div className="mb-5 pb-5 border-b border-gray-200/80">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`relative w-10 h-5 rounded-full transition-colors ${currentCanadaOnly ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${currentCanadaOnly ? 'left-5' : 'left-0.5'}`} />
            <input
              type="checkbox"
              checked={currentCanadaOnly}
              onChange={e => updateFilter('canada', e.target.checked ? '1' : '')}
              className="sr-only"
            />
          </div>
          <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">🇨🇦 Ships to Canada</span>
        </label>
      </div>

      {/* Filter sections */}
      <CollapsibleFilterSection
        title="Category"
        options={categories}
        current={currentCategory}
        onChange={v => updateFilter('category', v)}
        defaultOpen
      />

      <CollapsibleFilterSection
        title="Price Range"
        options={priceRanges}
        current={currentPrice}
        onChange={v => updateFilter('price', v)}
        defaultOpen
      />

      <CollapsibleFilterSection
        title="Availability"
        options={availabilities}
        current={currentAvailability}
        onChange={v => updateFilter('availability', v)}
        defaultOpen
      />

      <CollapsibleFilterSection
        title="Brand"
        options={manufacturers}
        current={currentManufacturer}
        onChange={v => updateFilter('manufacturer', v)}
        defaultOpen={false}
      />

      <CollapsibleFilterSection
        title="Country"
        options={countries}
        current={currentCountry}
        onChange={v => updateFilter('country', v)}
        defaultOpen={false}
      />
    </aside>
  );
}

function CollapsibleFilterSection({ title, options, current, onChange, defaultOpen = true }: {
  title: string;
  options: FilterOption[];
  current: string;
  onChange: (v: string) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasActive = !!current;

  return (
    <div className="mb-1 pb-1 border-b border-gray-200/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition-colors flex items-center gap-2">
          {title}
          {hasActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
        </span>
        <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="pb-3 space-y-0.5 animate-fade-in-up" style={{ animationDuration: '200ms' }}>
          <button
            onClick={() => onChange('')}
            className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition-all ${
              !current
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            All
          </button>
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange(current === opt.value ? '' : opt.value)}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                current === opt.value
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {opt.count !== undefined && (
                <span className={`text-xs tabular-nums shrink-0 ml-2 ${current === opt.value ? 'text-blue-500' : 'text-gray-400'}`}>
                  {opt.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
