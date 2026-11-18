import type { Page } from "@playwright/test";

export const fillContact = async (
  page: Page,
  values: Partial<{ fullName: string; email: string; phone: string; visitReason: string }> = {},
) => {
  const v = {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "5551234567",
    visitReason: "Botox consultation",
    ...values,
  };
  await page.getByLabel("Full Name").fill(v.fullName);
  await page.getByLabel("Email", { exact: true }).fill(v.email);
  await page.getByLabel("Phone").fill(v.phone);
  await page.getByLabel("Visit reason").fill(v.visitReason);
};

export const fillPayment = async (
  page: Page,
  values: Partial<{ cardNumber: string; expiry: string; cvc: string; zip: string }> = {},
  { ack = true }: { ack?: boolean } = {},
) => {
  const v = {
    cardNumber: "4242424242424242",
    expiry: "1230",
    cvc: "123",
    zip: "92108",
    ...values,
  };
  await page.getByPlaceholder("1234 1234 1234 1234").fill(v.cardNumber);
  await page.getByPlaceholder("MM / YY").fill(v.expiry);
  await page.getByPlaceholder("CVV").fill(v.cvc);
  await page.getByPlaceholder("Billing zip code").fill(v.zip);
  if (ack) await page.getByLabel(/please reschedule or cancel/i).check();
};
