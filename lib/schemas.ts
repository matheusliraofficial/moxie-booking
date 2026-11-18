import { z } from "zod";
import { luhnValid } from "./format";
import { strings } from "./strings";

const e = strings.errors;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, e.fullNameTooShort).max(80, e.fullNameTooLong),
  email: z.string().trim().toLowerCase().email(e.emailInvalid),
  phone: z
    .string()
    .trim()
    .min(7, e.phoneInvalid)
    .refine((v) => v.replace(/\D/g, "").length >= 7, e.phoneInvalid),
  visitReason: z.string().trim().min(3, e.visitReasonTooShort).max(500, e.visitReasonTooLong),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .refine((v) => {
      const d = v.replace(/\D/g, "");
      return d.length >= 13 && d.length <= 19;
    }, e.cardNumberInvalid)
    .refine((v) => luhnValid(v), e.cardNumberFailsLuhn),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, e.expiryFormat)
    .refine((v) => {
      const [mm, yy] = v.split("/");
      const month = parseInt(mm, 10);
      const year = 2000 + parseInt(yy, 10);
      const end = new Date(year, month, 0, 23, 59, 59);
      return end >= new Date();
    }, e.expiryExpired),
  cvc: z.string().regex(/^\d{3,4}$/, e.cvcFormat),
  zip: z.string().trim().min(3, e.zipRequired).max(10, e.zipRequired),
  cancellationAck: z.literal(true, { message: e.cancellationAckRequired }),
});

export type PaymentValues = z.infer<typeof paymentSchema>;

export type BookingData = {
  contact: ContactValues | null;
  payment: PaymentValues | null;
};
