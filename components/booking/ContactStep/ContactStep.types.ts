import type { ContactValues } from "@/lib/schemas";

/**
 * Props for `<ContactStep>` — the first screen of the booking flow.
 *
 * The step owns its own `useForm` instance; the parent only cares about the
 * final values it emits on valid submit.
 */
export type ContactStepProps = {
  /**
   * DOM `id` applied to the inner `<form>`. The sticky bottom bar's
   * Continue button uses `form={formId}` to submit this step from outside
   * its DOM subtree.
   */
  formId: string;

  /**
   * Seed values for the form. Passed from the parent so navigating back to
   * this step preserves what the user already typed.
   */
  defaultValues: Partial<ContactValues>;

  /**
   * Called only after the step's zod schema validates. The parent merges
   * the values into the booking payload and advances to Payment.
   */
  onSubmit: (values: ContactValues) => void;
};
