import type { PaymentValues } from "@/lib/schemas";

/**
 * Props for `<PaymentStep>` — the second screen of the booking flow.
 *
 * Collects card information, billing ZIP, and the cancellation-policy
 * acknowledgement. Validation includes a Luhn check, non-past expiry, and
 * requires the ack checkbox to be checked.
 */
export type PaymentStepProps = {
  /**
   * DOM `id` applied to the inner `<form>`. The in-card Book appointment
   * button references it via `type="submit"` because it lives inside this
   * form directly (unlike Contact, which uses the sticky bar).
   */
  formId: string;

  /**
   * Seed values for the form. Preserves what the user typed if they return
   * to this step from Confirmation ("Book another visit") or Back.
   */
  defaultValues: Partial<PaymentValues>;

  /**
   * Called only after the step's zod schema validates. The parent masks
   * the card number before logging and advances to Confirmation.
   */
  onSubmit: (values: PaymentValues) => void;
};
