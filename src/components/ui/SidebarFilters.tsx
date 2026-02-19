"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

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
    params.delete('page'); // reset pagination
    router.push(`/robots?${params.toString()}`);
  }, [router, searchParams]);

  const clearAll = () => {
    router.push('/robots');
  };

  const hasFilters = currentCategory || currentAvailability || currentManufacturer || currentCountry || currentPrice || currentSearch || currentCanadaOnly;

  return (
    <aside className="w-full">
      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{filteredCount}</span> of {totalCount} robots
        </p>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search</label>
        <input
          type="text"
          placeholder="Search robots..."
          value={currentSearch}
          onChange={e => updateFilter('q', e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Canada Only Toggle */}
      <div className="mb-5 pb-5 border-b border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={currentCanadaOnly}
            onChange={e => updateFilter('canada', e.target.checked ? '1' : '')}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">🇨🇦 Ships to Canada only</span>
        </label>
      </div>

      {/* Category */}
      <FilterSection
        title="Category"
        options={categories}
        current={currentCategory}
        onChange={v => updateFilter('category', v)}
      />

      {/* Price Range */}
      <FilterSection
        title="Price Range"
        options={priceRanges}
        current={currentPrice}
        onChange={v => updateFilter('price', v)}
      />

      {/* Availability */}
      <FilterSection
        title="Availability"
        options={availabilities}
        current={currentAvailability}
        onChange={v => updateFilter('availability', v)}
      />

      {/* Manufacturer */}
      <FilterSection
        title="Brand"
        options={manufacturers}
        current={currentManufacturer}
        onChange={v => updateFilter('manufacturer', v)}
      />

      {/* Country */}
      <FilterSection
        title="Country of Origin"
        options={countries}
        current={currentCountry}
        onChange={v => updateFilter('country', v)}
      />
    </aside>
  );
}

function FilterSection({ title, options, current, onChange }: {
  title: string;
  options: FilterOption[];
  current: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5 pb-5 border-b border-gray-200">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">{title}</h3>
      <div className="space-y-1">
        <button
          onClick={() => onChange('')}
          className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
            !current ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(current === opt.value ? '' : opt.value)}
            className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center justify-between ${
              current === opt.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span className="text-xs text-gray-400">{opt.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
