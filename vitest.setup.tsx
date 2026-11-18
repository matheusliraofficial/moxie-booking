import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

// jsdom defines scrollTo as a "not implemented" stub; replace it.
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});
