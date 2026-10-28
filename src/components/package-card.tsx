import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import type { BridalPackage } from "@/data/packages";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { formatINR } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "./button-link";
import { WhatsAppIcon } from "./icons";

interface PackageCardProps {
  pkg: BridalPackage;
  compact?: boolean;
}

export function PackageCard({ pkg, compact = false }: PackageCardProps) {
  const photo = images[pkg.image];
  const visibleInclusions = compact ? pkg.inclusions.slice(0, 6) : pkg.inclusions;
  const remaining = pkg.inclusions.length - visibleInclusions.length;
  const wa = whatsappLink(
    `Hello! I would like to know more about the ${pkg.name} (${formatINR(pkg.price)}). Could you share the available dates and confirm the inclusions?`,
  );

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border bg-ivory shadow-luxe ${
        pkg.featured ? "border-champagne/50" : "border-line"
      }`}
    >
      <div className={`relative overflow-hidden ${compact ? "aspect-[16/10]" : "aspect-[16/9] lg:aspect-auto lg:min-h-[20rem]"}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 48vw, 92vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/5 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur">
            <Sparkles className="size-3 text-gold" aria-hidden="true" />
            {pkg.featured ? "Premium package" : "Pre-bridal package"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-[1.75rem] leading-tight text-ink">{pkg.name}</h3>
            <p className="mt-2 max-w-md text-[0.85rem] leading-relaxed text-mocha">
              {pkg.summary}
            </p>
          </div>
          <p className="font-serif text-[2rem] leading-none text-ink">
            {formatINR(pkg.price)}
          </p>
        </div>

        <div className="my-6 hairline" />

        <ul className="grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
          {visibleInclusions.map((inclusion) => (
            <li key={inclusion} className="flex items-start gap-2.5 text-[0.82rem] text-ink/80">
              <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-gold">
                <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {inclusion}
            </li>
          ))}
        </ul>

        {remaining > 0 ? (
          <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-gold">
            + {remaining} more treatments
          </p>
        ) : null}

        {pkg.needsConfirmation && site.isPlaceholderContent ? (
          <p className="mt-5 rounded-xl border border-gold/25 bg-champagne/10 px-3.5 py-2.5 text-[0.72rem] leading-relaxed text-mocha">
            Draft package — the price and inclusions still need to be confirmed
            before publication.
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
          <ButtonLink
            href={`/book?package=${pkg.id}`}
            variant="primary"
            className="flex-1"
            ariaLabel={`Book the ${pkg.name}`}
          >
            Book this package
          </ButtonLink>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-md btn-outline flex-1"
            >
              <WhatsAppIcon className="size-4" />
              Ask on WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
