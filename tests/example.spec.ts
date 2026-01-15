import { test, expect } from '@playwright/test';

test.describe('Example Tests', () => {
  test('should load Playwright homepage', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Check page title
    await expect(page).toHaveTitle(/Playwright/);
    
    // Check for main heading
    const heading = page.getByRole('heading', { name: 'Playwright' });
    await expect(heading).toBeVisible();
  });

  test('should navigate to documentation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Click on Docs link
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // Verify we're on the docs page
    await expect(page).toHaveURL(/.*docs/);
  });

  test('should search for content', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Look for search functionality (if available)
    const searchButton = page.locator('button[aria-label*="Search"]').first();
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.keyboard.type('test');
      await page.waitForTimeout(500);
    }
    
    // Verify page loaded successfully
    await expect(page).toHaveTitle(/Playwright/);
  });
});
