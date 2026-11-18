import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("binds label to textarea", () => {
    render(<Textarea label="Visit reason" name="visitReason" />);
    expect(screen.getByLabelText("Visit reason")).toHaveAttribute("id", "visitReason");
  });

  it("shows error", () => {
    render(<Textarea label="Visit reason" name="visitReason" error="Too short" />);
    const area = screen.getByLabelText("Visit reason");
    expect(area).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    render(<Textarea label="Visit reason" name="visitReason" />);
    await userEvent.type(screen.getByLabelText("Visit reason"), "Botox");
    expect(screen.getByLabelText<HTMLTextAreaElement>("Visit reason").value).toBe("Botox");
  });
});
