import { test, expect } from '@playwright/test';
import { snap } from './helpers';

test.describe('Compare page', () => {
  test('add two robots, render side by side, remove one', async ({ page }, testInfo) => {
    await page.goto('/compare');

    await expect(
      page.getByRole('heading', { name: /Compare Robots Side by Side/i }),
    ).toBeVisible();

    const addSelect = page.getByLabel('Add robot to comparison');
    // The select is disabled until /api/robots resolves (selectOption auto-waits
    // for enabled). Retry the first add until it registers — the onChange handler
    // only fires once the client component has hydrated.
    await expect(async () => {
      await addSelect.selectOption('unitree-g1');
      await expect(page.getByText('Unitree G1', { exact: true }).first()).toBeVisible({
        timeout: 3000,
      });
    }).toPass({ timeout: 30_000 });

    await addSelect.selectOption('figure-02');

    // Both robots appear as selected pills.
    await expect(page.getByText('Unitree G1', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Figure 02', { exact: true }).first()).toBeVisible();

    // Capacity indicator reflects 2 selected.
    await expect(page.getByText('2/4')).toBeVisible();

    // Side-by-side comparison table renders a Price row.
    await expect(page.getByText('Price', { exact: true }).first()).toBeVisible();

    // URL is updated with both robot ids (shareable comparison).
    await expect(page).toHaveURL(/robots=unitree-g1,figure-02/);

    await snap(page, testInfo, 'compare-two-robots');

    // Remove one robot via its pill's close button.
    const g1PillContainer = page
      .locator('span', { hasText: 'Unitree G1' })
      .filter({ has: page.getByRole('button') })
      .first();
    await g1PillContainer.getByRole('button').click();

    // Now only one robot remains selected.
    await expect(page.getByText('1/4')).toBeVisible();
    await expect(page).toHaveURL(/robots=figure-02/);
    await expect(page).not.toHaveURL(/unitree-g1/);

    await snap(page, testInfo, 'compare-after-remove');
  });
});
