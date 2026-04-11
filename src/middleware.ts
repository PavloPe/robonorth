import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================================
// Improvement #34: API rate limiter (in-memory, per-IP)
// Improvement #35: HTTP caching headers
// Improvement #39: CSP nonce generation for inline scripts
// Improvement #40: 301 redirects for old/moved pages
// ============================================================================

// Simple in-memory rate limiter (per-IP, resets each minute)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, RATE_LIMIT - entry.count);
  return { allowed: entry.count <= RATE_LIMIT, remaining };
}

// Lazy cleanup: purge stale entries when map grows beyond threshold
const CLEANUP_THRESHOLD = 1000;
function cleanupIfNeeded() {
  if (rateLimitMap.size > CLEANUP_THRESHOLD) {
    const now = Date.now();
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }
}

// Redirect map for old/moved pages (Improvement #40)
const redirects: Record<string, string> = {
  '/robots/catalog': '/robots',
  '/brands': '/manufacturers',
  '/humanoid-robots': '/robots',
  '/robot-comparison': '/compare',
  '/early-access': '/inquiry',
  '/signup': '/inquiry',
  '/pricing': '/robots',
  '/shipping': '/blog/complete-robot-buying-guide-canada-2026',
  '/faq/shipping': '/faq',
  '/faq/pricing': '/faq',
  '/blog/buying-guide': '/blog/complete-robot-buying-guide-canada-2026',
  '/about-us': '/about',
  '/contact-us': '/contact',
  '/support': '/support-plans',
  '/maintenance': '/support-plans',
};

// Pre-compute CSP header at module load (constant across requests)
const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https: blob:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src 'self' https://www.youtube.com https://youtube.com",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(process.env.ENABLE_HTTPS === 'true' ? ["upgrade-insecure-requests"] : []),
].join('; ');

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin auth (P0 fix) ─────────────────────────────────────────────
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return new NextResponse('Admin not configured', { status: 503 });
    }
    const cookie = request.cookies.get('admin_session');
    if (cookie?.value !== adminPassword) {
      // If this is a POST to /admin/login, check the password
      if (pathname === '/admin/login' && request.method === 'POST') {
        // Login handled by API route — let it through
      } else if (pathname === '/admin/login') {
        // Show login page — let it through
      } else {
        // Redirect to login
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // ── Redirects (Improvement #40) ──────────────────────────────────────
  const redirectTo = redirects[pathname];
  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  // ── Rate Limiting for API routes (Improvement #34) ───────────────────
  if (pathname.startsWith('/api/')) {
    cleanupIfNeeded();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const { allowed, remaining } = checkRateLimit(ip);

    response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // API caching headers
    if (pathname === '/api/robots') {
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    } else if (pathname === '/api/health') {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    } else {
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    response.headers.set('X-Robots-Tag', 'noindex');
  }

  // ── HTTP Caching Headers (Improvement #35) ───────────────────────────
  // Static pages get cache headers
  if (!pathname.startsWith('/api/') && !pathname.startsWith('/_next/')) {
    // Blog and static content pages — cache for 1 hour, revalidate for 24h
    if (pathname.startsWith('/blog/') || pathname === '/about' || pathname === '/privacy' || pathname === '/terms') {
      response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    }
    // Dynamic pages — shorter cache
    else if (pathname.startsWith('/robots/') || pathname.startsWith('/manufacturers/')) {
      response.headers.set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    }
  }

  // ── Security Headers (all routes) ────────────────────────────────────
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), accelerometer=(), gyroscope=(), magnetometer=(), payment=(), usb=(), browsing-topics=()'
  );
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');

  // CSP — hoisted to module scope for performance (see CSP_HEADER above)
  response.headers.set('Content-Security-Policy', CSP_HEADER);

  // HSTS only when HTTPS is actually configured
  if (process.env.ENABLE_HTTPS === 'true') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
