import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { width: 320, height: 568, name: 'iPhone SE / Small Mobile' },
  { width: 375, height: 812, name: 'iPhone X / Medium Mobile' },
  { width: 390, height: 844, name: 'iPhone 12/13/14 Mobile' },
  { width: 768, height: 1024, name: 'iPad Portrait / Tablet' },
  { width: 1024, height: 768, name: 'iPad Landscape / Small Desktop' },
  { width: 1366, height: 768, name: 'Standard HD Laptop' },
  { width: 1920, height: 1080, name: 'Full HD Desktop' },
];

test.describe('Responsive Viewports & Overflow Testing', () => {
  for (const vp of VIEWPORTS) {
    test(`Viewport ${vp.width}x${vp.height} (${vp.name}) has no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Wait for content render
      await page.waitForLoadState('networkidle');

      // Check horizontal overflow
      const overflowInfo = await page.evaluate(() => {
        const docWidth = window.innerWidth;
        const elements = document.querySelectorAll('*');
        const culprits: string[] = [];
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1) {
            culprits.push(`${el.tagName}.${el.className} [right: ${rect.right}, width: ${rect.width}]`);
          }
        }
        return {
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          culprits: culprits.slice(0, 5),
        };
      });

      if (overflowInfo.hasOverflow) {
        console.log(`OVERFLOW at ${vp.width}px:`, overflowInfo);
      }
      expect(overflowInfo.hasOverflow).toBe(false);

      // Verify mobile drawer on mobile or desktop navbar on larger viewports
      if (vp.width < 1024) {
        const menuToggle = page.getByRole('button', { name: /Toggle navigation menu/i });
        await expect(menuToggle).toBeVisible();

        // Open menu drawer
        await menuToggle.click();
        await expect(page.getByRole('button', { name: 'Projects' }).first()).toBeVisible();

        // Close menu drawer
        await menuToggle.click();
      } else {
        await expect(page.getByRole('navigation', { name: /Main Navigation/i })).toBeVisible();
      }
    });

    test(`Viewport ${vp.width}x${vp.height} (${vp.name}) renders modal dialogs within bounds`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Open Contact modal
      await page.getByRole('button', { name: 'Contact' }).first().click();
      const dialog = page.locator('div[role="dialog"]');
      await expect(dialog).toBeVisible();

      // Check modal bounding box fits inside viewport
      const box = await dialog.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(vp.width);
      }

      // Close modal
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
    });
  }
});
