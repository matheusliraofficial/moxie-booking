import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfirmationStep } from "./ConfirmationStep";
import { goldSpa } from "@/lib/mockBusiness";

describe("ConfirmationStep", () => {
  it("renders the success heading + subheading", () => {
    render(<ConfirmationStep business={goldSpa} />);
    expect(screen.getByText(/your appointment has been booked/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmation has been sent/i)).toBeInTheDocument();
  });

  it("nests the business card", () => {
    render(<ConfirmationStep business={goldSpa} />);
    expect(screen.getByText(goldSpa.name)).toBeInTheDocument();
    expect(screen.getByText(goldSpa.email)).toBeInTheDocument();
  });
});
