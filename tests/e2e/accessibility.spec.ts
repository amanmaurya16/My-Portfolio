import { test, expect } from '@playwright/test';

test.describe('Automated Accessibility (A11y) & WCAG Tests', () => {
  test('All images have valid descriptive alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt!.trim().length).toBeGreaterThan(0);
    }
  });

  test('Interactive buttons have accessible names or aria-labels', async ({ page }) => {
    await page.goto('/');

    const buttons = await page.locator('button').all();
    expect(buttons.length).toBeGreaterThan(0);

    for (const btn of buttons) {
      const text = await btn.innerText();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      const accessibleName = text.trim() || ariaLabel || title;
      expect(accessibleName && accessibleName.length > 0).toBe(true);
    }
  });

  test('Page retains full visibility and functionality under prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    // Check main elements are visible and not hidden by zero-opacity animations
    const heroName = page.locator('h1, h2').filter({ hasText: /Aman Maurya/i }).first();
    await expect(heroName).toBeVisible();

    // Check navigation buttons remain interactive
    const projectsBtn = page.getByRole('button', { name: 'Projects' }).first();
    await expect(projectsBtn).toBeVisible();
    await projectsBtn.click();
    await expect(page).toHaveURL(/#projects/);
  });

  test('Modal dialogs satisfy accessibility standards (role, aria-modal, focusable close)', async ({ page }) => {
    await page.goto('/');

    // Open Contact modal
    await page.getByRole('button', { name: 'Contact' }).first().click();
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Check aria-modal
    const ariaModal = await dialog.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');

    // Check accessible close button
    const closeBtn = dialog.getByRole('button', { name: /Close/i }).first();
    await expect(closeBtn).toBeVisible();

    // Dismiss dialog with Escape key
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});
