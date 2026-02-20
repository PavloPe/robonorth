'use client';

// Task 14: Payment methods section
interface Props {
  compact?: boolean;
}

export default function PaymentMethodsBadges({ compact = false }: Props) {
  const methods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'Wire Transfer', icon: '🏦' },
    { name: 'Invoice (Enterprise)', icon: '📄' },
  ];

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">Accepted:</span>
        {methods.map(m => (
          <span key={m.name} className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">
            {m.icon} {m.name.split(' ')[0]}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Accepted Payment Methods</p>
      <div className="grid grid-cols-2 gap-2">
        {methods.map(m => (
          <div key={m.name} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
            <span className="text-lg">{m.icon}</span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{m.name}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">🔒 All transactions are encrypted and secure</p>
    </div>
  );
}
