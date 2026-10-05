"use server";

import { submitContactMessage as handleMessage } from "@/features/contact/send-message";
import type { ContactFormValues } from "@/features/contact/schema";

export async function submitContactMessage(values: ContactFormValues) {
  return handleMessage(values);
}

