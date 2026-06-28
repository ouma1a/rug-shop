import { Link } from 'react-router-dom'
import type { Rug } from '../types'
import { STYLE_LABELS } from '../data/rugs'
import { formatPrice } from '../lib/format'
import RugMedia from './RugMedia'

export default function ProductCard({ rug }: { rug: Rug }) {
  return (
    <Link to={`/product/${rug.id}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-cream-deep shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
        <div className="aspect-[3/4] overflow-hidden">
          <RugMedia
            rug={rug}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
          {STYLE_LABELS[rug.style]}
        </span>

        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-charcoal/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-cream px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-charcoal">
            View details
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl leading-tight text-charcoal transition-colors group-hover:text-gold">
            {rug.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted">{rug.origin}</p>
        </div>
        <p className="shrink-0 font-serif text-lg text-charcoal">{formatPrice(rug.price)}</p>
      </div>
    </Link>
  )
}
