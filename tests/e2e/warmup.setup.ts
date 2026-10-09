import { test, expect } from '@playwright/test';

/**
 * `next dev` compiles each route the first time it is requested. Hitting every
 * critical route once up front (serially) moves that one-time compile cost out
 * of the real specs, so their assertions run against already-compiled, warm
 * routes — the difference between a flaky suite and a stable one.
 */
const ROUTES = [
  '/',
  '/robots/unitree-g1',
  '/robots/__warmup-not-found',
  '/compare',
  '/inquiry',
  '/admin/login',
];

test('warm up critical routes', async ({ page }) => {
  test.setTimeout(240_000);

  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 90_000 }).catch(() => {});
  }

  // Warm the inquiry API route. The honeypot (`_hp`) short-circuits before any
  // DB write, so this compiles the handler without creating junk inquiries.
  await page.request
    .post('/api/inquiry', {
      data: { name: 'warmup', email: 'warmup@example.com', city: 'Calgary', _hp: 'bot' },
    })
    .catch(() => {});

  // Warm the authenticated admin dashboard (its page component + getAdminStats
  // only compile on a successful, logged-in request).
  const adminPassword =
    (test.info().config.metadata?.adminPassword as string) || 'e2e-admin-password';
  try {
    await page.goto('/admin/login', { waitUntil: 'domcontentloaded', timeout: 90_000 });
    await page.getByPlaceholder('Password').fill(adminPassword);
    await page.getByRole('button', { name: /^Login$/i }).click();
    await expect(page.getByRole('heading', { name: /Admin Dashboard/i })).toBeVisible({
      timeout: 90_000,
    });
  } catch {
    // Best-effort warmup — the real admin spec still asserts correctness.
  }
});
