import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};
