import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fades + slides its children up the first time they scroll into view. */
export default function Reveal({ children, delay = 0, className = '' }: Props) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
