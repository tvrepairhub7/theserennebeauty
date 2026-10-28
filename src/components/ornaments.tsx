interface OrnamentProps {
  className?: string;
  light?: boolean;
}

export function Flourish({ className = "", light = false }: OrnamentProps) {
  const tone = light ? "text-champagne" : "text-gold";
  return (
    <div
      className={`flex items-center justify-center gap-3 ${tone} ${className}`}
      aria-hidden="true"
    >
      <span
        className={`h-px w-14 bg-gradient-to-r from-transparent ${
          light ? "to-champagne/60" : "to-gold/50"
        } sm:w-20`}
      />
      <svg viewBox="0 0 64 24" className="size-14 shrink-0" fill="none">
        <path
          d="M32 5c2.6 4.6 5.4 6.9 9.8 7-4.4.1-7.2 2.4-9.8 7-2.6-4.6-5.4-6.9-9.8-7 4.4-.1 7.2-2.4 9.8-7Z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <circle cx="11" cy="12" r="1.3" fill="currentColor" />
        <circle cx="53" cy="12" r="1.3" fill="currentColor" />
        <path d="M5 12h2.5M56.5 12H59" stroke="currentColor" strokeWidth="0.7" />
      </svg>
      <span
        className={`h-px w-14 bg-gradient-to-l from-transparent ${
          light ? "to-champagne/60" : "to-gold/50"
        } sm:w-20`}
      />
    </div>
  );
}

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`pointer-events-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 60V18C2 9.2 9.2 2 18 2h42"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.45"
      />
      <path
        d="M12 60V24c0-6.6 5.4-12 12-12h24"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.25"
      />
      <circle cx="18" cy="18" r="2.2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

interface SpinningSealProps {
  id: string;
  className?: string;
  light?: boolean;
  label?: string;
}

export function SpinningSeal({
  id,
  className = "",
  light = false,
  label = "TheSerenneBeauty · Lucknow ·",
}: SpinningSealProps) {
  const pathId = `seal-path-${id}`;
  return (
    <div
      className={`relative flex size-24 items-center justify-center ${
        light ? "text-champagne" : "text-gold"
      } ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path
            id={pathId}
            d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0"
          />
        </defs>
        <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" opacity="0.45" />
        <circle cx="50" cy="50" r="31" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <text
          className="fill-current"
          style={{
            fontSize: "8px",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${pathId}`}>{label}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 40 40" className="size-9" fill="none">
        <path
          d="M20 9c1.8 3.8 3.7 5.7 7.5 7.5-3.8 1.8-5.7 3.7-7.5 7.5-1.8-3.8-3.7-5.7-7.5-7.5 3.8-1.8 5.7-3.7 7.5-7.5Z"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <circle cx="20" cy="20" r="1.2" fill="currentColor" />
      </svg>
    </div>
  );
}
