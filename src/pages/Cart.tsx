import { Link } from 'react-router-dom'
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext'
import { getRug } from '../data/rugs'
import { formatPrice } from '../lib/format'
import RugMedia from '../components/RugMedia'
import QuantityStepper from '../components/QuantityStepper'

export default function Cart() {
  const { lines, subtotal, shipping, total, setQty, remove } = useCart()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:px-8">
        <p className="eyebrow">Your cart</p>
        <h1 className="mt-2 text-5xl">Nothing here yet</h1>
        <p className="mx-auto mt-4 max-w-sm text-muted">
          When you find a rug you love, it'll wait for you here.
        </p>
        <Link to="/shop" className="btn btn-primary mt-8">
          Browse the collection
        </Link>
      </div>
    )
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <h1 className="text-5xl">Your cart</h1>

      <div className="mt-10 gap-12 lg:grid lg:grid-cols-[1fr_340px]">
        {/* Lines */}
        <div className="divide-y divide-line border-y border-line">
          {lines.map((line) => {
            const rug = getRug(line.rugId)
            if (!rug) return null
            return (
              <div key={`${line.rugId}-${line.size}`} className="flex gap-5 py-6">
                <Link
                  to={`/product/${rug.id}`}
                  className="h-32 w-24 shrink-0 overflow-hidden rounded bg-cream-deep"
                >
                  <RugMedia rug={rug} className="h-full w-full" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link to={`/product/${rug.id}`}>
                        <h3 className="font-serif text-2xl leading-tight text-charcoal">{rug.name}</h3>
                      </Link>
                      <p className="mt-1 text-xs uppercase tracking-wider text-muted">{rug.origin}</p>
                      <p className="mt-1 text-sm text-muted">Size {line.size}</p>
                    </div>
                    <p className="font-serif text-xl text-charcoal">
                      {formatPrice(rug.price * line.quantity)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper
                      value={line.quantity}
                      onChange={(q) => setQty(line.rugId, line.size, q)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(line.rugId, line.size)}
                      className="text-xs uppercase tracking-wider text-muted underline-offset-2 hover:text-charcoal hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <aside className="mt-10 h-fit rounded-md border border-line bg-cream-deep p-6 lg:mt-0">
          <h2 className="font-serif text-2xl text-charcoal">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping)} />
            {remaining > 0 && (
              <p className="text-xs text-gold">
                Add {formatPrice(remaining)} more for free white-glove delivery.
              </p>
            )}
            <div className="border-t border-line pt-3">
              <Row label="Total" value={formatPrice(total)} large />
            </div>
          </dl>
          <Link to="/checkout" className="btn btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
          <Link
            to="/shop"
            className="mt-3 block text-center text-sm text-muted hover:text-charcoal"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={large ? 'font-serif text-lg text-charcoal' : 'text-muted'}>{label}</dt>
      <dd className={large ? 'font-serif text-xl text-charcoal' : 'text-charcoal'}>{value}</dd>
    </div>
  )
}
