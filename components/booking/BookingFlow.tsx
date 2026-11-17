"use client";

import { useState } from "react";
import { goldSpa } from "@/lib/mockBusiness";
import type { BookingData, ContactValues, PaymentValues } from "@/lib/schemas";
import { maskCardNumber } from "@/lib/format";
import { BusinessCard } from "./BusinessCard";
import { Stepper } from "./Stepper";
import { ContactStep } from "./ContactStep";
import { PaymentStep } from "./PaymentStep";
import { ConfirmationStep } from "./ConfirmationStep";

type StepKey = "contact" | "payment" | "confirmation";

const STEPS = [
  { id: "contact", label: "Contact" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
];

export function BookingFlow() {
  const [step, setStep] = useState<StepKey>("contact");
  const [booking, setBooking] = useState<BookingData>({ contact: null, payment: null });

  const currentIdx = step === "contact" ? 0 : step === "payment" ? 1 : 2;

  function handleContact(values: ContactValues) {
    setBooking((b) => ({ ...b, contact: values }));
    setStep("payment");
  }

  function handlePayment(values: PaymentValues) {
    const finalBooking: BookingData = { contact: booking.contact, payment: values };
    setBooking(finalBooking);
    // Required by spec: log the booking payload instead of posting it.
    // The logged card number is masked so we don't write the PAN to devtools history.
    console.log("Booking submitted", {
      business: goldSpa,
      contact: finalBooking.contact,
      payment: values ? { ...values, cardNumber: maskCardNumber(values.cardNumber) } : null,
      submittedAt: new Date().toISOString(),
    });
    setStep("confirmation");
  }

  function handleReset() {
    setBooking({ contact: null, payment: null });
    setStep("contact");
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 md:py-14">
      <header className="mb-6 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-brand">Moxie</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink md:text-[2.2rem]">
            Book your appointment
          </h1>
        </div>
        <Stepper steps={STEPS} current={currentIdx} />
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-8">
        <BusinessCard business={goldSpa} />
        <section
          aria-live="polite"
          className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
        >
          {step === "contact" && (
            <ContactStep defaultValues={booking.contact ?? {}} onSubmit={handleContact} />
          )}
          {step === "payment" && (
            <PaymentStep
              defaultValues={booking.payment ?? {}}
              onSubmit={handlePayment}
              onBack={() => setStep("contact")}
            />
          )}
          {step === "confirmation" && (
            <ConfirmationStep business={goldSpa} booking={booking} onReset={handleReset} />
          )}
        </section>
      </div>
    </div>
  );
}
