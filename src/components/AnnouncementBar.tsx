const messages = [
  'Handmade with love in Morocco',
  'Worldwide shipping',
  'One-of-a-kind, hand-knotted',
  'Natural wool & vegetable dyes',
]

export default function AnnouncementBar() {
  // Duplicated so the marquee can loop seamlessly (animation translates by -50%).
  const row = [...messages, ...messages]
  return (
    <div className="overflow-hidden bg-charcoal py-2.5 text-cream">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap pr-12">
        {row.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.25em]"
          >
            <span className="text-gold">✦</span>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
