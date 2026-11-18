import { describe, expect, it } from "vitest";
import { formatCardNumber, formatExpiry, formatPhone, maskCardNumber, luhnValid } from "./format";

describe("format", () => {
  it("formatCardNumber inserts spaces every 4 digits", () => {
    expect(formatCardNumber("4242424242424242")).toBe("4242 4242 4242 4242");
    expect(formatCardNumber("abc424242")).toBe("4242 42");
  });

  it("formatExpiry inserts a slash after month", () => {
    expect(formatExpiry("1230")).toBe("12/30");
    expect(formatExpiry("12")).toBe("12");
  });

  it("formatPhone formats US-style numbers", () => {
    expect(formatPhone("5551234567")).toBe("(555) 123-4567");
  });

  it("maskCardNumber keeps only the last 4 digits", () => {
    expect(maskCardNumber("4242424242424242")).toBe("**** **** **** 4242");
  });

  it("luhnValid accepts valid, rejects invalid", () => {
    expect(luhnValid("4242 4242 4242 4242")).toBe(true);
    expect(luhnValid("4242 4242 4242 4241")).toBe(false);
  });
});
