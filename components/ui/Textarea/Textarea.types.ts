import { TextareaHTMLAttributes } from "react";

/**
 * Props for the shared `<Textarea>` primitive. Extends every native
 * `<textarea>` attribute (`rows`, `placeholder`, etc.).
 */
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /**
   * Visible label shown above the textarea. Required for accessibility —
   * when omitted, pass an `aria-label` instead.
   */
  label?: string;

  /**
   * Validation error. When set, the textarea gets `aria-invalid="true"` and
   * the message is rendered below with an `aria-describedby` link.
   */
  error?: string;
};
