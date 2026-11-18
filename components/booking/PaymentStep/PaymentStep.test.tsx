import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PaymentStep } from "./PaymentStep";

function renderStep() {
  const onSubmit = vi.fn();
  render(<PaymentStep formId="pay" defaultValues={{}} onSubmit={onSubmit} />);
  return { onSubmit };
}

const fillValid = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4242424242424242");
  await user.type(screen.getByPlaceholderText("MM / YY"), "1230");
  await user.type(screen.getByPlaceholderText("CVV"), "123");
  await user.type(screen.getByPlaceholderText("Billing zip code"), "92108");
};

const submitForm = async () =>
  act(async () => {
    (document.getElementById("pay") as HTMLFormElement).requestSubmit();
  });

describe("PaymentStep", () => {
  it("renders the secure-card heading and inputs", () => {
    renderStep();
    expect(
      screen.getByRole("heading", { name: /secure your appointment by card/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("1234 1234 1234 1234")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM / YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Billing zip code")).toBeInTheDocument();
  });

  it("blocks submit without the cancellation ack checkbox", async () => {
    const { onSubmit } = renderStep();
    await fillValid();
    await submitForm();
    const matches = await screen.findAllByText(/acknowledge the cancellation policy/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects a card that fails Luhn", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderStep();
    await user.type(screen.getByPlaceholderText("1234 1234 1234 1234"), "4242424242424241");
    await user.type(screen.getByPlaceholderText("MM / YY"), "1230");
    await user.type(screen.getByPlaceholderText("CVV"), "123");
    await user.type(screen.getByPlaceholderText("Billing zip code"), "92108");
    await user.click(screen.getByLabelText(/please reschedule or cancel/i));
    await submitForm();
    const errs = await screen.findAllByText(/card number is invalid/i);
    expect(errs.length).toBeGreaterThanOrEqual(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid card + checked ack", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderStep();
    await fillValid();
    await user.click(screen.getByLabelText(/please reschedule or cancel/i));
    await submitForm();
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      expiry: "12/30",
      cvc: "123",
      zip: "92108",
      cancellationAck: true,
    });
  });
});
