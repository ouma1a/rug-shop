import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-serif text-2xl text-charcoal">Maison</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A small studio sourcing handwoven rugs from the looms of Morocco, Türkiye and Persia —
            each one knotted by hand, made to outlast trends.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link to="/shop" className="link-underline hover:text-charcoal">
                All rugs
              </Link>
            </li>
            <li>
              <Link to="/shop" className="link-underline hover:text-charcoal">
                New arrivals
              </Link>
            </li>
            <li>
              <Link to="/cart" className="link-underline hover:text-charcoal">
                Your cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal">Studio</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Care &amp; cleaning</li>
            <li>Shipping &amp; returns</li>
            <li>hello@maisonrugs.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Maison Rugs. A demo storefront.</p>
          <p>Handwoven · Hand-knotted · One of a kind</p>
        </div>
      </div>
    </footer>
  )
}
