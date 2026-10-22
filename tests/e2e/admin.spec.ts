import { test, expect } from '@playwright/test';

test.describe('Admin Panel & Studio CMS Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start with canonical data
    await page.goto('/admin.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Admin dashboard loads with accurate metric counters', async ({ page }) => {
    await page.goto('/admin.html');

    // Heading verification
    await expect(page.getByText(/Studio CMS/i).first()).toBeVisible();
    await expect(page.getByText(/Aman Maurya/i).first()).toBeVisible();

    // Metric cards verification
    await expect(page.getByText(/CAD & Engineering Projects/i).first()).toBeVisible();
    await expect(page.getByText(/CAD Repository Assets/i).first()).toBeVisible();
    await expect(page.getByText(/Awards & Certifications/i).first()).toBeVisible();
    await expect(page.getByText(/Academic Qualifications/i).first()).toBeVisible();

    // Verify Schema Validation status
    await expect(page.getByText(/Runtime Schema Validation/i).first()).toBeVisible();
    await expect(page.getByText(/Passed \(0 Errors\)/i).first()).toBeVisible();
  });

  test('Editing profile activates Unsaved Edits and Save Local Draft persists to localStorage', async ({ page }) => {
    await page.goto('/admin.html');

    // Navigate to Profile section
    await page.getByRole('button', { name: /Profile & About/i }).click();

    // Edit Full Name field
    const nameInput = page.locator('input[value="Aman Maurya"]').first();
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Aman Maurya - QA Test');

    // Unsaved edits badge should appear
    await expect(page.getByText(/Unsaved Edits/i).first()).toBeVisible();

    // Click Save Local Draft
    await page.getByRole('button', { name: /Save Local Draft/i }).click();

    // Verify localStorage has draft data
    const hasDraft = await page.evaluate(() => {
      return localStorage.getItem('aman_maurya_portfolio_draft_v2') !== null;
    });
    expect(hasDraft).toBe(true);

    // Refresh page and ensure draft persists
    await page.reload();
    await page.getByRole('button', { name: /Profile & About/i }).click();
    await expect(page.locator('input[value="Aman Maurya - QA Test"]').first()).toBeVisible();
  });

  test('Live Preview modal supports viewports and exits cleanly', async ({ page }) => {
    await page.goto('/admin.html');

    // Click Live Preview
    await page.getByRole('button', { name: /Live Preview/i }).first().click();

    // Live preview banner should be visible
    await expect(page.getByText(/Live Draft Preview/i)).toBeVisible();

    // Test viewport switchers
    const tabletBtn = page.getByRole('button', { name: /Tablet/i });
    if (await tabletBtn.isVisible()) {
      await tabletBtn.click();
    }

    const mobileBtn = page.getByRole('button', { name: /Mobile/i });
    if (await mobileBtn.isVisible()) {
      await mobileBtn.click();
    }

    // Exit preview via Escape key
    await page.keyboard.press('Escape');
    await expect(page.getByText(/Live Draft Preview/i)).not.toBeVisible();
  });

  test('Reset to Canonical Data restores original data with confirmation dialog', async ({ page }) => {
    await page.goto('/admin.html');

    // First modify something
    await page.getByRole('button', { name: /Profile & About/i }).click();
    const nameInput = page.locator('input[value="Aman Maurya"]').first();
    await nameInput.fill('Temporary Name');
    await page.getByRole('button', { name: /Save Local Draft/i }).click();

    // Go to Settings tab
    await page.getByRole('button', { name: /Settings & Contact/i }).click();

    // Click Reset to Canonical
    const resetBtn = page.getByRole('button', { name: /Reset All Edits to Canonical Data/i });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Confirm dialog should appear
    const confirmDialog = page.locator('div[role="dialog"]');
    await expect(confirmDialog).toBeVisible();
    await expect(confirmDialog.getByText(/Reset to Canonical/i)).toBeVisible();

    // Click Confirm in dialog
    await confirmDialog.getByRole('button', { name: /Reset Everything/i }).click();

    // Verify localStorage draft was removed
    const hasDraft = await page.evaluate(() => {
      return localStorage.getItem('aman_maurya_portfolio_draft_v2') !== null;
    });
    expect(hasDraft).toBe(false);
  });
});
