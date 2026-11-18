import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Continue</Button>);
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("disables correctly", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Blocked</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies fullWidth", () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
});
