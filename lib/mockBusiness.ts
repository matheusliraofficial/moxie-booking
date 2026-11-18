/**
 * Public-facing information about the business the user is booking with.
 *
 * Rendered in `<BusinessCard>` on every step of the flow. In a real build
 * this would be fetched from an API; here it's a static fixture.
 */
export type Business = {
  /** Trading name (e.g. "Gold Spa"). Also used as the image alt text. */
  name: string;

  /** Physical address, split across up to three visible lines. */
  address: {
    /** Primary street line. */
    line1: string;
    /** Optional second line (suite, unit, room). */
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };

  /**
   * Public contact email. Rendered as a `mailto:` link in Violet so the
   * user can tap to reach the business.
   */
  email: string;

  /**
   * Public contact phone. Rendered as a `tel:` link (whitespace stripped
   * so Safari / iOS Mail accept it).
   */
  phone: string;

  /**
   * Single-letter fallback used when we don't have a photo. Unused in the
   * current build because we ship the Figma `gold-spa.png` asset.
   */
  logoInitial: string;
};

/**
 * Mock business used for the take-home. In production this would come
 * from a dynamic route like `/book/[businessSlug]`.
 */
export const goldSpa: Business = {
  name: "Gold Spa",
  address: {
    line1: "2525 Camino del Rio S",
    line2: "Suite 315 Room B",
    city: "San Diego",
    state: "CA",
    zip: "92108",
  },
  email: "goldspa@gmail.com",
  phone: "+11 123 4567 222",
  logoInitial: "G",
};
