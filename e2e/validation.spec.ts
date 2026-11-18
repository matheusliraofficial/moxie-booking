import { test, expect } from "@playwright/test";
import { fillContact, fillPayment } from "./helpers";

test.describe("Contact validation", () => {
  test("empty submit flags every required field", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /continue/i }).click();
    // Each error renders twice: in the inline field hint and in the
    // ErrorSummary alert. Assert on the inline hint by its stable id.
    await expect(page.locator("#fullName-error")).toHaveText(/please enter your full name/i);
    await expect(page.locator("#email-error")).toHaveText(/valid email address/i);
    await expect(page.locator("#phone-error")).toHaveText(/valid phone number/i);
    await expect(page.locator("#visitReason-error")).toHaveText(
      /tell us a little about your visit/i,
    );
    // still on step 1
    await expect(page.getByRole("heading", { name: /enter your details below/i })).toBeVisible();
  });

  test("bad email blocks the step", async ({ page }) => {
    await page.goto("/");
    await fillContact(page, { email: "not-an-email" });
    await page.getByRole("button", { name: /continue/i }).click();
    await expect(page.locator("#email-error")).toHaveText(/valid email address/i);
    await expect(page.getByRole("heading", { name: /enter your details below/i })).toBeVisible();
  });

  test("ErrorSummary is announced as a role=alert and links to each field", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /continue/i }).click();
    // Next's route announcer also has role=alert; scope by its heading.
    const alert = page.getByRole("alert", { name: /please fix the following/i });
    await expect(alert).toBeVisible();
    // Clicking the summary row focuses the matching field.
    await alert.getByRole("link", { name: /full name:/i }).click();
    await expect(page.getByLabel("Full Name")).toBeFocused();
  });
});

test.describe("Payment validation", () => {
  test("Luhn-invalid card is rejected", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, { cardNumber: "4242424242424241" });
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.locator("#cardNumber-error")).toHaveText(/card number is invalid/i);
  });

  test("expired card is rejected", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, { expiry: "0120" });
    await page.getByRole("button", { name: /book appointment/i }).click();
    await expect(page.locator("#expiry-error")).toHaveText(/card is expired/i);
  });

  test("missing cancellation ack blocks submit", async ({ page }) => {
    await page.goto("/");
    await fillContact(page);
    await page.getByRole("button", { name: /continue/i }).click();
    await fillPayment(page, {}, { ack: false });
    await page.getByRole("button", { name: /book appointment/i }).click();
    // Inline hint sits below the checkbox; it's not an Input so there's
    // no `-error` id. Use the specific inline paragraph.
    await expect(
      page.getByText("Please acknowledge the cancellation policy", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /secure your appointment by card/i }),
    ).toBeVisible();
  });
});
