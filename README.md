# Maison — Handwoven Rugs

[![CI](https://github.com/ouma1a/rug-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/ouma1a/rug-shop/actions/workflows/ci.yml)

A boutique e-commerce storefront for handwoven rugs, built with **React + TypeScript + Vite** and
**Tailwind CSS v4**. Luxury-minimal design, a full browse → cart → checkout flow, and — notably —
**every rug image is a generated SVG**, so the catalogue always looks intentional with zero external
assets or broken images.

## Highlights
- **Generative rug artwork** — `RugPattern` renders each rug as a layered SVG (fringe, ornamental
  border, and a field motif that varies by weave: medallion, Berber diamonds, striped kilim,
  lattice, bordered). No photos, no CDNs, nothing to 404.
- **Full storefront** — landing page, filterable shop, product detail, slide-in cart drawer, full
  cart page, and a checkout with an order-confirmation flow.
- **Real cart logic** — add / update quantity / remove, line + order totals, free-shipping
  threshold, all persisted to `localStorage` via a typed Context + reducer.
- **Polished UX** — sticky blurred header, scroll/hash management, animated hero, responsive down to
  mobile, accessible controls.
- **Type-safe & linted** — strict TypeScript throughout; clean `oxlint`.

## Pages

| Route          | What's there                                              |
|----------------|-----------------------------------------------------------|
| `/`            | Hero, value strip, featured collection, “Our Story”       |
| `/shop`        | Product grid with filters (weave / colour / size) + sort  |
| `/product/:id` | Detail: size & quantity selection, specs, related rugs    |
| `/cart`        | Full cart with line items, quantities, order summary      |
| `/checkout`    | Contact + delivery details → confirm order via WhatsApp    |

## Tech
React · TypeScript · Vite · Tailwind CSS v4 · React Router · Context + reducer · generated SVG

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) + production build
npm run preview    # serve the production build
npm run lint       # oxlint
```

## Project structure

```
src/
  components/   Header, Footer, CartDrawer, ProductCard, RugPattern, QuantityStepper
  context/      CartContext (reducer + localStorage)
  data/         rugs.ts (catalogue) + helpers
  pages/        Home, Shop, Product, Cart, Checkout
  lib/          formatPrice
  types.ts      Rug, Palette, CartLine, …
```

## Editing the catalogue (no code needed)

All rug information lives in one file: **`src/data/rugs.json`**. Add, edit, or remove rugs there —
change a price, a name, a description, sizes, or photos — and the whole site updates.

Each rug looks like this:

```json
{
  "id": "ait-ivory-cross",
  "name": "Aït Ivory Cross",
  "origin": "Taznakht, Morocco",
  "style": "medallion",
  "color": "Ivory",
  "sizes": ["2'×3'", "Runner", "5'×8'"],
  "price": 4900,
  "knotCount": "Hand-woven, low pile",
  "material": "Hand-woven wool with embroidery",
  "description": "…",
  "palette": { "field": "#efe6d4", "border": "#7a2230", "motif": "#8a2433", "accent": "#e8a32d", "fringe": "#e7dcc4" },
  "images": ["/rugs/white-rug1.jpg", "/rugs/white-rug4.jpg"],
  "featured": true
}
```

- `style`: one of `medallion` · `diamonds` · `stripes` · `lattice` · `bordered`
- `sizes`: any of `2'×3'` · `5'×8'` · `8'×10'` · `9'×12'` · `Runner`
- `images`: drop photos in `public/rugs/` and list them as `/rugs/filename.jpg`. The first is the
  main image; the rest become gallery thumbnails. **Omit `images`** and a pattern is generated from
  `palette` instead.
- `featured: true` shows the rug in the homepage "Featured" row.
- `price` is a plain number in dirham (e.g. `4900` → "4 900 DH").

## Checkout via WhatsApp
There's no online payment. At checkout the customer fills in their contact and delivery details and
presses **Confirm on WhatsApp** — this opens WhatsApp (`wa.me`) with the full order pre-written
(items, sizes, quantities, totals and address) addressed to the shop owner, who replies to arrange
delivery and payment. Set the destination number in `src/lib/shop.ts` (`WHATSAPP_NUMBER`,
international format, digits only — e.g. `2126XXXXXXXX`).

## Notes
Prices are in Moroccan dirham (DH). Products are mock data; the cart persists in the browser's
`localStorage`.
