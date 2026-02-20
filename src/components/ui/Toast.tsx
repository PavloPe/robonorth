'use client';

import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ToastContextType {
  toast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const toast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 no-print" role="status" aria-live="polite">
          {toasts.map(t => (
            <ToastMessage key={t.id} toast={t} onDismiss={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

function ToastMessage({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => setVisible(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  const colors = {
    success: 'bg-emerald-600 text-white',
    info: 'bg-slate-800 dark:bg-gray-700 text-white',
    error: 'bg-red-600 text-white',
  };

  const icons = {
    success: '✓',
    info: 'ℹ',
    error: '✕',
  };

  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 min-w-[240px] max-w-[360px] ${colors[toast.type]} ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <span className="text-xs font-bold opacity-80">{icons[toast.type]}</span>
      <span className="flex-1">{toast.message}</span>
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100 transition-opacity shrink-0" aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
