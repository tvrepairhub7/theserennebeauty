export const site = {
  name: "TheSerenneBeauty",
  shortName: "TheSerenneBeauty",
  wordmark: { lead: "TheSerenne", accent: "Beauty" },
  tagline: "Makeup Studio · Lucknow",
  description:
    "Professional bridal, engagement and party makeup, pre-bridal packages, facials, waxing, manicures, pedicures, body polishing and threading in Gomti Nagar, Lucknow — delivered with a personal, unhurried touch.",

  /* PLACEHOLDER — replace with the live domain once it is connected. */
  url: "https://theserennebeauty.example",

  /* Update this each January (kept static so pages can be prerendered). */
  copyrightYear: 2026,

  contact: {
    phoneDisplay: "+91 83034 67882",
    phoneE164: "+918303467882",
    alternatePhoneDisplay: "+91 93696 52109",
    alternatePhoneE164: "+919369652109",
    /* Digits only, country code first (no + or spaces). */
    whatsapp: "918303467882",
    whatsappIsPlaceholder: false,
    /* No business email has been supplied, so no email is shown or invented. */
    email: "",
    address:
      "Station Road, Vinay Khand 3, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    city: "Lucknow",
    serviceArea: "Lucknow & nearby areas",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Station%20Road%2C%20Vinay%20Khand%203%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010",
  },

  isPlaceholderContent: false,

  /* Business hours were not supplied; timings are confirmed at booking. */
  hours: [] as { days: string; time: string }[],

  socials: {
    instagram: "https://www.instagram.com/the_serenne_beauty/",
    facebook: "",
  },

  instagramHandle: "the_serenne_beauty",

  booking: {
    timeSlots: [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
      "7:00 PM",
    ],
    /* Shown under the booking form and used in the WhatsApp confirmation. */
    policyNote:
      "Appointments are confirmed on WhatsApp or by phone. Please book at least 24 hours in advance for makeup services and 7 days in advance for bridal bookings.",
  },

  note: "Hair accessories and eye lenses are chargeable separately.",

  keywords: [
    "makeup artist Lucknow",
    "bridal makeup Lucknow",
    "engagement makeup",
    "party makeup",
    "beauty parlour Gomti Nagar",
    "pre-bridal packages",
    "facial Lucknow",
    "waxing",
    "manicure",
    "pedicure",
    "threading",
    "TheSerenneBeauty",
  ],
} as const;

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: site.socials.instagram,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: site.socials.facebook,
  },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
] as const;
