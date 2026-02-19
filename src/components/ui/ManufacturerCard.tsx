import Link from 'next/link';
import type { Manufacturer } from '@/types';

const countryFlags: Record<string, string> = {
  'USA': '🇺🇸', 'China': '🇨🇳', 'Canada': '🇨🇦', 'Japan': '🇯🇵',
  'Norway': '🇳🇴', 'UK': '🇬🇧', 'Germany': '🇩🇪', 'Poland': '🇵🇱',
  'South Korea': '🇰🇷', 'France': '🇫🇷',
};

export default function ManufacturerCard({ manufacturer }: { manufacturer: Manufacturer }) {
  const flag = countryFlags[manufacturer.country] || '🌍';

  return (
    <Link
      href={`/manufacturers/${manufacturer.id}`}
      className="group block bg-gray-900 rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all duration-300 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl">
          {flag}
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
          {manufacturer.robotIds.length} robot{manufacturer.robotIds.length !== 1 ? 's' : ''}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
        {manufacturer.name}
      </h3>
      <p className="text-xs text-gray-500 mb-3">{manufacturer.country} · Est. {manufacturer.founded}</p>
      <p className="text-sm text-gray-400 line-clamp-3">
        {manufacturer.description}
      </p>
    </Link>
  );
}
