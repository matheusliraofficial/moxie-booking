"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { formatPhone } from "@/lib/format";
import { strings } from "@/lib/strings";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import type { ErrorSummaryItem } from "@/components/ui/ErrorSummary";
import type { ContactStepProps } from "./ContactStep.types";

const FIELD_LABELS: Record<keyof ContactValues, string> = {
  fullName: "Full Name",
  email: "Email",
  phone: "Phone",
  visitReason: "Visit reason",
};

export const ContactStep = ({ formId, defaultValues, onSubmit }: ContactStepProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, submitCount },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onBlur",
  });

  // Move focus to the step heading when the step mounts so keyboard /
  // screen-reader users land on the correct context after a step change.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const copy = strings.contact;
  const errorItems: ErrorSummaryItem[] =
    submitCount > 0
      ? (Object.keys(errors) as (keyof ContactValues)[]).map((key) => ({
          fieldId: key,
          message: `${FIELD_LABELS[key]}: ${errors[key]?.message ?? "Invalid"}`,
        }))
      : [];

  return (
    <div className="flex flex-col gap-6">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-title text-[18px] leading-[24px] font-bold tracking-[0.18px] outline-none"
      >
        {copy.heading}
      </h2>
      <ErrorSummary errors={errorItems} />
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
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
            onChange: (e) =>
              setValue("phone", formatPhone(e.target.value), { shouldValidate: false }),
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
};
