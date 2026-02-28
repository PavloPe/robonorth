'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const USD_TO_CAD = 1.38;

interface CurrencyContextType {
  currency: 'CAD' | 'USD';
  toggle: () => void;
  convert: (usdAmount: number) => number;
  format: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'CAD',
  toggle: () => {},
  convert: (n) => n * USD_TO_CAD,
  format: (n) => `$${Math.round(n * USD_TO_CAD).toLocaleString('en-CA')} CAD`,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<'CAD' | 'USD'>('CAD');

  useEffect(() => {
    const saved = localStorage.getItem('robonorth-currency');
    if (saved === 'USD' || saved === 'CAD') setCurrency(saved);
  }, []);

  const toggle = () => {
    const next = currency === 'CAD' ? 'USD' : 'CAD';
    setCurrency(next);
    localStorage.setItem('robonorth-currency', next);
  };

  const convert = (usdAmount: number) =>
    currency === 'CAD' ? usdAmount * USD_TO_CAD : usdAmount;

  const format = (usdAmount: number) => {
    const amount = convert(usdAmount);
    return `$${Math.round(amount).toLocaleString('en-CA')} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggle, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default function CurrencyToggle() {
  const { currency, toggle } = useCurrency();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-lg border transition-colors bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      title={`Switch to ${currency === 'CAD' ? 'USD' : 'CAD'}`}
      aria-label={`Currency: ${currency}. Switch to ${currency === 'CAD' ? 'USD' : 'CAD'}`}
    >
      {currency === 'CAD' ? '🇨🇦' : '🇺🇸'}
      <span>{currency}</span>
    </button>
  );
}
