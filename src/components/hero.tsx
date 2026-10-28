import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { images } from "@/data/images";
import { ButtonLink } from "./button-link";
import { CornerFlourish, SpinningSeal } from "./ornaments";

const highlights = [
  "Bridal",
  "Engagement",
  "Party",
  "Pre-bridal",
  "Skincare",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden paper-texture">
      <CornerFlourish className="absolute left-4 top-4 size-24 text-gold/50 sm:left-6 sm:top-6 sm:size-32" />
      <div
        className="pointer-events-none absolute -left-28 -top-36 size-[26rem] rounded-full border border-gold/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 size-72 rounded-full bg-blush/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-luxe relative grid items-center gap-12 pb-16 pt-10 sm:pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div>
          <p className="eyebrow animate-rise">Makeup artistry &amp; beauty studio</p>

          <h1 className="mt-6 max-w-[15ch] text-[2.85rem] leading-[1.04] tracking-[-0.025em] text-ink animate-rise [animation-delay:80ms] sm:text-[4rem] lg:text-[4.5rem]">
            Enhancing Your{" "}
            <em className="relative inline-block italic text-gold">
              Natural Beauty,
              <svg
                className="absolute -bottom-2 left-0 h-2 w-full text-champagne/60"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M1 5.5C48 2 105 2 199 5.5" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </em>
            <span className="block lg:whitespace-nowrap">One Look at a Time</span>
          </h1>

          <p className="mt-7 max-w-[33rem] text-[0.98rem] leading-relaxed text-mocha animate-rise [animation-delay:160ms] sm:text-[1.05rem]">
            Discover professional makeup artistry, luxurious beauty treatments,
            and personalized bridal experiences designed to make every occasion
            unforgettable.
          </p>

          <div className="mt-8 flex flex-col gap-3 animate-rise [animation-delay:240ms] sm:flex-row sm:items-center">
            <ButtonLink href="/book" size="lg">
              Book your appointment
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              Explore our services
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5 animate-rise [animation-delay:320ms]">
            {highlights.map((item, index) => (
              <span key={item} className="flex items-center gap-5">
                {index > 0 ? (
                  <span className="size-1 rounded-full bg-gold/40" aria-hidden="true" />
                ) : null}
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-mocha/80">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[27rem] animate-rise [animation-delay:180ms] lg:max-w-none">
          <div
            className="absolute -inset-3 rounded-[999px_999px_1.8rem_1.8rem] border border-gold/25 sm:-inset-4"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_1.4rem_1.4rem] shadow-luxe">
            <Image
              src={images.heroBride.src}
              alt={images.heroBride.alt}
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="object-cover animate-soft-zoom"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-3 p-5">
              <span className="rounded-full border border-ivory/35 bg-espresso/30 px-3.5 py-2 text-[0.56rem] font-medium uppercase tracking-[0.17em] text-ivory backdrop-blur-md">
                HD · Airbrush · Hair &amp; draping
              </span>
            </div>
          </div>

          <div className="absolute -right-1 top-10 w-[9.5rem] rounded-2xl border border-line bg-ivory/95 p-4 shadow-luxe backdrop-blur sm:-right-7">
            <Sparkles className="size-4 text-gold" aria-hidden="true" />
            <p className="mt-2 font-serif text-[1.35rem] leading-none text-ink">₹9,999</p>
            <p className="mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-mocha">
              Bridal looks from
            </p>
          </div>

          <div className="absolute -bottom-7 -left-2 hidden rounded-full bg-ivory p-1.5 shadow-luxe sm:-left-8 sm:block">
            <SpinningSeal id="hero" className="size-24" />
          </div>
        </div>
      </div>

      <div className="border-y border-line/70 bg-ivory/60">
        <div className="container-luxe grid grid-cols-2 divide-x divide-line/60 sm:grid-cols-4">
          {[
            "Personalised looks",
            "Hairdo & draping",
            "HD & airbrush finishes",
            "Head-to-toe beauty",
          ].map((item) => (
            <div key={item} className="flex items-center justify-center px-3 py-4 text-center">
              <p className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-mocha">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
