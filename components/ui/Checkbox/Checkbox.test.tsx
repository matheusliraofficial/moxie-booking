import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders the children as its label", () => {
    render(
      <Checkbox id="x" name="x" onChange={() => {}}>
        I agree
      </Checkbox>,
    );
    expect(screen.getByLabelText("I agree")).toBeInTheDocument();
  });

  it("toggles via click on label", async () => {
    const onChange = vi.fn();
    render(
      <Checkbox id="x" name="x" onChange={onChange}>
        Accept
      </Checkbox>,
    );
    await userEvent.click(screen.getByLabelText("Accept"));
    expect(onChange).toHaveBeenCalled();
  });

  it("exposes checked state", () => {
    render(
      <Checkbox id="x" name="x" checked onChange={() => {}}>
        Done
      </Checkbox>,
    );
    expect(screen.getByLabelText("Done")).toBeChecked();
  });
});
