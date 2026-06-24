// ============================================================================
// RoboNorth.ca — Next.js instrumentation (server + edge Sentry init)
// ============================================================================
//
// Next 15 calls `register()` once per server/edge runtime at boot. We only
// import and initialize Sentry when SENTRY_DSN is set, so with no DSN this is
// a complete no-op: the SDK is never imported-for-init and never sends data.
// ============================================================================

import { resolveDsn, serverInitOptions } from '@/lib/sentry';

export async function register(): Promise<void> {
  const dsn = resolveDsn(process.env.SENTRY_DSN);
  if (!dsn) return; // no DSN -> no Sentry, no network.

  const Sentry = await import('@sentry/nextjs');

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init(serverInitOptions(dsn));
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init(serverInitOptions(dsn));
  }
}

// Captures errors thrown in nested React Server Components / route handlers.
// When the DSN is unset this resolves to a no-op handler.
export const onRequestError = process.env.SENTRY_DSN?.trim()
  ? // Lazily bound so the import only happens when a DSN is configured.
    async (...args: unknown[]) => {
      const Sentry = await import('@sentry/nextjs');
      // @ts-expect-error — forward Next's onRequestError args verbatim.
      return Sentry.captureRequestError(...args);
    }
  : undefined;
