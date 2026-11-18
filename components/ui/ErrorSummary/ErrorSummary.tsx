"use client";

import type { MouseEvent } from "react";
import type { ErrorSummaryProps } from "./ErrorSummary.types";

const focusField = (e: MouseEvent<HTMLAnchorElement>, fieldId: string) => {
  const el = document.getElementById(fieldId);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "auto", block: "center" });
  (el as HTMLElement).focus();
};

export const ErrorSummary = ({
  errors,
  heading = "Please fix the following to continue",
}: ErrorSummaryProps) => {
  if (errors.length === 0) return null;
  return (
    <div
      role="alert"
      aria-labelledby="error-summary-heading"
      className="border-danger/40 bg-danger/5 flex flex-col gap-2 rounded-[12px] border p-4"
    >
      <p id="error-summary-heading" className="text-danger text-[14px] font-semibold">
        {heading}
      </p>
      <ul className="text-danger list-disc space-y-1 pl-5 text-[14px] leading-[20px]">
        {errors.map((err) => (
          <li key={err.fieldId}>
            <a
              href={`#${err.fieldId}`}
              onClick={(e) => focusField(e, err.fieldId)}
              className="underline underline-offset-2 hover:no-underline"
            >
              {err.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
