import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { fillContact, fillPayment } from "./helpers";

test.describe("axe-core accessibility", () => {
  test("Contact screen has 0 WCAG 2 AA violations", async ({ page }) => {
    await page.goto("/");
<<<<<<< HEAD
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
=======
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
>>>>>>> origin/main
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("Payment screen has 0 WCAG 2 AA violations", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByRole("heading", { name: /secure your appointment/i })).toBeVisible();
<<<<<<< HEAD
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
=======
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
>>>>>>> origin/main
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("Confirmation screen has 0 WCAG 2 AA violations", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page);
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.getByText(/your appointment has been booked/i)).toBeVisible();
<<<<<<< HEAD
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
=======
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
>>>>>>> origin/main
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});
