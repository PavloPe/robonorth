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

export default function PartCategoryCard({ category }: { category: PartCategory }) {
  const icon = categoryIcons[category.id] || '🔧';

  return (
    <Link
      href={`/parts#${category.id}`}
      className="group block bg-gray-900 rounded-2xl border border-gray-800 hover:border-cyan-500/40 transition-all duration-300 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
          {category.itemCount} items
        </span>
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
        {category.name}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">
        {category.description}
      </p>
    </Link>
  );
}
