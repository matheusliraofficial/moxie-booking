"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, size = "md", id, className, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="flex w-full flex-col gap-[2px]">
        {label && (
          <label htmlFor={inputId} className="text-label text-[14px] leading-[22px] font-semibold">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={clsx(
            "bg-card text-ink placeholder:text-muted w-full rounded-[12px] border-[1.5px] px-3 text-[16px] leading-[24px]",
            "focus:border-brand focus:ring-brand/20 transition outline-none focus:ring-2",
            size === "md" ? "py-3" : "py-[11px]",
            error ? "border-danger" : "border-input-border",
            className,
          )}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-danger mt-0.5 text-[13px] leading-[18px]">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
