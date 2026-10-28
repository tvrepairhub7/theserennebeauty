# TheSerenneBeauty — Makeup Studio & Beauty

A complete, responsive website for **TheSerenneBeauty**, a makeup studio and beauty parlour in Gomti Nagar, Lucknow — built with Next.js (App Router), TypeScript and Tailwind CSS. It includes a full service menu with detail pages for every treatment, transparent pricing, a filterable portfolio with individual look pages, pre-bridal packages, sample-labelled reviews, a WhatsApp booking flow and contact pages.

## Business details in this build

| Field | Value |
| --- | --- |
| Business name | TheSerenneBeauty |
| Phone | +91 83034 67882 |
| Alternate phone | +91 93696 52109 |
| WhatsApp | +91 83034 67882 |
| Address | Station Road, Vinay Khand 3, Gomti Nagar, Lucknow, Uttar Pradesh 226010 |
| Instagram | [@the_serenne_beauty](https://www.instagram.com/the_serenne_beauty/) |

All of these live in `src/data/site.ts` and update the header, footer, contact page, booking form, structured data and WhatsApp links at once.

> **Still needed before launch:** opening hours, a business email (none was supplied, so none is shown), a live domain in `site.url`, confirmed final package inclusions, genuine reviews and the studio's own photographs. See [Before you go live](#before-you-go-live).

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Code quality:

```bash
npm run lint
npx tsc --noEmit
```

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, service marquee, studio introduction, featured makeup, beauty treatments, pre-bridal packages, experience section, portfolio preview, reviews and Instagram |
| `/about` | Studio approach, principles, stats and the appointment experience |
| `/services` | Overview of makeup services and beauty treatments |
| `/services/party-makeup` | Party makeup packages (₹1,499 – ₹3,499) |
| `/services/engagement-makeup` | Engagement makeup (₹6,999 – ₹12,999) |
| `/services/bridal-reception-makeup` | Bridal & reception makeup plus the separately listed bridal service |
| `/services/facial-skincare` | Facials, de-tan and bleach |
| `/services/waxing-manicure-pedicure` | Waxing, manicure and pedicure |
| `/services/body-polishing` | Body polishing and hair spa |
| `/services/threading` | Threading services |
| `/services/pre-bridal-packages` | Both pre-bridal programmes with a full inclusion comparison |
| `/services/[category]/[item]` | A page for **every** individual service with price, inclusions, booking and enquiry links |
| `/portfolio` | Filterable gallery with a lightbox and links to individual looks |
| `/portfolio/[id]` | A page for every portfolio look, with related work and booking links |
| `/pricing` | Complete price guide; every row links to its service page |
| `/reviews` | Demonstration reviews, clearly labelled |
| `/contact` | Contact details, both phone numbers, map, message form and FAQs |
| `/book` | Booking request form with service/package prefill via URL |
| `not-found` | Custom 404 page |

SEO routes `/sitemap.xml` and `/robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`. The sitemap includes every service and portfolio detail page.

---

## Project structure

```
src/
├─ app/                       # Routes, layout, global styles, metadata routes
│  ├─ services/[slug]/         # Dynamic service category pages
│  ├─ services/[slug]/[item]/  # Individual service pages
│  ├─ portfolio/[id]/          # Individual portfolio look pages
│  ├─ globals.css              # Design tokens, buttons, forms, motion, ornaments
│  ├─ layout.tsx               # Fonts, metadata, header/footer, structured data
│  ├─ template.tsx             # Page transition wrapper
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/                 # Reusable UI (header, gallery, forms, cards,
│                              #   ornaments, marquee, stats, Instagram band…)
├─ data/
│  ├─ site.ts                  # Business details, WhatsApp, navigation, socials
│  ├─ services.ts              # Service categories, services, prices, helpers
│  ├─ packages.ts              # Pre-bridal packages and inclusions
│  ├─ portfolio.ts             # Gallery items, categories, related-look helpers
│  ├─ testimonials.ts          # Clearly labelled sample reviews
│  └─ images.ts                # Every photo: file path + alt text
└─ lib/
   ├─ format.ts                # ₹ formatting and dates
   └─ whatsapp.ts              # wa.me links and message templates
public/
├─ images/                     # Optimised WebP photographs
├─ og.jpg                      # Branded social sharing image (1200 × 630)
└─ favicon.ico
```

The site is data-driven: prices, services, packages, photographs and business details are defined once and used across pages, cards, the booking form, sitemap and CTA links.

---

## Customising the site

### 1. Business details — `src/data/site.ts`

The business name, both phone numbers, WhatsApp number, address, Maps link and Instagram are already filled in. Remaining values:

- `url` — replace `https://theserennebeauty.example` with the live domain (used for canonicals, Open Graph, structured data and the sitemap)
- `copyrightYear` — update each January (kept static so pages can be prerendered)
- `contact.email` — left empty because no business email was supplied; fill it in and the contact page will show it
- `hours` — left empty because opening hours were not supplied; the UI says timings are confirmed at booking
- `socials.facebook` — left empty; the icon only appears once a URL is added

`isPlaceholderContent` and `whatsappIsPlaceholder` are already `false` because the real details are in place.

### 2. Prices — `src/data/services.ts`

Each service has a `price` in **whole rupees** (no commas, no currency symbol):

```ts
{
  id: "party-normal",
  name: "Normal Party Makeup with Hairdo and Draping",
  price: 1499,
  ...
}
```

- Use `price: null` for a treatment whose rate is confirmed with the studio. Nothing is rendered in place of the price — there is no “price on request” copy anywhere in the UI.
- Formatting is centralised in `src/lib/format.ts` using the Indian numbering system (`₹1,49,999`).
- Every service appears automatically in its category page, its own detail page, the pricing page, the booking form dropdown and the sitemap.
- The separately listed **Bridal Makeup with Hairdo and Draping (₹19,999)** is `bridal-signature` in the bridal category. It is deliberately rendered in its own panel on the category and pricing pages so it is never silently combined with the bridal/reception prices.

Current confirmed prices:

| Service | Price |
| --- | --- |
| Party makeup (4 finishes) | ₹1,499 / ₹1,999 / ₹2,499 / ₹3,499 |
| Engagement makeup (3 finishes) | ₹6,999 / ₹9,999 / ₹12,999 |
| Bridal & reception makeup (3 finishes) | ₹9,999 / ₹16,999 / ₹24,999 |
| Bridal Makeup with Hairdo and Draping — listed separately | ₹19,999 |
| Beauty treatments | Confirmed with the studio; add a price to display it |

### 3. Pre-bridal packages — `src/data/packages.ts`

Edit `price`, `summary` and the `inclusions` array. The cards, comparison table, pricing page and booking form all update from this file.

Both packages remain marked `needsConfirmation: true` because the final inclusion list should be confirmed with the studio. Confirm, then either adjust the data or set the flag to `false`.

> If you change an inclusion wording in one package, use the same wording in the other where it means the same thing — the comparison table matches inclusions by exact text.

### 4. Photographs — `src/data/images.ts` + `public/images/`

All photographs currently in the build are licensed stock placeholders, optimised to WebP. Replace them with the studio's own work:

1. Add your image to `public/images/` (landscape 1600–2000 px wide for cards; portrait 1200 × 1500 px for the hero/arch images works well).
2. Update the matching `src` in `src/data/images.ts`. Update the `alt` text to describe the new photograph.
3. Images are served through `next/image`, which resizes, lazy-loads and serves modern formats automatically.

The portfolio is edited in `src/data/portfolio.ts` — each item has a title, category, image key and optional `emphasis` (`"tall"` or `"wide"`) for the masonry layout. Categories come from `portfolioCategories`.

The social sharing image is `public/og.jpg` (1200 × 630). It is generated from the branded layout in `.qa/make-og.mjs` — rerun that script after changing the wordmark or hero photo.

### 5. Reviews — `src/data/testimonials.ts`

The three reviews are demonstration content marked `isSample: true` and are labelled as samples on the site. Replace them with genuine, permission-cleared client feedback, or remove them. Do not add ratings or reviews that cannot be verified.

### 6. Opening hours, booking slots and policy

Edit `hours`, `booking.timeSlots` and `booking.policyNote` in `src/data/site.ts`. The policy note appears under the booking form, in the contact page FAQ and in the CTA band.

---

## Booking and WhatsApp flow

There is **no backend and no database**. The booking and contact forms:

1. Validate the fields in the browser (required fields, phone length, optional email format, future date).
2. Build a formatted message.
3. Open `wa.me` in a new tab with the message pre-filled. The visitor presses send inside WhatsApp.
4. Show a confirmation screen explaining that nothing has been stored or sent yet.

This is deliberate and clearly communicated in the interface — the site never pretends an appointment has been saved.

Service and package links prefill the form from any service detail page:

- `/book?service=bridal-signature`
- `/book?package=pre-bridal-package`

If you later add a booking backend, replace the submit handler in `src/components/booking-form.tsx` and update the confirmation copy and privacy notice.

---

## Instagram

The site links to [@the_serenne_beauty](https://www.instagram.com/the_serenne_beauty/) from the header, footer, contact page, booking page, Instagram sections and the dark “Follow along” band.

Instagram photographs and reels are **not downloaded automatically** — the Instagram API does not allow anonymous scraping, and re-uploading media without an authorised export can break the platform's terms. To use the studio's real posts:

1. Download the photos you own from Instagram (or use the originals).
2. Save them to `public/images/` and map them in `src/data/images.ts`.
3. Point the relevant portfolio items in `src/data/portfolio.ts` at the new image keys.

Until then, the Instagram sections link to the live profile and the portfolio page discloses that the imagery is illustrative.

---

## SEO

- `src/app/layout.tsx` sets `metadataBase`, the title template, Open Graph and Twitter metadata.
- Each page (including every service and portfolio detail page) exports its own `title`, `description` and canonical URL.
- `src/app/sitemap.ts` lists all static pages, service categories, individual services and portfolio looks; `src/app/robots.ts` points to it.
- Structured data includes a `WebSite` schema and a `BeautySalon` schema built from the confirmed name, address, phone and Instagram. No ratings or hours are included because neither has been verified.
- Update `site.url` before publishing so canonicals, Open Graph URLs and the sitemap use the live domain.

---

## Deployment

The project deploys as a standard Next.js app (server-rendered with static generation).

**Vercel (recommended)**

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. No environment variables are required.
4. Add the custom domain in Vercel, then update `site.url` and redeploy.

**Any Node host**

```bash
npm ci
npm run build
npm start        # default port 3000; set PORT if needed
```

There are no secrets or API keys in the repository.

---

## Before you go live

- [ ] Opening hours (including Sunday/holiday policy)
- [ ] A business email address, if one should be published
- [ ] The live domain in `site.url`
- [ ] Confirmation of the **Pre-Bridal Package ₹14,999** price and inclusions
- [ ] Confirmation of the **Premium Pre-Bridal Package ₹24,999** price and inclusions
- [ ] Confirmation that **Bridal Makeup ₹19,999** is a separate service and what it includes
- [ ] Prices for facials, waxing, manicure, pedicure, body polishing, hair spa and threading
- [ ] Any policy on trials, travel, cancellations or advance payment
- [ ] Genuine client reviews (or approval to remove the sample reviews)
- [ ] The studio's own photographs, with permission to publish them
- [ ] Update `public/og.jpg` if the hero photograph changes (rerun `.qa/make-og.mjs`)
- [ ] A privacy note if analytics, advertising pixels or a booking backend are added later

Then:

1. Update `site.url` and `site.copyrightYear` in `src/data/site.ts`.
2. Run `npm run build` and test every page and link.
3. Submit `sitemap.xml` in Google Search Console after deployment.

---

## Accessibility and performance

- Semantic landmarks, a skip link, labelled form fields and `aria-invalid` / error messages.
- Keyboard access for the gallery lightbox (Escape, arrow keys, focus restore) and the mobile menu (Escape, scroll lock).
- Visible focus outlines; colour contrast checked against the ivory/cream backgrounds.
- Motion is disabled for visitors who prefer reduced motion; reveal animations only run when scripting is available.
- Images are optimised WebP files served through `next/image`; the hero image is prioritised, everything else lazy-loads.
- `prefers-reduced-motion`, `text-wrap: balance` and CSS-based reveal states limit layout shift.

---

## Notes

- Photographs in this build are licensed stock placeholders and should be replaced with the studio's own work before launch.
- Fonts: Cormorant Garamond (headings) and Jost (body), loaded locally via `next/font`.
- Icons: [Lucide](https://lucide.dev) plus small custom WhatsApp, Instagram and Facebook SVGs.
