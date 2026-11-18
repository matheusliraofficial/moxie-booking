import { describe, expect, it } from "vitest";
import { contactSchema, paymentSchema } from "./schemas";

describe("contactSchema", () => {
  it("passes on a valid payload", () => {
    const r = contactSchema.safeParse({
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "5551234567",
      visitReason: "Botox",
    });
    expect(r.success).toBe(true);
  });

  it("fails on bad email", () => {
    const r = contactSchema.safeParse({
      fullName: "Jane Doe",
      email: "nope",
      phone: "5551234567",
      visitReason: "Botox",
    });
    expect(r.success).toBe(false);
  });
});

describe("paymentSchema", () => {
  const future = "12/30";
  const good = {
    cardNumber: "4242424242424242",
    expiry: future,
    cvc: "123",
    zip: "92108",
    cancellationAck: true as const,
  };

  it("passes on a valid payload", () => {
    expect(paymentSchema.safeParse(good).success).toBe(true);
  });

  it("rejects Luhn-invalid cards", () => {
    const r = paymentSchema.safeParse({ ...good, cardNumber: "4242424242424241" });
    expect(r.success).toBe(false);
  });

  it("rejects expired card", () => {
    const r = paymentSchema.safeParse({ ...good, expiry: "01/20" });
    expect(r.success).toBe(false);
  });

  it("rejects missing cancellationAck", () => {
    const r = paymentSchema.safeParse({ ...good, cancellationAck: false });
    expect(r.success).toBe(false);
  });
});
