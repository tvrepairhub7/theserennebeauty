import type { Metadata } from "next";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { TestimonialGrid } from "@/components/testimonials";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { InstagramBand } from "@/components/instagram-band";
import { NoteBanner } from "@/components/ui-bits";
import { testimonials } from "@/data/testimonials";
import { ReviewSubmissionForm } from "@/components/review-submission-form";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read client-feedback examples or submit your own review for studio approval.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const wa = whatsappLink(
    "Hello! I would like to share feedback about my recent appointment.",
  );

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={
          <>
            Kind words,{" "}
            <em className="italic text-gold">honestly shared</em>
          </>
        }
        description="Explore feedback examples and share your own experience with TheSerenneBeauty."
        image="makeupCloseup"
        badge="Client feedback"
      >
        <ButtonLink href="/book">
          Book an appointment
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact the studio
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Client feedback"
              title={
                <>
                  In their <em className="italic text-gold">own words</em>
                </>
              }
              description={
                `${testimonials.length} review examples are shown below. Replace them with verified client feedback before presenting them as genuine testimonials.`
              }
            />
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-cream/60 px-5 py-4">
              <div
                className="flex items-center gap-0.5 text-champagne"
                role="img"
                aria-label="Five-star sample illustration"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-3.5 fill-champagne" aria-hidden="true" />
                ))}
              </div>
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-mocha">
                Sample ratings
              </p>
            </div>
          </div>

          <div className="mt-10">
            <TestimonialGrid />
          </div>

          <div className="mt-8">
            <NoteBanner>
              The cards above are illustrative examples, not verified customer testimonials.
              The form below sends feedback to the studio for review; submissions are
              not published automatically.
            </NoteBanner>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="container-luxe grid items-center gap-8 rounded-[2rem] border border-line/80 bg-ivory p-6 shadow-soft sm:p-10 lg:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-champagne/20 text-gold">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow">Been to the studio?</p>
              <h2 className="mt-3 text-[2rem] leading-tight text-ink sm:text-[2.4rem]">
                We would love to hear how it went.
              </h2>
              <p className="mt-3 max-w-xl text-[0.88rem] leading-relaxed text-mocha">
                Share your experience of the appointment, the look and the
                service — your feedback helps make every visit better. Reviews are
                only published with permission.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-whatsapp"
              >
                Share feedback
              </a>
            ) : null}
            <ButtonLink href="/contact" variant="outline" size="lg">
              Send a message
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-24" id="write-review">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-line/80 bg-cream p-6 shadow-soft sm:p-10">
            <SectionHeading
              eyebrow="Share your experience"
              title={<>Write a <em className="italic text-gold">review</em></>}
              description="Visited the studio? Tell us about your experience. Your review will be sent to the studio on WhatsApp and checked before it is published."
            />
            <div className="mt-8">
              <ReviewSubmissionForm />
            </div>
          </div>
        </div>
      </section>

      <InstagramBand />

      <CtaBand
        eyebrow="Reserve your date"
        title="The next five-star appointment could be yours."
        description="Tell us about the occasion and what you have in mind. We will help you choose the right service and confirm availability."
      />
    </>
  );
}
