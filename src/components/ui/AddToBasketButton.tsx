'use client';

import { useInquiryBasket } from './InquiryBasketProvider';

interface Props {
  itemType: 'robot' | 'part';
  itemId: string;
  itemName: string;
  price?: string;
  size?: 'sm' | 'lg';
}

export default function AddToBasketButton({ itemType, itemId, itemName, price, size = 'lg' }: Props) {
  const { addItem, hasItem, removeItem } = useInquiryBasket();
  const inBasket = hasItem(itemId);

  const handleClick = () => {
    if (inBasket) {
      removeItem(itemId);
    } else {
      addItem({ itemType, itemId, itemName, price });
    }
  };

  const sizeClasses = size === 'lg'
    ? 'px-6 py-3 text-sm'
    : 'px-3 py-2 text-xs';

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses} font-semibold rounded-xl border-2 transition-all inline-flex items-center gap-2 ${
        inBasket
          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {inBasket ? (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          In Basket
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add to Inquiry
        </>
      )}
    </button>
  );
}
