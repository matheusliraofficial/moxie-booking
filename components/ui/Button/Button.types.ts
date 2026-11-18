import { ButtonHTMLAttributes } from "react";

/**
 * Visual style of the button.
 *
 * - `primary`: solid Moxie-violet background with white text — the main CTA
 *   used for Continue / Book appointment.
 * - `ghost`: transparent background with muted text, used for secondary
 *   actions like Back / Book another visit.
 */
export type ButtonVariant = "primary" | "ghost";

/**
 * Button scale.
 *
 * `md` is the default. `lg` increases vertical padding and is used when the
 * button is the only / primary action in a sticky bar or form card.
 */
export type ButtonSize = "md" | "lg";

/**
 * Props for the shared `<Button>` primitive. Extends every native
 * `<button>` attribute so you can pass `type`, `form`, `onClick`, etc.
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual variant — defaults to `"primary"`. */
  variant?: ButtonVariant;

  /** Vertical size — defaults to `"md"`. */
  size?: ButtonSize;

  /**
   * Stretch the button to fill its container's width. Used for the in-card
   * Book appointment CTA.
   */
  fullWidth?: boolean;
};
