import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getRug } from '../data/rugs'
import { formatPrice } from '../lib/format'
import RugMedia from './RugMedia'
import QuantityStepper from './QuantityStepper'

export default function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, remove } = useCart()

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-[var(--shadow-lift)] transition-transform duration-[400ms] ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl text-charcoal">Your Cart</h2>
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl hover:bg-sand"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link to="/shop" onClick={close} className="btn btn-ghost">
              Browse rugs
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {lines.map((line) => {
                const rug = getRug(line.rugId)
                if (!rug) return null
                return (
                  <div key={`${line.rugId}-${line.size}`} className="flex gap-4">
                    <Link
                      to={`/product/${rug.id}`}
                      onClick={close}
                      className="h-24 w-20 shrink-0 overflow-hidden rounded bg-cream-deep"
                    >
                      <RugMedia rug={rug} fringe={false} className="h-full w-full" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-lg leading-tight text-charcoal">{rug.name}</h3>
                          <p className="text-xs uppercase tracking-wider text-muted">Size {line.size}</p>
                        </div>
                        <p className="font-serif text-charcoal">{formatPrice(rug.price * line.quantity)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
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

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.2em] text-muted">Subtotal</span>
                <span className="font-serif text-xl text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">Shipping &amp; taxes calculated at checkout.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/checkout" onClick={close} className="btn btn-primary w-full">
                  Checkout
                </Link>
                <Link to="/cart" onClick={close} className="btn btn-ghost w-full">
                  View full cart
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
