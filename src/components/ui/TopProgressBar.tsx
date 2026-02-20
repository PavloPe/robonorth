'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * NProgress-style loading bar. Triggered by route changes
 * via popstate + click interception on internal links.
 */
export default function TopProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const start = useCallback(() => {
    setProgress(10);
    setVisible(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
        return prev + (90 - prev) * 0.1;
      });
    }, 200);
  }, []);

  const done = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    // Listen for clicks on internal links
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('/api') && !target.hasAttribute('download')) {
        start();
      }
    };

    // Listen for history changes (back/forward)
    const handlePopState = () => start();

    // MutationObserver to detect when the page content changes (route complete)
    const observer = new MutationObserver(() => {
      if (visible) done();
    });

    document.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('popstate', handlePopState);
    observer.observe(document.querySelector('main') || document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [start, done, visible]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none no-print"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-blue-500/50 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
