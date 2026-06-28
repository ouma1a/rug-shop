import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Props {
  end: number
  suffix?: string
  duration?: number
}

/** Counts from 0 to `end` once it scrolls into view. */
export default function CountUp({ end, suffix = '', duration = 1500 }: Props) {
  const { ref, visible } = useReveal<HTMLSpanElement>()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!visible) return
    let raf = 0
    let startTs = 0
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const progress = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [visible, end, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
