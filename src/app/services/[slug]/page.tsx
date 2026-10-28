import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, Check, Gem, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { NoteBanner } from "@/components/ui-bits";
import {
  getCategory,
  serviceCategories,
  startingPrice,
} from "@/data/services";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return { title: "Service not found" };
  }

  return {
    title: category.title,
    description: `${category.tagline} ${category.intro}`,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      title: `${category.title} | ${site.name}`,
      description: category.tagline,
      url: `/services/${category.slug}`,
      images: [{ url: images[category.image].src, alt: images[category.image].alt }],
    },
  };
}

export default function ServiceCategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div
          className="container-luxe min-h-[70vh] py-20"
          aria-busy="true"
          aria-label="Loading service details"
        >
          <div className="h-3 w-32 rounded-full bg-line/70" />
          <div className="mt-6 h-12 w-2/3 max-w-lg rounded-2xl bg-line/40" />
          <div className="mt-4 h-4 w-full max-w-xl rounded-full bg-line/40" />
          <div className="mt-4 h-4 w-4/5 max-w-lg rounded-full bg-line/40" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const from = startingPrice(category);
  const individualItems = category.items.filter((item) => !item.includes);
  const separatelyListed = category.items.filter((item) => item.includes);
  const related = serviceCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.intro}
        image={category.image}
        badge={
          from !== null
            ? `From ${formatINR(from)} · hairdo & draping included`
            : "Prices confirmed on enquiry"
        }
      >
        <ButtonLink href="/book">
          Book this service
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/pricing" variant="outline">
          Full price guide
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Choose your finish"
              title={
                <>
                  {category.title},{" "}
                  <em className="italic text-gold">made personal</em>
                </>
              }
              description={category.tagline}
            />
            {category.note ? (
              <p className="max-w-xs text-[0.78rem] leading-relaxed text-mocha lg:text-right">
                {category.note}
              </p>
            ) : null}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {individualItems.map((service, index) => (
              <Reveal key={service.id} delay={(index % 3) * 80}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          {separatelyListed.length > 0 ? (
            <div className="mt-12 rounded-[2rem] border border-champagne/60 bg-cream/70 p-5 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-champagne/20 text-gold">
                    <Gem className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold">
                      Listed separately
                    </p>
                    <h3 className="mt-1 text-[1.5rem] leading-tight text-ink">
                      Bridal Makeup service
                    </h3>
                  </div>
                </div>
                <p className="font-serif text-[1.85rem] leading-none text-ink">
                  {formatINR(separatelyListed[0].price ?? 0)}
                </p>
              </div>

              <p className="mt-4 max-w-2xl text-[0.86rem] leading-relaxed text-mocha">
                This bridal makeup service is listed separately from the bridal
                and reception prices above. It is quoted as its own service and
                is not combined with, or included in, those prices. Confirm the
                final inclusions and availability with the studio.
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {(separatelyListed[0].includes ?? []).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[0.82rem] text-ink/80"
                  >
                    <span className="inline-flex size-4 items-center justify-center rounded-full bg-champagne/25 text-gold">
                      <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`/services/${category.slug}/${separatelyListed[0].id}`}
                >
                  View bridal makeup details
                </ButtonLink>
                <ButtonLink
                  href={`/book?service=${separatelyListed[0].id}`}
                  variant="outline"
                >
                  Book this service
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline">
                  Ask about inclusions
                </ButtonLink>
              </div>
            </div>
          ) : null}

          {category.note ? (
            <div className="mt-8">
              <NoteBanner>{category.note}</NoteBanner>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-luxe">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Keep exploring"
              title={
                <>
                  Other <em className="italic text-gold">services</em>
                </>
              }
            />
            <ButtonLink href="/services" variant="outline" className="self-start">
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line/80 bg-ivory px-5 py-4 transition-all duration-300 hover:border-gold/40 hover:shadow-soft"
              >
                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.18em] text-gold">
                    {item.eyebrow}
                  </p>
                  <p className="mt-1 font-serif text-[1.2rem] text-ink">
                    {item.title}
                  </p>
                </div>
                <ArrowRight
                  className="size-4 shrink-0 text-mocha transition group-hover:translate-x-0.5 group-hover:text-gold"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.78rem] text-mocha">
            <Sparkles className="size-4 text-gold" aria-hidden="true" />
            <span>
              Planning a wedding?{" "}
              <Link
                href="/services/pre-bridal-packages"
                className="underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
              >
                Compare the pre-bridal packages
              </Link>
              .
            </span>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
