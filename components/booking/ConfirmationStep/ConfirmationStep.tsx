"use client";

import Image from "next/image";
import { strings } from "@/lib/strings";
import { BusinessCard } from "@/components/booking/BusinessCard";
import type { ConfirmationStepProps } from "./ConfirmationStep.types";

export const ConfirmationStep = ({ business }: ConfirmationStepProps) => {
  const copy = strings.confirmation;
  return (
    <div className="flex w-full max-w-[542px] flex-col items-stretch gap-4">
      <div className="border-border bg-card flex flex-col items-center gap-6 rounded-[16px] border px-[60px] py-10">
        <div className="relative h-[200px] w-[200px]">
          <Image
            src="/figma/success-check.svg"
            alt={copy.successIconAlt}
            fill
            sizes="200px"
            priority
          />
        </div>
        <p className="text-label text-center text-[18px] leading-[22px] font-bold tracking-[0.18px]">
          {copy.heading}
        </p>
        <p className="text-ink text-center text-[16px] leading-[24px]">{copy.subheading}</p>
      </div>
      <BusinessCard business={business} />
    </div>
  );
};
