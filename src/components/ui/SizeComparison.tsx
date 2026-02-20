'use client';

import { useState } from 'react';

// Improvement #11: Robot size comparison tool (visual height comparison against human silhouette)

interface SizeComparisonProps {
  robots: { name: string; height: number | null; weight: number | null }[];
}

const HUMAN_HEIGHT = 175; // average human height in cm
const MAX_DISPLAY = 200;

export default function SizeComparison({ robots }: SizeComparisonProps) {
  const measurable = robots.filter(r => r.height && r.height > 0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (measurable.length === 0) return null;

  const selected = measurable[selectedIdx];
  const humanPct = (HUMAN_HEIGHT / MAX_DISPLAY) * 100;
  const robotPct = ((selected.height ?? 0) / MAX_DISPLAY) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Size Comparison
      </h3>

      {/* Selector */}
      {measurable.length > 1 && (
        <select
          value={selectedIdx}
          onChange={(e) => setSelectedIdx(Number(e.target.value))}
          className="mb-6 w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {measurable.map((r, i) => (
            <option key={i} value={i}>{r.name} ({r.height} cm)</option>
          ))}
        </select>
      )}

      {/* Visual comparison */}
      <div className="flex items-end justify-center gap-12 h-64 relative">
        {/* Grid lines */}
        {[50, 100, 150, 200].map(h => (
          <div
            key={h}
            className="absolute left-0 right-0 border-t border-dashed border-gray-200 dark:border-gray-700"
            style={{ bottom: `${(h / MAX_DISPLAY) * 100}%` }}
          >
            <span className="text-[9px] text-gray-400 absolute -top-3 left-1">{h}cm</span>
          </div>
        ))}

        {/* Human silhouette */}
        <div className="flex flex-col items-center relative z-10">
          <div
            className="w-14 bg-gray-200 dark:bg-gray-700 rounded-t-full relative human-silhouette transition-all"
            style={{ height: `${humanPct}%` }}
          />
          <div className="mt-2 text-center">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">Human</p>
            <p className="text-[10px] text-gray-400">{HUMAN_HEIGHT} cm</p>
          </div>
        </div>

        {/* Robot */}
        <div className="flex flex-col items-center relative z-10">
          <div
            className="w-14 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-2xl relative transition-all duration-500 flex items-center justify-center"
            style={{ height: `${robotPct}%` }}
          >
            <span className="text-white text-lg">🤖</span>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{selected.name}</p>
            <p className="text-[10px] text-gray-400">{selected.height} cm{selected.weight ? ` · ${selected.weight} kg` : ''}</p>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 mt-4 text-center">
        {(selected.height ?? 0) > HUMAN_HEIGHT
          ? `${selected.name} is ${(selected.height ?? 0) - HUMAN_HEIGHT} cm taller than average human`
          : `${selected.name} is ${HUMAN_HEIGHT - (selected.height ?? 0)} cm shorter than average human`
        }
      </p>
    </div>
  );
}
