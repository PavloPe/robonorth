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
          In Cart
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.872l1.946-8.522A1.125 1.125 0 0018.16 2.25H6.228l-.326-1.225A1.125 1.125 0 004.816 0H2.25" />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
