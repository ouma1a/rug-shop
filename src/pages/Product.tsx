import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRug, rugs, STYLE_LABELS } from '../data/rugs'
import { formatPrice } from '../lib/format'
import type { RugSize } from '../types'
import { useCart } from '../context/CartContext'
import RugPattern from '../components/RugPattern'
import QuantityStepper from '../components/QuantityStepper'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { id } = useParams()
  const rug = id ? getRug(id) : undefined
  const { add } = useCart()
  const [size, setSize] = useState<RugSize | null>(rug ? rug.sizes[0] : null)
  const [qty, setQty] = useState(1)

  if (!rug) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-32 text-center">
        <h1 className="text-4xl">Rug not found</h1>
        <Link to="/shop" className="btn btn-primary mt-6">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = rugs
    .filter((r) => r.id !== rug.id && (r.color === rug.color || r.style === rug.style))
    .slice(0, 3)

  const details = [
    ['Origin', rug.origin],
    ['Weave', STYLE_LABELS[rug.style]],
    ['Material', rug.material],
    ['Density', rug.knotCount],
    ['Colour', rug.color],
  ]

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <nav className="mb-8 text-sm text-muted">
        <Link to="/" className="hover:text-charcoal">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link to="/shop" className="hover:text-charcoal">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span className="text-charcoal">{rug.name}</span>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Visual */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="aspect-[3/4] overflow-hidden rounded-md shadow-[var(--shadow-lift)]">
            <RugPattern style={rug.style} palette={rug.palette} className="h-full w-full" />
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="eyebrow">{rug.origin}</p>
          <h1 className="mt-2 text-5xl">{rug.name}</h1>
          <p className="mt-4 font-serif text-3xl text-charcoal">{formatPrice(rug.price)}</p>

          <p className="mt-6 leading-relaxed text-muted">{rug.description}</p>

          {/* Size */}
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {rug.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                    size === s
                      ? 'border-charcoal bg-charcoal text-cream'
                      : 'border-line text-ink hover:border-charcoal'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + add */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={setQty} />
            <button
              type="button"
              onClick={() => size && add(rug.id, size, qty)}
              className="btn btn-primary flex-1 sm:flex-none"
            >
              Add to cart — {formatPrice(rug.price * qty)}
            </button>
          </div>

          {/* Details */}
          <dl className="mt-10 divide-y divide-line border-t border-line">
            {details.map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 text-sm">
                <dt className="uppercase tracking-wider text-muted">{k}</dt>
                <dd className="text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Each rug is one of a kind; slight variations in colour and weave are inherent to
            handcraft. White-glove delivery is complimentary on orders over 10 000 DH.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl">You may also like</h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} rug={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
