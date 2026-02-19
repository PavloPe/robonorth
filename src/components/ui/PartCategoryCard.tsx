import Link from 'next/link';
import type { PartCategory } from '@/types';

const categoryIcons: Record<string, string> = {
  'actuators-motors': '⚙️',
  'sensors': '📡',
  'controllers-compute': '🧠',
  'power-systems': '🔋',
  'structural-components': '🦾',
  'grippers-end-effectors': '🤚',
  'software-dev-kits': '💻',
};

const categoryColors: Record<string, string> = {
  'actuators-motors': 'from-orange-50 to-amber-50',
  'sensors': 'from-purple-50 to-indigo-50',
  'controllers-compute': 'from-blue-50 to-cyan-50',
  'power-systems': 'from-green-50 to-emerald-50',
  'structural-components': 'from-slate-50 to-gray-100',
  'grippers-end-effectors': 'from-pink-50 to-rose-50',
  'software-dev-kits': 'from-violet-50 to-purple-50',
};

export default function PartCategoryCard({ category }: { category: PartCategory }) {
  const icon = categoryIcons[category.id] || '🔧';
  const gradient = categoryColors[category.id] || 'from-gray-50 to-gray-100';

  return (
    <Link
      href={`/parts#${category.id}`}
      className="group block bg-white rounded-2xl border border-gray-200/80 hover:border-blue-200 card-hover p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl border border-gray-100`}>
          {icon}
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg font-medium border border-gray-100/50">
          {category.itemCount} items
        </span>
      </div>
      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
        {category.description}
      </p>
    </Link>
  );
}
