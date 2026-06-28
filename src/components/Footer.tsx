import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../lib/shop'

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello Zinelle! I have a question about your rugs.',
)}`

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-serif text-2xl text-charcoal">Zinelle</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A small studio of rugs handwoven in Morocco — each one knotted by hand and made with
            love, then shipped with care to homes all over the world.
          </p>
          <p className="mt-4 text-sm font-medium text-charcoal">Handmade with love ♥ · Ships worldwide</p>
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
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-charcoal">
                Chat on WhatsApp
              </a>
            </li>
            <li>Based in Morocco</li>
            <li>hello@zinelle.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Zinelle Rugs. A demo storefront.</p>
          <p>Handwoven · Hand-knotted · One of a kind</p>
        </div>
      </div>
    </footer>
  )
}
