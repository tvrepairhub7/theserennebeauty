import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { images } from "@/data/images";
import {
  getPortfolioItem,
  getRelatedPortfolio,
  portfolioCategoryCopy,
  portfolioCategoryService,
  portfolioItems,
} from "@/data/portfolio";
import { getCategory } from "@/data/services";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

interface PortfolioPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PortfolioPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getPortfolioItem(id);
  if (!item) return { title: "Look not found" };

  const photo = images[item.image];
  return {
    title: item.title,
    description: `${item.title}: ${portfolioCategoryCopy[item.category]} Book a personalised ${item.category.toLowerCase()} look at ${site.name}, Lucknow.`,
    alternates: { canonical: `/portfolio/${item.id}` },
    openGraph: {
      title: `${item.title} | ${site.name}`,
      description: portfolioCategoryCopy[item.category],
      url: `/portfolio/${item.id}`,
      images: [{ url: photo.src, alt: photo.alt }],
    },
  };
}

export default function PortfolioItemPage({ params }: PortfolioPageProps) {
  return (
    <Suspense
      fallback={
        <div
          className="container-luxe min-h-[70vh] py-20"
          aria-busy="true"
          aria-label="Loading look"
        >
          <div className="h-3 w-32 rounded-full bg-line/70" />
          <div className="mt-6 h-12 w-2/3 max-w-lg rounded-2xl bg-line/40" />
          <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-line/40" />
        </div>
      }
    >
      <PortfolioContent params={params} />
    </Suspense>
  );
}

async function PortfolioContent({ params }: PortfolioPageProps) {
  const { id } = await params;
  const item = getPortfolioItem(id);
  if (!item) notFound();

  const photo = images[item.image];
  const serviceCategory = getCategory(portfolioCategoryService[item.category]);
  const related = getRelatedPortfolio(item);
  const index = portfolioItems.findIndex((entry) => entry.id === item.id);
  const previous = portfolioItems[(index - 1 + portfolioItems.length) % portfolioItems.length];
  const next = portfolioItems[(index + 1) % portfolioItems.length];
  const wa = whatsappLink(
    `Hello! I love the "${item.title}" look on your website. Can we discuss something similar for my occasion?`,
  );

  return (
    <>
      <section className="relative overflow-hidden paper-texture">
        <div className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-blush/25 blur-3xl" />

        <div className="container-luxe relative py-8 lg:py-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-mocha">
            <Link href="/" className="transition hover:text-gold">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/portfolio" className="transition hover:text-gold">
              Portfolio
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{item.title}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="order-2 animate-rise lg:order-1">
              <p className="eyebrow">{item.category}</p>
              <h1 className="mt-5 text-[2.7rem] leading-[1.02] text-ink sm:text-6xl">
                {item.title}
              </h1>
              <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mocha">
                {portfolioCategoryCopy[item.category]}
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-y border-line/70 py-4 text-[0.8rem] text-ink/80">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-gold" aria-hidden="true" />
                  <dt className="sr-only">Studio</dt>
                  <dd>Gomti Nagar, Lucknow</dd>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-3.5 text-gold" aria-hidden="true" />
                  <dt className="sr-only">Booking</dt>
                  <dd>By appointment</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/book" size="lg">
                  Book this look
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-lg btn-whatsapp"
                  >
                    Ask about this look
                  </a>
                ) : null}
              </div>

              {serviceCategory ? (
                <Link
                  href={`/services/${serviceCategory.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.66rem] font-medium uppercase tracking-[0.16em] text-ink underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
                >
                  Explore {serviceCategory.title}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              ) : null}
            </div>

            <div className="relative order-1 mx-auto w-full max-w-xl animate-rise [animation-delay:120ms] lg:order-2">
              <div
                className="absolute -inset-3 rounded-[1.9rem] border border-gold/25"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-luxe">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 94vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute bottom-5 left-5 rounded-full border border-ivory/35 bg-espresso/35 px-4 py-2 text-[0.56rem] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur">
                  {item.category} · {site.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-20">
        <div className="container-luxe">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Keep exploring"
              title={
                <>
                  More <em className="italic text-gold">looks</em>
                </>
              }
              description="Browse a few more looks from the studio, or explore the services behind them."
            />
            <ButtonLink href="/portfolio" variant="outline" className="self-start">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Full portfolio
            </ButtonLink>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {related.map((entry, relatedIndex) => {
              const relatedPhoto = images[entry.image];
              return (
                <Reveal key={entry.id} delay={relatedIndex * 70}>
                  <Link
                    href={`/portfolio/${entry.id}`}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-[1.4rem]"
                  >
                    <Image
                      src={relatedPhoto.src}
                      alt={relatedPhoto.alt}
                      fill
                      sizes="(min-width: 768px) 32vw, 46vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent opacity-80 transition group-hover:opacity-95"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="text-[0.52rem] font-medium uppercase tracking-[0.2em] text-champagne">
                        {entry.category}
                      </p>
                      <p className="mt-1 font-serif text-[1.05rem] text-ivory">
                        {entry.title}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/portfolio/${previous.id}`}
              className="group inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:text-gold"
            >
              <ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" aria-hidden="true" />
              {previous.title}
            </Link>
            <Link
              href={`/portfolio/${next.id}`}
              className="group inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:text-gold sm:justify-end"
            >
              {next.title}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Make it yours"
        title="Love this look? Let's shape it around you."
        description={`Share the date, outfit and the details you love about this ${item.category.toLowerCase()} look. The studio will plan the finish, hairstyle and draping around you.`}
      />
    </>
  );
}
