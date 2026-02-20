'use client';

import { useEffect } from 'react';

// Improvement #33: Web vitals monitoring component (CLS, LCP, FID/INP tracking)

function reportVital(metric: { name: string; value: number; rating: string }) {
  // Send to analytics / dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'web_vitals',
      vital_name: metric.name,
      vital_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      vital_rating: metric.rating,
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? '#0cce6b' : metric.rating === 'needs-improvement' ? '#ffa400' : '#ff4e42';
    console.log(
      `%c[Web Vital] ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 4 : 0)} (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  }
}

// Simplified web vitals using PerformanceObserver
function observeLCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
      if (lastEntry) {
        const value = lastEntry.startTime;
        reportVital({ name: 'LCP', value, rating: value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor' });
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch { /* unsupported */ }
}

function observeFID() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
        const value = fidEntry.processingStart - fidEntry.startTime;
        reportVital({ name: 'FID', value, rating: value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor' });
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  } catch { /* unsupported */ }
}

function observeCLS() {
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });

    // Report on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportVital({ name: 'CLS', value: clsValue, rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor' });
        observer.disconnect();
      }
    }, { once: true });
  } catch { /* unsupported */ }
}

function observeINP() {
  try {
    let inpValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const duration = (entry as PerformanceEntry & { duration: number }).duration;
        if (duration > inpValue) {
          inpValue = duration;
        }
      }
    });
    observer.observe({ type: 'event', buffered: true });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && inpValue > 0) {
        reportVital({ name: 'INP', value: inpValue, rating: inpValue <= 200 ? 'good' : inpValue <= 500 ? 'needs-improvement' : 'poor' });
        observer.disconnect();
      }
    }, { once: true });
  } catch { /* unsupported */ }
}

export default function WebVitals() {
  useEffect(() => {
    observeLCP();
    observeFID();
    observeCLS();
    observeINP();

    // Also track TTFB
    try {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (nav) {
        const ttfb = nav.responseStart - nav.requestStart;
        reportVital({ name: 'TTFB', value: ttfb, rating: ttfb <= 800 ? 'good' : ttfb <= 1800 ? 'needs-improvement' : 'poor' });
      }
    } catch { /* ignore */ }
  }, []);

  return null; // This component renders nothing — it just monitors
}
