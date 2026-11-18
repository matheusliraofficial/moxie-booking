import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ErrorSummary } from "./ErrorSummary";

describe("ErrorSummary", () => {
  it("renders nothing when there are no errors", () => {
    const { container } = render(<ErrorSummary errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("announces as an alert and lists every error", () => {
    render(
      <ErrorSummary
        errors={[
          { fieldId: "fullName", message: "Please enter your full name" },
          { fieldId: "email", message: "Enter a valid email address" },
        ]}
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("focuses the target field when a row is activated", async () => {
    const target = document.createElement("input");
    target.id = "email";
    document.body.appendChild(target);
    render(
      <ErrorSummary errors={[{ fieldId: "email", message: "Enter a valid email address" }]} />,
    );
    await userEvent.click(screen.getByRole("link"));
    expect(document.activeElement).toBe(target);
    document.body.removeChild(target);
  });
});
