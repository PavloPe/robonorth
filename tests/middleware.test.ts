import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import { signSession } from '@/lib/admin-session';

const PASSWORD = 'test-admin-pw';

function req(
  path: string,
  init: { method?: string; cookie?: string } = {},
): NextRequest {
  const headers = new Headers();
  if (init.cookie) headers.set('cookie', init.cookie);
  return new NextRequest(new URL(`http://localhost${path}`), {
    method: init.method ?? 'GET',
    headers,
  });
}

describe('admin auth middleware', () => {
  let prev: string | undefined;

  beforeEach(() => {
    prev = process.env.ADMIN_PASSWORD;
    process.env.ADMIN_PASSWORD = PASSWORD;
    delete process.env.ADMIN_SESSION_SECRET;
  });

  afterEach(() => {
    if (prev === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = prev;
  });

  it('lets unauthenticated POST /api/admin/login reach the route handler (no redirect)', async () => {
    const res = await middleware(req('/api/admin/login', { method: 'POST' }));
    // NextResponse.next() → 200, no Location redirect to the login page.
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('lets unauthenticated POST /api/admin/logout through to clear the cookie', async () => {
    const res = await middleware(req('/api/admin/logout', { method: 'POST' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('redirects unauthenticated GET /admin to the login page', async () => {
    const res = await middleware(req('/admin'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('redirects unauthenticated GET /api/admin/login (non-POST) instead of leaking the API', async () => {
    const res = await middleware(req('/api/admin/login', { method: 'GET' }));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('lets the unauthenticated login page render', async () => {
    const res = await middleware(req('/admin/login'));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('lets a request with a valid signed token through to /admin', async () => {
    const token = await signSession();
    const res = await middleware(req('/admin', { cookie: `admin_session=${token}` }));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('rejects the raw password as a cookie value (no longer a valid session)', async () => {
    const res = await middleware(req('/admin', { cookie: `admin_session=${PASSWORD}` }));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('redirects a tampered token to the login page', async () => {
    const token = (await signSession())!;
    const tampered = token.slice(0, -2) + (token.endsWith('aa') ? 'bb' : 'aa');
    const res = await middleware(req('/admin', { cookie: `admin_session=${tampered}` }));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('returns 503 when ADMIN_PASSWORD is not configured', async () => {
    delete process.env.ADMIN_PASSWORD;
    const res = await middleware(req('/admin'));
    expect(res.status).toBe(503);
  });
});
