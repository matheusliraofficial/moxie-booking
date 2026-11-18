import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactStep } from "./ContactStep";

function renderStep(overrides: Partial<Parameters<typeof ContactStep>[0]> = {}) {
  const onSubmit = vi.fn();
  render(<ContactStep formId="contact" defaultValues={{}} onSubmit={onSubmit} {...overrides} />);
  return { onSubmit };
}

async function submit() {
  await userEvent.click(
    (await screen.findByRole("button", { name: /submit/i, hidden: true }).catch(() => null)) ??
      document.querySelector('button[type="submit"]')!,
  );
}

describe("ContactStep", () => {
  it("shows the heading and all required fields", () => {
    renderStep();
    expect(screen.getByRole("heading", { name: /enter your details/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/visit reason/i)).toBeInTheDocument();
  });

  it("surfaces validation errors on invalid submit and does not call onSubmit", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderStep();
    const form = document.getElementById("contact") as HTMLFormElement;
    form.requestSubmit();
    await screen.findByText(/please enter your full name/i);
    expect(onSubmit).not.toHaveBeenCalled();
    // bad email path
    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.type(screen.getByLabelText(/phone/i), "5551234567");
    await user.type(screen.getByLabelText(/visit reason/i), "Botox");
    form.requestSubmit();
    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits typed values when valid", async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderStep();
    await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "5551234567");
    await user.type(screen.getByLabelText(/visit reason/i), "Botox consultation");
    (document.getElementById("contact") as HTMLFormElement).requestSubmit();
    await vi.waitFor(() => expect(onSubmit).toHaveBeenCalled());
    const payload = onSubmit.mock.calls[0][0];
    expect(payload).toMatchObject({
      fullName: "Jane Doe",
      email: "jane@example.com",
      visitReason: "Botox consultation",
    });
  });
});
