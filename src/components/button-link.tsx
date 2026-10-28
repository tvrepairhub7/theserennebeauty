import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "light" | "whatsapp";
type Size = "md" | "lg";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
}: ButtonLinkProps) {
  const classes = `btn btn-${size} btn-${variant} ${className}`;
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
