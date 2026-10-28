"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import {
  portfolioCategories,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import { images } from "@/data/images";

interface GalleryProps {
  items: PortfolioItem[];
}

export function Gallery({ items }: GalleryProps) {
  const [activeCategory, setActiveCategory] =
    useState<PortfolioCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const close = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (direction: number) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const next = (current + direction + filtered.length) % filtered.length;
        return next;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previouslyFocused = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [lightboxIndex, close, step]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;
  const activePhoto = activeItem ? images[activeItem.image] : null;

  return (
    <div>
      <div
        className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible"
        role="group"
        aria-label="Filter portfolio by category"
      >
        {portfolioCategories.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                active
                  ? "border-espresso bg-espresso text-ivory"
                  : "border-line bg-transparent text-ink/65 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:grid-cols-3 lg:auto-rows-[12.5rem] xl:grid-cols-4">
        {filtered.map((item, index) => {
          const photo = images[item.image];
          return (
            <div
              key={`${activeCategory}-${item.id}`}
              className={`group relative overflow-hidden rounded-[1.1rem] animate-rise ${
                item.emphasis === "tall"
                  ? "row-span-2"
                  : item.emphasis === "wide"
                    ? "col-span-2"
                    : ""
              }`}
              style={{ animationDelay: `${Math.min(index * 35, 280)}ms`, animationDuration: "0.6s" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 46vw"
                className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.06]"
              />
              <Link
                href={`/portfolio/${item.id}`}
                className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
                aria-label={`View ${item.title} — ${item.category}`}
              >
                <span className="sr-only">
                  View {item.title}, {item.category} look
                </span>
              </Link>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <div>
                  <p className="text-[0.54rem] font-medium uppercase tracking-[0.2em] text-champagne">
                    {item.category}
                  </p>
                  <p className="mt-1 font-serif text-[1.05rem] leading-tight text-ivory">
                    {item.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setLightboxIndex(index);
                  }}
                  className="pointer-events-auto relative z-20 mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory/80 transition hover:border-champagne hover:text-champagne"
                  aria-label={`Enlarge ${item.title}`}
                >
                  <Expand className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-mocha">
          No images in this category yet.
        </p>
      ) : null}

      {activeItem && activePhoto ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-espresso/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} — enlarged view`}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-ivory/60">
              {lightboxIndex !== null ? lightboxIndex + 1 : 0} / {filtered.length}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition hover:border-champagne hover:text-champagne"
              aria-label="Close gallery"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative flex-1 px-4 sm:px-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="relative mx-auto h-full w-full max-w-5xl">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-espresso/40 text-ivory backdrop-blur transition hover:border-champagne hover:text-champagne sm:left-5"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-espresso/40 text-ivory backdrop-blur transition hover:border-champagne hover:text-champagne sm:right-5"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="px-6 py-5 text-center">
            <p className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-champagne">
              {activeItem.category}
            </p>
            <p className="mt-1.5 font-serif text-xl text-ivory">{activeItem.title}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
