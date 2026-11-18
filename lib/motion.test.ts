import { afterEach, describe, expect, it, vi } from "vitest";
import { safeScrollBehavior } from "./motion";

const stubMatchMedia = (matches: boolean) => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches }) as MediaQueryList),
  );
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("safeScrollBehavior", () => {
  it("returns 'smooth' when reduced motion is NOT preferred", () => {
    stubMatchMedia(false);
    expect(safeScrollBehavior()).toBe("smooth");
  });

  it("returns 'auto' when reduced motion IS preferred", () => {
    stubMatchMedia(true);
    expect(safeScrollBehavior()).toBe("auto");
  });
});
