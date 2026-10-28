import type { ImageKey } from "./images";

export const portfolioCategories = [
  "All",
  "Bridal",
  "Reception",
  "Engagement",
  "Party",
  "HD Makeup",
  "Airbrush",
  "Hairstyling",
  "Beauty Treatments",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  image: ImageKey;
  /** Controls the masonry emphasis on large screens. */
  emphasis?: "tall" | "wide";
}

export const portfolioCategoryCopy: Record<
  Exclude<PortfolioCategory, "All">,
  string
> = {
  Bridal:
    "A complete bridal look built around the outfit, jewellery and traditions of the day, finished with hairdo and draping.",
  Reception:
    "Reception styling with a polished base, defined features and an elegant finish that carries from ceremony to celebration.",
  Engagement:
    "Radiant engagement looks with a soft glow and camera-ready detail, tailored to the outfit and the venue.",
  Party:
    "Party makeup with luminous skin and expressive eyes — balanced for photographs, dancing and long evenings.",
  "HD Makeup":
    "High-definition finishes created for photography and video, with a seamless base that stays true on camera.",
  Airbrush:
    "Feather-light airbrush application for a natural, breathable finish that looks beautiful in person and on film.",
  Hairstyling:
    "Hair styling from soft waves to structured bridal braids, shaped to complement the face and the neckline.",
  "Beauty Treatments":
    "Facials, nails, waxing and body care — the treatments that complete a look and keep skin glowing between occasions.",
};

/** Service category each portfolio category points visitors towards. */
export const portfolioCategoryService: Record<
  Exclude<PortfolioCategory, "All">,
  string
> = {
  Bridal: "bridal-reception-makeup",
  Reception: "bridal-reception-makeup",
  Engagement: "engagement-makeup",
  Party: "party-makeup",
  "HD Makeup": "bridal-reception-makeup",
  Airbrush: "engagement-makeup",
  Hairstyling: "bridal-reception-makeup",
  "Beauty Treatments": "facial-skincare",
};

/**
 * Replace these with the studio’s own photographs as they become available.
 * Keep titles short — they appear in the lightbox caption.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "bridal-red",
    title: "Traditional bridal",
    category: "Bridal",
    image: "heroBride",
    emphasis: "tall",
  },
  {
    id: "reception-red",
    title: "Reception in purple",
    category: "Reception",
    image: "sareeRed",
  },
  {
    id: "engagement-emerald",
    title: "Emerald engagement",
    category: "Engagement",
    image: "engagementGreen",
    emphasis: "tall",
  },
  {
    id: "party-purple",
    title: "Party in purple",
    category: "Party",
    image: "partyPortrait",
  },
  {
    id: "bridal-jewellery",
    title: "Bridal glow & gold",
    category: "Bridal",
    image: "bridalJewel",
  },
  {
    id: "hd-studio",
    title: "HD studio finish",
    category: "HD Makeup",
    image: "portraitGlam",
    emphasis: "tall",
  },
  {
    id: "airbrush-backstage",
    title: "Backstage finish",
    category: "Airbrush",
    image: "artistBackstage",
  },
  {
    id: "floral-braid",
    title: "Floral bridal braid",
    category: "Hairstyling",
    image: "bridalHair",
    emphasis: "tall",
  },
  {
    id: "facial-ritual",
    title: "Facial ritual",
    category: "Beauty Treatments",
    image: "spaFacial",
  },
  {
    id: "party-eye",
    title: "Soft shimmer eyes",
    category: "Party",
    image: "partyEye",
  },
  {
    id: "reception-elegance",
    title: "Reception elegance",
    category: "Reception",
    image: "sareeWomen",
  },
  {
    id: "hd-base",
    title: "Building the base",
    category: "HD Makeup",
    image: "makeupApplication",
    emphasis: "tall",
  },
  {
    id: "salon-blowout",
    title: "Salon blowout",
    category: "Hairstyling",
    image: "hairSalon",
  },
  {
    id: "dark-gloss-nails",
    title: "Dark gloss nails",
    category: "Beauty Treatments",
    image: "nailsDark",
  },
  {
    id: "mehndi-details",
    title: "Mehndi details",
    category: "Bridal",
    image: "mehndi",
  },
  {
    id: "engagement-glam",
    title: "Engagement glam",
    category: "Engagement",
    image: "makeupCloseup",
  },
  {
    id: "airbrush-final",
    title: "Final touches",
    category: "Airbrush",
    image: "artistClient",
  },
  {
    id: "wedding-day",
    title: "Wedding day",
    category: "Reception",
    image: "weddingCouple",
    emphasis: "wide",
  },
  {
    id: "floral-eye",
    title: "Floral eye artistry",
    category: "Party",
    image: "eyeMakeupFloral",
  },
];

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return portfolioItems.find((item) => item.id === id);
}

export function getRelatedPortfolio(
  item: PortfolioItem,
  limit = 3,
): PortfolioItem[] {
  return portfolioItems
    .filter((other) => other.id !== item.id)
    .sort((a, b) => {
      const score = (candidate: PortfolioItem) =>
        (candidate.category === item.category ? 2 : 0) +
        (candidate.image === item.image ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}
