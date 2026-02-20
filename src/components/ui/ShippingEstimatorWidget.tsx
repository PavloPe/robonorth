'use client';

// Task 21: Shipping cost estimator (Canada Post / Purolator placeholder rates)
const shippingRates: Record<string, { standard: number; express: number; days: string }> = {
  AB: { standard: 149, express: 299, days: '3-5' },
  BC: { standard: 149, express: 299, days: '3-5' },
  MB: { standard: 179, express: 349, days: '4-6' },
  NB: { standard: 199, express: 399, days: '5-7' },
  NL: { standard: 249, express: 449, days: '6-8' },
  NS: { standard: 199, express: 399, days: '5-7' },
  NT: { standard: 399, express: 699, days: '7-10' },
  NU: { standard: 499, express: 799, days: '8-12' },
  ON: { standard: 129, express: 249, days: '2-4' },
  PE: { standard: 219, express: 419, days: '5-7' },
  QC: { standard: 139, express: 269, days: '3-5' },
  SK: { standard: 169, express: 329, days: '4-6' },
  YT: { standard: 349, express: 599, days: '7-10' },
};

interface Props {
  province: string;
}

export default function ShippingEstimatorWidget({ province }: Props) {
  const rate = province ? shippingRates[province] : null;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <span>🚚</span> Shipping Estimate
      </h3>
      {rate ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">Standard Shipping</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Canada Post / Purolator — {rate.days} business days</p>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">From ${rate.standard}</span>
          </div>
          <div className="flex items-center justify-between py-2 px-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Express Shipping</p>
              <p className="text-[10px] text-blue-600/70 dark:text-blue-400/60">Priority — 1-3 business days</p>
            </div>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-400">From ${rate.express}</span>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
            ❄️ Winter shipping: cold-weather packaging included at no extra charge. All shipments fully insured.
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400">Select a province above for shipping estimates.</p>
      )}
    </div>
  );
}
