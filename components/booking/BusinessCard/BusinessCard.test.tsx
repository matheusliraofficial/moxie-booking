import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BusinessCard } from "./BusinessCard";
import { goldSpa } from "@/lib/mockBusiness";

describe("BusinessCard", () => {
  it("renders the business name, address, email, phone", () => {
    render(<BusinessCard business={goldSpa} />);
    expect(screen.getByText(goldSpa.name)).toBeInTheDocument();
    expect(screen.getByText(goldSpa.address.line1)).toBeInTheDocument();
    expect(screen.getByText(goldSpa.email)).toBeInTheDocument();
    expect(screen.getByText(goldSpa.phone)).toBeInTheDocument();
  });

  it("links email as mailto and phone as tel", () => {
    render(<BusinessCard business={goldSpa} />);
    expect(screen.getByRole("link", { name: goldSpa.email })).toHaveAttribute(
      "href",
      `mailto:${goldSpa.email}`,
    );
    const phoneLink = screen.getByRole("link", { name: goldSpa.phone });
    expect(phoneLink.getAttribute("href")).toMatch(/^tel:\+?\d+$/);
  });

  it("gives the logo an informative alt", () => {
    render(<BusinessCard business={goldSpa} />);
    expect(screen.getByAltText(`${goldSpa.name} logo`)).toBeInTheDocument();
  });
});
