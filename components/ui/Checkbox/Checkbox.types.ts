import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Props for the shared `<Checkbox>` primitive.
 *
 * The native checkbox is visually hidden but kept clickable (opacity 0,
 * absolute, full-size) so screen readers and keyboard users get the real
 * element while sighted users see our styled indicator.
 *
 * Extends every native `<input>` attribute except `type` (locked to
 * `"checkbox"`).
 */
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /**
   * Label content shown next to the indicator. Supports arbitrary React
   * nodes so callers can embed links or emphasis in the consent copy.
   */
  children?: ReactNode;
};
