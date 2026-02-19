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
      className="group block bg-white rounded-2xl border border-gray-200/80 hover:border-blue-200 card-hover p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center text-2xl border border-gray-100">
          {flag}
        </div>
        <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-semibold border border-blue-100/50">
          {manufacturer.robotIds.length} robot{manufacturer.robotIds.length !== 1 ? 's' : ''}
        </span>
      </div>
      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
        {manufacturer.name}
      </h3>
      <p className="text-xs text-gray-400 mb-3 font-medium">{manufacturer.country} · Est. {manufacturer.founded}</p>
      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
        {manufacturer.description}
      </p>
    </Link>
  );
}
