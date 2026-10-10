import { test, expect } from '@playwright/test';
import { collectConsoleErrors, snap } from './helpers';

test.describe('Homepage', () => {
  test('renders hero + featured robots without console errors', async ({ page }, testInfo) => {
    const errors = collectConsoleErrors(page);

    await page.goto('/');

    // Hero
    await expect(
      page.getByRole('heading', { level: 1, name: /Humanoid robots/i }),
    ).toBeVisible();
    await expect(page.getByText(/Canada.?s Robot Marketplace/i)).toBeVisible();

    // Featured robots section
    const featured = page.getByRole('heading', { name: /Top Robots/i });
    await expect(featured).toBeVisible();

    // At least one robot card links to a detail page
    const firstRobotLink = page.locator('a[href^="/robots/"]').first();
    await expect(firstRobotLink).toBeVisible();

    await expect(page).toHaveTitle(/RoboNorth/i);

    // Evidence screenshot for the HTML report
    await snap(page, testInfo, 'homepage');

    expect(errors, `Unexpected client errors:\n${errors.join('\n')}`).toEqual([]);
  });
});
