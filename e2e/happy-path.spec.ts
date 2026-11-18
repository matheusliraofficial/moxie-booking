import { test, expect } from "@playwright/test";
import { fillContact, fillPayment } from "./helpers";

test("walks Contact → Payment → Confirmation and logs a masked payload", async ({ page }) => {
  const logs: unknown[] = [];
  page.on("console", (m) => m.type() === "log" && logs.push(m.args()));

<<<<<<< HEAD
  const payload = page.waitForEvent(
    "console",
    (m) => m.type() === "log" && m.text().includes("Booking submitted"),
=======
  const payload = page.waitForEvent("console", (m) =>
    m.type() === "log" && m.text().includes("Booking submitted"),
>>>>>>> origin/main
  );

  await page.goto("/");

  // Step 1
  await expect(page.getByRole("heading", { name: /enter your details below/i })).toBeVisible();
  await fillContact(page);
  await page.getByRole("button", { name: /continue/i }).click();

  // Step 2
  await expect(
    page.getByRole("heading", { name: /secure your appointment by card/i }),
  ).toBeVisible();
  await fillPayment(page);
  await page.getByRole("button", { name: /book appointment/i }).click();

  // Step 3
  await expect(page.getByText(/your appointment has been booked/i)).toBeVisible();
  await expect(page.getByText(/confirmation has been sent/i)).toBeVisible();

  const msg = await payload;
<<<<<<< HEAD
  const data = (await msg.args()[1].jsonValue()) as {
=======
  const data = await msg.args()[1].jsonValue() as {
>>>>>>> origin/main
    payment: { cardNumber: string };
    contact: { email: string };
  };
  expect(data.payment.cardNumber).toMatch(/\*{4} \*{4} \*{4} 4242$/);
  expect(data.contact.email).toBe("jane@example.com");
});
