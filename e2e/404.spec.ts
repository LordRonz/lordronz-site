import { expect, test } from '@playwright/test';

test.describe('Not Found Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/404', {
      waitUntil: 'domcontentloaded',
    });
  });

  test('should display correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('h2')).toContainText('Page Not Found');
  });
});
