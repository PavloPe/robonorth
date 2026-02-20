'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Robot } from '@/types';
import Badge from './Badge';

const availabilityConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'default' }> = {
  shipping: { label: 'In Stock', variant: 'success' },
  preorder: { label: 'Pre-Order', variant: 'info' },
  pilot: { label: 'Pilot Program', variant: 'warning' },
  announced: { label: 'Coming Soon', variant: 'default' },
  prototype: { label: 'Prototype', variant: 'default' },
};

interface QuickViewModalProps {
  robot: Robot;
  onClose: () => void;
}

export default function QuickViewModal({ robot, onClose }: QuickViewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const badge = availabilityConfig[robot.availability] ?? availabilityConfig.announced;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    // Auto-focus the modal
    modalRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Track view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'quick_view', robot_id: robot.id, robot_name: robot.name });
    }
  }, [robot.id, robot.name]);

  const specs = [
    robot.specs.height && { label: 'Height', value: `${robot.specs.height} cm` },
    robot.specs.weight && { label: 'Weight', value: `${robot.specs.weight} kg` },
    robot.specs.dof && { label: 'DOF', value: `${robot.specs.dof}` },
    robot.specs.speed && { label: 'Speed', value: `${robot.specs.speed} km/h` },
    robot.specs.payload && { label: 'Payload', value: `${robot.specs.payload} kg` },
    robot.specs.battery && { label: 'Battery', value: robot.specs.battery },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${robot.name}`}
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-dot-pattern opacity-40" />
            <span className="text-8xl opacity-25 relative">🤖</span>
          </div>

          {/* Details */}
          <div className="p-6">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{robot.manufacturer}</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{robot.name}</h2>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge text={badge.label} variant={badge.variant} dot />
              {robot.canadaAvailable && <Badge text="🇨🇦 Ships to CA" variant="success" />}
            </div>

            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{robot.price}</div>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">{robot.description}</p>

            {/* Quick specs */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-5">
                {specs.slice(0, 6).map(s => (
                  <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/robots/${robot.id}`}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
                onClick={onClose}
              >
                View Details
              </Link>
              <Link
                href={`/inquiry?robot=${robot.id}`}
                className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                onClick={onClose}
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
