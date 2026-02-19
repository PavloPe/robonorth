type BadgeVariant = 'success' | 'warning' | 'info' | 'default' | 'danger';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  default: 'bg-gray-50 text-gray-600 border-gray-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
};

export default function Badge({ text, variant = 'default' }: { text: string; variant?: BadgeVariant }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full border ${variantStyles[variant]}`}>
      {text}
    </span>
  );
}
