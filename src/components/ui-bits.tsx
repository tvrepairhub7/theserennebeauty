import { Info } from "lucide-react";
import type { ReactNode } from "react";

export function DemoBadge({ children = "Demo details" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-champagne/10 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-gold">
      <span className="size-1 rounded-full bg-gold" aria-hidden="true" />
      {children}
    </span>
  );
}

export function NoteBanner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-gold/25 bg-champagne/[0.08] px-4 py-3.5 text-[0.82rem] leading-relaxed text-mocha ${className}`}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

export function SampleBadge() {
  return (
    <span className="rounded-full border border-line bg-cream px-2.5 py-1 text-[0.56rem] font-medium uppercase tracking-[0.16em] text-mocha">
      Sample review
    </span>
  );
}
