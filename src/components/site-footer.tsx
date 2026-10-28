import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { navLinks, site, socialLinks } from "@/data/site";
import { Logo } from "./logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";
import { DemoBadge } from "./ui-bits";

const serviceFooterLinks = [
  ...serviceCategories.map((category) => ({
    label: category.navLabel,
    href: `/services/${category.slug}`,
  })),
  { label: "Pre-Bridal Packages", href: "/services/pre-bridal-packages" },
];

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function SiteFooter() {
  const wa = whatsappLink(
    "Hello! I would like to know more about your makeup and beauty services.",
  );

  return (
    <footer className="relative overflow-hidden bg-espresso text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
      <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-champagne/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-blush/10 blur-3xl" />

      <p
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-serif text-[19vw] leading-[0.72] tracking-tight text-ivory/[0.035]"
        aria-hidden="true"
      >
        Serenne
      </p>

      <div className="container-luxe relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-[0.88rem] leading-relaxed text-ivory/65">
              Personal makeup artistry and considered beauty treatments for
              brides, celebrations and everyday self-care.
            </p>
            {site.isPlaceholderContent ? (
              <div className="mt-5">
                <DemoBadge>Placeholder content</DemoBadge>
              </div>
            ) : null}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks
                .filter((social) => social.href)
                .map((social) => {
                  const Icon = socialIcons[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-champagne hover:text-champagne"
                      aria-label={`${site.name} on ${social.label}`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  );
                })}
              <a
                href={`tel:${site.contact.phoneE164}`}
                className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-champagne hover:text-champagne"
                aria-label={`Call ${site.name}`}
              >
                <Phone className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-champagne">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-ivory/65 transition hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="text-[0.9rem] text-ivory/65 transition hover:text-ivory"
                >
                  Book an appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-champagne">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceFooterLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-ivory/65 transition hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.62rem] font-medium uppercase tracking-[0.28em] text-champagne">
              Visit the studio
            </h3>
            <ul className="mt-5 space-y-4 text-[0.88rem] text-ivory/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-champagne/80" aria-hidden="true" />
                <a
                  href={site.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-ivory"
                >
                  {site.contact.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-champagne/80" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <a
                    href={`tel:${site.contact.phoneE164}`}
                    className="transition hover:text-ivory"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={`tel:${site.contact.alternatePhoneE164}`}
                    className="text-ivory/55 transition hover:text-ivory"
                  >
                    {site.contact.alternatePhoneDisplay}
                  </a>
                </span>
              </li>
              {site.contact.email ? (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-champagne/80" aria-hidden="true" />
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all transition hover:text-ivory"
                  >
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-champagne/80" aria-hidden="true" />
                <span>
                  {site.hours.length > 0
                    ? site.hours.map((entry) => (
                        <span key={entry.days} className="block">
                          {entry.days}: {entry.time}
                        </span>
                      ))
                    : "Appointment timings are confirmed on WhatsApp."}
                </span>
              </li>
              <li className="flex gap-3">
                <InstagramIcon className="mt-0.5 size-4 shrink-0 text-champagne/80" aria-hidden="true" />
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-ivory"
                >
                  @{site.instagramHandle}
                </a>
              </li>
            </ul>

            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-champagne transition hover:text-ivory"
              >
                <WhatsAppIcon className="size-4" />
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-6">
          <div className="flex flex-col gap-3 text-[0.72rem] text-ivory/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.copyrightYear} {site.name}. All rights reserved.
            </p>
            <p className="max-w-xl sm:text-right">
              Studio in Gomti Nagar, Lucknow · Appointments are subject to
              availability and confirmation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
