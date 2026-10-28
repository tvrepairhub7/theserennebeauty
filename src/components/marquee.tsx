const marqueeItems = [
  "Bridal artistry",
  "Engagement looks",
  "Party glam",
  "HD & airbrush",
  "Pre-bridal rituals",
  "Facials",
  "Manicure & pedicure",
  "Body polishing",
  "Threading",
];

interface MarqueeProps {
  variant?: "dark" | "light";
}

export function Marquee({ variant = "light" }: MarqueeProps) {
  const dark = variant === "dark";
  return (
    <div
      className={`marquee-fade relative overflow-hidden border-y py-4 ${
        dark
          ? "border-champagne/20 bg-espresso text-ivory"
          : "border-line/70 bg-blush-soft/60 text-ink"
      }`}
    >
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {marqueeItems.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
              >
                <span className="whitespace-nowrap font-serif text-[1.05rem] italic sm:text-[1.2rem]">
                  {item}
                </span>
                <span
                  className={`text-[0.5rem] ${dark ? "text-champagne" : "text-gold"}`}
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
