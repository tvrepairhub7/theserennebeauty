import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Gem, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { NoteBanner } from "@/components/ui-bits";
import { bridalPackages } from "@/data/packages";
import {
  beautyCategories,
  getService,
  makeupCategories,
  type ServiceCategory,
} from "@/data/services";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Price Guide",
  description:
    "Makeup and beauty price guide: party makeup from ₹1,499, engagement makeup from ₹6,999, bridal and reception makeup from ₹9,999, and pre-bridal packages from ₹14,999.",
  alternates: { canonical: "/pricing" },
};

function MakeupPriceTable({ category }: { category: ServiceCategory }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line/80 bg-ivory shadow-soft">
      <div className="flex items-end justify-between gap-4 bg-espresso px-5 py-4 text-ivory">
        <div>
          <p className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-champagne">
            {category.eyebrow}
          </p>
          <h3 className="mt-1 text-[1.3rem] leading-tight text-ivory">
            {category.title}
          </h3>
        </div>
        <Link
          href={`/services/${category.slug}`}
          className="shrink-0 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/70 underline decoration-ivory/30 underline-offset-4 transition hover:text-champagne"
        >
          Details
        </Link>
      </div>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {category.title} prices. All services include hairdo and draping.
        </caption>
        <tbody>
          {category.items
            .filter((service) => !service.includes)
            .map((service, index) => (
              <tr
                key={service.id}
                className={index % 2 === 0 ? "bg-ivory" : "bg-cream/40"}
              >
                <th
                  scope="row"
                  className="px-5 py-3.5 text-left text-[0.82rem] font-normal leading-snug text-ink/85"
                >
                  <Link
                    href={`/services/${category.slug}/${service.id}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-gold"
                  >
                    {service.name}
                  </Link>
                </th>
                <td className="whitespace-nowrap px-5 py-3.5 text-right font-serif text-[1.02rem] text-ink">
                  {service.price !== null ? formatINR(service.price) : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p className="border-t border-line/70 px-5 py-3 text-[0.68rem] uppercase tracking-[0.12em] text-mocha">
        Hairdo & draping included
      </p>
    </div>
  );
}

export default function PricingPage() {
  const signature = getService("bridal-signature");

  return (
    <>
      <PageHero
        eyebrow="Price guide"
        title={
          <>
            Clear prices,{" "}
            <em className="italic text-gold">no surprises</em>
          </>
        }
        description="Every confirmed price is listed below exactly as supplied. Beauty treatment prices are confirmed by the studio on enquiry — they are never estimated or invented here."
        image="sareeRed"
        badge="Hairdo & draping included in makeup"
      >
        <ButtonLink href="/book">
          Book an appointment
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Ask about a service
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Makeup"
              title={
                <>
                  Occasion and{" "}
                  <em className="italic text-gold">bridal makeup</em>
                </>
              }
              description="Party, engagement, bridal and reception services, each finished with hairdo and draping. Every price is per appointment."
            />
            <p className="max-w-xs text-[0.78rem] leading-relaxed text-mocha lg:text-right">
              {site.note}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {makeupCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 80}>
                <MakeupPriceTable category={category} />
              </Reveal>
            ))}
          </div>

          {signature ? (
            <Reveal className="mt-6">
              <div className="grid items-center gap-6 rounded-[1.8rem] border border-champagne/60 bg-cream/70 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-champagne/20 text-gold">
                      <Gem className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-gold">
                        Listed separately
                      </p>
                      <h3 className="mt-1 text-[1.5rem] leading-tight text-ink">
                        {signature.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 max-w-2xl text-[0.85rem] leading-relaxed text-mocha">
                    This is its own service, quoted separately from the bridal and
                    reception prices above. It is not combined with those prices.
                    Inclusions can be edited in the central pricing data.
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    {(signature.includes ?? []).map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[0.8rem] text-ink/80"
                      >
                        <Check className="size-3.5 text-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <p className="font-serif text-[2.4rem] leading-none text-ink">
                    {formatINR(signature.price ?? 0)}
                  </p>
                  <ButtonLink href={`/book?service=${signature.id}`} size="md">
                    Book this service
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ) : null}

          <div className="mt-8">
            <NoteBanner>
              Hair accessories and eye lenses are chargeable separately. Prices
              shown are for makeup, hairdo and draping as listed.
            </NoteBanner>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-espresso py-20 text-ivory lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
        <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-champagne/10 blur-3xl" />
        <div className="container-luxe relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              light
              eyebrow="Pre-bridal packages"
              title={
                <>
                  Complete programmes,{" "}
                  <em className="italic text-champagne">clearly priced</em>
                </>
              }
              description="Each package bundles the pre-wedding treatments with bridal-day makeup. Prices and inclusions remain editable until confirmed with the studio."
            />
            <ButtonLink
              href="/services/pre-bridal-packages"
              variant="light"
              className="self-start lg:self-auto"
            >
              Compare inclusions
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {bridalPackages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 90}>
                <article className="flex h-full flex-col rounded-[1.8rem] border border-champagne/25 bg-ivory/[0.06] p-6 backdrop-blur sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.6rem] leading-tight text-ivory">
                        {pkg.name}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.83rem] leading-relaxed text-ivory/60">
                        {pkg.summary}
                      </p>
                    </div>
                    <p className="font-serif text-[2rem] leading-none text-champagne">
                      {formatINR(pkg.price)}
                    </p>
                  </div>

                  <div className="my-6 hairline" />

                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-champagne/80">
                    {pkg.inclusions.length} treatments included
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {pkg.inclusions.slice(0, 5).map((inclusion) => (
                      <li
                        key={inclusion}
                        className="rounded-full border border-ivory/15 px-3 py-1.5 text-[0.7rem] text-ivory/75"
                      >
                        {inclusion}
                      </li>
                    ))}
                    {pkg.inclusions.length > 5 ? (
                      <li className="rounded-full border border-champagne/30 px-3 py-1.5 text-[0.7rem] text-champagne">
                        + {pkg.inclusions.length - 5} more
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
                    <ButtonLink
                      href={`/book?package=${pkg.id}`}
                      variant="gold"
                      className="flex-1"
                    >
                      Book this package
                    </ButtonLink>
                    <ButtonLink
                      href="/services/pre-bridal-packages"
                      variant="light"
                      className="flex-1"
                    >
                      Full details
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {site.isPlaceholderContent ? (
            <p className="mt-6 text-[0.74rem] leading-relaxed text-ivory/45">
              Package prices and inclusions require confirmation before
              publication. Edit them in one data file; the cards, comparison table
              and booking form update together.
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Beauty treatments"
              title={
                <>
                  Facials, waxing, nails &{" "}
                  <em className="italic text-gold">threading</em>
                </>
              }
              description="Treatment rates are confirmed with the studio. Share the treatments you are considering and your preferred date, and we will reply with the current rates before you book."
            />
            <ButtonLink href="/contact" variant="outline" className="self-start lg:self-auto">
              Request a quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {beautyCategories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 2) * 80}>
                <div className="h-full overflow-hidden rounded-[1.5rem] border border-line/80 bg-ivory shadow-soft">
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-gold">
                        {category.eyebrow}
                      </p>
                      <h3 className="mt-1 text-[1.25rem] leading-tight text-ink">
                        {category.title}
                      </h3>
                    </div>
                    <Link
                      href={`/services/${category.slug}`}
                      className="shrink-0 text-[0.58rem] uppercase tracking-[0.14em] text-mocha underline decoration-line underline-offset-4 transition hover:text-gold"
                    >
                      View
                    </Link>
                  </div>
                  <ul className="border-t border-line/70">
                    {category.items.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services/${category.slug}/${service.id}`}
                          className="group flex items-center justify-between gap-4 border-b border-line/50 px-5 py-2.5 transition hover:bg-cream/50 last:border-b-0"
                        >
                          <span className="text-[0.8rem] leading-snug text-ink/80 transition group-hover:text-ink">
                            {service.name}
                          </span>
                          <ArrowUpRight
                            className="size-3.5 shrink-0 text-mocha/60 transition group-hover:text-gold"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <NoteBanner>
              No beauty treatment prices have been supplied yet, so they are not
              estimated. Once the studio confirms them, add each price in the
              central services file and this page will show it automatically.
            </NoteBanner>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Hairdo & draping",
                text: "Included with every party, engagement, bridal and reception makeup service.",
              },
              {
                title: "Packages stay separate",
                text: "Pre-bridal packages are priced and listed separately from individual makeup services.",
              },
              {
                title: "Confirmed before you book",
                text: "The studio confirms treatment rates when you get in touch, before the appointment is finalised.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line/80 bg-ivory p-5"
              >
                <p className="flex items-center gap-2 font-serif text-[1.1rem] text-ink">
                  <Sparkles className="size-3.5 text-gold" aria-hidden="true" />
                  {item.title}
                </p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-mocha">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.78rem] text-mocha">
            <span>Looking for a specific occasion look?</span>
            <Link
              href="/services"
              className="underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
            >
              Browse all services
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Reserve your date"
        title="Know what you want? Let’s secure the date."
        description="Send your preferred service, date and time. The studio will confirm availability and the final price before the appointment is booked."
      />
    </>
  );
}
