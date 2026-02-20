"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Robot } from '@/types';
import CompareTable from '@/components/ui/CompareTable';
import RadarChart from '@/components/ui/RadarChart';

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot',
  announced: 'Coming Soon', prototype: 'Prototype',
};

export default function ComparePage() {
  const [allRobots, setAllRobots] = useState<Robot[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/robots')
      .then(r => r.json())
      .then((data: Robot[]) => {
        setAllRobots(data);
        setLoading(false);

        // Read initial robots from URL params
        const params = new URLSearchParams(window.location.search);
        const robotsParam = params.get('robots');
        if (robotsParam) {
          const ids = robotsParam.split(',').filter(id => data.some((r: Robot) => r.id === id));
          setSelectedIds(ids.slice(0, 4));
        }
      });
  }, []);

  const addRobot = (id: string) => {
    if (id && !selectedIds.includes(id) && selectedIds.length < 4) {
      const newIds = [...selectedIds, id];
      setSelectedIds(newIds);
      updateUrl(newIds);
    }
  };

  const removeRobot = (id: string) => {
    const newIds = selectedIds.filter(x => x !== id);
    setSelectedIds(newIds);
    updateUrl(newIds);
  };

  const clearAll = () => {
    setSelectedIds([]);
    updateUrl([]);
  };

  const updateUrl = (ids: string[]) => {
    const url = ids.length > 0
      ? `/compare?robots=${ids.join(',')}`
      : '/compare';
    window.history.replaceState({}, '', url);
  };

  const selectedRobots = allRobots.filter(r => selectedIds.includes(r.id));
  const availableRobots = allRobots.filter(r => !selectedIds.includes(r.id));
  const filteredRobots = searchTerm
    ? availableRobots.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableRobots;

  // Quick compare presets
  const presets = [
    { label: 'Budget Picks', ids: ['unitree-g1', 'unitree-h1', '1x-neo'] },
    { label: 'Enterprise', ids: ['figure-02', 'boston-dynamics-atlas', 'sanctuary-phoenix'] },
    { label: 'Most Popular', ids: ['tesla-optimus-gen-2', 'unitree-g1', '1x-neo', 'figure-02'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-gray-700 font-medium">Compare</span>
        </nav>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Compare</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Compare Robots Side by Side</h1>
        <p className="text-gray-500 text-sm mt-2 max-w-xl">
          Select 2–4 humanoid robots to compare specs, pricing, and availability. Best values are highlighted automatically.
        </p>
      </div>

      {/* Quick presets */}
      {selectedIds.length === 0 && !loading && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400 font-medium self-center mr-1">Quick compare:</span>
          {presets.map(preset => {
            const validIds = preset.ids.filter(id => allRobots.some(r => r.id === id));
            if (validIds.length < 2) return null;
            return (
              <button
                key={preset.label}
                onClick={() => { setSelectedIds(validIds); updateUrl(validIds); }}
                className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Robot selector */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search + dropdown combo */}
          <div className="relative">
            <input
              type="text"
              placeholder={loading ? 'Loading...' : `Search robots... (${availableRobots.length} available)`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              disabled={loading || selectedIds.length >= 4}
              className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 disabled:opacity-50"
            />
            {searchTerm && filteredRobots.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                {filteredRobots.slice(0, 8).map(r => (
                  <button
                    key={r.id}
                    onClick={() => { addRobot(r.id); setSearchTerm(''); }}
                    className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900">{r.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{r.manufacturer}</span>
                    </div>
                    <span className="text-xs text-gray-400">{r.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Or use dropdown */}
          <select
            onChange={e => { addRobot(e.target.value); e.target.value = ''; }}
            className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value=""
            disabled={loading || selectedIds.length >= 4}
          >
            <option value="">{loading ? 'Loading...' : '+ Add robot'}</option>
            {availableRobots.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.manufacturer} — {r.price}
              </option>
            ))}
          </select>

          {/* Capacity indicator */}
          <div className="flex items-center gap-1.5 ml-2">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i < selectedIds.length ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">{selectedIds.length}/4</span>
          </div>
        </div>

        {/* Selected robots pills */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            {selectedIds.map(id => {
              const r = allRobots.find(x => x.id === id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium"
                >
                  <span className="text-xs opacity-60">🤖</span>
                  {r?.name}
                  <span className="text-xs text-blue-400 font-normal">{r?.price}</span>
                  <button
                    onClick={() => removeRobot(id)}
                    className="hover:text-blue-900 text-blue-400 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              );
            })}

            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-600 self-center ml-1 px-2 py-1 rounded hover:bg-gray-50 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Radar Chart */}
      {selectedRobots.length >= 2 && (
        <div className="mb-6">
          <RadarChart robots={selectedRobots} />
        </div>
      )}

      {/* Compare table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        <CompareTable robots={selectedRobots} />
      </div>

      {/* Tip */}
      {selectedIds.length > 0 && selectedIds.length < 4 && (
        <p className="text-center text-xs text-gray-400 mt-4">
          💡 Tip: Add more robots to see how they stack up. You can compare up to 4 models.
        </p>
      )}

      {/* CTA for empty state */}
      {selectedIds.length === 0 && !loading && (
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-3">Not sure where to start?</p>
          <Link
            href="/robots"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Robots
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      )}
    </div>
  );
}
