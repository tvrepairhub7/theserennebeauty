import type { ImageKey } from "./images";
import { site } from "./site";

export interface Service {
  id: string;
  name: string;
  /** Price in whole rupees, or `null` when it has not been supplied. */
  price: number | null;
  description: string;
  image?: ImageKey;
  /** Used for the separately listed bridal package. */
  includes?: string[];
  featured?: boolean;
}

export interface ServiceCategory {
  slug: string;
  /** Page title. */
  title: string;
  /** Short label used in navigation. */
  navLabel: string;
  eyebrow: string;
  tagline: string;
  intro: string;
  image: ImageKey;
  items: Service[];
  note?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "party-makeup",
    title: "Party Makeup",
    navLabel: "Party Makeup",
    eyebrow: "Occasion glam",
    tagline: "Effortless glamour for every celebration.",
    intro:
      "From intimate dinners to full-scale celebrations, each party look is matched to your outfit, the venue and the mood of the occasion — finished with a hairdo and draping so you are ready from the first photograph to the last dance.",
    image: "partyPortrait",
    note: site.note,
    items: [
      {
        id: "party-normal",
        name: "Normal Party Makeup with Hairdo and Draping",
        price: 1499,
        description:
          "A soft, natural party look with a clean base, defined eyes and a comfortable finish, paired with a simple hairdo and draping.",
        image: "partyPortrait",
        featured: true,
      },
      {
        id: "party-light",
        name: "Light Party Makeup with Hairdo and Draping",
        price: 1999,
        description:
          "A fresh, luminous look with lightweight coverage and subtle shimmer, ideal for daytime events and close-up photographs.",
        image: "partyEye",
      },
      {
        id: "party-advanced",
        name: "Advanced Party Makeup with Hairdo and Draping",
        price: 2499,
        description:
          "Layered, defined glamour with sculpted eyes and a polished base for evening celebrations and special occasions.",
        image: "makeupCloseup",
      },
      {
        id: "party-hd",
        name: "HD Party Makeup with Hairdo and Draping",
        price: 3499,
        description:
          "High-definition makeup designed for photography and video, with a seamless finish that looks flawless on camera.",
        image: "portraitGlam",
      },
    ],
  },
  {
    slug: "engagement-makeup",
    title: "Engagement Makeup",
    navLabel: "Engagement Makeup",
    eyebrow: "Pre-wedding glow",
    tagline: "A radiant look for the day it all begins.",
    intro:
      "Engagement and pre-wedding celebrations deserve a look that feels special yet entirely you. Choose a classic finish, HD makeup for photographs, or airbrush for an ultra-light, seamless result — each completed with hairdo and draping.",
    image: "engagementGreen",
    note: site.note,
    items: [
      {
        id: "engagement-makeup",
        name: "Engagement Makeup with Hairdo and Draping",
        price: 6999,
        description:
          "A refined engagement look with a soft glow, defined features and a beautifully finished hairdo and drape.",
        image: "engagementGreen",
        featured: true,
      },
      {
        id: "engagement-hd",
        name: "HD Engagement Makeup with Hairdo and Draping",
        price: 9999,
        description:
          "High-definition makeup for engagement photography and video, with a smooth, camera-ready finish.",
        image: "sareeRed",
      },
      {
        id: "engagement-airbrush",
        name: "Airbrush Engagement Makeup with Hairdo and Draping",
        price: 12999,
        description:
          "Feather-light airbrush application for a natural, breathable finish that photographs beautifully all day.",
        image: "sareeWomen",
      },
    ],
  },
  {
    slug: "bridal-reception-makeup",
    title: "Bridal & Reception Makeup",
    navLabel: "Bridal & Reception",
    eyebrow: "Your wedding day",
    tagline: "Bridal artistry, made personal.",
    intro:
      "Your bridal look is built around you — your outfit, your jewellery, your traditions and the way you want to feel. Every bridal and reception service includes hairdo and draping, with HD and airbrush options for a flawless finish in person and on camera.",
    image: "heroBride",
    note: site.note,
    items: [
      {
        id: "bridal-reception",
        name: "Bridal / Reception Makeup with Hairdo and Draping",
        price: 9999,
        description:
          "A complete bridal or reception look with balanced, traditional glamour, finished with hairdo and draping.",
        image: "bridalJewel",
        featured: true,
      },
      {
        id: "bridal-reception-hd",
        name: "HD Bridal / Reception Makeup with Hairdo and Draping",
        price: 16999,
        description:
          "High-definition bridal makeup for weddings and receptions, created to look seamless in every photograph.",
        image: "sareeRed",
      },
      {
        id: "bridal-reception-airbrush",
        name: "Airbrush Bridal / Reception Makeup with Hairdo and Draping",
        price: 24999,
        description:
          "Our most lightweight bridal finish — airbrush makeup, hairdo and draping for a naturally radiant wedding-day look.",
        image: "heroBride",
      },
      {
        id: "bridal-signature",
        name: "Bridal Makeup with Hairdo and Draping",
        price: 19999,
        description:
          "A separately listed bridal package centred on your wedding-day makeup, hairdo and draping.",
        image: "sareeWomen",
        includes: ["Bridal makeup", "Hairdo", "Draping"],
      },
    ],
  },
  {
    slug: "facial-skincare",
    title: "Facial & Skincare",
    navLabel: "Facial & Skincare",
    eyebrow: "Skin first",
    tagline: "A fresh start for luminous skin.",
    intro:
      "Cleanse, refresh and reset with a facial or de-tan treatment chosen for your skin’s needs. Our skincare menu covers everything from a regular facial to premium and full-body treatments, each tailored to your skin and your occasion.",
    image: "spaFacial",
    items: [
      {
        id: "regular-facial",
        name: "Regular Facial",
        price: null,
        description:
          "A classic cleanse, exfoliation and massage to refresh tired skin and restore a healthy glow.",
        image: "facialMask",
        featured: true,
      },
      {
        id: "advanced-facial",
        name: "Advanced Facial",
        price: null,
        description:
          "A more detailed facial ritual tailored to your skin type, with targeted treatment and massage.",
        image: "facialTreatment",
      },
      {
        id: "premium-facial",
        name: "Premium Facial",
        price: null,
        description:
          "Our most indulgent facial experience, with premium products and extended care for a rested, radiant finish.",
        image: "spaFacial",
      },
      {
        id: "face-neck-dtan",
        name: "Face & Neck D-Tan / Bleach",
        price: null,
        description:
          "A brightening de-tan or bleach treatment for the face and neck to help even out the appearance of tanning.",
        image: "skincarePortrait",
      },
      {
        id: "full-body-bleach",
        name: "Full Body Bleach / D-Tan",
        price: null,
        description:
          "A full-body brightening treatment, ideal before a celebration or as part of a pre-bridal routine.",
        image: "skinCloseup",
      },
    ],
  },
  {
    slug: "waxing-manicure-pedicure",
    title: "Waxing, Manicure & Pedicure",
    navLabel: "Waxing, Mani & Pedi",
    eyebrow: "Hands, feet & smooth skin",
    tagline: "The finishing touches, done beautifully.",
    intro:
      "Polished hands, comfortable feet and smoothly waxed skin complete every look. Book a single treatment or combine them with a facial for a complete grooming session in one calm appointment.",
    image: "manicurePink",
    items: [
      {
        id: "full-body-wax",
        name: "Full Body Wax",
        price: null,
        description:
          "A complete waxing service for smooth, cared-for skin, carried out with attention to comfort and privacy.",
        image: "waxing",
        featured: true,
      },
      {
        id: "brazilian-bikini-wax",
        name: "Brazilian Bikini Wax",
        price: null,
        description:
          "A professional intimate waxing service performed discreetly and comfortably by appointment.",
        image: "skinCloseup",
      },
      {
        id: "advanced-manicure",
        name: "Advanced Manicure",
        price: null,
        description:
          "Nail shaping, cuticle care and a nourishing hand treatment for neat, well-groomed hands.",
        image: "nailFiling",
      },
      {
        id: "advanced-pedicure",
        name: "Advanced Pedicure",
        price: null,
        description:
          "A thorough foot treatment with soak, exfoliation, nail care and massage to leave feet refreshed.",
        image: "nailsDark",
      },
      {
        id: "premium-manicure",
        name: "Premium Manicure",
        price: null,
        description:
          "An elevated manicure with extended care, premium products and a polished final finish.",
        image: "manicurePink",
      },
      {
        id: "premium-pedicure",
        name: "Premium Pedicure",
        price: null,
        description:
          "An indulgent pedicure with extended pampering for tired feet and a beautifully finished look.",
        image: "manicurePink",
      },
    ],
  },
  {
    
slug: "hair-services",
title: "Hair Services",
navLabel: "Hair Services",
eyebrow: "Professional hair care",
tagline: "Beautiful hair, tailored to you.",
intro:
"Professional hair treatments and colouring services tailored to your needs.",
image: "hairBrush",
items: [
{
id: "hair-smoothening",
name: "Hair Smoothening",
price: null,
description: "A professional treatment for smoother, more manageable hair.",
image: "hairBrush",
},
{
id: "hair-rebonding",
name: "Hair Rebonding",
price: null,
description: "A hair-straightening treatment for a sleek look.",
image: "hairBrush",
},
{
id: "hair-botox",
name: "Hair Botox",
price: null,
description: "A conditioning treatment for dry and frizzy hair.",
image: "hairBrush",
},
{
id: "keratin-treatment",
name: "Keratin Treatment",
price: null,
description: "A smoothing treatment to help reduce frizz and add shine.",
image: "hairBrush",
},
{
id: "global-hair-colour",
name: "Global Hair Colour",
price: null,
description: "All-over hair colouring in your preferred shade.",
image: "hairBrush",
},
{
id: "hair-highlights",
name: "Hair Highlights",
price: null,
description: "Highlights that add dimension to your hair colour.",
image: "hairBrush",
},
{
id: "root-touch-up",
name: "Root Touch Up",
price: null,
description: "Root colouring to refresh hair regrowth.",
image: "hairBrush",
},
{
id: "balayage-colour",
name: "Balayage Colour",
price: null,
description: "Blended hair colouring for a soft, dimensional look.",
image: "hairBrush",
},
],
},
{
    slug: "body-polishing",
    title: "Body Polishing & Hair Spa",
    navLabel: "Body Polishing",
    eyebrow: "Head-to-toe care",
    tagline: "Softer skin, healthier-looking hair.",
    intro:
      "Body polishing and hair spa treatments are the quiet luxuries that make a visible difference. Choose a classic, advanced or premium polish, or add a restorative hair spa to your appointment.",
    image: "bodyPolish",
    items: [
      {
        id: "body-polishing",
        name: "Body Polishing",
        price: null,
        description:
          "A full-body exfoliation and polish to leave skin feeling smooth, soft and renewed.",
        image: "bodyPolish",
        featured: true,
      },
      {
        id: "advanced-body-polishing",
        name: "Advanced Body Polishing",
        price: null,
        description:
          "A more detailed body polish with extended exfoliation and nourishing care.",
        image: "massageStones",
      },
      {
        id: "premium-body-polishing",
        name: "Premium Body Polishing",
        price: null,
        description:
          "Our most indulgent body polish, using premium products for a deeply pampered finish.",
        image: "bodyScrub",
      },
      {
        id: "hair-spa",
        name: "Hair Spa",
        price: null,
        description:
          "A restorative hair and scalp treatment to condition, smooth and add shine.",
        image: "hairBrush",
      },
    ],
  },
  {
    slug: "threading",
    title: "Threading",
    navLabel: "Threading",
    eyebrow: "Precise definition",
    tagline: "Clean, defined brows in expert hands.",
    intro:
      "Eyebrow, forehead and upper-lip threading to tidy and define your features — quick, precise and finished with care.",
    image: "eyeCloseup",
    items: [
      {
        id: "eyebrow-threading",
        name: "Eyebrow Threading",
        price: null,
        description:
          "Expert brow shaping to frame your face and complement your makeup look.",
        image: "eyeCloseup",
        featured: true,
      },
      {
        id: "forehead-threading",
        name: "Forehead Threading",
        price: null,
        description:
          "Precise threading to remove fine hair along the forehead for a smooth finish.",
        image: "lashes",
      },
      {
        id: "upper-lip-threading",
        name: "Upper Lip Threading",
        price: null,
        description:
          "Quick, gentle upper-lip threading for a neat, polished finish.",
        image: "skinCloseup",
      },
    ],
  },
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.slug === slug);
}

export const makeupCategories = serviceCategories.filter(
  (category) =>
    category.slug === "party-makeup" ||
    category.slug === "engagement-makeup" ||
    category.slug === "bridal-reception-makeup",
    
);
export const hairCategories = serviceCategories.filter(
  (category) => category.slug === "hair-services",
);
export const beautyCategories = serviceCategories.filter(
  (category) => !makeupCategories.includes(category),
);

export const allServices: Service[] = serviceCategories.flatMap(
  (category) => category.items,
);

export function getService(id: string): Service | undefined {
  return allServices.find((service) => service.id === id);
}

export function getServiceCategory(id: string): ServiceCategory | undefined {
  return serviceCategories.find((category) =>
    category.items.some((item) => item.id === id),
  );
}

export function getServiceByPath(categorySlug: string, itemId: string) {
  const category = getCategory(categorySlug);
  if (!category) return null;
  const service = category.items.find((item) => item.id === itemId);
  return service ? { category, service } : null;
}

export const servicePaths = serviceCategories.flatMap((category) =>
  category.items.map((service) => ({
    slug: category.slug,
    item: service.id,
  })),
);

/** Lowest confirmed price in a category, used for “from ₹…” labels. */
export function startingPrice(category: ServiceCategory): number | null {
  const prices = category.items
    .map((item) => item.price)
    .filter((price): price is number => typeof price === "number");
  return prices.length ? Math.min(...prices) : null;
}
