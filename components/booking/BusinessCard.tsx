import { Business } from "@/lib/mockBusiness";

export function BusinessCard({ business }: { business: Business }) {
  const { name, address, email, phone, logoInitial } = business;
  return (
    <aside className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-7">
      <div className="flex flex-col items-center gap-2 border-b border-border pb-5">
        <div
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-accent to-[#b97b1d] font-display text-lg font-semibold text-white"
        >
          {logoInitial}
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
          {name}
        </p>
        <h2 className="font-display text-2xl font-semibold text-ink">{name}</h2>
      </div>
      <dl className="mt-5 space-y-4 text-sm">
        <Row label="Address">
          <span>{address.line1}</span>
          {address.line2 && <span className="block">{address.line2}</span>}
          <span className="block">
            {address.city}, {address.state} {address.zip}
          </span>
        </Row>
        <Row label="Email">
          <a href={`mailto:${email}`} className="text-brand hover:underline">
            {email}
          </a>
        </Row>
        <Row label="Phone">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-brand hover:underline">
            {phone}
          </a>
        </Row>
      </dl>
    </aside>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}
