import type { ContactValues } from "@/lib/schemas";

export type ContactStepProps = {
  formId: string;
  defaultValues: Partial<ContactValues>;
  onSubmit: (values: ContactValues) => void;
};
