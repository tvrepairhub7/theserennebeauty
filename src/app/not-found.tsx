import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="paper-texture flex min-h-[70vh] items-center py-20">
      <div className="container-luxe flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-gold/25 bg-champagne/10 text-gold">
          <Sparkles className="size-6" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-7">Page not found</p>
        <h1 className="mt-5 max-w-xl text-[2.8rem] leading-[1.05] text-ink sm:text-5xl">
          This page has slipped{" "}
          <em className="italic text-gold">away</em>
        </h1>
        <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-mocha">
          The link may be out of date, or the page may have moved. Everything you
          need is only a click away.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            Browse services
          </ButtonLink>
        </div>
        <p className="mt-8 text-[0.78rem] text-mocha">
          Looking to book?{" "}
          <Link
            href="/book"
            className="underline decoration-gold/40 underline-offset-4 transition hover:text-gold"
          >
            Request an appointment
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
