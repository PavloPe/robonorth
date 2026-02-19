type BadgeVariant = 'success' | 'warning' | 'info' | 'default' | 'danger';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-emerald-100/50',
  warning: 'bg-amber-50 text-amber-700 border-amber-200/80 shadow-amber-100/50',
  info: 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-blue-100/50',
  default: 'bg-gray-50 text-gray-600 border-gray-200/80 shadow-gray-100/50',
  danger: 'bg-red-50 text-red-700 border-red-200/80 shadow-red-100/50',
};

const dotColors: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  default: 'bg-gray-400',
  danger: 'bg-red-500',
};

export default function Badge({ text, variant = 'default', dot = false }: { text: string; variant?: BadgeVariant; dot?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border shadow-sm ${variantStyles[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {text}
    </span>
  );
}
