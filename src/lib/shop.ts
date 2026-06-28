import type { CartLine } from '../types'
import { getRug } from '../data/rugs'
import { formatPrice } from './format'

/**
 * Shop owner's WhatsApp number in international format — digits only, no '+', spaces or dashes.
 * Moroccan numbers use country code 212 (e.g. 2126XXXXXXXX). Replace with the real number.
 */
export const WHATSAPP_NUMBER = '21270870869'

export interface OrderDetails {
  orderId: string
  name: string
  phone: string
  email: string
  address: string
  city: string
  postal: string
  country: string
  lines: CartLine[]
  subtotal: number
  shipping: number
  total: number
}

/** Builds a wa.me link that opens WhatsApp with the whole order pre-filled as a message. */
export function buildWhatsAppUrl(o: OrderDetails): string {
  const items = o.lines
    .map((l) => {
      const rug = getRug(l.rugId)
      return rug
        ? `• ${rug.name} (${l.size}) ×${l.quantity} — ${formatPrice(rug.price * l.quantity)}`
        : ''
    })
    .filter(Boolean)
    .join('\n')

  const message = [
    `Hello Zinelle! I'd like to confirm my order ${o.orderId}.`,
    '',
    '*Items*',
    items,
    '',
    `Subtotal: ${formatPrice(o.subtotal)}`,
    `Shipping: ${o.shipping === 0 ? 'Free' : formatPrice(o.shipping)}`,
    `*Total: ${formatPrice(o.total)}*`,
    '',
    '*Deliver to*',
    o.name,
    o.phone,
    o.email ? o.email : null,
    `${o.address}, ${o.city} ${o.postal}, ${o.country}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
