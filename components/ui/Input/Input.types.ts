import { InputHTMLAttributes } from "react";

export type InputSize = "md" | "sm";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  size?: InputSize;
};
