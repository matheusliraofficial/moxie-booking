"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { formatPhone } from "@/lib/format";
import { strings } from "@/lib/strings";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ContactStepProps } from "./ContactStep.types";

export function ContactStep({ formId, defaultValues, onSubmit }: ContactStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onBlur",
  });

  const copy = strings.contact;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[18px] font-bold leading-[24px] tracking-[0.18px] text-title">
        {copy.heading}
      </h2>
      <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Input
          label={copy.fields.fullName}
          placeholder={copy.placeholder}
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          label={copy.fields.email}
          type="email"
          placeholder={copy.placeholder}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label={copy.fields.phone}
          inputMode="tel"
          placeholder={copy.placeholder}
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone", {
            onChange: (e) => setValue("phone", formatPhone(e.target.value), { shouldValidate: false }),
          })}
        />
        <Textarea
          label={copy.fields.visitReason}
          placeholder={copy.placeholder}
          rows={4}
          error={errors.visitReason?.message}
          {...register("visitReason")}
        />
      </form>
    </div>
  );
}
