import Image from "next/image";
import { strings, t } from "@/lib/strings";
import type { BusinessCardProps } from "./BusinessCard.types";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <dt className="text-muted w-[85px] shrink-0">{label}</dt>
    <dd className="text-ink flex-1">{children}</dd>
  </div>
);

export const BusinessCard = ({ business }: BusinessCardProps) => {
  const { name, address, email, phone } = business;
  const copy = strings.businessCard;
  return (
    <aside className="border-border bg-card flex w-full flex-col items-stretch gap-6 rounded-[12px] border p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="border-page bg-card relative h-20 w-20 overflow-hidden rounded-full border">
          <Image
            src="/figma/gold-spa.png"
            alt={t(copy.logoAlt, { business: name })}
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-ink text-[18px] leading-[22px] font-bold tracking-[0.18px]">{name}</p>
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
};
