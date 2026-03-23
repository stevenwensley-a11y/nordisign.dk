// @ts-check
// Contract tests — nordisign.dk
//
// Letvægt manifest-drevet kontrakttest.
// Verificerer kun definerede kontrakter fra manifest.json.
// Max 10 tests — hold det minimalt (exit-pakke, ingen vedligeholdelse).
//
// Kør: BASE_URL=http://localhost:8080 npx playwright test tests/contract.spec.js

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

// ── 1. Forside ───────────────────────────────────────────────────────────────

test('GET / returnerer 200', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/`);
  expect(response.status()).toBe(200);
});

// ── 2. Core sider (expected_status_codes fra manifest) ───────────────────────

for (const path of ['/om/', '/kontakt/', '/portfolio/', '/proces/', '/produkt/']) {
  test(`GET ${path} returnerer 200`, async ({ request }) => {
    const response = await request.get(`${BASE_URL}${path}`);
    expect(response.status()).toBe(200);
  });
}

// ── 3. Navigation: ingen brudte nav-links ────────────────────────────────────

test('Forside nav-links er ikke brudte', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  const navLinks = await page.locator('nav a[href^="/"]').all();
  expect(navLinks.length, 'Nav bør have mindst 2 links').toBeGreaterThanOrEqual(2);

  for (const link of navLinks.slice(0, 6)) {
    const href = await link.getAttribute('href');
    if (!href || href === '/') continue;
    const response = await page.request.get(`${BASE_URL}${href}`);
    expect(response.status(), `Nav-link ${href} er brudt`).toBeLessThan(400);
  }
});

// ── 4. Kontaktformular: har action-attribut (critical flow: kontakt-formular) ─

test('Kontakt-side har formular med action-attribut', async ({ page }) => {
  await page.goto(`${BASE_URL}/kontakt/`);
  const form = page.locator('form');
  await expect(form).toBeVisible();
  const action = await form.getAttribute('action');
  expect(action, 'Formular mangler action-attribut').toBeTruthy();
});
