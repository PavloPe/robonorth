"use client";

import { useState } from 'react';
import { robots } from '@/data/robots';
import CompareTable from '@/components/ui/CompareTable';

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addRobot = (id: string) => {
    if (id && !selectedIds.includes(id) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeRobot = (id: string) => {
    setSelectedIds(selectedIds.filter(x => x !== id));
  };

  const selectedRobots = robots.filter(r => selectedIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-3">Compare Humanoid Robots</h1>
        <p className="text-gray-400 text-lg">Select 2-4 robots to compare side by side.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            onChange={e => { addRobot(e.target.value); e.target.value = ''; }}
            className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
            value=""
          >
            <option value="">+ Add robot to compare</option>
            {robots
              .filter(r => !selectedIds.includes(r.id))
              .map(r => (
                <option key={r.id} value={r.id}>{r.name} — {r.manufacturer}</option>
              ))}
          </select>

          {selectedIds.map(id => {
            const r = robots.find(x => x.id === id);
            return (
              <span key={id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400">
                {r?.name}
                <button onClick={() => removeRobot(id)} className="hover:text-white">×</button>
              </span>
            );
          })}

          {selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-gray-500 hover:text-gray-300"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <CompareTable robots={selectedRobots} />
      </div>
    </div>
  );
}
