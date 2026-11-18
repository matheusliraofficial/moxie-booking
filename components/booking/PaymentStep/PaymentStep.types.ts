import type { PaymentValues } from "@/lib/schemas";

export type PaymentStepProps = {
  formId: string;
  defaultValues: Partial<PaymentValues>;
  onSubmit: (values: PaymentValues) => void;
};
