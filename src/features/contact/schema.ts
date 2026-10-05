import { z } from "zod";

/**
 * Single source of truth for contact form validation, shared between the
 * client (react-hook-form, instant feedback) and the Server Action
 * (re-validated — client validation is a UX nicety, never a security
 * boundary).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name looks a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "An email address is required.")
    .email("Please enter a valid email address."),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(20, "Give me a little more detail (at least 20 characters).")
    .max(2000, "That message is too long — try trimming it down."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactActionResult = {
  success: boolean;
  message: string;
};

