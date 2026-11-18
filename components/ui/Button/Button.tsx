"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", fullWidth, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[16px] font-semibold tracking-[0.32px] transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-page",
        "disabled:cursor-not-allowed disabled:opacity-60",
        size === "lg" ? "px-9 py-4 text-[16px] leading-[24px]" : "px-9 py-4 text-[16px] leading-[24px]",
        variant === "primary" && "bg-brand text-white hover:bg-[#7a1884] active:bg-[#6a1674]",
        variant === "ghost" && "text-label hover:text-ink",
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
