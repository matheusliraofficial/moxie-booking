import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BookingFlow } from "./BookingFlow";

describe("BookingFlow", () => {
  it("walks Contact → Payment → Confirmation and logs the booking", async () => {
    const user = userEvent.setup();
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<BookingFlow />);

    // Step 1 — Contact
    expect(screen.getByRole("heading", { name: /enter your details/i })).toBeInTheDocument();
    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "5551234567");
    await user.type(screen.getByLabelText(/visit reason/i), "Botox");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 2 — Payment
    expect(
      await screen.findByRole("heading", { name: /secure your appointment by card/i }),
    ).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4242424242424242");
    await user.type(screen.getByPlaceholderText("MM / YY"), "1230");
    await user.type(screen.getByPlaceholderText("CVV"), "123");
    await user.type(screen.getByPlaceholderText("Billing zip code"), "92108");
    await user.click(screen.getByLabelText(/please reschedule or cancel/i));
    await user.click(screen.getByRole("button", { name: /book appointment/i }));

    // Step 3 — Confirmation + log payload
    expect(await screen.findByText(/your appointment has been booked/i)).toBeInTheDocument();
    expect(log).toHaveBeenCalled();
    const payload = log.mock.calls.find(
      (c) => typeof c[0] === "string" && c[0].includes("Booking submitted"),
    )?.[1] as { payment: { cardNumber: string } };
    expect(payload.payment.cardNumber).toMatch(/\*{4}.*4242$/);
    log.mockRestore();
  });

  it("stays on Contact if validation fails", async () => {
    const user = userEvent.setup();
    render(<BookingFlow />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    const errors = await screen.findAllByText(/please enter your full name/i);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("heading", { name: /enter your details/i })).toBeInTheDocument();
  });
});
