"use client";

import type { Robot } from '@/types';
import Link from 'next/link';

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot',
  announced: 'Coming Soon', prototype: 'Prototype',
};

const availabilityColors: Record<string, string> = {
  shipping: 'text-emerald-700 bg-emerald-50',
  preorder: 'text-blue-700 bg-blue-50',
  pilot: 'text-amber-700 bg-amber-50',
  announced: 'text-gray-700 bg-gray-100',
  prototype: 'text-gray-500 bg-gray-50',
};

type SpecRow = {
  label: string;
  icon: string;
  getValue: (r: Robot) => string | number | null;
  getNumeric?: (r: Robot) => number | null;
  unit?: string;
  higherIsBetter?: boolean;
  format?: 'number' | 'text';
};

const specRows: SpecRow[] = [
  {
    label: 'Price',
    icon: '💰',
    getValue: r => r.price,
    getNumeric: r => r.priceMin,
    higherIsBetter: false,
    format: 'text',
  },
  {
    label: 'Availability',
    icon: '📦',
    getValue: r => availabilityLabels[r.availability] || r.availability,
    format: 'text',
  },
  {
    label: 'Height',
    icon: '📏',
    getValue: r => r.specs.height,
    getNumeric: r => r.specs.height,
    unit: 'cm',
    format: 'number',
  },
  {
    label: 'Weight',
    icon: '⚖️',
    getValue: r => r.specs.weight,
    getNumeric: r => r.specs.weight,
    unit: 'kg',
    higherIsBetter: false,
    format: 'number',
  },
  {
    label: 'Degrees of Freedom',
    icon: '🦾',
    getValue: r => r.specs.dof,
    getNumeric: r => r.specs.dof,
    higherIsBetter: true,
    format: 'number',
  },
  {
    label: 'Battery',
    icon: '🔋',
    getValue: r => r.specs.battery,
    format: 'text',
  },
  {
    label: 'Payload',
    icon: '📦',
    getValue: r => r.specs.payload,
    getNumeric: r => r.specs.payload,
    unit: 'kg',
    higherIsBetter: true,
    format: 'number',
  },
  {
    label: 'Max Speed',
    icon: '⚡',
    getValue: r => r.specs.speed,
    getNumeric: r => r.specs.speed,
    unit: 'km/h',
    higherIsBetter: true,
    format: 'number',
  },
  {
    label: 'Manufacturer',
    icon: '🏭',
    getValue: r => r.manufacturer,
    format: 'text',
  },
  {
    label: 'Country',
    icon: '🌍',
    getValue: r => r.country,
    format: 'text',
  },
  {
    label: 'Category',
    icon: '📂',
    getValue: r => r.category.charAt(0).toUpperCase() + r.category.slice(1),
    format: 'text',
  },
  {
    label: 'Use Cases',
    icon: '🎯',
    getValue: r => r.useCase.join(', '),
    format: 'text',
  },
  {
    label: 'Ships to Canada',
    icon: '🇨🇦',
    getValue: r => r.canadaAvailable ? 'Yes' : 'No',
    format: 'text',
  },
];

function getBestIndex(robots: Robot[], row: SpecRow): number | null {
  if (!row.getNumeric || row.higherIsBetter === undefined) return null;
  const values = robots.map(r => row.getNumeric!(r));
  const validValues = values.filter((v): v is number => v !== null && v > 0);
  if (validValues.length < 2) return null;

  const best = row.higherIsBetter
    ? Math.max(...validValues)
    : Math.min(...validValues);
  return values.indexOf(best);
}

function getBarWidth(value: number | null, robots: Robot[], getNumeric: (r: Robot) => number | null): number {
  if (value === null || value <= 0) return 0;
  const allValues = robots.map(r => getNumeric(r)).filter((v): v is number => v !== null && v > 0);
  if (allValues.length === 0) return 0;
  const max = Math.max(...allValues);
  return max > 0 ? (value / max) * 100 : 0;
}

function formatValue(value: string | number | null, unit?: string): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'number') {
    return unit ? `${value} ${unit}` : `${value}`;
  }
  return value || '—';
}

export default function CompareTable({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⚖️</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Select robots to compare</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Choose 2–4 robots from the dropdown above to see a detailed side-by-side comparison.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {/* Robot header cards */}
      <div className="grid divide-x divide-gray-100" style={{ gridTemplateColumns: `200px repeat(${robots.length}, 1fr)` }}>
        <div className="p-4 bg-gray-50/50" />
        {robots.map(r => (
          <div key={r.id} className="p-5 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 border border-gray-200/80 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl opacity-40">🤖</span>
            </div>
            <Link href={`/robots/${r.id}`} className="text-sm font-bold text-gray-900 hover:text-blue-700 transition-colors">
              {r.name}
            </Link>
            <p className="text-xs text-gray-400 mt-0.5">{r.manufacturer}</p>
            <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${availabilityColors[r.availability] || 'text-gray-500 bg-gray-50'}`}>
              {availabilityLabels[r.availability] || r.availability}
            </span>
          </div>
        ))}
      </div>

      {/* Spec rows */}
      {specRows.map((row, i) => {
        const bestIdx = getBestIndex(robots, row);
        const allSame = robots.length > 1 && new Set(robots.map(r => {
          const v = row.getValue(r);
          return v === null ? '—' : String(v);
        })).size === 1;

        return (
          <div
            key={row.label}
            className={`grid items-center ${i % 2 === 0 ? 'bg-gray-50/40' : 'bg-white'}`}
            style={{ gridTemplateColumns: `200px repeat(${robots.length}, 1fr)` }}
          >
            {/* Label */}
            <div className="p-4 flex items-center gap-2.5">
              <span className="text-base">{row.icon}</span>
              <span className="text-sm font-medium text-gray-500">{row.label}</span>
            </div>

            {/* Values */}
            {robots.map((r, robotIdx) => {
              const value = row.getValue(r);
              const numericValue = row.getNumeric ? row.getNumeric(r) : null;
              const isBest = bestIdx === robotIdx;
              const displayValue = formatValue(value, row.unit);

              return (
                <div key={r.id} className={`p-4 ${allSame ? '' : ''}`}>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        displayValue === '—'
                          ? 'text-gray-300'
                          : isBest
                            ? 'text-emerald-700 font-bold'
                            : allSame
                              ? 'text-gray-600'
                              : 'text-gray-700'
                      }`}>
                        {displayValue}
                      </span>
                      {isBest && (
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">
                          Best
                        </span>
                      )}
                    </div>

                    {/* Visual bar for numeric specs */}
                    {row.getNumeric && numericValue !== null && numericValue > 0 && (
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isBest
                              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                              : 'bg-gradient-to-r from-blue-300 to-blue-400'
                          }`}
                          style={{ width: `${getBarWidth(numericValue, robots, row.getNumeric)}%` }}
                        />
                      </div>
                    )}

                    {/* Canada badge */}
                    {row.label === 'Ships to Canada' && value === 'Yes' && (
                      <span className="text-xs text-emerald-600">✅</span>
                    )}
                    {row.label === 'Ships to Canada' && value === 'No' && (
                      <span className="text-xs text-red-400">❌</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Action row */}
      <div
        className="grid items-center bg-gray-50/60"
        style={{ gridTemplateColumns: `200px repeat(${robots.length}, 1fr)` }}
      >
        <div className="p-4">
          <span className="text-sm font-medium text-gray-400">Actions</span>
        </div>
        {robots.map(r => (
          <div key={r.id} className="p-4 flex flex-wrap gap-2">
            <Link
              href={`/robots/${r.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/inquiry?robot=${r.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              Inquire
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
