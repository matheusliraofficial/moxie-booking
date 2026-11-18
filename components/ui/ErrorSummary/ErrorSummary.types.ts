/**
 * A single row rendered inside the error summary.
 */
export type ErrorSummaryItem = {
  /**
   * `id` of the invalid input. The row becomes an anchor that focuses the
   * matching field when activated.
   */
  fieldId: string;
  /** Human-readable error message (same copy shown inline under the input). */
  message: string;
};

/**
 * Props for `<ErrorSummary>`.
 *
 * Rendered at the top of a form after a failed submit attempt. The container
 * is a `role="alert"` region so screen readers announce the whole list the
 * moment it appears.
 */
export type ErrorSummaryProps = {
  /** Flat list of validation errors. */
  errors: ErrorSummaryItem[];
  /** Heading / lead sentence (defaults to a sensible English string). */
  heading?: string;
};
