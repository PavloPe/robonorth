'use client';

import { useInquiryBasket } from './InquiryBasketProvider';
import Link from 'next/link';

export default function InquiryBasketDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearBasket, itemCount } = useInquiryBasket();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        onClick={() => setIsOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-96 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl z-[61] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Inquiry Basket</h2>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your inquiry basket is empty</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Add robots or parts to get a quote</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div
                  key={item.itemId}
                  className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded font-medium uppercase">
                          {item.itemType}
                        </span>
                      </div>
                      <Link
                        href={`/${item.itemType === 'robot' ? 'robots' : 'parts'}/${item.itemId}`}
                        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.itemName}
                      </Link>
                      {item.price && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.price}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.itemId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                      title="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Qty:</span>
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <Link
              href="/inquiry/basket"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-xl text-center transition-all shadow-sm"
            >
              Submit Inquiry ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </Link>
            <button
              onClick={clearBasket}
              className="w-full py-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Clear basket
            </button>
          </div>
        )}
      </div>
    </>
  );
}
