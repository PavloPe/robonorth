'use client';

import { useState } from 'react';
import type { Availability } from '@/types';

const provinces: Record<string, { name: string; extraDays: number }> = {
  BC: { name: 'British Columbia', extraDays: 0 },
  AB: { name: 'Alberta', extraDays: 1 },
  SK: { name: 'Saskatchewan', extraDays: 2 },
  MB: { name: 'Manitoba', extraDays: 2 },
  ON: { name: 'Ontario', extraDays: 1 },
  QC: { name: 'Quebec', extraDays: 1 },
  NB: { name: 'New Brunswick', extraDays: 3 },
  NS: { name: 'Nova Scotia', extraDays: 3 },
  PE: { name: 'Prince Edward Island', extraDays: 4 },
  NL: { name: 'Newfoundland & Labrador', extraDays: 4 },
  NT: { name: 'Northwest Territories', extraDays: 7 },
  YT: { name: 'Yukon', extraDays: 7 },
  NU: { name: 'Nunavut', extraDays: 10 },
};

// Base shipping times by origin
const shippingBase: Record<string, number> = {
  China: 21,     // 3 weeks
  USA: 7,        // 1 week
  Norway: 28,    // 4 weeks
  Japan: 21,     // 3 weeks
  UK: 28,        // 4 weeks
  Canada: 5,     // domestic
  Germany: 28,
  Israel: 28,
  Poland: 28,
};

// Availability delays
const availabilityDelay: Record<string, { label: string; minDays: number; maxDays: number }> = {
  shipping: { label: 'In stock — ships promptly', minDays: 0, maxDays: 5 },
  preorder: { label: 'Pre-order — production queue', minDays: 60, maxDays: 180 },
  pilot: { label: 'Pilot program — application required', minDays: 30, maxDays: 120 },
  announced: { label: 'Not yet available — estimated months away', minDays: 180, maxDays: 365 },
  prototype: { label: 'Prototype only — not available for purchase', minDays: 365, maxDays: 730 },
};

interface Props {
  availability: Availability;
  country: string;
  canadaAvailable: boolean;
}

export default function DeliveryEstimator({ availability, country, canadaAvailable }: Props) {
  const [province, setProvince] = useState('');

  const avail = availabilityDelay[availability] || availabilityDelay.announced;
  const baseShipping = shippingBase[country] || 21;

  const getEstimate = () => {
    if (!province) return null;
    const prov = provinces[province];
    if (!prov) return null;

    if (availability === 'announced' || availability === 'prototype') {
      return { min: avail.minDays, max: avail.maxDays, note: avail.label };
    }

    const customsDays = country === 'Canada' ? 0 : 5;
    const min = avail.minDays + baseShipping + customsDays + prov.extraDays;
    const max = avail.maxDays + baseShipping + customsDays + prov.extraDays + 7;

    return { min, max, note: avail.label };
  };

  const estimate = province ? getEstimate() : null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Delivery Estimate</h3>

      <div className="mb-4">
        <label htmlFor="delivery-province" className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
          Your province
        </label>
        <select
          id="delivery-province"
          value={province}
          onChange={e => setProvince(e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select province...</option>
          {Object.entries(provinces).map(([code, p]) => (
            <option key={code} value={code}>{p.name}</option>
          ))}
        </select>
      </div>

      {estimate && (
        <div className="space-y-2">
          {!canadaAvailable && (
            <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
              ⚠️ This robot does not currently ship to Canada. Estimate is for informational purposes.
            </p>
          )}
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">
                {estimate.min < 60
                  ? `${estimate.min}–${estimate.max} days`
                  : `${Math.round(estimate.min / 30)}–${Math.round(estimate.max / 30)} months`}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{estimate.note}</div>
            </div>
          </div>
          {country !== 'Canada' && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Includes estimated shipping from {country} + customs clearance (5–7 business days).
            </p>
          )}
        </div>
      )}

      {!province && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Select your province to see an estimated delivery timeline.
        </p>
      )}
    </div>
  );
}
