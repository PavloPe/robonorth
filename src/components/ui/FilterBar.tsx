"use client";

import type { RobotCategory, Availability } from '@/types';

interface Filters {
  search: string;
  category: RobotCategory | '';
  availability: Availability | '';
  priceRange: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const activeCount = [filters.category, filters.availability, filters.priceRange, filters.search].filter(Boolean).length;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search robots..."
            value={filters.search}
            onChange={e => update('search', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="consumer">Consumer</option>
          <option value="enterprise">Enterprise</option>
          <option value="research">Research</option>
          <option value="quadruped">Quadruped</option>
          <option value="announced">Announced</option>
        </select>

        <select
          value={filters.availability}
          onChange={e => update('availability', e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Availability</option>
          <option value="shipping">In Stock</option>
          <option value="preorder">Pre-Order</option>
          <option value="pilot">Pilot Program</option>
          <option value="announced">Coming Soon</option>
        </select>

        <select
          value={filters.priceRange}
          onChange={e => update('priceRange', e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Any Price</option>
          <option value="0-10000">Under $10K</option>
          <option value="10000-30000">$10K – $30K</option>
          <option value="30000-100000">$30K – $100K</option>
          <option value="100000-999999">$100K+</option>
        </select>
      </div>

      {activeCount > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">{activeCount} filter{activeCount > 1 ? 's' : ''} active</span>
          <button
            onClick={() => onChange({ search: '', category: '', availability: '', priceRange: '' })}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export type { Filters };
