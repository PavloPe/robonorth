'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { InquiryBasketItem } from '@/types';

interface BasketContext {
  items: InquiryBasketItem[];
  addItem: (item: Omit<InquiryBasketItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearBasket: () => void;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  hasItem: (itemId: string) => boolean;
}

const InquiryBasketContext = createContext<BasketContext | null>(null);

const STORAGE_KEY = 'robonorth-inquiry-basket';

export function InquiryBasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryBasketItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<InquiryBasketItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.itemId === item.itemId);
      if (existing) {
        return prev.map(i =>
          i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(i => i.itemId !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      setItems(prev => prev.filter(i => i.itemId !== itemId));
      return;
    }
    setItems(prev => prev.map(i => i.itemId === itemId ? { ...i, quantity } : i));
  }, []);

  const clearBasket = useCallback(() => {
    setItems([]);
  }, []);

  const hasItem = useCallback((itemId: string) => {
    return items.some(i => i.itemId === itemId);
  }, [items]);

  return (
    <InquiryBasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        isOpen,
        setIsOpen,
        hasItem,
      }}
    >
      {children}
    </InquiryBasketContext.Provider>
  );
}

export function useInquiryBasket(): BasketContext {
  const ctx = useContext(InquiryBasketContext);
  if (!ctx) throw new Error('useInquiryBasket must be used within InquiryBasketProvider');
  return ctx;
}
