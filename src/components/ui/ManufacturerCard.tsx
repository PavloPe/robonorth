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
      className="group block bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
          {flag}
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          {manufacturer.robotIds.length} robot{manufacturer.robotIds.length !== 1 ? 's' : ''}
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
        {manufacturer.name}
      </h3>
      <p className="text-xs text-gray-400 mb-2">{manufacturer.country} · Est. {manufacturer.founded}</p>
      <p className="text-sm text-gray-500 line-clamp-2">
        {manufacturer.description}
      </p>
    </Link>
  );
}
