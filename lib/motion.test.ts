import { afterEach, describe, expect, it, vi } from "vitest";
import { safeScrollBehavior } from "./motion";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("safeScrollBehavior", () => {
  it("returns 'smooth' when reduced motion is NOT preferred", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false }) as never;
    expect(safeScrollBehavior()).toBe("smooth");
  });

  it("returns 'auto' when reduced motion IS preferred", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as never;
    expect(safeScrollBehavior()).toBe("auto");
  });
});
