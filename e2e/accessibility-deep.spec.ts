import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { fillContact, fillPayment } from "./helpers";

// Wider sweep: WCAG 2.0 + 2.1 A/AA plus best-practice heuristics.
// Lives separately from the main accessibility spec so the baseline
// stays focused on the strict WCAG-AA bar.
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

test("deep axe sweep across all three screens", async ({ page }) => {
  await page.goto("/");

  const contact = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(contact.violations, JSON.stringify(contact.violations, null, 2)).toEqual([]);

  await fillContact(page);
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByRole("heading", { name: /secure your appointment/i })).toBeVisible();

  const payment = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(payment.violations, JSON.stringify(payment.violations, null, 2)).toEqual([]);

  await fillPayment(page);
  await page.getByRole("button", { name: /book appointment/i }).click();
  await expect(page.getByText(/your appointment has been booked/i)).toBeVisible();

  const confirmation = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(confirmation.violations, JSON.stringify(confirmation.violations, null, 2)).toEqual([]);
});
