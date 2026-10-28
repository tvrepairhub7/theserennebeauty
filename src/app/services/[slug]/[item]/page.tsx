import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Gem,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { NoteBanner } from "@/components/ui-bits";
import { images } from "@/data/images";
import {
  getServiceByPath,
  makeupCategories,
  servicePaths,
} from "@/data/services";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

interface ServiceItemPageProps {
  params: Promise<{ slug: string; item: string }>;
}

export function generateStaticParams() {
  return servicePaths;
}

export async function generateMetadata({
  params,
}: ServiceItemPageProps): Promise<Metadata> {
  const { slug, item } = await params;
  const result = getServiceByPath(slug, item);
  if (!result) return { title: "Service not found" };

  const { category, service } = result;
  return {
    title: service.name,
    description: `${service.description} ${category.title} at ${site.name}, Lucknow.`,
    alternates: { canonical: `/services/${category.slug}/${service.id}` },
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.description,
      url: `/services/${category.slug}/${service.id}`,
      images: service.image
        ? [{ url: images[service.image].src, alt: images[service.image].alt }]
        : undefined,
    },
  };
}

export default function ServiceItemPage({ params }: ServiceItemPageProps) {
  return (
    <Suspense
      fallback={
        <div
          className="container-luxe min-h-[70vh] py-20"
          aria-busy="true"
          aria-label="Loading service"
        >
          <div className="h-3 w-32 rounded-full bg-line/70" />
          <div className="mt-6 h-12 w-2/3 max-w-lg rounded-2xl bg-line/40" />
          <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-line/40" />
        </div>
      }
    >
      <ServiceItemContent params={params} />
    </Suspense>
  );
}

async function ServiceItemContent({ params }: ServiceItemPageProps) {
  const { slug, item } = await params;
  const result = getServiceByPath(slug, item);
  if (!result) notFound();

  const { category, service } = result;
  const photo = service.image
    ? images[service.image]
    : images[category.image];
  const isMakeup = makeupCategories.includes(category);
  const includesHair = isMakeup && !service.includes;
  const siblings = category.items.filter((entry) => entry.id !== service.id);
  const index = category.items.findIndex((entry) => entry.id === service.id);
  const previous =
    category.items[(index - 1 + category.items.length) % category.items.length];
  const next = category.items[(index + 1) % category.items.length];
  const wa = whatsappLink(
    `Hello! I would like to know more about "${service.name}". Could you help me with availability?`,
  );

  return (
    <>
      <section className="relative overflow-hidden paper-texture">
        <div className="pointer-events-none absolute -left-24 top-16 size-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-64 rounded-full bg-blush/25 blur-3xl" />

        <div className="container-luxe relative py-8 lg:py-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-mocha"
          >
            <Link href="/" className="transition hover:text-gold">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="transition hover:text-gold">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/services/${category.slug}`}
              className="transition hover:text-gold"
            >
              {category.title}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{service.name}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="order-2 animate-rise lg:order-1">
              <p className="eyebrow">{category.title}</p>
              <h1 className="mt-5 text-[2.4rem] leading-[1.04] text-ink sm:text-5xl">
                {service.name}
              </h1>

              {service.price !== null ? (
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="font-serif text-[2.4rem] leading-none text-ink">
                    {formatINR(service.price)}
                  </p>
                  <span className="rounded-full border border-gold/30 bg-champagne/10 px-3 py-1.5 text-[0.56rem] font-medium uppercase tracking-[0.16em] text-gold">
                    {service.includes ? "Listed separately" : "Per appointment"}
                  </span>
                </div>
              ) : null}

              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mocha">
                {service.description}
              </p>

              {service.includes ? (
                <div className="mt-6 rounded-2xl border border-champagne/50 bg-cream/70 p-5">
                  <p className="flex items-center gap-2 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-gold">
                    <Gem className="size-3.5" aria-hidden="true" />
                    What&apos;s included
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {service.includes.map((inclusion) => (
                      <li
                        key={inclusion}
                        className="flex items-center gap-2 text-[0.84rem] text-ink/85"
                      >
                        <span className="inline-flex size-4 items-center justify-center rounded-full bg-champagne/25 text-gold">
                          <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {inclusion}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.74rem] leading-relaxed text-mocha">
                    This service is priced on its own and is not combined with the
                    other bridal or reception prices.
                  </p>
                </div>
              ) : null}

              {includesHair ? (
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {["Hairdo", "Draping", "Personalised finish"].map((inclusion) => (
                    <li
                      key={inclusion}
                      className="flex items-center gap-2 text-[0.82rem] text-ink/80"
                    >
                      <span className="inline-flex size-4 items-center justify-center rounded-full bg-champagne/25 text-gold">
                        <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {inclusion}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/book?service=${service.id}`} size="lg">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Book this appointment
                </ButtonLink>
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg btn-whatsapp"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Ask on WhatsApp
                  </a>
                ) : null}
              </div>

              <Link
                href={`/services/${category.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
              >
                All {category.title.toLowerCase()} options
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="relative order-1 mx-auto w-full max-w-xl animate-rise [animation-delay:120ms] lg:order-2">
              <div
                className="absolute -inset-3 rounded-[999px_999px_2rem_2rem] border border-gold/25"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_1.6rem_1.6rem] shadow-luxe">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 94vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute inset-x-5 bottom-5 rounded-full border border-ivory/35 bg-espresso/35 px-4 py-2 text-center text-[0.56rem] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur">
                  {category.eyebrow}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-20">
        <div className="container-luxe grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Good to know"
            title={
              <>
                Before your <em className="italic text-gold">appointment</em>
              </>
            }
            description={category.note ?? site.note}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Sparkles,
                title: "Planned around you",
                text: "The finish is chosen for your features, outfit and the occasion — never a one-look-fits-all routine.",
              },
              {
                icon: CalendarDays,
                title: "Confirmed on WhatsApp",
                text: "Send your date and time through the booking form; the studio confirms availability directly.",
              },
              {
                icon: MessageCircle,
                title: "Questions welcome",
                text: "Share inspiration photographs or ask about add-ons before the appointment.",
              },
              {
                icon: Gem,
                title: "Extras kept separate",
                text: site.note,
              },
            ].map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-line/80 bg-white/60 p-5"
              >
                <point.icon className="size-4 text-gold" aria-hidden="true" />
                <p className="mt-3 font-serif text-[1.12rem] text-ink">
                  {point.title}
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mocha">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-luxe mt-8">
          <NoteBanner>{site.booking.policyNote}</NoteBanner>
        </div>
      </section>

      {siblings.length > 0 ? (
        <section className="bg-cream py-16 lg:py-20">
          <div className="container-luxe">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow={category.eyebrow}
                title={
                  <>
                    More in <em className="italic text-gold">{category.title}</em>
                  </>
                }
              />
              <ButtonLink
                href={`/services/${category.slug}`}
                variant="outline"
                className="self-start"
              >
                View category
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((sibling, siblingIndex) => (
                <Reveal key={sibling.id} delay={siblingIndex * 60}>
                  <Link
                    href={`/services/${category.slug}/${sibling.id}`}
                    className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-line/80 bg-ivory px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-soft"
                  >
                    <div>
                      <p className="text-[0.72rem] leading-snug text-ink/85">
                        {sibling.name}
                      </p>
                      {sibling.price !== null ? (
                        <p className="mt-1 font-serif text-[0.95rem] text-gold">
                          {formatINR(sibling.price)}
                        </p>
                      ) : null}
                    </div>
                    <ArrowRight
                      className="size-4 shrink-0 text-mocha transition group-hover:translate-x-0.5 group-hover:text-gold"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={`/services/${category.slug}/${previous.id}`}
                className="group inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:text-gold"
              >
                <ArrowRight className="size-4 rotate-180 transition group-hover:-translate-x-0.5" aria-hidden="true" />
                Previous
              </Link>
              <Link
                href={`/services/${category.slug}/${next.id}`}
                className="group inline-flex items-center gap-2 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:text-gold"
              >
                Next
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
