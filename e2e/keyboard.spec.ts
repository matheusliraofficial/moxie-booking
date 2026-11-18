import { test, expect } from "@playwright/test";

test("keyboard-only user can navigate the first field and submit with Enter", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Full Name").focus();
  await expect(page.getByLabel("Full Name")).toBeFocused();

  // Tab to Email
  await page.keyboard.press("Tab");
  await expect(page.getByLabel("Email", { exact: true })).toBeFocused();

  // Fill via keyboard + press Enter inside the form triggers submit
  await page.getByLabel("Full Name").fill("Jane Doe");
  await page.getByLabel("Email", { exact: true }).fill("jane@example.com");
  await page.getByLabel("Phone").fill("5551234567");
  await page.getByLabel("Visit reason").fill("Botox");
  await page.getByLabel("Full Name").focus();
  await page.keyboard.press("Enter");

  await expect(
    page.getByRole("heading", { name: /secure your appointment by card/i }),
  ).toBeVisible();
});
