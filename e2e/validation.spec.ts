import { test, expect } from "@playwright/test";
import { fillContact, fillPayment } from "./helpers";

test.describe("Contact validation", () => {
  test("empty submit flags every required field", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText(/please enter your full name/i)).toBeVisible();
    await expect(page.getByText(/valid email address/i)).toBeVisible();
    await expect(page.getByText(/valid phone number/i)).toBeVisible();
    await expect(page.getByText(/tell us a little about your visit/i)).toBeVisible();
    // still on step 1
    await expect(page.getByRole("heading", { name: /enter your details below/i })).toBeVisible();
  });

  test("bad email blocks the step", async ({ page }) => {
    await page.goto("/");
    await fillContact(page, { email: "not-an-email" });
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.getByText(/valid email address/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /enter your details below/i })).toBeVisible();
  });
});

test.describe("Payment validation", () => {
  test("Luhn-invalid card is rejected", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, { cardNumber: "4242424242424241" });
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.getByText(/card number is invalid/i)).toBeVisible();
  });

  test("expired card is rejected", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, { expiry: "0120" });
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.getByText(/card is expired/i)).toBeVisible();
  });

  test("missing cancellation ack blocks submit", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, {}, { ack: false });
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.getByText(/acknowledge the cancellation policy/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /secure your appointment by card/i }),
    ).toBeVisible();
  });
});
