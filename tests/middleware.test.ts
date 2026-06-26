import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

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
  });

  afterEach(() => {
    if (prev === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = prev;
  });

  it('lets unauthenticated POST /api/admin/login reach the route handler (no redirect)', () => {
    const res = middleware(req('/api/admin/login', { method: 'POST' }));
    // NextResponse.next() → 200, no Location redirect to the login page.
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('redirects unauthenticated GET /admin to the login page', () => {
    const res = middleware(req('/admin'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('redirects unauthenticated GET /api/admin/login (non-POST) instead of leaking the API', () => {
    const res = middleware(req('/api/admin/login', { method: 'GET' }));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/admin/login');
  });

  it('lets the unauthenticated login page render', () => {
    const res = middleware(req('/admin/login'));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('lets an authenticated request through to /admin', () => {
    const res = middleware(req('/admin', { cookie: `admin_session=${PASSWORD}` }));
    expect(res.status).toBe(200);
    expect(res.headers.get('location')).toBeNull();
  });

  it('returns 503 when ADMIN_PASSWORD is not configured', () => {
    delete process.env.ADMIN_PASSWORD;
    const res = middleware(req('/admin'));
    expect(res.status).toBe(503);
  });
});
