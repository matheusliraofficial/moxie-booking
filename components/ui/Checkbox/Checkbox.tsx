"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, id, checked, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <label
        htmlFor={inputId}
        className={clsx("group flex cursor-pointer select-none items-start gap-4", className)}
      >
        <span className="relative mt-[2px] inline-grid h-6 w-6 shrink-0 place-items-center">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
            {...rest}
          />
          <span
            aria-hidden
            className="pointer-events-none grid h-5 w-5 place-items-center rounded-[4px] border-2 border-checkbox-border bg-card transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/30"
          >
            {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
          </span>
        </span>
        {children && (
          <span className="text-[14px] leading-[24px] text-label">{children}</span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
