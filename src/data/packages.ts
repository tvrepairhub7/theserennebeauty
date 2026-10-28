import type { ImageKey } from "./images";

export interface BridalPackage {
  id: string;
  name: string;
  /** Price in whole rupees. Edit here to update the site everywhere. */
  price: number;
  summary: string;
  inclusions: string[];
  image: ImageKey;
  featured?: boolean;
  /**
   * The supplied handwritten notes are ambiguous about this package’s price
   * and whether bridal makeup is included. Keep `true` until confirmed so the
   * site can flag it for review.
   */
  needsConfirmation?: boolean;
  confirmationNote?: string;
}

export const bridalPackages: BridalPackage[] = [
  {
    id: "pre-bridal-package",
    name: "Pre-Bridal Package",
    price: 14999,
    summary:
      "A complete pre-wedding grooming plan covering skin, hands, feet, waxing and bridal-day makeup.",
    inclusions: [
      "Facial",
      "Face and Neck Bleach / D-Tan",
      "Full Body Bleach / D-Tan",
      "Manicure",
      "Pedicure",
      "Full Body Wax",
      "Body Polishing",
      "Eyebrow Threading",
      "Forehead Threading",
      "Upper Lip Threading",
      "Bridal Makeup with Hairdo and Draping",
    ],
    image: "spaFacial",
    needsConfirmation: true,
    confirmationNote:
      "The supplied notes are ambiguous about the price and whether bridal makeup is included in this package. Please confirm both before publication.",
  },
  {
    id: "premium-pre-bridal-package",
    name: "Premium Pre-Bridal Package",
    price: 24999,
    summary:
      "Our most luxurious pre-bridal programme, with premium treatments, hair spa and bridal-day makeup.",
    inclusions: [
      "Premium Facial",
      "Face and Neck Bleach / D-Tan",
      "Full Body Bleach / D-Tan",
      "Premium Pedicure",
      "Premium Manicure",
      "Premium Body Polishing",
      "Full Body Wax",
      "Hair Spa",
      "Brazilian Bikini Wax",
      "Eyebrow Threading",
      "Upper Lip Threading",
      "Forehead Threading",
      "Bridal Makeup with Hairdo and Draping",
    ],
    image: "bridalJewel",
    featured: true,
    needsConfirmation: true,
    confirmationNote:
      "Please confirm the final price and inclusions with the studio before publication.",
  },
];

export function getPackage(id: string): BridalPackage | undefined {
  return bridalPackages.find((item) => item.id === id);
}
