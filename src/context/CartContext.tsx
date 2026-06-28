import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine, RugSize } from '../types'
import { getRug } from '../data/rugs'

const STORAGE_KEY = 'maison-cart'
export const FREE_SHIPPING_THRESHOLD = 1000
export const SHIPPING_FLAT = 75

type Action =
  | { type: 'add'; rugId: string; size: RugSize; quantity: number }
  | { type: 'remove'; rugId: string; size: RugSize }
  | { type: 'setQty'; rugId: string; size: RugSize; quantity: number }
  | { type: 'clear' }

const sameLine = (l: CartLine, rugId: string, size: RugSize) =>
  l.rugId === rugId && l.size === size

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((l) => sameLine(l, action.rugId, action.size))
      if (existing) {
        return state.map((l) =>
          sameLine(l, action.rugId, action.size)
            ? { ...l, quantity: l.quantity + action.quantity }
            : l,
        )
      }
      return [...state, { rugId: action.rugId, size: action.size, quantity: action.quantity }]
    }
    case 'remove':
      return state.filter((l) => !sameLine(l, action.rugId, action.size))
    case 'setQty':
      return state
        .map((l) =>
          sameLine(l, action.rugId, action.size)
            ? { ...l, quantity: Math.max(1, action.quantity) }
            : l,
        )
        .filter((l) => l.quantity > 0)
    case 'clear':
      return []
    default:
      return state
  }
}

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as CartLine[]) : []
  } catch {
    return []
  }
}

interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (rugId: string, size: RugSize, quantity?: number) => void
  remove: (rugId: string, size: RugSize) => void
  setQty: (rugId: string, size: RugSize, quantity: number) => void
  clear: () => void
  count: number
  subtotal: number
  shipping: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [], load)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0)
    const subtotal = lines.reduce((sum, l) => {
      const rug = getRug(l.rugId)
      return sum + (rug ? rug.price * l.quantity : 0)
    }, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT
    return {
      lines,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (rugId, size, quantity = 1) => {
        dispatch({ type: 'add', rugId, size, quantity })
        setIsOpen(true)
      },
      remove: (rugId, size) => dispatch({ type: 'remove', rugId, size }),
      setQty: (rugId, size, quantity) => dispatch({ type: 'setQty', rugId, size, quantity }),
      clear: () => dispatch({ type: 'clear' }),
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
    }
  }, [lines, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
