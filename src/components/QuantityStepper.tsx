interface Props {
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
}

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-cream">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-charcoal transition-colors hover:bg-sand disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-7 text-center text-sm font-semibold tabular-nums text-charcoal">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-charcoal transition-colors hover:bg-sand disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
