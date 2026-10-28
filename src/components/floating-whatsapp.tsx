import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  const href = whatsappLink(
    "Hello! I would like to ask about an appointment at TheSerenneBeauty.",
  );
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="group fixed bottom-4 right-4 z-30 inline-flex items-center gap-2.5 rounded-full bg-whatsapp px-4 py-3.5 text-ivory shadow-[0_16px_40px_-16px_rgba(18,140,126,0.8)] transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <span
        className="absolute inset-0 -z-10 rounded-full bg-whatsapp/40 animate-wa-ring"
        aria-hidden="true"
      />
      <WhatsAppIcon className="size-5" />
      <span className="hidden text-[0.62rem] font-medium uppercase tracking-[0.16em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
