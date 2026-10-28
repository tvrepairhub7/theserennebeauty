import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Heart,
  Palette,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { NoteBanner } from "@/components/ui-bits";
import { StatsBand } from "@/components/stats-band";
import { images } from "@/data/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About the Studio",
  description:
    "A calm, personal approach to bridal and occasion makeup, plus considered beauty treatments. Learn how appointments at " +
    site.name +
    " are planned around you.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Heart,
    title: "Natural beauty first",
    text: "Makeup should enhance your features, not mask them. The aim is a finish that still looks like you — just rested, polished and ready for the occasion.",
  },
  {
    icon: Palette,
    title: "Personal to the detail",
    text: "Outfit, jewellery, venue lighting and the time of day all shape the look. Every choice is made for your celebration, not copied from a trend.",
  },
  {
    icon: Camera,
    title: "Made for the moment",
    text: "Products and finishes are chosen to hold up through long celebrations, warm weather and photographs — from the first image to the last dance.",
  },
  {
    icon: Sparkles,
    title: "A welcoming experience",
    text: "Appointments are unhurried and comfortable, with time to talk through the look and adjust anything that does not feel right.",
  },
];

const steps = [
  {
    title: "Tell us about the occasion",
    text: "Share the date, the outfit and the look you have in mind through the booking form or WhatsApp.",
  },
  {
    title: "Plan the details",
    text: "We confirm availability and talk through the finish, timings and any add-ons such as hairdo or draping.",
  },
  {
    title: "The appointment",
    text: "Your look is created with time for finishing touches, photographs and any last-minute adjustments.",
  },
  {
    title: "Ready for the occasion",
    text: "Leave with a look designed to stay comfortable and camera-ready for the hours ahead.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title={
          <>
            Beauty that feels{" "}
            <em className="italic text-gold">considered</em>, calm and entirely
            you
          </>
        }
        description="A makeup artistry and beauty studio for brides, celebrations and everyday care. Every appointment is planned around the person in the chair — your features, your outfit and the way you want to feel."
        image="artistAtWork"
        badge="Natural beauty, personal detail"
      >
        <ButtonLink href="/book">
          Book an appointment
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/services" variant="outline">
          Explore services
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-lg pb-10 pr-8">
            <div
              className="absolute -left-4 -top-4 size-28 border-l border-t border-gold/30"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
              <Image
                src={images.makeupApplication.src}
                alt={images.makeupApplication.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[46%] overflow-hidden rounded-[1.4rem] border-[6px] border-ivory shadow-luxe">
              <div className="relative aspect-square">
                <Image
                  src={images.artistClient.src}
                  alt={images.artistClient.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -left-3 bottom-24 hidden rounded-2xl border border-line bg-ivory/95 px-4 py-3 shadow-luxe backdrop-blur sm:block">
              <p className="font-serif text-[1.3rem] leading-none text-ink">
                Bridal · Occasion · Everyday
              </p>
              <p className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-mocha">
                Makeup and beauty, together
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our approach"
              title={
                <>
                  A studio built around{" "}
                  <em className="italic text-gold">how you want to feel</em>
                </>
              }
              description="The focus is not a single signature look, but a look that suits the person wearing it. That means listening first, planning the details, and choosing finishes that photograph beautifully without feeling heavy."
            />
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-mocha">
              Alongside makeup, the studio offers facials, waxing, manicures,
              pedicures, body polishing and threading — so skin, hands, feet and
              finishing touches can be prepared in the same calm setting.
            </p>
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-mocha">
              Whether it is a wedding, an engagement, a family celebration or a
              quiet reset, the same care goes into every appointment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/portfolio">View our portfolio</ButtonLink>
              <ButtonLink href="/services/pre-bridal-packages" variant="outline">
                Pre-bridal packages
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What guides us"
            title={
              <>
                Four things we never{" "}
                <em className="italic text-gold">compromise</em>
              </>
            }
            description="A few principles shape every appointment, from the first enquiry to the final setting spray."
            align="center"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 80}>
                <article className="flex h-full flex-col rounded-[1.6rem] border border-line/70 bg-ivory p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold/25 bg-champagne/10 text-gold">
                    <principle.icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.3rem] leading-snug text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-mocha">
                    {principle.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="The experience"
            title={
              <>
                From first enquiry to{" "}
                <em className="italic text-gold">final touch</em>
              </>
            }
            description="A simple, considered process so nothing about the appointment feels rushed — and nothing is left to the last minute."
          />

          <ol className="space-y-0">
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 70}
                className="relative flex gap-5 border-t border-line/80 py-6 first:border-t-0 first:pt-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 font-serif text-[1rem] text-gold">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-[1.3rem] text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-lg text-[0.86rem] leading-relaxed text-mocha">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="container-luxe mt-12">
          <NoteBanner>{site.booking.policyNote}</NoteBanner>
        </div>
      </section>

      <CtaBand
        eyebrow="Come and see us"
        title="A considered look starts with a conversation."
        description="Tell us about the occasion and the details that matter to you. We will help with availability, timings and the right service for the day."
      />
    </>
  );
}
