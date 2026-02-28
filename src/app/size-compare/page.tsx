'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Robot } from '@/types';

const HUMAN_HEIGHT = 178; // 5'10" in cm

export default function SizeComparePage() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/robots')
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load robots (${r.status})`);
        return r.json();
      })
      .then((data: Robot[]) => {
        setRobots(data.filter(r => r.specs.height && r.specs.height > 0));
        setLoading(false);
        // Default selection
        const params = new URLSearchParams(window.location.search);
        const ids = params.get('robots')?.split(',') || ['unitree-g1', 'unitree-h1', 'boston-dynamics-atlas'];
        setSelected(ids.filter(id => data.some(r => r.id === id)));
      })
      .catch((err: Error) => {
        console.error('[RoboNorth] Failed to fetch robots:', err);
        setError('Could not load robots. Please refresh the page.');
        setLoading(false);
      });
  }, []);

  const selectedRobots = selected.map(id => robots.find(r => r.id === id)).filter(Boolean) as Robot[];
  const maxHeight = Math.max(HUMAN_HEIGHT, ...selectedRobots.map(r => r.specs.height || 0));
  const scale = 300 / maxHeight;

  const toggleRobot = (id: string) => {
    setSelected(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev;
      const url = new URL(window.location.href);
      url.searchParams.set('robots', next.join(','));
      window.history.replaceState(null, '', url.toString());
      return next;
    });
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-400">Loading robots...</div>;

  if (error) return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 inline-flex items-center gap-2">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
        {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300 font-medium">Size Comparison</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Visual Robot Size Comparison</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Select up to 4 robots to compare their heights next to a human figure (5&apos;10&quot; / 178 cm)</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selector */}
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Select Robots ({selected.length}/4)</h2>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-2">
            {robots.map(r => (
              <button
                key={r.id}
                onClick={() => toggleRobot(r.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selected.includes(r.id)
                    ? 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-700'
                }`}
              >
                <span className="font-medium">{r.name}</span>
                <span className="text-xs text-gray-400 ml-2">{r.specs.height} cm</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visual comparison */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <div className="flex items-end justify-center gap-8 min-h-[360px]">
              {/* Human figure */}
              <div className="flex flex-col items-center">
                <div
                  className="bg-gray-200 dark:bg-gray-700 rounded-t-full relative"
                  style={{ width: 40, height: HUMAN_HEIGHT * scale }}
                >
                  {/* Head */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  {/* Arms */}
                  <div className="absolute top-8 -left-3 w-1.5 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  <div className="absolute top-8 -right-3 w-1.5 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-2">Human</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">178 cm / 5&apos;10&quot;</p>
              </div>

              {/* Robot silhouettes */}
              {selectedRobots.map(robot => {
                const h = (robot.specs.height || 100) * scale;
                const colours = ['bg-blue-400 dark:bg-blue-600', 'bg-emerald-400 dark:bg-emerald-600', 'bg-purple-400 dark:bg-purple-600', 'bg-amber-400 dark:bg-amber-600'];
                const idx = selected.indexOf(robot.id);
                return (
                  <div key={robot.id} className="flex flex-col items-center">
                    <div
                      className={`${colours[idx]} rounded-t-lg relative`}
                      style={{ width: 36, height: h }}
                    >
                      {/* Robot head */}
                      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 ${colours[idx]} rounded`} />
                    </div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2 text-center max-w-[80px] truncate">{robot.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{robot.specs.height} cm</p>
                    {robot.specs.weight && <p className="text-xs text-gray-400 dark:text-gray-500">{robot.specs.weight} kg</p>}
                  </div>
                );
              })}
            </div>

            {/* Scale bar */}
            <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Scale: {Math.round(scale * 100)}%</span>
                <span>Floor level</span>
              </div>
            </div>
          </div>

          {/* Specs table for selected */}
          {selectedRobots.length > 0 && (
            <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Spec</th>
                    {selectedRobots.map(r => (
                      <th key={r.id} className="py-2.5 px-4 text-left text-xs font-semibold text-blue-600 uppercase">{r.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Height', key: 'height' as const, unit: 'cm' },
                    { label: 'Weight', key: 'weight' as const, unit: 'kg' },
                    { label: 'DOF', key: 'dof' as const, unit: '' },
                    { label: 'Payload', key: 'payload' as const, unit: 'kg' },
                    { label: 'Speed', key: 'speed' as const, unit: 'km/h' },
                  ].map(spec => (
                    <tr key={spec.label} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 px-4 font-medium text-gray-500 dark:text-gray-400">{spec.label}</td>
                      {selectedRobots.map(r => (
                        <td key={r.id} className="py-2.5 px-4 text-gray-900 dark:text-white">
                          {r.specs[spec.key] != null ? `${r.specs[spec.key]}${spec.unit ? ` ${spec.unit}` : ''}` : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
