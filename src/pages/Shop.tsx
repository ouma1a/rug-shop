import { useMemo, useState } from 'react'
import { rugs, STYLE_LABELS, allColors, allStyles, allSizes } from '../data/rugs'
import type { RugSize, RugStyle } from '../types'
import ProductCard from '../components/ProductCard'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'name', label: 'Name: A–Z' },
]

export default function Shop() {
  const [styles, setStyles] = useState<RugStyle[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<RugSize[]>([])
  const [sort, setSort] = useState<SortKey>('featured')

  const toggle = <T,>(list: T[], value: T, setter: (next: T[]) => void) =>
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const clearAll = () => {
    setStyles([])
    setColors([])
    setSizes([])
  }

  const filtered = useMemo(() => {
    const result = rugs.filter(
      (r) =>
        (styles.length === 0 || styles.includes(r.style)) &&
        (colors.length === 0 || colors.includes(r.color)) &&
        (sizes.length === 0 || r.sizes.some((s) => sizes.includes(s))),
    )
    const sorted = [...result]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    }
    return sorted
  }, [styles, colors, sizes, sort])

  const activeCount = styles.length + colors.length + sizes.length

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <header className="border-b border-line pb-8">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-2 text-5xl">All rugs</h1>
        <p className="mt-3 max-w-xl text-muted">
          {rugs.length} handwoven pieces. Filter by weave, colour and size to find the one that fits
          your space.
        </p>
      </header>

      <div className="mt-8 gap-10 lg:grid lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className="mb-8 lg:mb-0">
          <div className="flex items-center justify-between lg:mb-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-charcoal">Filter</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs uppercase tracking-wider text-muted hover:text-charcoal"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>

          <FilterGroup title="Weave">
            {allStyles.map((s) => (
              <CheckRow
                key={s}
                label={STYLE_LABELS[s]}
                checked={styles.includes(s)}
                onChange={() => toggle(styles, s, setStyles)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Colour">
            {allColors.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={colors.includes(c)}
                onChange={() => toggle(colors, c, setColors)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Size">
            {allSizes.map((s) => (
              <CheckRow
                key={s}
                label={s}
                checked={sizes.includes(s)}
                onChange={() => toggle(sizes, s, setSizes)}
              />
            ))}
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted">
              {filtered.length} {filtered.length === 1 ? 'rug' : 'rugs'}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-line bg-cream px-4 py-1.5 text-sm text-charcoal focus:border-gold focus:outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-line py-24 text-center">
              <p className="text-muted">No rugs match those filters.</p>
              <button type="button" onClick={clearAll} className="btn btn-ghost mt-4">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((rug) => (
                <ProductCard key={rug.id} rug={rug} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
          checked ? 'border-gold bg-gold text-white' : 'border-line bg-cream'
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2.5 6.5 5 9l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}
