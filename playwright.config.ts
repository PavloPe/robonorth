import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright e2e config for RoboNorth (ROBONORTH-46).
 *
 * Runs headless Chromium against a locally-running Next.js dev server on the
 * highest-traffic user paths. By default Playwright starts its own `next dev`
 * server (with a seeded SQLite DB + a test admin password); if one is already
 * running on the base URL it is reused.
 *
 * Base URL: override with PLAYWRIGHT_BASE_URL (defaults to http://localhost:3000).
 */
const PORT = Number(process.env.PLAYWRIGHT_PORT || 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${PORT}`;

// Test-only admin password injected into the managed dev server so the admin
// login spec can exercise the real auth flow. NOT a production secret.
const E2E_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'e2e-admin-password';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  // `next dev` compiles each route on first request; many parallel cold
  // compiles overwhelm the dev server and cause navigation timeouts. Run
  // serially so each route compiles once without contention — this keeps the
  // suite flake-free (ROBONORTH-46 acceptance: no flake on 3 consecutive runs).
  workers: 1,
  // `next dev` compiles routes on first hit, so give generous timeouts.
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 60_000,
    actionTimeout: 15_000,
    // The app ships a strict CSP (`script-src 'self'` with no nonce /
    // 'unsafe-inline'). Under `next dev`, pages stream their content in via
    // inline scripts, which that CSP blocks — leaving the Suspense fallback
    // (skeleton) on screen and nothing to assert against. bypassCSP lets the
    // browser run those inline scripts so e2e can exercise the real UI.
    // (The CSP/nonce gap itself is tracked separately — see ROBONORTH-46 notes.)
    bypassCSP: true,
  },
  // Make the admin password available to specs.
  metadata: { adminPassword: E2E_ADMIN_PASSWORD },
  projects: [
    {
      name: 'warmup',
      testMatch: /warmup\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['warmup'],
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: process.env.DATABASE_URL || 'file:./prisma/dev.db',
      ADMIN_PASSWORD: E2E_ADMIN_PASSWORD,
    },
  },
});
