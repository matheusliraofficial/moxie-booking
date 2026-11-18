import type { Business } from "@/lib/mockBusiness";

/**
 * Props for `<ConfirmationStep>` — the third and final screen.
 *
 * Shows the success state (checkmark, heading, subheading) plus a copy of
 * the business card so the user can double-check the details of their
 * appointment.
 */
export type ConfirmationStepProps = {
  /**
   * The business the appointment was booked with. Rendered inside the
   * nested `<BusinessCard>`.
   */
  business: Business;
};
