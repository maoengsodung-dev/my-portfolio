"use server";

import {
  contactFormSchema,
  type ContactFormValues,
  type ContactActionResult,
} from "@/features/contact/schema";
import { siteConfig } from "@/config/site";

const DEFAULT_RECIPIENT_EMAIL = "maoengsodung@gmail.com";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Send notification message to Telegram via official Telegram Bot API
 */
async function sendToTelegram(
  values: ContactFormValues,
): Promise<{ success: boolean; error?: string }> {
  // Read tokens dynamically from process.env
  const botToken = (
    process.env.TELEGRAM_BOT_TOKEN ||
    "8980759779:AAEjylKGyMOdwMQNAxAH9iCclRrLAD814B0"
  ).trim();
  const chatId = (process.env.TELEGRAM_CHAT_ID || "1630262482").trim();

  if (!botToken || !chatId) {
    return {
      success: false,
      error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing",
    };
  }

  const cambodiaTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Phnom_Penh",
  }).format(new Date());

  const text = [
    `📬 <b>New Contact Form Submission</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(values.name)}`,
    `📧 <b>Email:</b> ${escapeHtml(values.email)}`,
    `💰 <b>Budget:</b> ${values.budget ? escapeHtml(values.budget) : "Not specified"}`,
    ``,
    `💬 <b>Message:</b>`,
    `<i>${escapeHtml(values.message)}</i>`,
    ``,
    `🕒 <i>${cambodiaTime} (Cambodia Time)</i>`,
  ].join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {
      console.error("[Telegram API Error]:", data);
      return {
        success: false,
        error: data.description || "Telegram API rejected the message",
      };
    }

    return { success: true };
  } catch (err) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to connect to Telegram";
    console.error("[Telegram Network Error]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Send notification email via Resend or Gmail SMTP (Nodemailer)
 */
async function sendToEmail(
  values: ContactFormValues,
): Promise<{ success: boolean; error?: string }> {
  const recipient =
    process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
    siteConfig.email ||
    DEFAULT_RECIPIENT_EMAIL;

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const smtpPass = (
    process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD
  )?.trim();
  const smtpUser = process.env.SMTP_USER?.trim() || recipient;

  const subject = `📬 New Portfolio Message from ${values.name} (${values.budget || "Inquiry"})`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 24px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f293d; border-radius: 16px; overflow: hidden; padding: 24px;">
    <h2 style="color: #6366f1; margin-top: 0;">✨ New Portfolio Contact Submission</h2>
    <div style="background: #1f2937; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0 0 8px;"><strong>Sender:</strong> ${escapeHtml(values.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(values.email)}" style="color: #60a5fa;">${escapeHtml(values.email)}</a></p>
      <p style="margin: 0;"><strong>Budget:</strong> ${values.budget ? escapeHtml(values.budget) : "Not specified"}</p>
    </div>
    <div style="background: #0f172a; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <h4 style="margin: 0 0 8px; color: #94a3b8; text-transform: uppercase; font-size: 12px;">Message:</h4>
      <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <a href="mailto:${escapeHtml(values.email)}?subject=Re:%20Inquiry%20regarding%20your%20project" style="background: #4f46e5; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 6px; font-weight: 600; display: inline-block;">Reply to ${escapeHtml(values.name)}</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  // Option 1: Resend
  if (resendApiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendApiKey);
      const sender =
        process.env.RESEND_FROM_EMAIL?.trim() ||
        "Portfolio Contact <onboarding@resend.dev>";

      const result = await resend.emails.send({
        from: sender,
        to: recipient,
        replyTo: values.email,
        subject,
        html: htmlContent,
      });

      if (result.error) {
        console.error("[Resend Error]:", result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Resend delivery failed";
      console.error("[Resend Exception]:", msg);
      return { success: false, error: msg };
    }
  }

  // Option 2: Gmail SMTP via Nodemailer
  if (smtpPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${values.name} via Portfolio" <${smtpUser}>`,
        to: recipient,
        replyTo: values.email,
        subject,
        html: htmlContent,
        text: `Name: ${values.name}\nEmail: ${values.email}\nBudget: ${values.budget || "N/A"}\n\nMessage:\n${values.message}`,
      });

      return { success: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "SMTP delivery failed";
      console.error("[Nodemailer Error]:", msg);
      return { success: false, error: msg };
    }
  }

  return {
    success: false,
    error:
      "No email provider configured (add RESEND_API_KEY or SMTP_PASS to .env.local)",
  };
}

/**
 * Server Action for submitting contact message
 */
export async function submitContactMessage(
  values: ContactFormValues,
) {
  const validated = contactFormSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      message: "Please double-check the form for errors and try again.",
    };
  }

  const [telegramResult, emailResult] = await Promise.all([
    sendToTelegram(validated.data),
    sendToEmail(validated.data),
  ]);

  console.log("[Contact Submission Results]:", {
    telegram: telegramResult,
    email: emailResult,
  });

  if (telegramResult.success && emailResult.success) {
    return {
      success: true,
      message: "Message successfully sent to my Telegram and Email!",
    };
  }

  if (telegramResult.success) {
    return {
      success: true,
      message: "Message sent directly to my Telegram!",
    };
  }

  if (emailResult.success) {
    return {
      success: true,
      message: "Message sent directly to my Email!",
    };
  }

  return {
    success: false,
    message: `Delivery failed. Telegram: ${telegramResult.error || "unknown error"}.`,
  };
}
