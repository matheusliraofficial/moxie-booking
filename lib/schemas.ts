import { z } from "zod";
import { luhnValid } from "./format";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That's a bit long"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number"),
  visitReason: z
    .string()
    .trim()
    .min(3, "Tell us a little about your visit")
    .max(500, "Keep it under 500 characters"),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const paymentSchema = z
  .object({
    cardholderName: z.string().trim().min(2, "Enter the name on the card"),
    cardNumber: z
      .string()
      .refine((v) => {
        const d = v.replace(/\D/g, "");
        return d.length >= 13 && d.length <= 19;
      }, "Enter a valid card number")
      .refine((v) => luhnValid(v), "Card number is invalid"),
    expiry: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
      .refine((v) => {
        const [mm, yy] = v.split("/");
        const month = parseInt(mm, 10);
        const year = 2000 + parseInt(yy, 10);
        const end = new Date(year, month, 0, 23, 59, 59);
        return end >= new Date();
      }, "Card is expired"),
    cvc: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
    zip: z
      .string()
      .trim()
      .min(3, "Enter your billing ZIP")
      .max(10, "Enter your billing ZIP"),
  });

export type PaymentValues = z.infer<typeof paymentSchema>;

export type BookingData = {
  contact: ContactValues | null;
  payment: PaymentValues | null;
};
