import { expect, test } from '@playwright/test';

const IGNORED_BROWSER_ERRORS = [
  'Viewport argument key "minimal-ui" not recognized and ignored.',
];

async function readRevealState(page) {
  return page.evaluate(() => {
    const reveal = window.Reveal;
    if (!reveal) {
      return { hasReveal: false };
    }
    const indices = reveal.getIndices();
    return {
      hasReveal: true,
      indices,
      controlsEnabled: reveal.getConfig().controls,
      keyboardEnabled: reveal.getConfig().keyboard,
    };
  });
}

test('keyboard navigation advances slides', async ({ page, browserName }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page.locator('.reveal')).toBeVisible();

  const initial = await readRevealState(page);
  expect(initial.hasReveal).toBeTruthy();

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);

  const next = await readRevealState(page);
  const relevantErrors = errors.filter(
    error => !IGNORED_BROWSER_ERRORS.includes(error)
  );

  expect(next.indices.h).toBeGreaterThan(initial.indices.h);
  expect(relevantErrors, `${browserName} emitted browser errors`).toEqual([]);
});

test('control navigation advances slides', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const initial = await readRevealState(page);
  await page.locator('.navigate-right').click();
  await page.waitForTimeout(500);
  const next = await readRevealState(page);

  expect(next.indices.h).toBeGreaterThan(initial.indices.h);
});
