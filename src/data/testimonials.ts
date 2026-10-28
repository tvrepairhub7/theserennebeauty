import type { ImageKey } from "./images";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  initials: string;
  service: string;
  rating: number;
  image?: ImageKey;
  /** Illustrative review copy only; replace with approved real client feedback. */
  isSample: true;
}

export const testimonials: Testimonial[] = [
  {
    id: "sample-1",
    quote:
      "The makeup felt light all evening and photographed beautifully. I loved how much time was spent getting the look right for my outfit.",
    name: "Nikhat",
    initials: "N",
    service: "Bridal makeup",
    rating: 5,
    isSample: true,
  },
  {
    id: "sample-2",
    quote:
      "Booked a party look for a family function and received so many compliments. The hairdo stayed exactly as it was styled.",
    name: "Aamina",
    initials: "A",
    service: "Party makeup",
    rating: 5,
    isSample: true,
  },
  {
    id: "sample-3",
    quote:
      "My pre-bridal sessions were calm and unhurried, and the trial helped me feel confident about the final look.",
    name: "Zaara",
    initials: "Z",
    service: "Pre-bridal package",
    rating: 5,
    isSample: true,
  },
];
