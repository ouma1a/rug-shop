import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getRug } from '../data/rugs'
import { formatPrice } from '../lib/format'

interface Placed {
  orderId: string
  email: string
  total: string
}

export default function Checkout() {
  const { lines, subtotal, shipping, total, clear } = useCart()
  const [placed, setPlaced] = useState<Placed | null>(null)
  const [email, setEmail] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const orderId = 'MR-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setPlaced({ orderId, email, total: formatPrice(total) })
    clear()
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl text-white">
          ✓
        </div>
        <p className="eyebrow mt-6">Order confirmed</p>
        <h1 className="mt-2 text-4xl">Thank you.</h1>
        <p className="mt-4 text-muted">
          Order <span className="font-semibold text-charcoal">{placed.orderId}</span> is confirmed. A
          receipt is on its way to{' '}
          <span className="font-semibold text-charcoal">{placed.email || 'your inbox'}</span>.
        </p>
        <p className="mt-2 text-muted">
          Total charged: <span className="font-semibold text-charcoal">{placed.total}</span>
        </p>
        <Link to="/shop" className="btn btn-primary mt-8">
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

      <form onSubmit={handleSubmit} className="mt-10 gap-12 lg:grid lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div className="space-y-10">
          <Fieldset legend="Contact">
            <Field label="Email" type="email" required value={email} onChange={setEmail} placeholder="you@example.com" />
          </Fieldset>

          <Fieldset legend="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required placeholder="Oumaima" />
              <Field label="Last name" required placeholder="El Alaoui" />
            </div>
            <Field label="Address" required placeholder="123 Rue des Tisserands" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" required placeholder="Rabat" />
              <Field label="Postal code" required placeholder="10000" />
              <Field label="Country" required placeholder="Morocco" />
            </div>
          </Fieldset>

          <Fieldset legend="Payment">
            <p className="rounded-md border border-dashed border-line bg-cream-deep px-4 py-3 text-sm text-muted">
              This is a demo storefront — no real payment is taken. Click “Place order” to see the
              confirmation flow.
            </p>
            <Field label="Card number" placeholder="4242 4242 4242 4242" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Expiry" placeholder="12 / 28" />
              <Field label="CVC" placeholder="123" />
            </div>
          </Fieldset>
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
          <button type="submit" className="btn btn-primary mt-6 w-full">
            Place order
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
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-md border border-line bg-cream px-4 py-2.5 text-sm text-charcoal transition-colors placeholder:text-muted/60 focus:border-gold focus:outline-none"
      />
    </label>
  )
}
