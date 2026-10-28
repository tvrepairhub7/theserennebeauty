import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/data/images";
import { portfolioItems } from "@/data/portfolio";
import { ButtonLink } from "./button-link";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const previewIds = [
  "bridal-red",
  "engagement-emerald",
  "party-eye",
  "floral-braid",
  "bridal-jewellery",
  "facial-ritual",
];

export function PortfolioPreview() {
  const previews = previewIds
    .map((id) => portfolioItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="bg-ivory py-20 lg:py-24">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                A glimpse of our <em className="italic text-gold">artistry</em>
              </>
            }
            description="Bridal, engagement, party and editorial looks — plus the beauty treatments that complete them. Replace these with your own studio photographs as they become available."
          />
          <ButtonLink href="/portfolio" variant="outline" className="self-start lg:self-auto">
            View full portfolio
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {previews.map((item, index) => {
            const photo = images[item.image];
            return (
              <Reveal
                key={item.id}
                delay={index * 70}
                className={index === 1 || index === 4 ? "md:translate-y-7" : ""}
              >
                <Link
                  href={`/portfolio/${item.id}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[1.4rem]"
                  aria-label={`View ${item.title} in the portfolio`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 32vw, 46vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[0.52rem] font-medium uppercase tracking-[0.2em] text-champagne">
                        {item.category}
                      </p>
                      <p className="mt-1 font-serif text-[1.05rem] text-ivory">
                        {item.title}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="size-4 text-ivory/80 transition group-hover:text-champagne"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
