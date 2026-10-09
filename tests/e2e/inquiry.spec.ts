import { test, expect } from '@playwright/test';
import { snap, waitForHydration } from './helpers';

test.describe('Inquiry flow', () => {
  // Give this flow its own rate-limit bucket. /api/inquiry limits to 5 requests
  // per minute keyed on client IP (x-forwarded-for); a dedicated, otherwise-
  // unused IP means the submit can never be throttled by other traffic.
  test.use({ extraHTTPHeaders: { 'x-forwarded-for': '198.51.100.77' } });

  test('add robot to basket, submit inquiry, see confirmation', async ({ page }, testInfo) => {
    // 1. Visit a robot and add it to the inquiry basket.
    await page.goto('/robots/unitree-g1');
    const addToCart = page.getByRole('button', { name: /Add to Cart/i }).first();
    await expect(addToCart).toBeVisible();
    // Retry the click until it registers — a click can land before the client
    // component hydrates, in which case the handler is not yet attached. Once a
    // real click lands, the button toggles and the inner assertion passes, so
    // no double-toggle occurs.
    await expect(async () => {
      await addToCart.click();
      await expect(
        page.getByRole('button', { name: /In Cart/i }).first(),
      ).toBeVisible({ timeout: 3000 });
    }).toPass({ timeout: 30_000 });

    // 2. Go to the inquiry page and submit the contact form.
    await page.goto('/inquiry');
    await expect(
      page.getByRole('heading', { level: 1, name: /Get Early Access/i }),
    ).toBeVisible();

    // The form is a controlled client component — fields filled before React
    // hydrates keep their DOM value but never reach React state, so the submit
    // POSTs blank required fields (400). Wait for real hydration first.
    await waitForHydration(page, 'form input#name');

    const name = page.getByLabel('Full Name *');
    const email = page.getByLabel('Email *');
    const city = page.getByLabel('City *');
    await name.fill('E2E Test User');
    await email.fill('e2e-test@example.com');
    await city.selectOption('Calgary');

    // Confirm the values are in React state (controlled inputs mirror state to
    // the DOM) before the single submit — guards against a 400 on blank fields.
    await expect(name).toHaveValue('E2E Test User');
    await expect(email).toHaveValue('e2e-test@example.com');
    await expect(city).toHaveValue('Calgary');

    await snap(page, testInfo, 'inquiry-form-filled');

    await page.getByRole('button', { name: /Submit Inquiry/i }).click();

    // 3. Expect the confirmation state.
    await expect(page.getByText(/Thank you!/i)).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/in touch within 24 hours/i)).toBeVisible();

    await snap(page, testInfo, 'inquiry-confirmation');
  });
});
