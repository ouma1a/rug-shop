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
| `/checkout`    | Contact + shipping + (mock) payment → order confirmation  |

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

## Notes
This is a front-end demo: products are mock data and no real payment is processed — “Place order”
runs the confirmation flow and clears the cart. Storage is the browser's `localStorage`.
