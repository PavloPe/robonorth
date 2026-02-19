'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecentRobot {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
  viewedAt: number;
}

const MAX_RECENT = 6;
const STORAGE_KEY = 'robonorth-recently-viewed';

export function trackRobotView(robot: { id: string; name: string; manufacturer: string; price: string }) {
  if (typeof window === 'undefined') return;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as RecentRobot[];
    const filtered = stored.filter(r => r.id !== robot.id);
    filtered.unshift({ ...robot, viewedAt: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_RECENT)));

    // Track analytics event
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'robot_detail_view', robot_id: robot.id, robot_name: robot.name });
    }
  } catch { /* ignore */ }
}

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [robots, setRobots] = useState<RecentRobot[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as RecentRobot[];
      setRobots(stored.filter(r => r.id !== excludeId).slice(0, 4));
    } catch { /* ignore */ }
  }, [excludeId]);

  if (robots.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">History</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {robots.map(robot => (
          <Link
            key={robot.id}
            href={`/robots/${robot.id}`}
            className="shrink-0 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group"
          >
            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl mb-3 opacity-30">🤖</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mb-0.5">{robot.manufacturer}</p>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{robot.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{robot.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
