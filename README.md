# Moxie — Public Booking Page

A simplified version of Moxie's public booking flow, built as a frontend take-home.
Three steps, one business (Gold Spa, mocked), full client-side validation, no backend.

- **Live URL:** https://moxie-booking.pages.dev
- **Repo:** https://github.com/matheusliraofficial/moxie-booking

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- `react-hook-form` + `zod` for form state + typed validation schemas
- `lucide-react` for icons
- Deployed on Cloudflare Pages (static export via `next build` + `output: "export"`)

## Setup

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm lint
```

Node 20+ recommended.

## How the flow works

The booking is a single route (`app/page.tsx`) that renders `<BookingFlow />`.
`BookingFlow` keeps the step and the collected booking object in local state and
swaps the right-hand panel between three step components:

1. **ContactStep** — full name, email, phone, visit reason.
2. **PaymentStep** — cardholder name, card number (Luhn + length), MM/YY (not
   expired), CVC (3–4), billing ZIP.
3. **ConfirmationStep** — success summary with masked card last-4.

Each step owns its own `useForm` instance wired to a zod schema in
`lib/schemas.ts`, so the booking payload is always typed end-to-end. The
"Continue" button submits the step; on valid submit the parent merges the values
into the booking object and advances.

When the payment step submits, the full booking object is printed to the
console (as required by the exercise) and the screen auto-transitions to the
confirmation state. The logged copy of the card number is masked — the raw PAN
never enters devtools history or any persistent store.

## Responsive

- **Desktop / tablet:** two-column grid — business info on the left, step form
  on the right.
- **Mobile:** single column, business info stacks above the form.

Breakpoints are Tailwind's defaults (`md` = 768px, `lg` = 1024px).

## Accessibility

- All inputs have real `<label>` associations.
- Errors are rendered inline with `aria-invalid` + `aria-describedby`.
- The step container has `aria-live="polite"` so screen readers announce step
  changes.
- Focus-visible rings on every interactive element.

## AI usage

- **Claude Code** was my pair for the whole build: scaffolding the Next.js app,
  drafting the zod schemas, generating the first pass of the UI primitives, and
  authoring this README.
- **Judgment calls I kept for myself** (and would defend in review):
  - The shape of the booking state machine (single parent with per-step forms,
    rather than a single giant `useForm`) — it keeps each step's validation
    isolated and lets "Back" preserve values naturally.
  - Masking the card number in the `console.log` payload. The exercise says
    "print an object to the console", but writing a full PAN to a debug surface
    felt wrong even for a mock, so I mask the logged copy and leave a comment
    explaining why.
  - Using Luhn + length for card validation instead of just length. It's four
    extra lines, catches the common test-data typo, and is what any real
    checkout would do.
  - Picking Fraunces (serif) + Geist (sans) over the generic "Inter for
    everything" look, to echo the Moxie wordmark's editorial feel.
- **What I did not delegate:** the Figma access failed (view-only file, Figma
  MCP needs edit rights), so the visual direction was reconstructed from the
  PDF screenshot and the Moxie booking flow linked in the exercise. All layout
  decisions were mine.

## Assumptions

- The business data is static (Gold Spa fixture). In production this page would
  be a dynamic route keyed on business slug.
- No date/time picker. The full Moxie flow has one; this exercise explicitly
  drops it, so the visit reason textarea stands in.
- No real payment integration. Stripe Elements / tokenization are out of scope;
  the card inputs are plain fields with client-side validation.
- "Appropriate validation" interpreted as: required fields, email format,
  phone min-length, Luhn-checked card number, non-past expiry, 3–4 digit CVC,
  ZIP min length.

## Tradeoffs

- **One `useForm` per step vs one global form.** Per-step is slightly more
  code but gives correct validation boundaries (don't block step 1 submit on
  step 2 errors) and makes each step independently testable.
- **zod + react-hook-form over native.** Three dependencies, but I get typed
  values, declarative schemas, and inline errors essentially for free. For a
  real production flow this is table stakes.
- **Tailwind v4 theme tokens over a design-system package.** Keeps the project
  single-file and reviewable in 4–6 hours; a real build would factor the color
  / radius / shadow tokens into a shared package.
- **No tests shipped.** I opted for a working, polished UI over a smoke test
  suite within the time budget. The zod schemas are the natural unit-test
  surface if I had another hour.

## Scope decisions (what I left out)

- Date/time slot selection and provider picking.
- Real payment processing, tokenization, 3DS.
- Analytics, i18n, dark mode, cookie banner, auth.
- Persistence — refresh resets the flow. For a real build I'd keep the
  contact step in `sessionStorage` so a mid-flow refresh doesn't lose data.
- Unit / E2E tests. Would add Vitest around `lib/schemas.ts` and a Playwright
  happy-path if I had more time.

## Scope change: "Add SMS opt-in checkbox to Contact"

**What I'd change in the implementation:**

1. Add `smsOptIn: z.boolean().default(false)` to `contactSchema` in
   `lib/schemas.ts`.
2. Add a `<Checkbox>` primitive (mirror of `Input.tsx`) and render it in
   `ContactStep` below the phone field, with explicit consent copy —
   something like:
   > I agree to receive appointment reminders by SMS from {business.name}.
   > Msg & data rates may apply. Reply STOP to opt out.
3. Include the flag in the console-logged booking payload.

The code change is small (maybe 10 minutes). The real work is around that
code.

**How I'd handle it with the PM in a real scenario:**

I'd say yes in principle, then ask four quick questions before writing the
checkbox:

1. **Default state.** Unchecked. TCPA best practice is explicit opt-in, and a
   pre-checked box isn't legally valid consent in most US jurisdictions.
2. **Required or optional.** Optional — if we make it required we're coupling
   the booking to marketing consent, which is a dark pattern and a legal risk.
3. **Who owns the consent copy.** Legal, not me and not the PM. This is the
   bit that gets you sued if it's wrong, and the wording ("promotional" vs
   "transactional", carrier disclosures, STOP/HELP language) matters.
4. **Downstream wiring.** Does our CRM / Twilio pipeline actually consume
   `smsOptIn`? A checkbox that goes nowhere is worse than no checkbox — it
   implies a promise we don't keep.

Then I'd ship it behind the answers to those four questions. If the PM needs
it live today and legal is slow, I'd land the checkbox hidden behind a flag
and enable it once the copy is approved.
