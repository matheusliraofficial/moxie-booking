/**
 * The three logical steps of the booking flow.
 *
 * Kept as a string literal union (instead of an enum) because it's
 * serialised in no state store — a tiny `useState<BookingStep>` inside
 * `<BookingFlow>` is enough.
 *
 * - `contact`: step 1 — name, email, phone, visit reason.
 * - `payment`: step 2 — card information, billing ZIP, cancellation ack.
 * - `confirmation`: step 3 — success screen, shown after the payload is
 *   logged to the console.
 */
export type BookingStep = "contact" | "payment" | "confirmation";
