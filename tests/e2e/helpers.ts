import type { Page, ConsoleMessage, TestInfo } from '@playwright/test';

/**
 * Capture a screenshot and attach it to the current test so it shows up in the
 * HTML report (one evidence shot per spec — ROBONORTH-46 acceptance criteria).
 */
export async function snap(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const body = await page.screenshot({ fullPage: false });
  await testInfo.attach(name, { body, contentType: 'image/png' });
}

/**
 * Wait until a DOM node is part of a *hydrated* React tree.
 *
 * Needed before filling a controlled form: a field filled before hydration keeps
 * its DOM value (React is not yet attached to reset it), so the value "looks"
 * set while React's state stays empty — the form then submits blank. React DOM
 * attaches `__reactFiber$…` / `__reactProps$…` keys to nodes during hydration,
 * so their presence is a reliable "this element is now interactive" signal.
 */
export async function waitForHydration(page: Page, selector: string): Promise<void> {
  await page.locator(selector).first().waitFor({ state: 'attached' });
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      return Object.keys(el).some(
        (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactProps$'),
      );
    },
    selector,
    { timeout: 30_000 },
  );
}

/**
 * Collect serious client-side errors while a spec drives the page.
 *
 * Returns a live array that accumulates:
 *   - uncaught page exceptions (`pageerror`)
 *   - `console.error(...)` calls
 *
 * Resource-load noise (missing demo images, favicon, fonts) and benign dev-only
 * React notices are filtered out so the assertion tracks real app errors, not
 * placeholder assets that have not been committed yet.
 */
export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  const ignore = (text: string): boolean => {
    return (
      // 404s for not-yet-committed demo images / assets
      /Failed to load resource/i.test(text) ||
      /\.(jpg|jpeg|png|webp|svg|gif|ico|woff2?)\b/i.test(text) ||
      /favicon/i.test(text) ||
      // dev-only notices
      /Download the React DevTools/i.test(text) ||
      /\[Fast Refresh\]/i.test(text) ||
      // Chromium policy noise (no real page impact)
      /Permissions policy violation/i.test(text) ||
      /compute-pressure/i.test(text) ||
      // dev-only React hydration-mismatch warning (not emitted in prod builds)
      /hydrat/i.test(text) ||
      /didn't match/i.test(text)
    );
  };

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!ignore(text)) errors.push(`console.error: ${text}`);
    }
  });

  page.on('pageerror', (err: Error) => {
    const text = err.message;
    if (!ignore(text)) errors.push(`pageerror: ${text}`);
  });

  return errors;
}

/** Three known-stable, always-seeded robot slugs for detail-page coverage. */
export const KNOWN_ROBOT_SLUGS = [
  'unitree-g1',
  'figure-02',
  'boston-dynamics-atlas',
] as const;
