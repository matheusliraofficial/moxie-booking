import Image from "next/image";
import { Business } from "@/lib/mockBusiness";
import { strings, t } from "@/lib/strings";

export function BusinessCard({ business }: { business: Business }) {
  const { name, address, email, phone } = business;
  const copy = strings.businessCard;
  return (
    <aside className="flex w-full flex-col items-stretch gap-6 rounded-[12px] border border-border bg-card p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-page bg-card">
          <Image
            src="/figma/gold-spa.png"
            alt={t(copy.logoAlt, { business: name })}
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-[18px] font-bold leading-[22px] tracking-[0.18px] text-ink">
          {name}
        </p>
      </div>

      <dl className="flex flex-col gap-2 text-[16px] leading-[24px]">
        <Row label={copy.addressLabel}>
          <span className="block">{address.line1}</span>
          {address.line2 && <span className="block">{address.line2}</span>}
          <span className="block">
            {address.city}, {address.state} {address.zip}
          </span>
        </Row>
        <Row label={copy.emailLabel}>
          <a href={`mailto:${email}`} className="text-brand hover:underline">
            {email}
          </a>
        </Row>
        <Row label={copy.phoneLabel}>
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
    <div className="flex items-start gap-4">
      <dt className="w-[85px] shrink-0 text-muted">{label}</dt>
      <dd className="flex-1 text-ink">{children}</dd>
    </div>
  );
}
