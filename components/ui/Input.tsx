"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, hint, trailing, id, className, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={clsx(
            "w-full rounded-xl border bg-card px-4 py-3 text-[15px] text-ink placeholder:text-ink-muted/80",
            "transition outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
            error ? "border-danger/70" : "border-border",
            trailing && "pr-11",
            className,
          )}
          {...rest}
        />
        {trailing && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ink-muted">
            {trailing}
          </span>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
