import { test, expect } from '@playwright/test';

test.describe('Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  });

  test('should display correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Henlo there');
  });
});
