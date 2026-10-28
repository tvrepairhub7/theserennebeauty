import { CalendarDays, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "./button-link";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

interface CtaBandProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function CtaBand({
  eyebrow = "Reserve your date",
  title = "Your appointment, made personal.",
  description = "Tell us the occasion, the date and the look you have in mind. We will confirm availability and the little details that make your appointment feel effortless.",
}: CtaBandProps) {
  const wa = whatsappLink(
    "Hello! I would like to check appointment availability. Could you help me with the next steps?",
  );

  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
      <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full border border-champagne/15" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-champagne/10 blur-3xl" />

      <div className="container-luxe relative grid items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <Reveal>
          <p className="eyebrow text-champagne">{eyebrow}</p>
          <h2 className="mt-5 max-w-xl text-3xl leading-[1.1] text-ivory sm:text-4xl lg:text-[3rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ivory/65">
            {description}
          </p>
          <p className="mt-6 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-ivory/45">
            <Sparkles className="size-3.5 text-champagne" aria-hidden="true" />
            {site.booking.policyNote}
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-3 lg:items-end">
          <ButtonLink href="/book" variant="gold" size="lg" className="w-full lg:w-auto">
            <CalendarDays className="size-4" aria-hidden="true" />
            Book your appointment
          </ButtonLink>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-light-outline w-full lg:w-auto"
            >
              <WhatsAppIcon className="size-4" />
              Chat on WhatsApp
            </a>
          ) : null}
          <p className="mt-2 text-center text-[0.66rem] uppercase tracking-[0.16em] text-ivory/40 lg:text-right">
            {site.contact.phoneDisplay} · {site.contact.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
