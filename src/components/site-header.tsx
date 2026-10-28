"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { navLinks, site } from "@/data/site";
import { ButtonLink } from "./button-link";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./logo";
import { whatsappLink } from "@/lib/whatsapp";

const serviceLinks = [
  ...serviceCategories.slice(0, 3).map((category) => ({
    label: category.navLabel,
    href: `/services/${category.slug}`,
  })),
  { label: "Pre-Bridal Packages", href: "/services/pre-bridal-packages" },
  ...serviceCategories.slice(3).map((category) => ({
    label: category.navLabel,
    href: `/services/${category.slug}`,
  })),
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(76);
  const [lastPathname, setLastPathname] = useState(pathname);
  const servicesRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const update = () =>
      setHeaderBottom(Math.round(element.getBoundingClientRect().bottom));

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const servicesActive = pathname.startsWith("/services");

  return (
    <>
      <div className="bg-espresso text-ivory">
        <div className="container-luxe flex items-center justify-between gap-4 py-2.5">
          <a
            href={site.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-ivory/70 transition hover:text-champagne sm:flex"
          >
            <MapPin className="size-3" aria-hidden="true" />
            Gomti Nagar, Lucknow
          </a>
          <p className="hidden min-w-0 flex-1 truncate text-center text-[0.62rem] font-light uppercase tracking-[0.16em] text-ivory/75 sm:block">
            {site.note}
          </p>
          <a
            href={`tel:${site.contact.phoneE164}`}
            className="flex flex-1 items-center justify-center gap-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-ivory/80 transition hover:text-champagne sm:hidden"
          >
            <Phone className="size-3" aria-hidden="true" />
            Call {site.contact.phoneDisplay}
          </a>
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="flex items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-ivory/70 transition hover:text-champagne"
            >
              <Phone className="size-3" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on Instagram`}
              className="text-ivory/70 transition hover:text-champagne"
            >
              <InstagramIcon className="size-3.5" />
            </a>
            <a
              href={whatsappLink("Hello! I would like to know more about your services.") ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-ivory/70 transition hover:text-champagne"
            >
              <WhatsAppIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-line/80 bg-ivory/95 shadow-[0_18px_40px_-38px_rgba(46,33,28,0.6)] backdrop-blur-xl"
            : "border-transparent bg-ivory/85 backdrop-blur-md"
        }`}
      >
        <div className="container-luxe flex h-[4.75rem] items-center justify-between gap-4">
          <Logo />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setServicesOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[0.68rem] font-medium uppercase tracking-[0.19em] transition-colors ${
                      servicesActive ? "text-gold" : "text-ink/75 hover:text-gold"
                    }`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    Services
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-300 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id="services-menu"
                    className={`absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-5 transition-all duration-300 ${
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-ivory p-3 shadow-luxe">
                      <div className="grid grid-cols-2 gap-0.5">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="rounded-xl px-4 py-3 text-[0.74rem] text-ink/80 transition-colors hover:bg-cream hover:text-ink"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/services"
                        className="mt-2 flex items-center justify-between rounded-xl bg-espresso px-4 py-3 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-ink"
                      >
                        All services
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative text-[0.68rem] font-medium uppercase tracking-[0.19em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                    isActive(link.href)
                      ? "text-gold after:w-full"
                      : "text-ink/75 after:w-0 hover:text-gold hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href="/book" className="hidden sm:inline-flex" size="md">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              Book appointment
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative z-50 inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-gold hover:text-gold lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        style={{ top: headerBottom }}
        className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-ivory transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="container-luxe flex min-h-full flex-col py-8"
        >
          <div className="flex flex-col divide-y divide-line/70 border-y border-line/70">
            {navLinks
              .filter((link) => link.label !== "Services")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 font-serif text-[1.65rem] transition-colors ${
                    isActive(link.href) ? "text-gold" : "text-ink"
                  }`}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {link.label}
                </Link>
              ))}
          </div>

          <div className="py-6">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-gold">
              Services
            </p>
            <div className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
              <Link
                href="/services"
                className="py-2 text-[0.9rem] text-ink/80"
                tabIndex={mobileOpen ? 0 : -1}
              >
                All services →
              </Link>
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="py-2 text-[0.9rem] text-ink/80"
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`tel:${site.contact.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink/75 transition hover:border-gold/50 hover:text-gold"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <Phone className="size-3.5 text-gold" aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink/75 transition hover:border-gold/50 hover:text-gold"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <InstagramIcon className="size-3.5 text-gold" />
              @{site.instagramHandle}
            </a>
            <a
              href={whatsappLink("Hello! I would like to know more about your services.") ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink/75 transition hover:border-gold/50 hover:text-gold"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <WhatsAppIcon className="size-3.5 text-gold" />
              WhatsApp
            </a>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <ButtonLink
              href="/book"
              size="lg"
              className="w-full"
              ariaLabel="Book an appointment"
            >
              <CalendarDays className="size-4" aria-hidden="true" />
              Book your appointment
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg" className="w-full">
              Contact the studio
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
