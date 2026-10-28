"use client";

import { useState, type FormEvent } from "react";
import { Check, CircleAlert, Send } from "lucide-react";
import { buildContactMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

interface ContactValues {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof ContactValues, string>>;

const initialValues: ContactValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const update = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};

    if (values.name.trim().length < 2) {
      next.name = "Please enter your name.";
    }

    const digits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) {
      next.phone = "Please enter a phone number.";
    } else if (digits.length < 10 || digits.length > 15) {
      next.phone = "Enter a valid phone number with 10–15 digits.";
    }

    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())
    ) {
      next.email = "Enter a valid email address, or leave this blank.";
    }

    if (values.message.trim().length < 10) {
      next.message = "Please add a little more detail (at least 10 characters).";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      const fieldIds: Record<string, string> = {
        name: "contact-name",
        phone: "contact-phone",
        email: "contact-email",
        message: "contact-message",
      };
      document.getElementById(fieldIds[Object.keys(next)[0]] ?? "contact-name")?.focus();
      return;
    }

    const url = whatsappLink(
      buildContactMessage({
        name: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
      }),
    );

    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  if (sentUrl) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[1.8rem] border border-champagne/40 bg-ivory p-8 text-center shadow-soft"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-champagne/20 text-gold">
          <Check className="size-7" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl text-ink">Your message is ready</h3>
        <p className="mx-auto mt-3 max-w-md text-[0.88rem] leading-relaxed text-mocha">
          WhatsApp has been opened with your message. Press send there so we receive
          it. This website does not store your details.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-md btn-whatsapp"
          >
            <WhatsAppIcon className="size-4" />
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSentUrl(null);
              setValues(initialValues);
            }}
            className="btn btn-md btn-outline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.8rem] border border-line/80 bg-white/70 p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-champagne/15 text-gold">
          <Send className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl text-ink">Send us a message</h2>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-mocha">
            Share your question and we will reply during studio hours. The form opens
            WhatsApp with your message ready to send.
          </p>
        </div>
      </div>

      {Object.keys(errors).length > 0 ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-[#b4554b]/30 bg-[#b4554b]/[0.07] px-3.5 py-3 text-[0.8rem] text-[#8d3f37]"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please check the highlighted fields.
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="input"
            placeholder="Your name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-phone" className="label">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="input"
            placeholder="+91 00000 00000"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="contact-phone-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-email" className="label">
            Email <span className="normal-case tracking-normal text-mocha/60">(optional)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="input"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="label">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className="input resize-none"
            placeholder="Tell us about your occasion, date and the service you are interested in…"
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button type="submit" className="btn btn-lg btn-primary mt-6 w-full">
        <WhatsAppIcon className="size-4" />
        Send via WhatsApp
      </button>
      <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-mocha/80">
        Your message is only sent when you press send inside WhatsApp.
      </p>
    </form>
  );
}
