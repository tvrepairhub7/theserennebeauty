import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Feather,
  Sparkles,
  Star,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { PackageCard } from "@/components/package-card";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { TestimonialsSection } from "@/components/testimonials";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink } from "@/components/button-link";
import { NoteBanner } from "@/components/ui-bits";
import { Marquee } from "@/components/marquee";
import { StatsBand } from "@/components/stats-band";
import { InstagramBand } from "@/components/instagram-band";
import { Flourish, SpinningSeal } from "@/components/ornaments";
import { images } from "@/data/images";
import { bridalPackages } from "@/data/packages";
import {
  getService,
  makeupCategories,
  startingPrice,
} from "@/data/services";
import { formatINR } from "@/lib/format";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Bridal, Party & Engagement Makeup Artist`,
  description:
    "Professional bridal, engagement and party makeup, pre-bridal packages and beauty treatments in " +
    site.contact.city +
    ". Book a personalised appointment with " +
    site.name +
    ".",
  alternates: { canonical: "/" },
};

const treatments = [
  "regular-facial",
  "advanced-manicure",
  "advanced-pedicure",
  "full-body-wax",
  "body-polishing",
  "eyebrow-threading",
]
  .map((id) => getService(id))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

const values = [
  {
    icon: Sparkles,
    title: "Designed around you",
    text: "Your features, outfit and occasion guide every product and every finish.",
  },
  {
    icon: Feather,
    title: "Calm & unhurried",
    text: "A comfortable, welcoming appointment with time to get the details right.",
  },
  {
    icon: Camera,
    title: "Photo-ready detail",
    text: "Finishes chosen to look beautiful in person and in every photograph.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-lg pb-10 pr-8">
            <div
              className="absolute -left-4 -top-4 size-28 border-l border-t border-gold/30"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem]">
              <Image
                src={images.salonInterior.src}
                alt={images.salonInterior.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[46%] overflow-hidden rounded-[1.4rem] border-[6px] border-ivory shadow-luxe">
              <div className="relative aspect-square">
                <Image
                  src={images.artistAtWork.src}
                  alt={images.artistAtWork.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -left-3 bottom-24 hidden rounded-2xl border border-line bg-ivory/95 px-4 py-3 shadow-luxe backdrop-blur sm:block">
              <div className="flex items-center gap-1 text-champagne" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3 fill-champagne" />
                ))}
              </div>
              <p className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-mocha">
                Personal artistry
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Welcome to the studio"
              title={
                <>
                  Beauty that still feels{" "}
                  <em className="italic text-gold">like you</em>
                </>
              }
              description="Whether it is your wedding day, an engagement celebration or a night out, the goal is the same: makeup that feels comfortable, photographs beautifully and reflects your own style."
            />
            <p className="mt-4 max-w-xl text-[0.94rem] leading-relaxed text-mocha">
              Alongside makeup, a complete menu of facials, waxing, manicures,
              pedicures, body polishing and threading is available — so you can
              prepare for the occasion from head to toe, in one calm setting.
            </p>

            <ul className="mt-8 space-y-4">
              {values.map((value, index) => (
                <Reveal as="li" key={value.title} delay={index * 80} className="flex gap-4">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-champagne/10 text-gold">
                    <value.icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.16rem] text-ink">{value.title}</h3>
                    <p className="mt-0.5 text-[0.84rem] leading-relaxed text-mocha">
                      {value.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="primary">
                Our story
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/services/pre-bridal-packages" variant="outline">
                Pre-bridal packages
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Makeup services"
              title={
                <>
                  For every <em className="italic text-gold">occasion</em>
                </>
              }
              description="From understated party polish to a complete bridal transformation. Every makeup service includes hairdo and draping, with HD and airbrush options for a flawless finish."
            />
            <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {makeupCategories.map((category, index) => {
              const photo = images[category.image];
              const from = startingPrice(category);
              return (
                <Reveal key={category.slug} delay={index * 100}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-line/70 bg-ivory shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/5 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-full border border-ivory/35 bg-espresso/30 font-serif text-[0.82rem] text-ivory backdrop-blur">
                        0{index + 1}
                      </span>
                      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                        <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-champagne">
                          {category.eyebrow}
                        </p>
                        {from !== null ? (
                          <p className="rounded-full bg-ivory/95 px-3 py-1.5 font-serif text-[0.92rem] text-ink">
                            from {formatINR(from)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-[1.55rem] text-ink">{category.title}</h3>
                      <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-mocha">
                        {category.tagline}
                      </p>
                      <span className="mt-5 flex items-center justify-between border-t border-line/70 pt-4 text-[0.62rem] font-medium uppercase tracking-[0.19em] text-ink transition-colors group-hover:text-gold">
                        Explore services
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8">
            <NoteBanner>{site.note}</NoteBanner>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Beauty treatments"
              title={
                <>
                  Care from <em className="italic text-gold">head to toe</em>
                </>
              }
              description="Facials, waxing, manicures, pedicures, body polishing and threading — curated treatments to complete your look and your routine."
            />
            <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
              Explore treatments
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 80}>
                <ServiceCard service={service} compact />
              </Reveal>
            ))}
          </div>
          <p className="mt-7 text-center text-[0.76rem] leading-relaxed text-mocha">
            Ask the studio about treatment rates when you book.{" "}
            <Link
              href="/pricing"
              className="underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
            >
              View the full price guide
            </Link>
            .
          </p>
        </div>
      </section>

      <StatsBand />

      <section className="relative overflow-hidden bg-espresso py-20 text-ivory lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
        <div className="pointer-events-none absolute -right-20 top-10 size-80 rounded-full bg-champagne/10 blur-3xl" />
        <div className="container-luxe relative">
          <SectionHeading
            light
            eyebrow="Pre-bridal"
            title={
              <>
                The bridal countdown,{" "}
                <em className="italic text-champagne">beautifully planned</em>
              </>
            }
            description="Two complete pre-bridal programmes bring skin, hands, feet, waxing and bridal-day makeup together — so the weeks before your wedding feel as considered as the day itself."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {bridalPackages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 100}>
                <PackageCard pkg={pkg} compact />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[0.78rem] leading-relaxed text-ivory/50">
              Package prices and inclusions are editable in one data file. Confirm
              final details with the studio before booking.
            </p>
            <ButtonLink href="/services/pre-bridal-packages" variant="light" className="shrink-0">
              See full package details
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-20 top-0 size-64 rounded-full bg-blush/40 blur-3xl" />
        <div className="container-luxe relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Flourish className="justify-start" />
            <p className="mt-7 eyebrow">The experience</p>
            <h2 className="mt-5 max-w-xl text-3xl leading-[1.1] text-ink sm:text-4xl lg:text-[2.9rem]">
              Calm, considered and{" "}
              <em className="italic text-gold">entirely yours</em>
            </h2>
            <p className="mt-5 max-w-xl text-[0.96rem] leading-relaxed text-mocha">
              An appointment should feel unhurried. We begin with the occasion
              and your outfit, then shape the makeup, hair and finish around the
              details that matter to you.
            </p>

            <ol className="mt-8 space-y-5">
              {[
                {
                  title: "A conversation first",
                  text: "Share the date, outfit, jewellery and any inspiration you have in mind.",
                },
                {
                  title: "A look built in detail",
                  text: "Skin, eyes, hair and draping are planned together for a balanced finish.",
                },
                {
                  title: "Time to enjoy the occasion",
                  text: "Arrive, settle in and leave ready for the photographs and the celebration.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-serif text-[1.4rem] leading-none text-gold/70">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-serif text-[1.2rem] text-ink">{step.title}</p>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-mocha">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <ButtonLink href="/about" variant="outline">
                More about the studio
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/25" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] shadow-luxe">
              <Image
                src={images.artistAtWork.src}
                alt={images.artistAtWork.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent"
                aria-hidden="true"
              />
              <p className="absolute inset-x-6 bottom-6 font-serif text-[1.3rem] leading-snug text-ivory">
                The details are the difference.
              </p>
            </div>
            <div className="absolute -bottom-8 -left-6 hidden rounded-full bg-ivory p-1.5 shadow-luxe sm:block">
              <SpinningSeal id="home-experience" className="size-24" />
            </div>
          </div>
        </div>
      </section>

      <PortfolioPreview />
      <InstagramBand />
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}
