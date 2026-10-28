import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import {
  CalendarCheck,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BookingWithPrefill } from "@/components/booking-prefill";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request a bridal, engagement, party makeup or beauty appointment. Send your preferred date, time and service via WhatsApp for confirmation.",
  alternates: { canonical: "/book" },
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Send your request",
    text: "Choose a service or package, date and time. The form opens WhatsApp with everything filled in.",
  },
  {
    icon: MessageCircle,
    title: "We confirm availability",
    text: "The studio replies on WhatsApp or by phone to confirm the slot and answer any questions.",
  },
  {
    icon: Sparkles,
    title: "Your appointment is set",
    text: "Final details, timings and any add-ons are agreed before the day.",
  },
];

function BookingFormFallback() {
  return (
    <div
      className="rounded-[2rem] border border-line/80 bg-white/60 p-5 shadow-soft sm:p-8 lg:p-10"
      aria-busy="true"
      aria-label="Loading booking form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-2.5 w-24 rounded-full bg-line/70" />
            <div className="h-11 rounded-2xl bg-line/40" />
          </div>
        ))}
      </div>
      <div className="mt-7 h-12 w-full rounded-full bg-line/50" />
    </div>
  );
}

export default function BookPage() {
  const wa = whatsappLink(
    "Hello! I would like to book an appointment. Could you share availability?",
  );

  return (
    <>
      <section className="relative overflow-hidden paper-texture">
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-blush/25 blur-3xl" />

        <div className="container-luxe relative grid items-end gap-8 py-12 lg:grid-cols-[1fr_auto] lg:py-16">
          <div className="animate-rise">
            <p className="eyebrow">Booking</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.02] text-ink sm:text-6xl">
              Reserve your{" "}
              <em className="italic text-gold">appointment</em>
            </h1>
            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-mocha">
              Tell us the occasion, the date and the look you have in mind. Your
              request opens in WhatsApp so the studio can confirm availability and
              the little details before the appointment is secured.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[0.68rem] uppercase tracking-[0.14em] text-mocha">
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-gold" aria-hidden="true" />
              24 hours’ notice for makeup
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-gold" aria-hidden="true" />
              No payment online
            </span>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-14 lg:py-20">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <Suspense fallback={<BookingFormFallback />}>
              <BookingWithPrefill />
            </Suspense>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[1.8rem] border border-line/80 bg-cream/60 p-6 sm:p-7">
              <h2 className="text-[1.45rem] text-ink">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                      <step.icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-gold">
                        Step 0{index + 1}
                      </p>
                      <p className="mt-1 font-serif text-[1.15rem] leading-snug text-ink">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-mocha">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.8rem] border border-line/80 bg-ivory p-6 shadow-soft sm:p-7">
              <h2 className="text-[1.3rem] text-ink">Before your appointment</h2>
              <p className="mt-2.5 text-[0.84rem] leading-relaxed text-mocha">
                {site.booking.policyNote}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-md btn-whatsapp w-full"
                  >
                    <WhatsAppIcon className="size-4" />
                    Ask on WhatsApp
                  </a>
                ) : null}
                <ButtonLink href="/contact" variant="outline" className="w-full">
                  Other ways to reach us
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.8rem] border border-line/60">
              <Image
                src={images.makeupKit.src}
                alt={images.makeupKit.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent"
                aria-hidden="true"
              />
              <p className="absolute inset-x-5 bottom-5 font-serif text-[1.25rem] text-ivory">
                Everything prepared for your appointment.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-line/80 bg-cream/60 p-6 sm:p-7">
              <h2 className="text-[1.3rem] text-ink">Studio details</h2>
              <ul className="mt-4 space-y-3 text-[0.83rem] leading-relaxed text-mocha">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink"
                  >
                    {site.contact.address}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <a
                      href={`tel:${site.contact.phoneE164}`}
                      className="transition-colors hover:text-ink"
                    >
                      {site.contact.phoneDisplay}
                    </a>
                    <span className="mx-2 text-line" aria-hidden="true">·</span>
                    <a
                      href={`tel:${site.contact.alternatePhoneE164}`}
                      className="transition-colors hover:text-ink"
                    >
                      {site.contact.alternatePhoneDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <InstagramIcon className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink"
                  >
                    @{site.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Planning ahead"
            title={
              <>
                Bridal and occasion{" "}
                <em className="italic text-gold">enquiries</em>
              </>
            }
            description="For weddings and large celebrations, earlier is always easier. Share the date and the services you are considering, even if the details are not final yet."
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/services/pre-bridal-packages">
              Explore pre-bridal packages
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline">
              View the price guide
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
