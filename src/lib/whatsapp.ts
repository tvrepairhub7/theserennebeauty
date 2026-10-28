import { site } from "@/data/site";
import { formatDate } from "./format";

function whatsappDigits(): string {
  return site.contact.whatsapp.replace(/\D/g, "");
}

export function isWhatsAppConfigured(): boolean {
  return whatsappDigits().length >= 8;
}

/** Builds a wa.me link. Returns `null` when no number is configured. */
export function whatsappLink(message?: string): string | null {
  const digits = whatsappDigits();
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

interface BookingDetails {
  name: string;
  phone: string;
  email?: string;
  serviceLabel: string;
  date: string;
  time: string;
  notes?: string;
}

export function buildBookingMessage(details: BookingDetails): string {
  const lines = [
    "Hello! I would like to book an appointment.",
    "",
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
  ];

  if (details.email?.trim()) {
    lines.push(`Email: ${details.email.trim()}`);
  }

  lines.push(
    `Service / package: ${details.serviceLabel}`,
    `Preferred date: ${formatDate(details.date)}`,
    `Preferred time: ${details.time}`,
  );

  if (details.notes?.trim()) {
    lines.push("", `Notes: ${details.notes.trim()}`);
  }

  lines.push("", "(Sent from the website booking form)");
  return lines.join("\n");
}

interface ContactDetails {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export function buildContactMessage(details: ContactDetails): string {
  const lines = [
    "Hello! I have a question about the studio.",
    "",
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
  ];

  if (details.email?.trim()) {
    lines.push(`Email: ${details.email.trim()}`);
  }

  lines.push("", details.message.trim(), "", "(Sent from the website contact form)");
  return lines.join("\n");
}
