"use client";

import type { Robot } from '@/types';

const availabilityLabels: Record<string, string> = {
  shipping: 'Shipping Now', preorder: 'Pre-Order', pilot: 'Pilot',
  announced: 'Announced', prototype: 'Prototype',
};

export default function CompareTable({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) {
    return <p className="text-gray-500 text-center py-8">Select robots above to compare.</p>;
  }

  const rows: { label: string; getValue: (r: Robot) => string }[] = [
    { label: 'Price', getValue: r => r.price },
    { label: 'Manufacturer', getValue: r => r.manufacturer },
    { label: 'Country', getValue: r => r.country },
    { label: 'Availability', getValue: r => availabilityLabels[r.availability] || r.availability },
    { label: 'Category', getValue: r => r.category },
    { label: 'Height', getValue: r => r.specs.height ? `${r.specs.height} cm` : '—' },
    { label: 'Weight', getValue: r => r.specs.weight ? `${r.specs.weight} kg` : '—' },
    { label: 'DOF', getValue: r => r.specs.dof ? `${r.specs.dof}` : '—' },
    { label: 'Battery', getValue: r => r.specs.battery || '—' },
    { label: 'Payload', getValue: r => r.specs.payload ? `${r.specs.payload} kg` : '—' },
    { label: 'Speed', getValue: r => r.specs.speed ? `${r.specs.speed} km/h` : '—' },
    { label: 'Use Case', getValue: r => r.useCase.join(', ') },
    { label: 'Canada Available', getValue: r => r.canadaAvailable ? '✅ Yes' : '❌ No' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 bg-gray-900 text-gray-400 text-sm font-medium sticky left-0 z-10 min-w-[120px]">
              Spec
            </th>
            {robots.map(r => (
              <th key={r.id} className="p-3 bg-gray-900 text-white font-bold text-sm min-w-[180px]">
                {r.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/50'}>
              <td className="p-3 text-sm font-medium text-gray-400 sticky left-0 z-10 bg-inherit">
                {row.label}
              </td>
              {robots.map(r => (
                <td key={r.id} className="p-3 text-sm text-gray-300">
                  {row.getValue(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
