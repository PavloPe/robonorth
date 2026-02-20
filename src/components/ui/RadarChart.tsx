'use client';

import type { Robot } from '@/types';

const CHART_SIZE = 250;
const CENTER = CHART_SIZE / 2;
const RADIUS = 100;
const LEVELS = 5;

const axes = [
  { key: 'dof', label: 'DOF', max: 80, getter: (r: Robot) => r.specs.dof ?? 0 },
  { key: 'speed', label: 'Speed', max: 15, getter: (r: Robot) => r.specs.speed ?? 0 },
  { key: 'payload', label: 'Payload', max: 50, getter: (r: Robot) => r.specs.payload ?? 0 },
  { key: 'height', label: 'Height', max: 200, getter: (r: Robot) => r.specs.height ?? 0 },
  { key: 'weight', label: 'Weight', max: 100, getter: (r: Robot) => r.specs.weight ?? 0 },
];

const colors = [
  { stroke: '#3B82F6', fill: 'rgba(59,130,246,0.15)' },
  { stroke: '#10B981', fill: 'rgba(16,185,129,0.15)' },
  { stroke: '#F59E0B', fill: 'rgba(245,158,11,0.15)' },
  { stroke: '#EF4444', fill: 'rgba(239,68,68,0.15)' },
];

function polarToCartesian(angle: number, distance: number): [number, number] {
  const radian = (angle - 90) * (Math.PI / 180);
  return [
    CENTER + distance * Math.cos(radian),
    CENTER + distance * Math.sin(radian),
  ];
}

function getPolygonPoints(robot: Robot): string {
  const angleStep = 360 / axes.length;
  return axes.map((axis, i) => {
    const value = axis.getter(robot);
    const normalized = Math.min(1, value / axis.max);
    const [x, y] = polarToCartesian(i * angleStep, normalized * RADIUS);
    return `${x},${y}`;
  }).join(' ');
}

export default function RadarChart({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) return null;

  const angleStep = 360 / axes.length;
  const hasData = robots.some(r => axes.some(a => a.getter(r) > 0));
  if (!hasData) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Spec Comparison</h3>
      <div className="flex flex-col items-center">
        <svg viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`} className="w-full max-w-[280px]" role="img" aria-label="Radar chart comparing robot specifications">
          {/* Grid levels */}
          {Array.from({ length: LEVELS }).map((_, level) => {
            const r = ((level + 1) / LEVELS) * RADIUS;
            const points = axes.map((_, i) => {
              const [x, y] = polarToCartesian(i * angleStep, r);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
              />
            );
          })}

          {/* Axis lines */}
          {axes.map((_, i) => {
            const [x, y] = polarToCartesian(i * angleStep, RADIUS);
            return (
              <line
                key={i}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
              />
            );
          })}

          {/* Robot polygons */}
          {robots.map((robot, ri) => (
            <polygon
              key={robot.id}
              points={getPolygonPoints(robot)}
              fill={colors[ri % colors.length].fill}
              stroke={colors[ri % colors.length].stroke}
              strokeWidth="2"
              className="transition-all duration-500"
            />
          ))}

          {/* Data points */}
          {robots.map((robot, ri) => (
            axes.map((axis, ai) => {
              const value = axis.getter(robot);
              if (value <= 0) return null;
              const normalized = Math.min(1, value / axis.max);
              const [x, y] = polarToCartesian(ai * angleStep, normalized * RADIUS);
              return (
                <circle
                  key={`${robot.id}-${axis.key}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={colors[ri % colors.length].stroke}
                />
              );
            })
          ))}

          {/* Axis labels */}
          {axes.map((axis, i) => {
            const [x, y] = polarToCartesian(i * angleStep, RADIUS + 18);
            return (
              <text
                key={axis.key}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-gray-500 dark:fill-gray-400 text-[10px] font-medium"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {robots.map((robot, ri) => (
            <div key={robot.id} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[ri % colors.length].stroke }}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{robot.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
