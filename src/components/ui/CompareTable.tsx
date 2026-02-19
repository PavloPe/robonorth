"use client";

import type { Robot } from '@/types';

const availabilityLabels: Record<string, string> = {
  shipping: 'In Stock', preorder: 'Pre-Order', pilot: 'Pilot',
  announced: 'Coming Soon', prototype: 'Prototype',
};

export default function CompareTable({ robots }: { robots: Robot[] }) {
  if (robots.length === 0) {
    return <p className="text-gray-400 text-center py-12 text-sm">Select robots above to compare them side by side.</p>;
  }

  const rows: { label: string; getValue: (r: Robot) => string }[] = [
    { label: 'Price', getValue: r => r.price },
    { label: 'Manufacturer', getValue: r => r.manufacturer },
    { label: 'Country', getValue: r => r.country },
    { label: 'Availability', getValue: r => availabilityLabels[r.availability] || r.availability },
    { label: 'Category', getValue: r => r.category.charAt(0).toUpperCase() + r.category.slice(1) },
    { label: 'Height', getValue: r => r.specs.height ? `${r.specs.height} cm` : '—' },
    { label: 'Weight', getValue: r => r.specs.weight ? `${r.specs.weight} kg` : '—' },
    { label: 'DOF', getValue: r => r.specs.dof ? `${r.specs.dof}` : '—' },
    { label: 'Battery', getValue: r => r.specs.battery || '—' },
    { label: 'Payload', getValue: r => r.specs.payload ? `${r.specs.payload} kg` : '—' },
    { label: 'Speed', getValue: r => r.specs.speed ? `${r.specs.speed} km/h` : '—' },
    { label: 'Use Case', getValue: r => r.useCase.join(', ') },
    { label: 'Canada', getValue: r => r.canadaAvailable ? '✅ Yes' : '❌ No' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-3 text-gray-500 font-medium sticky left-0 bg-white z-10 min-w-[120px]">
              Spec
            </th>
            {robots.map(r => (
              <th key={r.id} className="p-3 text-gray-900 font-semibold min-w-[180px] text-left">
                {r.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
              <td className="p-3 font-medium text-gray-500 sticky left-0 bg-inherit z-10">
                {row.label}
              </td>
              {robots.map(r => (
                <td key={r.id} className="p-3 text-gray-700">
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
