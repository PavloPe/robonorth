// ============================================================================
// RoboNorth.ca — Next.js client instrumentation (browser Sentry init)
// ============================================================================
//
// Next 15 loads this on the client. We only initialize Sentry when the public
// DSN is set, so with no DSN this is a complete no-op: no init, no network,
// no router instrumentation.
// ============================================================================

import * as Sentry from '@sentry/nextjs';

import { resolveDsn, clientInitOptions } from '@/lib/sentry';

const dsn = resolveDsn(process.env.NEXT_PUBLIC_SENTRY_DSN);

if (dsn) {
  Sentry.init(clientInitOptions(dsn));
}

// No-op when Sentry is not initialized (DSN unset) — safe to always export.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
