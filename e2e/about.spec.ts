import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/about', {
      waitUntil: 'domcontentloaded',
    });
  });

  test('should display correct heading', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(
      "Hey, I'm Aaron Christopher",
    );
  });
});
