import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  signSession,
  verifySession,
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from '@/lib/admin-session';

const PASSWORD = 'super-secret-pw';

describe('admin-session', () => {
  let prevPw: string | undefined;
  let prevSecret: string | undefined;

  beforeEach(() => {
    prevPw = process.env.ADMIN_PASSWORD;
    prevSecret = process.env.ADMIN_SESSION_SECRET;
    process.env.ADMIN_PASSWORD = PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
  });

  afterEach(() => {
    if (prevPw === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = prevPw;
    if (prevSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = prevSecret;
  });

  it('exposes the expected cookie name and 8h TTL', () => {
    expect(ADMIN_SESSION_COOKIE).toBe('admin_session');
    expect(SESSION_TTL_SECONDS).toBe(8 * 60 * 60);
  });

  it('mints an opaque token that is NOT the password', async () => {
    const token = await signSession();
    expect(token).toBeTruthy();
    expect(token).not.toBe(PASSWORD);
    expect(token).not.toContain(PASSWORD);
    expect(token).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/); // payload.signature
  });

  it('round-trips: a freshly signed token verifies', async () => {
    const token = await signSession();
    expect(await verifySession(token)).toBe(true);
  });

  it('rejects the raw password as a token', async () => {
    expect(await verifySession(PASSWORD)).toBe(false);
  });

  it('rejects missing / malformed tokens', async () => {
    expect(await verifySession(undefined)).toBe(false);
    expect(await verifySession('')).toBe(false);
    expect(await verifySession('no-dot')).toBe(false);
    expect(await verifySession('.onlysig')).toBe(false);
    expect(await verifySession('onlypayload.')).toBe(false);
  });

  it('rejects a token signed with a different secret', async () => {
    process.env.ADMIN_SESSION_SECRET = 'secret-a';
    const token = await signSession();
    process.env.ADMIN_SESSION_SECRET = 'secret-b';
    expect(await verifySession(token)).toBe(false);
  });

  it('rejects a tampered signature', async () => {
    const token = (await signSession())!;
    const tampered = token.slice(0, -1) + (token.endsWith('A') ? 'B' : 'A');
    expect(await verifySession(tampered)).toBe(false);
  });

  it('rejects an expired token', async () => {
    const issuedAt = 1_000_000;
    const token = await signSession(issuedAt);
    // 8h + 1s later
    const later = issuedAt + SESSION_TTL_SECONDS * 1000 + 1000;
    expect(await verifySession(token, later)).toBe(false);
    // still valid just before expiry
    expect(await verifySession(token, issuedAt + 1000)).toBe(true);
  });

  it('prefers ADMIN_SESSION_SECRET over ADMIN_PASSWORD when both are set', async () => {
    process.env.ADMIN_SESSION_SECRET = 'dedicated-secret';
    const token = await signSession();
    // Removing the password must NOT invalidate a token keyed on the dedicated secret.
    delete process.env.ADMIN_PASSWORD;
    expect(await verifySession(token)).toBe(true);
  });

  it('returns null / false when no secret is configured', async () => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
    expect(await signSession()).toBeNull();
    expect(await verifySession('anything.here')).toBe(false);
  });
});
