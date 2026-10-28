import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { images, type ImageKey } from "@/data/images";
import { site } from "@/data/site";
import { InstagramIcon } from "./icons";
import { Flourish } from "./ornaments";
import { Reveal } from "./reveal";

const journalImages: { key: ImageKey; caption: string }[] = [
  { key: "partyPortrait", caption: "Party glam" },
  { key: "bridalJewel", caption: "Bridal detail" },
  { key: "makeupCloseup", caption: "Camera-ready finish" },
  { key: "nailsDark", caption: "Nail studio" },
  { key: "engagementGreen", caption: "Engagement glow" },
  { key: "artistBackstage", caption: "Behind the scenes" },
];

export function InstagramBand() {
  return (
    <section className="relative overflow-hidden bg-espresso py-16 text-ivory lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
      <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full border border-champagne/15" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-champagne/10 blur-3xl" />

      <div className="container-luxe relative">
        <div className="flex flex-col items-center text-center">
          <Flourish light />
          <p className="mt-6 flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-champagne">
            <InstagramIcon className="size-3.5" />
            The studio journal
          </p>
          <h2 className="mt-4 text-3xl leading-[1.1] text-ivory sm:text-4xl lg:text-[2.8rem]">
            Follow the latest{" "}
            <em className="italic text-champagne">looks &amp; stories</em>
          </h2>
          <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-ivory/60">
            Recent looks, reels and behind-the-scenes moments live on Instagram.
            Follow along, then send us the look you love.
          </p>
          <a
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-md btn-gold mt-6"
          >
            <InstagramIcon className="size-4" />
            @{site.instagramHandle}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {journalImages.map((entry, index) => {
            const photo = images[entry.key];
            return (
              <Reveal key={entry.key} delay={index * 55}>
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.caption} — follow ${site.name} on Instagram`}
                  className="group relative block aspect-square overflow-hidden rounded-xl border border-ivory/10"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, 32vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08]"
                  />
                  <div
                    className="absolute inset-0 bg-espresso/35 transition-opacity duration-500 group-hover:bg-espresso/10"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-3">
                    <InstagramIcon className="size-3.5 text-ivory/80 transition group-hover:text-champagne" />
                    <span className="text-[0.52rem] font-medium uppercase tracking-[0.14em] text-ivory/0 transition group-hover:text-ivory">
                      {entry.caption}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-[0.62rem] uppercase tracking-[0.16em] text-ivory/35">
          Tap any image to open the profile · Reels &amp; stories on Instagram ·{" "}
          {site.contact.city}
        </p>
      </div>
    </section>
  );
}
