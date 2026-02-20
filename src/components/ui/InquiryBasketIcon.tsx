'use client';

import Link from 'next/link';
import { useInquiryBasket } from './InquiryBasketProvider';

export default function InquiryBasketIcon() {
  const { itemCount, setIsOpen } = useInquiryBasket();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
      title="Shopping Cart"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.34-1.872l1.946-8.522A1.125 1.125 0 0018.16 2.25H6.228l-.326-1.225A1.125 1.125 0 004.816 0H2.25M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
