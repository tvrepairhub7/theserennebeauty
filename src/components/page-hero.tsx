import Image from "next/image";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { images, type ImageKey } from "@/data/images";
import { SpinningSeal } from "./ornaments";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: ImageKey;
  badge?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  badge,
  children,
}: PageHeroProps) {
  const photo = images[image];

  return (
    <section className="relative overflow-hidden paper-texture">
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -right-16 bottom-4 size-56 rounded-full bg-blush/25 blur-3xl" />

      <div className="container-luxe relative grid gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
        <div className="animate-rise">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-[2.55rem] leading-[1.03] text-ink sm:text-6xl lg:text-[4.15rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-mocha sm:text-[1.02rem]">
            {description}
          </p>
          {children ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-md animate-rise [animation-delay:140ms] lg:max-w-none">
          <div
            className="absolute -inset-3 rounded-[999px_999px_2rem_2rem] border border-gold/25"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] max-h-[32rem] overflow-hidden rounded-[999px_999px_1.4rem_1.4rem] border border-ivory/60 shadow-luxe">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-espresso/35 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          {badge ? (
            <div className="absolute -left-2 bottom-6 flex max-w-[15rem] items-center gap-2.5 rounded-2xl border border-line bg-ivory/95 px-4 py-3 shadow-luxe backdrop-blur sm:-left-6">
              <Sparkles className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-[0.68rem] font-medium uppercase leading-relaxed tracking-[0.12em] text-ink">
                {badge}
              </p>
            </div>
          ) : null}
          <div className="absolute -right-3 -top-6 hidden rounded-full bg-ivory p-1 shadow-luxe sm:block">
            <SpinningSeal id={`page-${image}`} className="size-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
