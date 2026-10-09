import { test, expect } from '@playwright/test';
import { snap, KNOWN_ROBOT_SLUGS } from './helpers';

test.describe('Robot detail page', () => {
  for (const slug of KNOWN_ROBOT_SLUGS) {
    test(`/robots/${slug} loads with price + spec table`, async ({ page }, testInfo) => {
      const res = await page.goto(`/robots/${slug}`);
      expect(res?.status(), `HTTP status for /robots/${slug}`).toBeLessThan(400);

      // Name heading
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      // Price — detail page renders the robot price prominently (e.g. "From $X")
      await expect(page.getByText(/\$\s?[\d,]/).first()).toBeVisible();

      // Spec table / section
      await expect(
        page.getByRole('heading', { name: /Specifications/i }),
      ).toBeVisible();

      await snap(page, testInfo, `robot-${slug}`);
    });
  }

  test('unknown slug renders the not-found page', async ({ page }) => {
    // NB: under `next dev` the response streams, so headers flush as 200 before
    // notFound() runs — assert the rendered not-found UI rather than the status.
    await page.goto('/robots/this-robot-does-not-exist');
    await expect(page.getByRole('heading', { name: /Page not found/i })).toBeVisible();
  });
});
