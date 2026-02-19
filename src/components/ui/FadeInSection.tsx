'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

/**
 * FadeInSection: Fade-in animation triggered by IntersectionObserver.
 * Replaces CSS-only approach with JS-driven animations.
 */
export default function FadeInSection({ children, className = '', delay = 0, stagger = false }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${stagger ? 'io-stagger' : 'io-hidden'} ${visible ? 'io-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
