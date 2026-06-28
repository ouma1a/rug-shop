import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getRug } from '../data/rugs'
import { formatPrice } from '../lib/format'
import { buildWhatsAppUrl } from '../lib/shop'

interface Placed {
  orderId: string
  total: string
  whatsappUrl: string
}

const empty = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  country: 'Morocco',
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clear } = useCart()
  const [placed, setPlaced] = useState<Placed | null>(null)
  const [form, setForm] = useState(empty)

  const set = (key: keyof typeof empty) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const orderId = 'MR-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    const whatsappUrl = buildWhatsAppUrl({
      orderId,
      ...form,
      lines,
      subtotal,
      shipping,
      total,
    })

    // Open WhatsApp with the order pre-filled, then show the confirmation screen.
    window.open(whatsappUrl, '_blank', 'noopener')
    setPlaced({ orderId, total: formatPrice(total), whatsappUrl })
    clear()
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white">
          <WhatsAppIcon />
        </div>
        <p className="eyebrow mt-6">Almost there</p>
        <h1 className="mt-2 text-4xl">Confirm on WhatsApp</h1>
        <p className="mt-4 text-muted">
          We've opened WhatsApp with order{' '}
          <span className="font-semibold text-charcoal">{placed.orderId}</span> ready to send. Just
          press send and we'll reply to arrange delivery and payment.
        </p>
        <p className="mt-2 text-muted">
          Order total: <span className="font-semibold text-charcoal">{placed.total}</span>
        </p>
        <a
          href={placed.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-8 bg-[#25D366] text-white hover:opacity-90"
        >
          <WhatsAppIcon /> Open WhatsApp again
        </a>
        <Link to="/shop" className="mt-3 block text-sm text-muted hover:text-charcoal">
          Continue shopping
        </Link>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:px-8">
        <h1 className="text-4xl">Your cart is empty</h1>
        <Link to="/shop" className="btn btn-primary mt-6">
          Browse rugs
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <h1 className="text-5xl">Checkout</h1>
      <p className="mt-3 max-w-xl text-muted">
        No online payment needed. Fill in your details and confirm your order on WhatsApp — we'll
        reply to arrange delivery and payment personally.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 gap-12 lg:grid lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="space-y-10">
          <Fieldset legend="Your details">
            <Field label="Full name" required value={form.name} onChange={set('name')} placeholder="Oumaima El Alaoui" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="WhatsApp / phone"
                type="tel"
                required
                value={form.phone}
                onChange={set('phone')}
                placeholder="+212 6 12 34 56 78"
              />
              <Field
                label="Email (optional)"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@example.com"
              />
            </div>
          </Fieldset>

          <Fieldset legend="Delivery address">
            <Field label="Address" required value={form.address} onChange={set('address')} placeholder="123 Rue des Tisserands" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required value={form.city} onChange={set('city')} placeholder="Rabat" />
              <Field label="Postal code" required value={form.postal} onChange={set('postal')} placeholder="10000" />
              <Field label="Country" required value={form.country} onChange={set('country')} placeholder="Morocco" />
            </div>
          </Fieldset>

          <p className="flex items-start gap-3 rounded-md border border-dashed border-line bg-cream-deep px-4 py-3 text-sm text-muted">
            <span className="mt-0.5 text-[#25D366]">
              <WhatsAppIcon />
            </span>
            Pressing “Confirm” opens WhatsApp with your full order pre-written. Nothing is charged
            here — payment is arranged directly with us.
          </p>
        </div>

        {/* Summary */}
        <aside className="mt-10 h-fit rounded-md border border-line bg-cream-deep p-6 lg:mt-0">
          <h2 className="font-serif text-2xl text-charcoal">Your order</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((line) => {
              const rug = getRug(line.rugId)
              if (!rug) return null
              return (
                <li key={`${line.rugId}-${line.size}`} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink">
                    {rug.name}
                    <span className="text-muted">
                      {' '}
                      · {line.size} × {line.quantity}
                    </span>
                  </span>
                  <span className="shrink-0 text-charcoal">{formatPrice(rug.price * line.quantity)}</span>
                </li>
              )
            })}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-charcoal">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="text-charcoal">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-2">
              <dt className="font-serif text-lg text-charcoal">Total</dt>
              <dd className="font-serif text-xl text-charcoal">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="btn mt-6 w-full bg-[#25D366] text-white hover:opacity-90"
          >
            <WhatsAppIcon /> Confirm on WhatsApp
          </button>
        </aside>
      </form>
    </div>
  )
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

function Field({
  label,
  type = 'text',
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string
  type?: string
  required?: boolean
  placeholder?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-cream px-4 py-2.5 text-sm text-charcoal transition-colors placeholder:text-muted/60 focus:border-gold focus:outline-none"
      />
    </label>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.57-.34zM12.05 21.5h-.01a9.5 9.5 0 0 1-4.84-1.32l-.35-.21-3.6.94.96-3.5-.22-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.45 9.45 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.52 9.5zM20.5 3.5A11.42 11.42 0 0 0 12.05.04C5.76.04.66 5.14.66 11.42c0 2 .53 3.96 1.53 5.69L.5 23.5l6.55-1.72a11.36 11.36 0 0 0 5 1.27h.01c6.28 0 11.38-5.1 11.39-11.38a11.32 11.32 0 0 0-2.95-7.67z" />
    </svg>
  )
}
