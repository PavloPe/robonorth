// ============================================================================
// RoboNorth.ca — Sentry configuration (DSN-gated, shared across runtimes)
// ============================================================================
//
// This module centralizes the Sentry init options used by every runtime
// (server, edge, browser). It NEVER hardcodes a DSN — the DSN is read from
// the environment by the caller and passed in. When no DSN is configured the
// SDK is a complete no-op: `instrumentation*` never calls `Sentry.init`, so
// there is no SDK initialization and no network traffic.
//
// Env vars (set in the prod runtime to activate; unset = no-op):
//   SENTRY_DSN              — server + edge runtimes
//   NEXT_PUBLIC_SENTRY_DSN  — browser runtime
// ============================================================================

import type { BrowserOptions, NodeOptions } from '@sentry/nextjs';

/** A non-empty, trimmed DSN is the single gate for all Sentry activation. */
export function resolveDsn(raw: string | undefined): string | undefined {
  const dsn = raw?.trim();
  return dsn ? dsn : undefined;
}

/** Environment tag derived from NODE_ENV, defaulting to development. */
export function sentryEnvironment(): string {
  return process.env.NODE_ENV || 'development';
}

/**
 * Drop client errors (HTTP 4xx) — they are expected, not actionable server
 * faults. Sentry attaches the status to the event's response context for
 * captured HTTP errors; anything < 500 is filtered out before send.
 */
type EventLike = {
  contexts?: { response?: { status_code?: number } | null } | null;
  extra?: Record<string, unknown> | null;
};

function eventStatusCode(event: EventLike): number | undefined {
  const fromContext = event.contexts?.response?.status_code;
  if (typeof fromContext === 'number') return fromContext;
  const fromExtra = event.extra?.status as unknown;
  return typeof fromExtra === 'number' ? fromExtra : undefined;
}

export function dropClientErrors<T extends EventLike>(event: T): T | null {
  const status = eventStatusCode(event);
  if (typeof status === 'number' && status >= 400 && status < 500) {
    return null;
  }
  return event;
}

/**
 * Base options shared by all runtimes: errors-only / low trace sampling, no
 * default PII, environment from NODE_ENV, 4xx dropped before send.
 */
function baseOptions(dsn: string) {
  return {
    dsn,
    environment: sentryEnvironment(),
    // Errors-only posture: capture errors, keep performance tracing minimal.
    tracesSampleRate: 0,
    // Do not attach IP addresses, cookies, request bodies, or user identity.
    sendDefaultPii: false,
    // Quiet by default; flip on via SENTRY_DEBUG when diagnosing the SDK.
    debug: process.env.SENTRY_DEBUG === 'true',
  } as const;
}

/** Node (server + edge) init options. */
export function serverInitOptions(dsn: string): NodeOptions {
  return {
    ...baseOptions(dsn),
    beforeSend: (event) => dropClientErrors(event as EventLike) as never,
  };
}

/** Browser init options. */
export function clientInitOptions(dsn: string): BrowserOptions {
  return {
    ...baseOptions(dsn),
    beforeSend: (event) => dropClientErrors(event as EventLike) as never,
  };
}
