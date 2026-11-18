import type { Business } from "@/lib/mockBusiness";

/**
 * Props for `<BusinessCard>`.
 *
 * Renders the left-column card showing the business (name, logo, address,
 * email, phone). Used on the Contact, Payment, and Confirmation screens.
 */
export type BusinessCardProps = {
  /** The business to render. Mocked to Gold Spa for this take-home. */
  business: Business;
};
