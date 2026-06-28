import { Link } from 'react-router-dom'
import type { Rug } from '../types'
import { STYLE_LABELS } from '../data/rugs'
import { formatPrice } from '../lib/format'
import RugPattern from './RugPattern'

export default function ProductCard({ rug }: { rug: Rug }) {
  return (
    <Link to={`/product/${rug.id}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-cream-deep shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:shadow-[var(--shadow-lift)]">
        <div className="aspect-[3/4] overflow-hidden">
          <RugPattern
            style={rug.style}
            palette={rug.palette}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
          {STYLE_LABELS[rug.style]}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-serif text-xl leading-tight text-charcoal">{rug.name}</h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted">{rug.origin}</p>
        </div>
        <p className="shrink-0 font-serif text-lg text-charcoal">{formatPrice(rug.price)}</p>
      </div>
    </Link>
  )
}
