"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { contactSchema, ContactValues } from "@/lib/schemas";
import { formatPhone } from "@/lib/format";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

type Props = {
  defaultValues: Partial<ContactValues>;
  onSubmit: (values: ContactValues) => void;
};

export function ContactStep({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">Step 1 of 2</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Enter your details below</h3>
        <p className="mt-1 text-sm text-ink-soft">We use these to confirm your appointment.</p>
      </header>

      <Input
        label="Full name"
        placeholder="Jane Doe"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Phone"
        inputMode="tel"
        placeholder="(555) 123-4567"
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone", {
          onChange: (e) => setValue("phone", formatPhone(e.target.value), { shouldValidate: false }),
        })}
      />
      <Textarea
        label="Visit reason"
        placeholder="Tell us what you're coming in for"
        rows={4}
        error={errors.visitReason?.message}
        {...register("visitReason")}
      />

      <div className="mt-2 flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          Continue
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
