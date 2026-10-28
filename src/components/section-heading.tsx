import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p className={`eyebrow ${centered ? "eyebrow-center" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-5 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.9rem] ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-[0.98rem] leading-relaxed ${
            light ? "text-ivory/70" : "text-mocha"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
