'use client';

// Global error boundary — captures React render errors at the root.
// Reports to Sentry only when a public DSN is configured (no-op otherwise).

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // captureException is a safe no-op when Sentry was never initialized
    // (i.e. NEXT_PUBLIC_SENTRY_DSN unset).
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ maxWidth: '28rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#555', marginBottom: '1.5rem' }}>
              An unexpected error occurred. Please try reloading the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: '#111',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
