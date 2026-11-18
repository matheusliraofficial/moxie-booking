"use client";

import Image from "next/image";
import { strings } from "@/lib/strings";
import { BusinessCard } from "@/components/booking/BusinessCard";
import type { ConfirmationStepProps } from "./ConfirmationStep.types";

export const ConfirmationStep = ({ business }: ConfirmationStepProps) => {
  const copy = strings.confirmation;
  return (
    <div className="flex w-full max-w-[542px] flex-col items-stretch gap-4">
      <div className="flex flex-col items-center gap-6 rounded-[16px] border border-border bg-card px-[60px] py-10">
        <div className="relative h-[200px] w-[200px]">
          <Image
            src="/figma/success-check.svg"
            alt={copy.successIconAlt}
            fill
            sizes="200px"
            priority
          />
        </div>
        <p className="text-center text-[18px] font-bold leading-[22px] tracking-[0.18px] text-label">
          {copy.heading}
        </p>
        <p className="text-center text-[16px] leading-[24px] text-ink">{copy.subheading}</p>
      </div>
      <BusinessCard business={business} />
    </div>
  );
};
