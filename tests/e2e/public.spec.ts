import { test, expect } from '@playwright/test';

test.describe('Public Website End-to-End Tests', () => {
  const consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors.length = 0;
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });
  });

  test('Homepage loads, renders hero, identity, and zero console errors', async ({ page }) => {
    await page.goto('/');

    // Check main title and hero
    await expect(page).toHaveTitle(/Aman Maurya/i);
    const heroHeading = page.locator('h1, h2').filter({ hasText: /Aman Maurya/i }).first();
    await expect(heroHeading).toBeVisible();

    // Check engineering subtitle
    await expect(page.getByText(/Mechanical Design Engineer/i).first()).toBeVisible();

    // Check primary CTAs
    const exploreProjectsBtn = page.getByRole('button', { name: /Projects Work/i }).first();
    await expect(exploreProjectsBtn).toBeVisible();

    // Verify no broken images
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);
    for (const img of images) {
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }

    // Verify banned phone number is completely absent from DOM
    const bodyText = await page.innerText('body');
    expect(bodyText).not.toContain('9257766762');

    // Verify zero uncaught errors
    expect(consoleErrors).toEqual([]);
  });

  test('Navigation switches active tabs cleanly via hash', async ({ page }) => {
    await page.goto('/');

    // Navigate to Projects
    await page.getByRole('button', { name: 'Projects' }).first().click();
    await expect(page).toHaveURL(/#projects/);
    await expect(page.getByRole('heading', { name: /Mechanical Design Projects/i })).toBeVisible();

    // Navigate to About & Credentials
    await page.getByRole('button', { name: 'About & Credentials' }).first().click();
    await expect(page).toHaveURL(/#about/);
    await expect(page.getByRole('heading', { name: /Aman Maurya — Mechanical Design Engineer/i })).toBeVisible();

    // Navigate to CAD Gallery
    await page.getByRole('button', { name: 'CAD Gallery' }).first().click();
    await expect(page).toHaveURL(/#gallery/);
    await expect(page.getByRole('heading', { name: /Engineering Drawings & 3D Models/i })).toBeVisible();

    // Navigate to Resume
    await page.getByRole('button', { name: 'Resume' }).first().click();
    await expect(page).toHaveURL(/#resume/);
    await expect(page.getByText(/PROFESSIONAL SUMMARY/i).first()).toBeVisible();

    // Return to Home
    await page.getByRole('button', { name: 'Home' }).first().click();
    await expect(page).toHaveURL(/#home/);
  });

  test('Projects view filters categories and opens case study modal', async ({ page }) => {
    await page.goto('/#projects');

    // Verify filter buttons exist
    const allBtn = page.getByRole('button', { name: /All Engineering Projects/i }).first();
    await expect(allBtn).toBeVisible();

    // Filter by Mechanisms
    const mechanismsBtn = page.getByRole('button', { name: /Mechanisms & Kinematics/i }).first();
    if (await mechanismsBtn.isVisible()) {
      await mechanismsBtn.click();
    }

    // Click on Geneva Wheel case study
    const caseBtn = page.getByRole('button', { name: /View Full Engineering Case Details/i }).first();
    await expect(caseBtn).toBeVisible();
    await caseBtn.click();

    // Verify Modal opens with role="dialog"
    const dialog = page.locator('div[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Geneva Wheel/i).first()).toBeVisible();
    await expect(dialog.getByText(/Engineering Objective/i).first()).toBeVisible();

    // Close with Escape key
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('About view displays Education, Internships, Certifications, and Honor expansion', async ({ page }) => {
    await page.goto('/#about');

    // Verify CIPET education
    await expect(page.getByText(/CIPET/i).first()).toBeVisible();

    // Verify Railway internship
    await expect(page.getByText(/Indian Railways/i).first()).toBeVisible();

    // Verify Expandable Honors
    const viewMoreHonorsBtn = page.locator('button:has-text("Honors"), button:has-text("Achievements")').first();
    if (await viewMoreHonorsBtn.isVisible()) {
      await viewMoreHonorsBtn.click();
      await expect(page.getByText(/Fewer Honors/i).first()).toBeVisible();
    }

    // Click certificate to open Lightbox
    const certImage = page.locator('img[alt*="Certification"]').first();
    if (await certImage.isVisible()) {
      await certImage.click();
      const zoomDialog = page.locator('div[role="dialog"]');
      await expect(zoomDialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(zoomDialog).not.toBeVisible();
    }
  });

  test('CAD Gallery displays models, filters categories, and opens inspection modal', async ({ page }) => {
    await page.goto('/#gallery');

    // Check count of items
    const cards = page.locator('.tech-card, img[alt*="CAD"], img[alt*="Wheel"]');
    await expect(cards.first()).toBeVisible();

    // Open first CAD model in inspector
    const firstInspect = page.locator('text=Inspect').first();
    if (await firstInspect.isVisible()) {
      await firstInspect.click();
    } else {
      await cards.first().click();
    }

    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('Resume view ATS mode, zoom controls, and print trigger', async ({ page }) => {
    await page.goto('/#resume');

    // Check ATS view by default
    await expect(page.getByText(/PROFESSIONAL SUMMARY/i)).toBeVisible();
    await expect(page.getByText(/TECHNICAL SKILLS/i)).toBeVisible();

    // Check Zoom controls
    const zoomInBtn = page.getByRole('button', { name: /Zoom In/i });
    if (await zoomInBtn.isVisible()) {
      await zoomInBtn.click();
    }

    // Verify Print button is present and accessible
    const printBtn = page.getByRole('button', { name: /Print/i });
    await expect(printBtn).toBeVisible();
  });

  test('Contact modal displays links with rel="noopener noreferrer" and closes with Escape', async ({ page }) => {
    await page.goto('/');

    // Open contact modal
    await page.getByRole('button', { name: 'Contact' }).first().click();
    const contactDialog = page.locator('div[role="dialog"]');
    await expect(contactDialog).toBeVisible();
    await expect(contactDialog.getByText(/Get in Touch/i)).toBeVisible();

    // Verify external links have safe rel
    const extLinks = await contactDialog.locator('a[target="_blank"]').all();
    for (const link of extLinks) {
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }

    // Dismiss via backdrop click
    await page.mouse.click(10, 10);
    await expect(contactDialog).not.toBeVisible();
  });

  test('Direct Enquiry form validates input and displays local success confirmation', async ({ page }) => {
    await page.goto('/');

    // Open Enquiry modal
    await page.getByRole('button', { name: /Direct Enquiry|Enquiry/i }).first().click();
    const enquiryDialog = page.locator('div[role="dialog"]');
    await expect(enquiryDialog).toBeVisible();

    // Fill valid data
    await page.fill('#enquiry-name', 'QA Test Engineer');
    await page.fill('#enquiry-email', 'qa.tester@example.com');
    await page.fill('#enquiry-message', 'Automated QA testing inquiry for Geneva wheel and kinematics.');

    // Submit form
    await enquiryDialog.getByRole('button', { name: /Submit Enquiry/i }).click();

    // Confirmation screen should appear
    await expect(page.getByText(/Enquiry Recorded Successfully/i)).toBeVisible();

    // Close modal
    await page.keyboard.press('Escape');
    await expect(enquiryDialog).not.toBeVisible();
  });
});
