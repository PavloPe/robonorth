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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search robots..."
            value={filters.search}
            onChange={e => update('search', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm"
          />
        </div>

        <select
          value={filters.category}
          onChange={e => update('category', e.target.value)}
          className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
        >
          <option value="">All Categories</option>
          <option value="consumer">Consumer</option>
          <option value="enterprise">Enterprise</option>
          <option value="research">Research</option>
          <option value="announced">Announced</option>
        </select>

        <select
          value={filters.availability}
          onChange={e => update('availability', e.target.value)}
          className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
        >
          <option value="">All Availability</option>
          <option value="shipping">Shipping Now</option>
          <option value="preorder">Pre-Order</option>
          <option value="pilot">Pilot Program</option>
          <option value="announced">Announced</option>
          <option value="prototype">Prototype</option>
        </select>

        <select
          value={filters.priceRange}
          onChange={e => update('priceRange', e.target.value)}
          className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
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
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export type { Filters };
