import { describe, it, expect } from 'vitest';
import {
  resolveDsn,
  sentryEnvironment,
  dropClientErrors,
  serverInitOptions,
  clientInitOptions,
} from '@/lib/sentry';

const DSN = 'https://abc@o1.ingest.sentry.io/1';

describe('resolveDsn — the activation gate', () => {
  it('returns undefined when the DSN is unset (no-op posture)', () => {
    expect(resolveDsn(undefined)).toBeUndefined();
  });

  it('returns undefined for empty / whitespace-only DSN', () => {
    expect(resolveDsn('')).toBeUndefined();
    expect(resolveDsn('   ')).toBeUndefined();
  });

  it('returns the trimmed DSN when configured', () => {
    expect(resolveDsn(`  ${DSN}  `)).toBe(DSN);
  });
});

describe('sentryEnvironment', () => {
  it('reflects NODE_ENV', () => {
    // Vitest runs with NODE_ENV=test by default; assert it is read from env.
    expect(sentryEnvironment()).toBe(process.env.NODE_ENV || 'development');
  });
});

describe('dropClientErrors — 4xx are not reported', () => {
  it('drops 4xx events (response context)', () => {
    expect(dropClientErrors({ contexts: { response: { status_code: 404 } } })).toBeNull();
    expect(dropClientErrors({ contexts: { response: { status_code: 401 } } })).toBeNull();
  });

  it('keeps 5xx events', () => {
    const e = { contexts: { response: { status_code: 500 } } };
    expect(dropClientErrors(e)).toBe(e);
  });

  it('keeps events with no status (generic exceptions)', () => {
    const e = { contexts: {} };
    expect(dropClientErrors(e)).toBe(e);
  });

  it('reads status from extra as a fallback', () => {
    expect(dropClientErrors({ extra: { status: 429 } })).toBeNull();
    const ok = { extra: { status: 503 } };
    expect(dropClientErrors(ok)).toBe(ok);
  });
});

describe('init options — errors-only, no PII', () => {
  it('server options carry the safe posture', () => {
    const o = serverInitOptions(DSN);
    expect(o.dsn).toBe(DSN);
    expect(o.tracesSampleRate).toBe(0);
    expect(o.sendDefaultPii).toBe(false);
    expect(o.environment).toBe(process.env.NODE_ENV || 'development');
    expect(typeof o.beforeSend).toBe('function');
  });

  it('client options carry the safe posture', () => {
    const o = clientInitOptions(DSN);
    expect(o.dsn).toBe(DSN);
    expect(o.tracesSampleRate).toBe(0);
    expect(o.sendDefaultPii).toBe(false);
    expect(typeof o.beforeSend).toBe('function');
  });
});
