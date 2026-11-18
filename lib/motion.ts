/**
 * Returns a scroll behavior that respects the user's system
 * `prefers-reduced-motion` setting. Falls back to `"smooth"` on SSR.
 */
export const safeScrollBehavior = (): ScrollBehavior => {
  if (typeof window === "undefined") return "smooth";
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
};
