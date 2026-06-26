// ============================================================================
// Admin session tokens (ROBONORTH-60)
//
// Replaces the previous scheme that stored the raw ADMIN_PASSWORD as the
// `admin_session` cookie value. The cookie now carries an opaque, HMAC-signed
// token — `base64url(payload).base64url(HMAC-SHA256(secret, payload))` — so the
// password is never persisted in a cookie, proxy log, or CDN cache.
//
// Uses the Web Crypto API (`crypto.subtle`) + `btoa`/`atob`, which are
// available in BOTH the Edge runtime (middleware) and the Node runtime (route
// handlers), so a single implementation serves both. Signature comparison is
// constant-time.
//
// Secret: `ADMIN_SESSION_SECRET` if set, otherwise derived from
// `ADMIN_PASSWORD`. Rotating either secret invalidates every outstanding
// session (the practical revocation lever for stateless tokens).
// ============================================================================

export const ADMIN_SESSION_COOKIE = 'admin_session';

const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(s: string): Uint8Array {
  const norm = s.replace(/-/g, '+').replace(/_/g, '/');
  const padded = norm + '='.repeat((4 - (norm.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return new Uint8Array(sig);
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Mint a signed session token. Returns null when no secret is configured.
 * `now` is injectable for tests.
 */
export async function signSession(now: number = Date.now()): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload = b64urlEncode(encoder.encode(JSON.stringify({ exp: now + SESSION_TTL_MS })));
  const sig = b64urlEncode(await hmac(secret, payload));
  return `${payload}.${sig}`;
}

/**
 * Validate a session token: correct signature (constant-time) AND not expired.
 * Returns false for missing token, missing secret, tampering, or expiry.
 */
export async function verifySession(
  token: string | undefined | null,
  now: number = Date.now(),
): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const dot = token.indexOf('.');
  if (dot <= 0 || dot === token.length - 1) return false;
  const payload = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  let expected: Uint8Array;
  let provided: Uint8Array;
  try {
    expected = await hmac(secret, payload);
    provided = b64urlDecode(sigPart);
  } catch {
    return false;
  }
  if (!timingSafeEqual(expected, provided)) return false;

  // Signature is authentic — now enforce expiry.
  try {
    const claims = JSON.parse(decoder.decode(b64urlDecode(payload))) as { exp?: unknown };
    if (typeof claims.exp !== 'number' || now > claims.exp) return false;
  } catch {
    return false;
  }
  return true;
}
