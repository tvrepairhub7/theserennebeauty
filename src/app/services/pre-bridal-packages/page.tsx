import type { Metadata } from "next";
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PackageCard } from "@/components/package-card";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { NoteBanner } from "@/components/ui-bits";
import { bridalPackages } from "@/data/packages";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pre-Bridal Packages",
  description:
    "Two complete pre-bridal programmes — Pre-Bridal Package ₹14,999 and Premium Pre-Bridal Package ₹24,999 — covering facials, waxing, manicure, pedicure, body polishing and bridal-day makeup.",
  alternates: { canonical: "/services/pre-bridal-packages" },
};

const steps = [
  {
    title: "Reserve your dates",
    text: "Share your wedding date and the treatments you are considering. The studio will confirm availability and plan the sessions around your countdown.",
  },
  {
    title: "Spread the sessions",
    text: "Facials, waxing and polishing are scheduled across the weeks before the wedding so skin has time to settle between treatments.",
  },
  {
    title: "The wedding day",
    text: "The final bridal makeup, hairdo and draping are completed on the day, with the earlier sessions already taken care of.",
  },
];

const comparisonRows = Array.from(
  new Set(bridalPackages.flatMap((pkg) => pkg.inclusions)),
);

export default function PreBridalPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Pre-bridal packages"
        title={
          <>
            The bridal countdown,{" "}
            <em className="italic text-gold">beautifully planned</em>
          </>
        }
        description="Two complete pre-wedding programmes that bring skin, hands, feet, waxing and bridal-day makeup together — so the weeks before the wedding feel as considered as the day itself."
        image="bridalJewel"
        badge="Two complete programmes"
      >
        <ButtonLink href="/book?package=pre-bridal-package">
          Book a package
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Ask about packages
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Choose your programme"
            title={
              <>
                Two ways to prepare,{" "}
                <em className="italic text-gold">one calm countdown</em>
              </>
            }
            description="Both programmes cover the essentials. The premium plan adds more indulgent treatment options, a hair spa and additional waxing."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {bridalPackages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 100}>
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>

          {site.isPlaceholderContent ? (
            <div className="mt-8">
              <NoteBanner>
                These package prices and inclusions are taken from the supplied
                notes and still need final confirmation before publication. Bridal
                makeup is listed within each package above — please confirm this
                with the studio before booking.
              </NoteBanner>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Side by side"
            title={
              <>
                Compare every{" "}
                <em className="italic text-gold">inclusion</em>
              </>
            }
            description="A full breakdown of what each programme covers. Scroll sideways on a small screen to see both columns."
          />

          <div className="mt-10 overflow-x-auto rounded-[1.6rem] border border-line/80 bg-ivory shadow-soft">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <caption className="sr-only">
                Comparison of inclusions in the Pre-Bridal Package and Premium
                Pre-Bridal Package
              </caption>
              <thead>
                <tr className="bg-espresso text-ivory">
                  <th scope="col" className="px-5 py-4 text-[0.62rem] font-medium uppercase tracking-[0.18em]">
                    Treatment
                  </th>
                  {bridalPackages.map((pkg) => (
                    <th
                      key={pkg.id}
                      scope="col"
                      className="px-4 py-4 text-center text-[0.62rem] font-medium uppercase tracking-[0.14em]"
                    >
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row}
                    className={index % 2 === 0 ? "bg-ivory" : "bg-cream/50"}
                  >
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-left text-[0.82rem] font-normal text-ink/85"
                    >
                      {row}
                    </th>
                    {bridalPackages.map((pkg) => (
                      <td key={pkg.id} className="px-4 py-3.5 text-center">
                        {pkg.inclusions.includes(row) ? (
                          <>
                            <Check
                              className="mx-auto size-4 text-gold"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <Minus
                              className="mx-auto size-4 text-line"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-line bg-ivory">
                  <th
                    scope="row"
                    className="px-5 py-4 text-left text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink"
                  >
                    Package price
                  </th>
                  {bridalPackages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className="px-4 py-4 text-center font-serif text-[1.25rem] text-ink"
                    >
                      {formatINR(pkg.price)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[0.76rem] leading-relaxed text-mocha">
            {site.note}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Planned around your{" "}
                <em className="italic text-gold">wedding date</em>
              </>
            }
            description="Package appointments are scheduled across the weeks before the wedding, with the bridal-day look completed on the day."
          />

          <ol>
            {steps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 70}
                className="flex gap-5 border-t border-line/80 py-6 first:border-t-0 first:pt-0"
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

        <div className="container-luxe mt-12 flex flex-col items-start justify-between gap-5 rounded-[1.6rem] border border-gold/25 bg-champagne/[0.08] p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-gold">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-[1.3rem] text-ink">
                Not sure which package fits?
              </p>
              <p className="mt-1 max-w-lg text-[0.82rem] leading-relaxed text-mocha">
                Share your wedding date and the treatments you already have
                planned. The studio will suggest the most suitable option.
              </p>
            </div>
          </div>
          <ButtonLink href="/contact" variant="outline" className="shrink-0">
            Ask the studio
          </ButtonLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Reserve your dates"
        title="Begin your bridal countdown."
        description="Bridal appointments are best booked well in advance. Share your wedding date and we will confirm availability for the package and the bridal-day look."
      />
    </>
  );
}
