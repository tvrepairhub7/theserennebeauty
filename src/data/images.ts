/**
 * Every photograph used on the site lives here.
 *
 * To replace a photo: drop your file into `public/images/`, then update the
 * matching `src` below. Alt text should describe the photograph for screen
 * readers and search engines.
 */
export const images = {
  heroBride: {
    src: "/images/hero-bride.webp",
    alt: "Bride in traditional red attire with gold jewellery and polished bridal makeup",
  },
  bridalJewel: {
    src: "/images/bridal-jewel.webp",
    alt: "Close-up of bridal makeup framed by ornate gold jewellery",
  },
  sareeRed: {
    src: "/images/saree-red.webp",
    alt: "Woman in a deep purple saree with traditional gold jewellery",
  },
  engagementGreen: {
    src: "/images/engagement-green.webp",
    alt: "Woman in an emerald green lehenga styled for an engagement celebration",
  },
  partyPortrait: {
    src: "/images/party-portrait.webp",
    alt: "Guest wearing a purple lehenga with soft party makeup and styled hair",
  },
  partyEye: {
    src: "/images/party-eye.webp",
    alt: "Shimmering eye makeup being applied with a makeup brush",
  },
  eyeMakeupFloral: {
    src: "/images/eye-makeup-floral.webp",
    alt: "Creative eye makeup finished with delicate floral accents",
  },
  eyeliner: {
    src: "/images/eyeliner.webp",
    alt: "Eyeliner being applied during a professional makeup session",
  },
  artistAtWork: {
    src: "/images/artist-at-work.webp",
    alt: "Makeup artist applying makeup to a seated client",
  },
  artistClient: {
    src: "/images/artist-client.webp",
    alt: "Makeup artist perfecting a client's finished look",
  },
  artistBackstage: {
    src: "/images/artist-backstage.webp",
    alt: "Makeup artist working under studio lighting at an event",
  },
  makeupApplication: {
    src: "/images/makeup-application.webp",
    alt: "Makeup brush applying blush to a client's cheek",
  },
  makeupCloseup: {
    src: "/images/makeup-closeup.webp",
    alt: "Close-up beauty portrait with soft glam makeup",
  },
  portraitGlam: {
    src: "/images/portrait-glam.webp",
    alt: "Studio beauty portrait with luminous makeup",
  },
  makeupKit: {
    src: "/images/makeup-kit.webp",
    alt: "Professional makeup kit arranged for a session",
  },
  productFlatlay: {
    src: "/images/product-flatlay.webp",
    alt: "Makeup products and brushes arranged on a marble surface",
  },
  salonInterior: {
    src: "/images/salon-interior.webp",
    alt: "Bright, elegant beauty salon interior",
  },
  facialTreatment: {
    src: "/images/facial-treatment.webp",
    alt: "Client receiving a professional facial treatment in a salon",
  },
  spaFacial: {
    src: "/images/spa-facial.webp",
    alt: "Relaxing facial with a headband and soft towel",
  },
  facialMask: {
    src: "/images/facial-mask.webp",
    alt: "Client relaxing with a facial mask during a treatment",
  },
  faceMassage: {
    src: "/images/face-massage.webp",
    alt: "Face and neck massage during a beauty treatment",
  },
  skincarePortrait: {
    src: "/images/skincare-portrait.webp",
    alt: "Woman with hydrated, glowing skin",
  },
  skinCloseup: {
    src: "/images/skin-closeup.webp",
    alt: "Close-up of fresh, natural skin",
  },
  bodyPolish: {
    src: "/images/body-polish.webp",
    alt: "Body scrub being massaged into the arms during a spa treatment",
  },
  bodyScrub: {
    src: "/images/body-scrub.webp",
    alt: "Back scrub during a full-body polishing treatment",
  },
  massageStones: {
    src: "/images/massage-stones.webp",
    alt: "Warm stone massage treatment",
  },
  manicurePink: {
    src: "/images/manicure-pink.webp",
    alt: "Soft pink manicure with a glossy finish",
  },
  nailFiling: {
    src: "/images/nail-filing.webp",
    alt: "Manicurist shaping a client's nails",
  },
  nailsDark: {
    src: "/images/nails-dark.webp",
    alt: "Dark glossy manicure",
  },
  waxing: {
    src: "/images/waxing.webp",
    alt: "Professional waxing treatment in progress",
  },
  hairBrush: {
    src: "/images/hair-brush.webp",
    alt: "Hairdresser blow-drying and styling hair",
  },
  hairSalon: {
    src: "/images/hair-salon.webp",
    alt: "Client having her hair styled in a salon",
  },
  bridalHair: {
    src: "/images/bridal-hair.webp",
    alt: "Bridal braid finished with fresh flowers",
  },
  lashes: {
    src: "/images/lashes.webp",
    alt: "Lash and brow styling products laid out for a treatment",
  },
  eyeCloseup: {
    src: "/images/eye-closeup.webp",
    alt: "Macro close-up of a defined eye makeup look",
  },
  sareeWomen: {
    src: "/images/saree-women.webp",
    alt: "Women in traditional sarees at a celebration",
  },
  mehndi: {
    src: "/images/mehndi.webp",
    alt: "Intricate mehndi design on a bride's hands",
  },
  weddingCouple: {
    src: "/images/wedding-couple.webp",
    alt: "Bride and groom together on their wedding day",
  },
  weddingRings: {
    src: "/images/wedding-rings.webp",
    alt: "Gold wedding rings resting on lace",
  },
} as const;

export type ImageKey = keyof typeof images;
