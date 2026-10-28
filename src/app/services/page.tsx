import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { PackageCard } from "@/components/package-card";
import { CtaBand } from "@/components/cta-band";
import { Marquee } from "@/components/marquee";
import { images } from "@/data/images";
import { bridalPackages } from "@/data/packages";
import {
  beautyCategories,
  makeupCategories,
  startingPrice,
} from "@/data/services";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Makeup & Beauty Services",
  description:
    "Explore bridal, engagement and party makeup, pre-bridal packages, facials, waxing, manicures, pedicures, body polishing and threading at " +
    site.name +
    ".",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Makeup for the occasion,{" "}
            <em className="italic text-gold">beauty for the everyday</em>
          </>
        }
        description="A complete menu of makeup artistry and beauty treatments. Every makeup service includes hairdo and draping, and every appointment is planned around your features, outfit and timings."
        image="engagementGreen"
        badge="Hairdo & draping included"
      >
        <ButtonLink href="/book">
          Book an appointment
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/pricing" variant="outline">
          View price guide
        </ButtonLink>
      </PageHero>

      <Marquee />

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Makeup services"
              title={
                <>
                  For every <em className="italic text-gold">celebration</em>
                </>
              }
              description="From soft party polish to a complete bridal transformation. Choose the finish that suits the day — natural, advanced, HD or airbrush."
            />
            <p className="max-w-xs text-[0.78rem] leading-relaxed text-mocha lg:text-right">
              {site.note}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {makeupCategories.map((category, index) => {
              const photo = images[category.image];
              const from = startingPrice(category);
              return (
                <Reveal key={category.slug} delay={index * 90}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-line/70 bg-ivory shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      {from !== null ? (
                        <span className="absolute bottom-4 left-4 rounded-full bg-ivory/95 px-3 py-1.5 font-serif text-[0.95rem] text-ink backdrop-blur">
                          from {formatINR(from)}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gold">
                        {category.eyebrow}
                      </p>
                      <h3 className="mt-2 text-[1.6rem] leading-tight text-ink">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-mocha">
                        {category.tagline}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-line/70 pt-4">
                        {category.items.slice(0, 3).map((service) => (
                          <li
                            key={service.id}
                            className="flex items-baseline justify-between gap-3 text-[0.78rem] text-ink/75"
                          >
                            <span className="min-w-0">{service.name}</span>
                            {service.price !== null ? (
                              <span className="shrink-0 font-serif text-[0.9rem] text-ink">
                                {formatINR(service.price)}
                              </span>
                            ) : null}
                          </li>
                        ))}
                        {category.items.length > 3 ? (
                          <li className="text-[0.7rem] uppercase tracking-[0.14em] text-gold">
                            + {category.items.length - 3} more
                          </li>
                        ) : null}
                      </ul>

                      <span className="mt-5 flex items-center justify-between text-[0.62rem] font-medium uppercase tracking-[0.19em] text-ink transition-colors group-hover:text-gold">
                        View {category.navLabel.toLowerCase()}
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Beauty treatments"
            title={
              <>
                Care from <em className="italic text-gold">head to toe</em>
              </>
            }
            description="Facials, waxing, manicures, pedicures, body polishing, hair spa and threading. Treatment prices are confirmed on enquiry."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {beautyCategories.map((category, index) => {
              const photo = images[category.image];
              return (
                <Reveal key={category.slug} delay={index * 70}>
                  <Link
                    href={`/services/${category.slug}`}
                    className="group flex h-full overflow-hidden rounded-[1.6rem] border border-line/70 bg-ivory shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe"
                  >
                    <div className="relative w-[38%] shrink-0 overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 768px) 20vw, 40vw"
                        className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-[0.56rem] font-medium uppercase tracking-[0.18em] text-gold">
                        {category.eyebrow}
                      </p>
                      <h3 className="mt-1.5 text-[1.35rem] leading-snug text-ink">
                        {category.title}
                      </h3>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mocha">
                        {category.tagline}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-mocha">
                          {category.items.length}{" "}
                          {category.items.length === 1 ? "treatment" : "treatments"}
                        </span>
                        <ArrowUpRight
                          className="size-4 shrink-0 text-ink transition group-hover:text-gold"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      <section className="relative overflow-hidden bg-espresso py-20 text-ivory lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
        <div className="pointer-events-none absolute -right-20 top-10 size-80 rounded-full bg-champagne/10 blur-3xl" />
        <div className="container-luxe relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              light
              eyebrow="Pre-bridal"
              title={
                <>
                  The complete{" "}
                  <em className="italic text-champagne">bridal countdown</em>
                </>
              }
              description="Two pre-bridal programmes bring skin, hands, feet, waxing and bridal-day makeup together — with the option of a more indulgent premium plan."
            />
            <ButtonLink
              href="/services/pre-bridal-packages"
              variant="light"
              className="self-start lg:self-auto"
            >
              Compare packages
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {bridalPackages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 100}>
                <PackageCard pkg={pkg} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="container-luxe flex flex-col items-center gap-5 text-center">
          <span className="flex size-11 items-center justify-center rounded-full border border-gold/25 bg-champagne/10 text-gold">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <p className="max-w-xl text-[0.9rem] leading-relaxed text-mocha">
            Not sure which service is right for your occasion? Share the date,
            outfit and timings, and we will recommend the most suitable finish.
          </p>
          <ButtonLink href="/contact" variant="outline">
            Ask a question
          </ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
