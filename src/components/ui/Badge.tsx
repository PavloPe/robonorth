type BadgeVariant = 'success' | 'warning' | 'info' | 'default' | 'danger';

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  default: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  danger: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Badge({ text, variant = 'default' }: { text: string; variant?: BadgeVariant }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${variantStyles[variant]}`}>
      {text}
    </span>
  );
}
