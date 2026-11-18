import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("associates label with input via htmlFor/id", () => {
    render(<Input label="Full Name" name="fullName" />);
    const input = screen.getByLabelText("Full Name");
    expect(input).toHaveAttribute("id", "fullName");
  });

  it("accepts typed input", async () => {
    render(<Input label="Email" name="email" />);
    await userEvent.type(screen.getByLabelText("Email"), "a@b.co");
    expect(screen.getByLabelText<HTMLInputElement>("Email").value).toBe("a@b.co");
  });

  it("renders error with aria-invalid + aria-describedby", () => {
    render(<Input label="Email" name="email" error="Enter a valid email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("omits label when not provided", () => {
    render(<Input aria-label="hidden" name="h" />);
    expect(screen.queryByRole("label")).toBeNull();
  });
});
