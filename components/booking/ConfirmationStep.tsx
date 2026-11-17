"use client";

import { Check } from "lucide-react";
import type { Business } from "@/lib/mockBusiness";
import type { BookingData } from "@/lib/schemas";
import { maskCardNumber } from "@/lib/format";
import { Button } from "@/components/ui/Button";

type Props = {
  business: Business;
  booking: BookingData;
  onReset: () => void;
};

export function ConfirmationStep({ business, booking, onReset }: Props) {
  const { contact, payment } = booking;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">Confirmed</p>
        <h3 className="font-display text-3xl font-semibold text-ink">You&apos;re all set</h3>
        <p className="max-w-sm text-sm text-ink-soft">
          Thanks{contact?.fullName ? `, ${contact.fullName.split(" ")[0]}` : ""}. We&apos;ve sent a confirmation to{" "}
          <span className="text-ink">{contact?.email}</span>. {business.name} will reach out to finalize a time.
        </p>
      </div>

      <dl className="divide-y divide-border rounded-2xl border border-border bg-page/60 p-5 text-sm">
        <Row label="Business" value={business.name} />
        <Row label="Name" value={contact?.fullName ?? "—"} />
        <Row label="Email" value={contact?.email ?? "—"} />
        <Row label="Phone" value={contact?.phone ?? "—"} />
        <Row label="Reason" value={contact?.visitReason ?? "—"} wrap />
        <Row
          label="Card on file"
          value={payment ? maskCardNumber(payment.cardNumber) : "—"}
        />
      </dl>

      <div className="flex justify-center">
        <Button type="button" variant="ghost" onClick={onReset}>
          Book another visit
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value, wrap }: { label: string; value: string; wrap?: boolean }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-3 py-2.5 first:pt-0 last:pb-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={wrap ? "text-ink break-words" : "text-ink truncate"}>{value}</dd>
    </div>
  );
}
