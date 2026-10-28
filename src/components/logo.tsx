import Link from "next/link";
import { site } from "@/data/site";

interface LogoProps {
  light?: boolean;
  className?: string;
}

export function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <span
        className={`relative inline-flex size-10 shrink-0 items-center justify-center transition-colors duration-300 sm:size-11 ${
          light
            ? "text-champagne group-hover:text-ivory"
            : "text-gold group-hover:text-espresso"
        }`}
      >
        <svg viewBox="0 0 44 44" className="size-full" fill="none" aria-hidden="true">
          <path
            d="M22 3.5c8 0 14 5 16.5 12.5V37c0 1.7-1.3 3-3 3H8.5c-1.7 0-3-1.3-3-3V16C8 8.5 14 3.5 22 3.5Z"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.55"
          />
          <path
            d="M22 8.5c5.6 0 10 3.7 12.4 9.2V36H9.6V17.7C12 12.2 16.4 8.5 22 8.5Z"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <path
            d="M22 13c1.5 3.2 3.2 4.9 6.4 6.4-3.2 1.5-4.9 3.2-6.4 6.4-1.5-3.2-3.2-4.9-6.4-6.4 3.2-1.5 4.9-3.2 6.4-6.4Z"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <circle cx="22" cy="31.5" r="1.2" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.08rem] tracking-[-0.01em] sm:text-[1.24rem] ${
            light ? "text-ivory" : "text-ink"
          }`}
        >
          {site.wordmark.lead}
          <span className="italic text-gold">{site.wordmark.accent}</span>
        </span>
        <span
          className={`mt-1 text-[0.44rem] font-medium uppercase tracking-[0.24em] sm:mt-1.5 sm:text-[0.48rem] ${
            light ? "text-ivory/55" : "text-mocha"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
