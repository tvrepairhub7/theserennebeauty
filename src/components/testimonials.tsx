import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { SampleBadge } from "./ui-bits";

export function TestimonialGrid() {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
      {testimonials.map((review, index) => (
        <Reveal
          key={review.id}
          delay={index * 90}
          className="min-w-[85%] snap-center sm:min-w-[60%] md:min-w-0"
        >
          <article className="flex h-full flex-col rounded-[1.7rem] border border-line/80 bg-ivory p-7 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div
                className="flex items-center gap-0.5 text-champagne"
                aria-label={`${review.rating} out of 5 stars`}
                role="img"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`size-3.5 ${
                      starIndex < review.rating
                        ? "fill-champagne text-champagne"
                        : "text-line"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <SampleBadge />
            </div>

            <Quote className="mt-6 size-7 text-blush" aria-hidden="true" />

            <blockquote className="mt-2 flex-1 font-serif text-[1.18rem] leading-relaxed text-ink/90">
              “{review.quote}”
            </blockquote>

            <div className="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
              <span className="flex size-10 items-center justify-center rounded-full bg-cream font-serif text-sm text-gold">
                {review.initials}
              </span>
              <div>
                <p className="text-[0.82rem] font-medium text-ink">{review.name}</p>
                <p className="mt-0.5 text-[0.64rem] uppercase tracking-[0.16em] text-mocha">
                  {review.service}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Kind words"
            title={
              <>
                In their <em className="italic text-gold">own words</em>
              </>
            }
            description="Browse client-feedback examples below. Names and review text are illustrative until replaced with genuine, permission-cleared client feedback."
          />
          <p className="max-w-sm text-[0.8rem] leading-relaxed text-mocha lg:text-right">
            These are demonstration reviews, not real customer testimonials.
            Replace them with permission-cleared feedback before publishing.
          </p>
        </div>
        <div className="mt-10">
          <TestimonialGrid />
        </div>
      </div>
    </section>
  );
}
