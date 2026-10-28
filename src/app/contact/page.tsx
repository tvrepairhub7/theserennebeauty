import type { Metadata } from "next";
import {
  Clock,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/icons";
import { site, socialLinks } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to ask about bridal, engagement and party makeup, beauty treatments or pre-bridal packages. Contact details, opening hours and a message form.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Use the booking form or message the studio on WhatsApp. The studio confirms availability and the final details on WhatsApp or by phone before the appointment is secured.",
  },
  {
    question: "How far in advance should I book?",
    answer: site.booking.policyNote,
  },
  {
    question: "Can I ask about a specific look or add-on?",
    answer:
      "Yes. Share reference photographs, your outfit and any add-ons you are considering — such as hairdo, draping or a particular finish — when you enquire.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Bring or send photographs of your outfit and jewellery, any inspiration images, and let the studio know about skin sensitivities or allergies in advance.",
  },
  {
    question: "Are all prices listed on the website?",
    answer:
      "Makeup and package prices are listed in the price guide. The studio confirms beauty treatment rates when you get in touch, so they are never estimated online.",
  },
];

export default function ContactPage() {
  const wa = whatsappLink(
    "Hello! I would like to ask about an appointment. Could you help me with availability?",
  );
  const configuredSocials = socialLinks.filter((social) => social.href);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s plan your{" "}
            <em className="italic text-gold">appointment</em>
          </>
        }
        description="Questions about a look, a package or availability? Send a message, chat on WhatsApp, or use the booking form — whichever feels easiest."
        image="hairSalon"
        badge="Questions welcome"
      >
        <ButtonLink href="/book">Book an appointment</ButtonLink>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-md btn-whatsapp"
          >
            <WhatsAppIcon className="size-4" />
            Chat on WhatsApp
          </a>
        ) : null}
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title={
                <>
                  Tell us what you have{" "}
                  <em className="italic text-gold">in mind</em>
                </>
              }
              description="Share the occasion, date and service you are interested in. The message opens in WhatsApp so it reaches the studio directly."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[1.8rem] border border-line/80 bg-cream/60 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[1.5rem] text-ink">Studio details</h2>
                <span className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-gold">
                  Gomti Nagar
                </span>
              </div>

              <ul className="mt-6 space-y-5">
                <li className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-mocha">
                      Phone
                    </p>
                    <a
                      href={`tel:${site.contact.phoneE164}`}
                      className="mt-1 block text-[0.92rem] text-ink transition hover:text-gold"
                    >
                      {site.contact.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${site.contact.alternatePhoneE164}`}
                      className="mt-0.5 block text-[0.88rem] text-mocha transition hover:text-gold"
                    >
                      {site.contact.alternatePhoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-mocha">
                      Studio
                    </p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink">
                      {site.contact.address}
                      <br />
                      {site.contact.city}
                    </p>
                    <p className="mt-1 text-[0.74rem] text-mocha">
                      Service area: {site.contact.serviceArea}
                    </p>
                    <a
                      href={site.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-gold transition hover:text-ink"
                    >
                      Open in Maps
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </li>

                <li className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-mocha">
                      Appointment hours
                    </p>
                    {site.hours.length > 0 ? (
                      <dl className="mt-1 space-y-0.5">
                        {site.hours.map((entry) => (
                          <div key={entry.days} className="flex flex-wrap gap-x-2">
                            <dt className="text-[0.86rem] text-ink">{entry.days}</dt>
                            <dd className="text-[0.86rem] text-mocha">{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <p className="mt-1 text-[0.86rem] leading-relaxed text-ink">
                        Timings are confirmed on WhatsApp when you book.
                      </p>
                    )}
                  </div>
                </li>

                <li className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-ivory text-gold">
                    <InstagramIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-mocha">
                      Instagram
                    </p>
                    <a
                      href={site.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-[0.92rem] text-ink transition hover:text-gold"
                    >
                      @{site.instagramHandle}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-line/80 pt-5">
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-md btn-whatsapp w-full"
                  >
                    <WhatsAppIcon className="size-4" />
                    Message on WhatsApp
                  </a>
                ) : null}
                {site.contact.mapsUrl ? (
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-md btn-outline w-full"
                  >
                    <MapPin className="size-4" aria-hidden="true" />
                    Get directions
                  </a>
                ) : null}
                <ButtonLink href="/book" variant="primary" className="w-full">
                  Book an appointment
                </ButtonLink>
              </div>

              {configuredSocials.length > 0 ? (
                <div className="mt-5 flex items-center gap-3">
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-mocha">
                    Follow
                  </span>
                  {configuredSocials.map((social) =>
                    social.id === "instagram" ? (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold hover:text-gold"
                      >
                        <InstagramIcon className="size-4" />
                      </a>
                    ) : (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-9 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold hover:text-gold"
                      >
                        <FacebookIcon className="size-4" />
                      </a>
                    ),
                  )}
                </div>
              ) : null}
            </div>

            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-[1.5rem] border border-champagne/50 bg-gradient-to-br from-blush-soft via-cream to-ivory p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-luxe"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-espresso text-ivory">
                <InstagramIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.56rem] font-medium uppercase tracking-[0.2em] text-gold">
                  Follow the studio
                </span>
                <span className="mt-1 block font-serif text-[1.2rem] text-ink">
                  @{site.instagramHandle}
                </span>
                <span className="mt-0.5 block text-[0.74rem] text-mocha">
                  Recent looks, reels and behind the scenes
                </span>
              </span>
              <span className="ml-auto text-lg text-gold transition group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>

            <div className="rounded-[1.5rem] border border-line/80 bg-ivory p-6 shadow-soft">
              <p className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-gold">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Good to know
              </p>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-mocha">
                {site.booking.policyNote}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-luxe">
          <div className="overflow-hidden rounded-[2rem] border border-line/80 bg-ivory shadow-soft">
            <div className="flex flex-col gap-3 border-b border-line/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Find the studio</p>
                <h2 className="mt-3 text-[1.8rem] leading-tight text-ink">
                  Station Road, Gomti Nagar
                </h2>
              </div>
              <ButtonLink href={site.contact.mapsUrl} variant="outline" size="md">
                <MapPin className="size-4" aria-hidden="true" />
                Get directions
              </ButtonLink>
            </div>
            <iframe
              title={`Map showing ${site.name} studio location`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                site.contact.address,
              )}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 grayscale-[0.15] sm:h-[26rem]"
            />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                A little more{" "}
                <em className="italic text-gold">clarity</em>
              </>
            }
            description="A few things clients usually ask before booking. If your question is not here, send a message — we are happy to help."
          />

          <div className="divide-y divide-line/80 border-y border-line/80">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 50}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.1rem] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-[1.22rem] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-gold transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl pr-8 text-[0.86rem] leading-relaxed text-mocha">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Reserve your date"
        title="Ready when you are."
        description="Send your preferred date, time and service. The studio will confirm availability and the details that make the appointment feel effortless."
      />
    </>
  );
}
