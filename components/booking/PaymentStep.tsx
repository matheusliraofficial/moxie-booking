"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";
import { paymentSchema, PaymentValues } from "@/lib/schemas";
import { formatCardNumber, formatExpiry } from "@/lib/format";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  defaultValues: Partial<PaymentValues>;
  onSubmit: (values: PaymentValues) => void;
  onBack: () => void;
};

export function PaymentStep({ defaultValues, onSubmit, onBack }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">Step 2 of 2</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">Payment information</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Your card is only used to hold the appointment.
        </p>
      </header>

      <Input
        label="Name on card"
        placeholder="Jane Doe"
        autoComplete="cc-name"
        error={errors.cardholderName?.message}
        {...register("cardholderName")}
      />
      <Input
        label="Card number"
        inputMode="numeric"
        placeholder="1234 5678 9012 3456"
        autoComplete="cc-number"
        trailing={<CreditCard className="h-4 w-4" aria-hidden />}
        error={errors.cardNumber?.message}
        {...register("cardNumber", {
          onChange: (e) => setValue("cardNumber", formatCardNumber(e.target.value), { shouldValidate: false }),
        })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry"
          inputMode="numeric"
          placeholder="MM/YY"
          autoComplete="cc-exp"
          error={errors.expiry?.message}
          {...register("expiry", {
            onChange: (e) => setValue("expiry", formatExpiry(e.target.value), { shouldValidate: false }),
          })}
        />
        <Input
          label="CVC"
          inputMode="numeric"
          placeholder="123"
          autoComplete="cc-csc"
          maxLength={4}
          error={errors.cvc?.message}
          {...register("cvc", {
            onChange: (e) => setValue("cvc", e.target.value.replace(/\D/g, "").slice(0, 4), { shouldValidate: false }),
          })}
        />
      </div>
      <Input
        label="Billing ZIP"
        inputMode="text"
        placeholder="92108"
        autoComplete="postal-code"
        error={errors.zip?.message}
        {...register("zip")}
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm booking
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
