"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentValues } from "@/lib/schemas";
import { formatCardNumber, formatExpiry } from "@/lib/format";
import { strings } from "@/lib/strings";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ErrorSummary } from "@/components/ui/ErrorSummary";
import type { ErrorSummaryItem } from "@/components/ui/ErrorSummary";
import type { PaymentStepProps } from "./PaymentStep.types";

const FIELD_LABELS: Record<keyof PaymentValues, string> = {
  cardNumber: "Card number",
  expiry: "Expiry",
  cvc: "CVV",
  zip: "Billing ZIP",
  cancellationAck: "Cancellation policy",
};

export const PaymentStep = ({ formId, defaultValues, onSubmit }: PaymentStepProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cancellationAck: false, ...defaultValues },
    mode: "onBlur",
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const ack = watch("cancellationAck");
  const copy = strings.payment;
  const f = copy.fields;

  const errorItems: ErrorSummaryItem[] =
    submitCount > 0
      ? (Object.keys(errors) as (keyof PaymentValues)[]).map((key) => ({
          fieldId: key,
          message: `${FIELD_LABELS[key]}: ${errors[key]?.message ?? "Invalid"}`,
        }))
      : [];

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9" noValidate>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-title text-[18px] leading-[24px] font-bold tracking-[0.18px] outline-none"
          >
            {copy.heading}
          </h2>
          <p className="text-label text-[14px] leading-[24px]">{copy.description}</p>
        </div>

        <ErrorSummary errors={errorItems} />

        <div className="flex flex-col gap-2">
          <Input
            label={f.cardInformation}
            id="cardNumber"
            inputMode="numeric"
            placeholder={f.cardNumberPlaceholder}
            autoComplete="cc-number"
            error={errors.cardNumber?.message}
            {...register("cardNumber", {
              onChange: (e) =>
                setValue("cardNumber", formatCardNumber(e.target.value), { shouldValidate: false }),
            })}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              id="expiry"
              size="sm"
              inputMode="numeric"
              placeholder={f.expiryPlaceholder}
              autoComplete="cc-exp"
              aria-label={f.expiryAria}
              error={errors.expiry?.message}
              {...register("expiry", {
                onChange: (e) =>
                  setValue("expiry", formatExpiry(e.target.value), { shouldValidate: false }),
              })}
            />
            <Input
              id="cvc"
              size="sm"
              inputMode="numeric"
              placeholder={f.cvcPlaceholder}
              autoComplete="cc-csc"
              aria-label={f.cvcAria}
              maxLength={4}
              error={errors.cvc?.message}
              {...register("cvc", {
                onChange: (e) =>
                  setValue("cvc", e.target.value.replace(/\D/g, "").slice(0, 4), {
                    shouldValidate: false,
                  }),
              })}
            />
          </div>
        </div>

        <Input
          id="zip"
          size="sm"
          inputMode="text"
          placeholder={f.zipPlaceholder}
          autoComplete="postal-code"
          aria-label={f.zipAria}
          error={errors.zip?.message}
          {...register("zip")}
        />

        <div className="flex flex-col gap-1">
          <Checkbox
            id="cancellationAck"
            checked={!!ack}
            onChange={(e) =>
              setValue("cancellationAck", e.target.checked, { shouldValidate: true })
            }
          >
            {copy.cancellationPolicy}
          </Checkbox>
          {errors.cancellationAck && (
            <p className="text-danger pl-10 text-[13px]">{errors.cancellationAck.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-border h-[1.5px] w-full" aria-hidden />
        <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
          {copy.submit}
        </Button>
        <p className="text-label text-[14px] leading-[24px]">{copy.disclaimer}</p>
      </div>
    </form>
  );
};
