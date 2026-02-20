'use client';

const provinces = [
  { code: 'AB', name: 'Alberta', gst: 5, pst: 0, hst: 0, label: 'GST 5%' },
  { code: 'BC', name: 'British Columbia', gst: 5, pst: 7, hst: 0, label: 'GST 5% + PST 7%' },
  { code: 'MB', name: 'Manitoba', gst: 5, pst: 7, hst: 0, label: 'GST 5% + RST 7%' },
  { code: 'NB', name: 'New Brunswick', gst: 0, pst: 0, hst: 15, label: 'HST 15%' },
  { code: 'NL', name: 'Newfoundland & Labrador', gst: 0, pst: 0, hst: 15, label: 'HST 15%' },
  { code: 'NS', name: 'Nova Scotia', gst: 0, pst: 0, hst: 15, label: 'HST 15%' },
  { code: 'NT', name: 'Northwest Territories', gst: 5, pst: 0, hst: 0, label: 'GST 5%' },
  { code: 'NU', name: 'Nunavut', gst: 5, pst: 0, hst: 0, label: 'GST 5%' },
  { code: 'ON', name: 'Ontario', gst: 0, pst: 0, hst: 13, label: 'HST 13%' },
  { code: 'PE', name: 'Prince Edward Island', gst: 0, pst: 0, hst: 15, label: 'HST 15%' },
  { code: 'QC', name: 'Quebec', gst: 5, pst: 9.975, hst: 0, label: 'GST 5% + QST 9.975%' },
  { code: 'SK', name: 'Saskatchewan', gst: 5, pst: 6, hst: 0, label: 'GST 5% + PST 6%' },
  { code: 'YT', name: 'Yukon', gst: 5, pst: 0, hst: 0, label: 'GST 5%' },
];

interface Props {
  province: string;
  onProvinceChange: (province: string) => void;
  subtotal?: number;
}

export default function ProvincialTaxCalculator({ province, onProvinceChange, subtotal }: Props) {
  const selected = provinces.find(p => p.code === province);
  const totalRate = selected ? (selected.hst || (selected.gst + selected.pst)) : 0;

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Province (for tax estimate)</label>
      <select
        value={province}
        onChange={e => onProvinceChange(e.target.value)}
        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      >
        <option value="">Select province</option>
        {provinces.map(p => (
          <option key={p.code} value={p.code}>{p.name}</option>
        ))}
      </select>
      {selected && (
        <div className="mt-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-xs space-y-1.5">
          {selected.hst > 0 ? (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">HST</span>
              <span className="font-medium text-gray-900 dark:text-white">{selected.hst}%</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">GST</span>
                <span className="font-medium text-gray-900 dark:text-white">{selected.gst}%</span>
              </div>
              {selected.pst > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{province === 'QC' ? 'QST' : province === 'MB' ? 'RST' : 'PST'}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selected.pst}%</span>
                </div>
              )}
            </>
          )}
          <div className="flex justify-between pt-1.5 border-t border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">Total Tax Rate</span>
            <span className="font-bold text-gray-900 dark:text-white">{totalRate.toFixed(totalRate % 1 ? 3 : 0)}%</span>
          </div>
          {subtotal && subtotal > 0 && (
            <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">Estimated Tax</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">${(subtotal * totalRate / 100).toFixed(2)} CAD</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { provinces };
