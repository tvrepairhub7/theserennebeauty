"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  beautyCategories,
  getService,
  makeupCategories,
} from "@/data/services";
import { bridalPackages, getPackage } from "@/data/packages";
import { site } from "@/data/site";
import { formatDate, formatINR, todayISO } from "@/lib/format";
import { buildBookingMessage, whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "./button-link";
import { WhatsAppIcon } from "./icons";
import { NoteBanner } from "./ui-bits";

interface BookingFormProps {
  defaultServiceId?: string;
  defaultPackageId?: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  packageId: string;
  date: string;
  time: string;
  notes: string;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  serviceId: "",
  packageId: "",
  date: "",
  time: "",
  notes: "",
};

export function BookingForm({
  defaultServiceId = "",
  defaultPackageId = "",
}: BookingFormProps) {
  const availableServiceIds = useMemo(
    () =>
      new Set(
        [...makeupCategories, ...beautyCategories].flatMap((category) =>
          category.items.map((item) => item.id),
        ),
      ),
    [],
  );
  const availablePackageIds = useMemo(
    () => new Set(bridalPackages.map((pkg) => pkg.id)),
    [],
  );

  const [values, setValues] = useState<FormValues>({
    ...emptyValues,
    serviceId: availableServiceIds.has(defaultServiceId) ? defaultServiceId : "",
    packageId: availablePackageIds.has(defaultPackageId) ? defaultPackageId : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<{
    values: FormValues;
    label: string;
    waUrl: string;
  } | null>(null);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set client-side so prerendered HTML never carries a stale build date.
    if (dateInputRef.current) dateInputRef.current.min = todayISO();
  }, []);

  useEffect(() => {
    if (submitted) {
      confirmationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = (): Errors => {
    const next: Errors = {};

    if (values.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }

    const digits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) {
      next.phone = "Please enter a phone number.";
    } else if (digits.length < 10 || digits.length > 15) {
      next.phone = "Enter a valid phone number with 10–15 digits.";
    }

    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "Enter a valid email address, or leave this blank.";
    }

    if (!values.serviceId && !values.packageId) {
      next.serviceId = "Choose a service or a package.";
    }

    if (!values.date) {
      next.date = "Choose a preferred date.";
    } else if (values.date < todayISO()) {
      next.date = "Please choose today or a future date.";
    }

    if (!values.time) {
      next.time = "Choose a preferred time.";
    }

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstField = Object.keys(validationErrors)[0];
      const fieldIds: Record<string, string> = {
        name: "booking-name",
        phone: "booking-phone",
        email: "booking-email",
        serviceId: "booking-service",
        packageId: "booking-package",
        date: "booking-date",
        time: "booking-time",
        notes: "booking-notes",
      };
      document.getElementById(fieldIds[firstField] ?? "booking-name")?.focus();
      return;
    }

    const service = getService(values.serviceId);
    const pkg = getPackage(values.packageId);
    const parts = [service?.name, pkg?.name].filter(Boolean);
    const label = parts.join(" · ");

    const message = buildBookingMessage({
      name: values.name,
      phone: values.phone,
      email: values.email,
      serviceLabel: label,
      date: values.date,
      time: values.time,
      notes: values.notes,
    });

    const waUrl = whatsappLink(message);
    if (!waUrl) {
      setErrors({ name: "WhatsApp is not configured, so the request cannot be sent yet." });
      return;
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted({ values: { ...values }, label, waUrl });
  };

  const errorEntries = Object.entries(errors);

  if (submitted) {
    return (
      <div
        ref={confirmationRef}
        className="rounded-[2rem] border border-champagne/40 bg-ivory p-6 shadow-luxe sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-champagne/20 text-gold">
            <Check className="size-8" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-6">Request ready</p>
          <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Your appointment details are ready to send</h2>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-mocha">
            WhatsApp has been opened with your request pre-filled.{" "}
            <strong className="font-medium text-ink">Press send there</strong> so the
            studio receives it and can confirm availability.
          </p>
        </div>

        <dl className="mx-auto mt-8 grid max-w-2xl gap-x-6 gap-y-4 rounded-2xl border border-line bg-cream/60 p-5 text-left sm:grid-cols-2">
          <div>
            <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-gold">Name</dt>
            <dd className="mt-1 text-[0.9rem] text-ink">{submitted.values.name}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-gold">Phone</dt>
            <dd className="mt-1 text-[0.9rem] text-ink">{submitted.values.phone}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-gold">
              Service / package
            </dt>
            <dd className="mt-1 text-[0.9rem] text-ink">{submitted.label}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-gold">
              Preferred date & time
            </dt>
            <dd className="mt-1 text-[0.9rem] text-ink">
              {formatDate(submitted.values.date)} · {submitted.values.time}
            </dd>
          </div>
        </dl>

        {site.contact.whatsappIsPlaceholder ? (
          <div className="mx-auto mt-5 max-w-2xl">
            <NoteBanner>
              This build uses a demonstration WhatsApp number. Replace it in{" "}
              <code className="font-mono text-[0.76rem]">src/data/site.ts</code> before
              accepting real bookings.
            </NoteBanner>
          </div>
        ) : null}

        <p className="mx-auto mt-5 max-w-xl text-center text-[0.78rem] leading-relaxed text-mocha">
          This website does not store your details. Nothing is sent until you press
          send inside WhatsApp.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={submitted.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-whatsapp"
          >
            <WhatsAppIcon className="size-4" />
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setValues({
                ...emptyValues,
                serviceId: availableServiceIds.has(defaultServiceId) ? defaultServiceId : "",
                packageId: availablePackageIds.has(defaultPackageId) ? defaultPackageId : "",
              });
              setErrors({});
            }}
            className="btn btn-lg btn-outline"
          >
            Make another booking
          </button>
          <ButtonLink href="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2rem] border border-line/80 bg-white/60 p-5 shadow-soft sm:p-8 lg:p-10"
      aria-describedby="booking-form-note"
    >
      {errorEntries.length > 0 ? (
        <div
          role="alert"
          className="mb-7 flex items-start gap-3 rounded-2xl border border-[#b4554b]/30 bg-[#b4554b]/[0.07] px-4 py-3.5 text-[0.82rem] text-[#8d3f37]"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">Please check the highlighted fields.</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              {errorEntries.map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="label">
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="input"
            placeholder="Your name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
          />
          {errors.name ? (
            <p id="booking-name-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="booking-phone" className="label">
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className="input"
            placeholder="+91 00000 00000"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
          />
          {errors.phone ? (
            <p id="booking-phone-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-email" className="label">
            Email address <span className="normal-case tracking-normal text-mocha/60">(optional)</span>
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
            className="input"
            placeholder="you@example.com"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
          />
          {errors.email ? (
            <p id="booking-email-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="booking-service" className="label">
            Selected service
          </label>
          <div className="relative">
            <select
              id="booking-service"
              name="service"
              className="input appearance-none pr-10"
              value={values.serviceId}
              onChange={(event) => update("serviceId", event.target.value)}
              aria-invalid={Boolean(errors.serviceId)}
              aria-describedby={errors.serviceId ? "booking-service-error" : undefined}
            >
              <option value="">Choose a makeup or beauty service</option>
              <optgroup label="Makeup services">
                {makeupCategories.flatMap((category) =>
                  category.items.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                      {service.price !== null ? ` — ${formatINR(service.price)}` : ""}
                    </option>
                  )),
                )}
              </optgroup>
              <optgroup label="Beauty treatments">
                {beautyCategories.flatMap((category) =>
                  category.items.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                      {service.price !== null ? ` — ${formatINR(service.price)}` : ""}
                    </option>
                  )),
                )}
              </optgroup>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mocha"
              aria-hidden="true"
            />
          </div>
          {errors.serviceId ? (
            <p id="booking-service-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.serviceId}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="booking-package" className="label">
            Selected package <span className="normal-case tracking-normal text-mocha/60">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="booking-package"
              name="package"
              className="input appearance-none pr-10"
              value={values.packageId}
              onChange={(event) => update("packageId", event.target.value)}
            >
              <option value="">No package — service only</option>
              {bridalPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — {formatINR(pkg.price)}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mocha"
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor="booking-date" className="label">
            Preferred date <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <input
              id="booking-date"
              name="date"
              type="date"
              required
              ref={dateInputRef}
              className="input pr-10"
              value={values.date}
              onChange={(event) => update("date", event.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "booking-date-error" : undefined}
            />
            <CalendarDays
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mocha"
              aria-hidden="true"
            />
          </div>
          {errors.date ? (
            <p id="booking-date-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.date}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="booking-time" className="label">
            Preferred time <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="booking-time"
              name="time"
              className="input appearance-none pr-10"
              value={values.time}
              onChange={(event) => update("time", event.target.value)}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? "booking-time-error" : undefined}
            >
              <option value="">Choose a time</option>
              {site.booking.timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <Clock
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-mocha"
              aria-hidden="true"
            />
          </div>
          {errors.time ? (
            <p id="booking-time-error" className="mt-1.5 text-[0.72rem] text-[#8d3f37]">
              {errors.time}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="booking-notes" className="label">
            Anything we should know? <span className="normal-case tracking-normal text-mocha/60">(optional)</span>
          </label>
          <textarea
            id="booking-notes"
            name="notes"
            rows={4}
            className="input resize-none"
            placeholder="Occasion, outfit colour, skin sensitivities, preferred artist, or any questions…"
            value={values.notes}
            onChange={(event) => update("notes", event.target.value)}
          />
        </div>
      </div>

      <p id="booking-form-note" className="mt-6 text-[0.76rem] leading-relaxed text-mocha">
        <Sparkles className="mr-1.5 inline size-3.5 text-gold" aria-hidden="true" />
        {site.booking.policyNote}
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-lg btn-primary flex-1">
          <CalendarDays className="size-4" aria-hidden="true" />
          Request appointment
        </button>
        {whatsappLink(
          "Hello! I would like to book an appointment. Could you share availability?",
        ) ? (
          <a
            href={
              whatsappLink(
                "Hello! I would like to book an appointment. Could you share availability?",
              ) ?? "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-whatsapp flex-1"
          >
            <WhatsAppIcon className="size-4" />
            Book on WhatsApp
          </a>
        ) : null}
      </div>

      <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-mocha/80">
        No payment is taken on this website. Submitting opens WhatsApp with your
        details — nothing is stored here.{" "}
        <Link href="/contact" className="underline decoration-gold/50 underline-offset-4 hover:text-gold">
          Prefer another way to reach us?
        </Link>
      </p>

      {site.contact.whatsappIsPlaceholder ? (
        <div className="mt-5">
          <NoteBanner>
            The WhatsApp number in this preview is a placeholder for demonstration.
            Update it in <code className="font-mono text-[0.76rem]">src/data/site.ts</code>{" "}
            before publishing the site.
          </NoteBanner>
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {Object.keys(errors).length > 0
          ? "The form has errors. Please review the highlighted fields."
          : ""}
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 text-[0.64rem] uppercase tracking-[0.16em] text-mocha/70">
        <MessageCircle className="size-3.5" aria-hidden="true" />
        Typical reply time: within studio hours
      </div>
    </form>
  );
}
