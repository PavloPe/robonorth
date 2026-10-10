import { test, expect } from '@playwright/test';
import { snap, waitForHydration } from './helpers';

/**
 * The managed dev server (see playwright.config.ts webServer.env) is started
 * with ADMIN_PASSWORD set to this same value, so the login flow can be
 * exercised end to end.
 */
function adminPassword(): string {
  return (test.info().config.metadata?.adminPassword as string) || 'e2e-admin-password';
}

test.describe('Admin login', () => {
  test('rejects wrong credentials', async ({ page }, testInfo) => {
    await page.goto('/admin');
    // Unauthenticated access to /admin redirects to the login page.
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole('heading', { name: /Admin Login/i })).toBeVisible();

    // Wait for the form to hydrate so the click is handled by React (otherwise a
    // pre-hydration click triggers a native form submit that just reloads).
    await waitForHydration(page, 'form input[type=password]');
    await page.getByPlaceholder('Password').fill('definitely-the-wrong-password');
    await page.getByRole('button', { name: /^Login$/i }).click();

    await expect(page.getByText(/Invalid password/i)).toBeVisible({ timeout: 20_000 });
    // Still on the login page — not granted access.
    await expect(page).toHaveURL(/\/admin\/login/);

    await snap(page, testInfo, 'admin-wrong-creds');
  });

  test('accepts correct credentials and loads the dashboard', async ({ page }, testInfo) => {
    await page.goto('/admin/login');
    // Wait for hydration, then submit once (see note above).
    await waitForHydration(page, 'form input[type=password]');
    await page.getByPlaceholder('Password').fill(adminPassword());
    await page.getByRole('button', { name: /^Login$/i }).click();

    // Redirected into the dashboard (allow for a cold `/admin` compile).
    await expect(page).toHaveURL(/\/admin(\/)?$/, { timeout: 30_000 });
    await expect(
      page.getByRole('heading', { name: /Admin Dashboard/i }),
    ).toBeVisible({ timeout: 30_000 });

    await snap(page, testInfo, 'admin-dashboard');
  });
});
