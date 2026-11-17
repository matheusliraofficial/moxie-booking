"use client";

import { useState } from "react";
import { goldSpa } from "@/lib/mockBusiness";
import type { BookingData, ContactValues, PaymentValues } from "@/lib/schemas";
import { maskCardNumber } from "@/lib/format";
import { BusinessCard } from "./BusinessCard";
import { ContactStep } from "./ContactStep";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { Button } from "@/components/ui/Button";
import { strings, t } from "@/lib/strings";

type StepKey = "contact" | "payment" | "confirmation";

const CONTACT_FORM_ID = "contact-form";
const PAYMENT_FORM_ID = "payment-form";

export function BookingFlow() {
  const [step, setStep] = useState<StepKey>("contact");
  const [booking, setBooking] = useState<BookingData>({ contact: null, payment: null });

  function handleContact(values: ContactValues) {
    setBooking((b) => ({ ...b, contact: values }));
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePayment(values: PaymentValues) {
    const finalBooking: BookingData = { contact: booking.contact, payment: values };
    setBooking(finalBooking);
    console.log("Booking submitted", {
      business: goldSpa,
      contact: finalBooking.contact,
      payment: { ...values, cardNumber: maskCardNumber(values.cardNumber) },
      submittedAt: new Date().toISOString(),
    });
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-page">
        <h1 className="sr-only">{t(strings.meta.pageHeading, { business: goldSpa.name })}</h1>
        <div className="mx-auto flex max-w-[1440px] justify-center px-6 py-10 md:px-[120px] md:py-[60px]">
          <ConfirmationStep business={goldSpa} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page pb-[112px]">
      <h1 className="sr-only">{t(strings.meta.pageHeading, { business: goldSpa.name })}</h1>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:gap-6 md:px-[120px] md:py-[60px]">
        <div className="md:w-[450px] md:shrink-0">
          <BusinessCard business={goldSpa} />
        </div>
        <section
          aria-live="polite"
          className="flex-1 rounded-[12px] border border-border bg-card px-6 py-8 md:min-h-[525px] md:px-[60px] md:py-12"
        >
          {step === "contact" && (
            <ContactStep
              formId={CONTACT_FORM_ID}
              defaultValues={booking.contact ?? {}}
              onSubmit={handleContact}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              formId={PAYMENT_FORM_ID}
              defaultValues={booking.payment ?? {}}
              onSubmit={handlePayment}
            />
          )}
        </section>
      </div>

      {step === "contact" && (
        <div
          className="fixed inset-x-0 bottom-0 z-10 bg-card"
          style={{ boxShadow: "var(--shadow-bar)" }}
        >
          <div className="mx-auto flex max-w-[1440px] justify-end px-4 py-4 md:px-[120px]">
            <Button type="submit" form={CONTACT_FORM_ID} size="lg">
              {strings.contact.continue}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
