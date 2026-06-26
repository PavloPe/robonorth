import { NextRequest, NextResponse } from 'next/server';
import {
  signSession,
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
} from '@/lib/admin-session';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Issue an opaque HMAC-signed token — never the password itself (ROBONORTH-60).
  const token = await signSession();
  if (!token) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return response;
}
