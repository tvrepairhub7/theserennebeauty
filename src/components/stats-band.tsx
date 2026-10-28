import { bridalPackages } from "@/data/packages";
import { allServices } from "@/data/services";
import { Reveal } from "./reveal";
import { Flourish } from "./ornaments";

interface StatsBandProps {
  light?: boolean;
}

export function StatsBand({ light = false }: StatsBandProps) {
  const stats = [
    {
      value: String(allServices.filter((service) => service.price !== null).length),
      label: "Priced makeup looks",
    },
    { value: String(allServices.length), label: "Services & treatments" },
    { value: String(bridalPackages.length), label: "Pre-bridal programmes" },
    { value: "Lucknow", label: "Gomti Nagar studio" },
  ];

  return (
    <section
      className={`relative overflow-hidden py-14 ${
        light ? "bg-espresso text-ivory" : "bg-blush-soft/70"
      }`}
    >
      <div
        className={`pointer-events-none absolute -left-16 top-0 size-56 rounded-full blur-3xl ${
          light ? "bg-champagne/10" : "bg-blush/40"
        }`}
        aria-hidden="true"
      />
      <div className="container-luxe relative">
        <Flourish light={light} />
        <dl className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 70}
              className="relative text-center"
            >
              <div
                className={`mx-auto mb-4 hidden h-8 w-px sm:block ${
                  light ? "bg-ivory/15" : "bg-gold/25"
                } ${index === 0 ? "sm:hidden" : ""}`}
                aria-hidden="true"
              />
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <p
                  className={`font-serif text-[2.2rem] leading-none sm:text-[2.6rem] ${
                    light ? "text-champagne" : "text-ink"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`mt-2.5 text-[0.56rem] font-medium uppercase tracking-[0.2em] ${
                    light ? "text-ivory/55" : "text-mocha"
                  }`}
                >
                  {stat.label}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
