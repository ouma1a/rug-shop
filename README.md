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

## Checkout via WhatsApp
There's no online payment. At checkout the customer fills in their contact and delivery details and
presses **Confirm on WhatsApp** — this opens WhatsApp (`wa.me`) with the full order pre-written
(items, sizes, quantities, totals and address) addressed to the shop owner, who replies to arrange
delivery and payment. Set the destination number in `src/lib/shop.ts` (`WHATSAPP_NUMBER`,
international format, digits only — e.g. `2126XXXXXXXX`).

## Notes
Prices are in Moroccan dirham (DH). Products are mock data; the cart persists in the browser's
`localStorage`.
