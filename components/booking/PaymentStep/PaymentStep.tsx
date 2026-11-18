"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentValues } from "@/lib/schemas";
import { formatCardNumber, formatExpiry } from "@/lib/format";
import { strings } from "@/lib/strings";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import type { PaymentStepProps } from "./PaymentStep.types";

export function PaymentStep({ formId, defaultValues, onSubmit }: PaymentStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cancellationAck: undefined, ...defaultValues },
    mode: "onBlur",
  });

  const ack = watch("cancellationAck");
  const copy = strings.payment;
  const f = copy.fields;

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-9"
      noValidate
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[18px] font-bold leading-[24px] tracking-[0.18px] text-title">
            {copy.heading}
          </h2>
          <p className="text-[14px] leading-[24px] text-label">{copy.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            label={f.cardInformation}
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
              setValue("cancellationAck", e.target.checked ? true : (undefined as unknown as true), {
                shouldValidate: true,
              })
            }
          >
            {copy.cancellationPolicy}
          </Checkbox>
          {errors.cancellationAck && (
            <p className="pl-10 text-[13px] text-danger">{errors.cancellationAck.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="h-[1.5px] w-full bg-border" aria-hidden />
        <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
          {copy.submit}
        </Button>
        <p className="text-[14px] leading-[24px] text-label">{copy.disclaimer}</p>
      </div>
    </form>
  );
}
