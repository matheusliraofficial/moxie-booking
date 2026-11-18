import { InputHTMLAttributes } from "react";

/**
 * Input height.
 *
 * - `md`: default input height, matches the Figma Full Name / Email fields.
 * - `sm`: shorter height used for the compact Expiry / CVC / ZIP fields.
 */
export type InputSize = "md" | "sm";

/**
 * Props for the shared `<Input>` primitive. Extends the native `<input>`
 * attributes (minus `size`, which we override with our own union).
 */
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /**
   * Visible label shown above the input. When omitted, callers must pass
   * `aria-label` so the field stays accessible.
   */
  label?: string;

  /**
   * Validation error. When set, the input gets `aria-invalid="true"` and the
   * message is rendered below with an `aria-describedby` link.
   */
  error?: string;

  /** Height variant — defaults to `"md"`. */
  size?: InputSize;
};
