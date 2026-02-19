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
      className="group block bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
          {category.itemCount} items
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {category.description}
      </p>
    </Link>
  );
}
