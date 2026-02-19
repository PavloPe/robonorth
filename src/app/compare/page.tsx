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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Robots</h1>
        <p className="text-gray-500">Select 2–4 robots to compare side by side.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <select
            onChange={e => { addRobot(e.target.value); e.target.value = ''; }}
            className="px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value=""
          >
            <option value="">+ Add robot</option>
            {robots
              .filter(r => !selectedIds.includes(r.id))
              .map(r => (
                <option key={r.id} value={r.id}>{r.name} — {r.manufacturer}</option>
              ))}
          </select>

          {selectedIds.map(id => {
            const r = robots.find(x => x.id === id);
            return (
              <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 font-medium">
                {r?.name}
                <button onClick={() => removeRobot(id)} className="hover:text-blue-900 text-blue-400">×</button>
              </span>
            );
          })}

          {selectedIds.length > 0 && (
            <button onClick={() => setSelectedIds([])} className="text-xs text-gray-400 hover:text-gray-600 ml-1">
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <CompareTable robots={selectedRobots} />
      </div>
    </div>
  );
}
