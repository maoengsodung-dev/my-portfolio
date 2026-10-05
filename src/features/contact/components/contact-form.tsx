"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { submitContactMessage } from "@/features/contact/send-message";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";

const budgetOptions = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "Let's discuss",
];

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", budget: "", message: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    startTransition(async () => {
      const result = await submitContactMessage(values);

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <motion.form
      variants={fadeUp}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-border/60 bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Jane Cooper"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="budget">Project budget (optional)</Label>
        <select
          id="budget"
          defaultValue=""
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-background text-foreground px-3 text-sm shadow-xs outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "dark:bg-card dark:text-foreground [color-scheme:light] dark:[color-scheme:dark]"
          )}
          {...register("budget")}
        >
          <option value="" disabled className="bg-background text-muted-foreground dark:bg-zinc-900 dark:text-zinc-400">
            Select a range
          </option>
          {budgetOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell me a little about your project, timeline, and what you're hoping to achieve."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-2 h-12 rounded-full text-base"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        I typically respond within 1–2 business days.
      </p>
    </motion.form>
  );
}
