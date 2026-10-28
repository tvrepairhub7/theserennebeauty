import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Gallery } from "@/components/gallery";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { InstagramBand } from "@/components/instagram-band";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Bridal, reception, engagement and party makeup, HD and airbrush finishes, hairstyling and beauty treatments — browse the studio portfolio.",
  alternates: { canonical: "/portfolio" },
};

const notes = [
  {
    title: "Bridal & reception",
    text: "Traditional and contemporary bridal looks, with jewellery, draping and photography in mind.",
  },
  {
    title: "Engagement & party",
    text: "Softer celebration looks, from luminous daytime finishes to defined evening glamour.",
  },
  {
    title: "Finishes & details",
    text: "HD and airbrush finishes, hairstyling, and the beauty treatments that complete the look.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            A glimpse of our{" "}
            <em className="italic text-gold">artistry</em>
          </>
        }
        description="Bridal, engagement, party and editorial looks — plus the beauty treatments that complete them. Filter by category and open any look for the full story."
        image="portraitGlam"
        badge="Bridal · Party · HD · Airbrush"
      >
        <ButtonLink href="/book">
          Book a look
          <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/pricing" variant="outline">
          View prices
        </ButtonLink>
      </PageHero>

      <section className="bg-ivory py-20 lg:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Looks that feel{" "}
                <em className="italic text-gold">personal</em>
              </>
            }
            description="Browse bridal, engagement, party, HD, airbrush, hairstyling and beauty treatment work. Select a look to see the service behind it and book a similar appointment."
          />

          <div className="mt-10">
            <Gallery items={portfolioItems} />
          </div>

          <p className="mt-7 text-center text-[0.72rem] leading-relaxed text-mocha/80">
            Selected imagery is illustrative until the studio&rsquo;s own gallery is
            added. The latest work is always on Instagram.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-luxe grid gap-8 lg:grid-cols-3">
          {notes.map((note, index) => (
            <div key={note.title} className="flex gap-4">
              <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/30 font-serif text-[0.8rem] text-gold">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-[1.25rem] text-ink">{note.title}</h3>
                <p className="mt-1.5 text-[0.83rem] leading-relaxed text-mocha">
                  {note.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <InstagramBand />

      <CtaBand
        eyebrow="Your turn"
        title="Let’s create a look that feels like you."
        description="Share your occasion, outfit and the finish you have in mind. We will help you choose the right service for the day."
      />
    </>
  );
}
