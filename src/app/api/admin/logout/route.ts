import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-session';

// Clears the admin session cookie (ROBONORTH-60). Stateless tokens can't be
// revoked server-side individually, so logout expires the cookie immediately;
// rotating ADMIN_SESSION_SECRET / ADMIN_PASSWORD invalidates all outstanding
// tokens at once.
export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
