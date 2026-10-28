import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gem } from "lucide-react";
import { images } from "@/data/images";
import { getServiceCategory, type Service } from "@/data/services";
import { formatINR } from "@/lib/format";

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const photo = service.image ? images[service.image] : null;
  const category = getServiceCategory(service.id);
  const href = category
    ? `/services/${category.slug}/${service.id}`
    : "/services";

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-line/80 bg-white/75 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-luxe"
    >
      <div
        className={`relative overflow-hidden ${
          compact ? "aspect-[5/4]" : "aspect-[4/5]"
        }`}
      >
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-cream" aria-hidden="true" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
          aria-hidden="true"
        />
        {service.price !== null ? (
          <span className="absolute right-4 top-4 rounded-full bg-ivory/95 px-3.5 py-2 font-serif text-[0.98rem] text-ink shadow-sm backdrop-blur">
            {formatINR(service.price)}
          </span>
        ) : null}
        {service.includes ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-espresso/85 px-3 py-1.5 text-[0.56rem] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur">
            <Gem className="size-3" aria-hidden="true" />
            Package
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.42rem] leading-[1.2] text-ink">{service.name}</h3>
        <p className="mt-3 flex-1 text-[0.85rem] leading-relaxed text-mocha">
          {service.description}
        </p>
        <span className="mt-5 flex items-center justify-between border-t border-line/70 pt-4 text-[0.62rem] font-medium uppercase tracking-[0.19em] text-ink transition-colors group-hover:text-gold">
          View details &amp; book
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
