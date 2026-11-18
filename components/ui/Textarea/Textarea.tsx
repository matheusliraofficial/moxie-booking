"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import type { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, id, className, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  return (
    <div className="flex w-full flex-col gap-[2px]">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[14px] font-semibold leading-[22px] text-label"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={clsx(
          "w-full min-h-[94px] resize-y rounded-[12px] border-[1.5px] bg-card px-3 py-3 text-[16px] leading-[24px] text-ink placeholder:text-muted",
          "outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20",
          error ? "border-danger" : "border-input-border",
          className,
        )}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-0.5 text-[13px] leading-[18px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
});
