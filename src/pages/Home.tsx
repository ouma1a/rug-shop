import { Link } from 'react-router-dom'
import { rugs, allStyles, STYLE_LABELS } from '../data/rugs'
import { WHATSAPP_NUMBER } from '../lib/shop'
import RugPattern from '../components/RugPattern'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'

const featured = rugs.filter((r) => r.featured)

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello Maison! I'd love some help choosing a rug.",
)}`

const styleSamples = allStyles.map((style) => ({
  style,
  rug: rugs.find((r) => r.style === style)!,
}))

const testimonials = [
  {
    quote: 'The craftsmanship is breathtaking. It feels like a piece of art we get to walk on every day.',
    name: 'Camille R.',
    place: 'Paris, France',
  },
  {
    quote: 'Shipped all the way to Montréal and arrived perfectly. The colours are even richer in person.',
    name: 'Noah B.',
    place: 'Montréal, Canada',
  },
  {
    quote: 'You can feel the love in every knot. Maison helped me choose the perfect size over WhatsApp.',
    name: 'Layla M.',
    place: 'Dubai, UAE',
  },
]

export default function Home() {
  const hero = rugs[1] // Tabriz Indigo
  const heroAside = rugs[2] // Beni Ourain Clay

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -left-16 top-10 h-72 w-72 animate-drift rounded-full bg-gold-soft/25 blur-3xl" />
          <span className="absolute right-0 top-1/3 h-80 w-80 animate-drift rounded-full bg-sand/50 blur-3xl" style={{ animationDelay: '-6s' }} />
          <span className="absolute bottom-0 left-1/3 h-64 w-64 animate-drift rounded-full bg-gold/10 blur-3xl" style={{ animationDelay: '-11s' }} />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 md:grid-cols-2 md:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow">Handmade with love · Morocco</p>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Floors worth
            <br />
            <span className="italic text-gold">coming home</span> to.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Rugs knotted entirely by hand in Morocco — natural wool, vegetable dyes, and patterns
            refined over generations. Made with love in our studio and shipped worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-primary">
              Shop the collection
            </Link>
            <Link to="/#story" className="btn btn-ghost">
              Our story
            </Link>
          </div>
          <div className="mt-10 flex gap-8 border-t border-line pt-6">
            <Stat>
              <span className="font-serif text-3xl text-charcoal">
                <CountUp end={100} suffix="%" />
              </span>
              <Label>Handmade</Label>
            </Stat>
            <Stat>
              <span className="font-serif text-3xl text-charcoal">
                <CountUp end={3} />
              </span>
              <Label>Weaving regions</Label>
            </Stat>
            <Stat>
              <span className="font-serif text-3xl text-charcoal">∞</span>
              <Label>One of a kind</Label>
            </Stat>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="aspect-[3/4] overflow-hidden rounded-md shadow-[var(--shadow-lift)]">
            <RugPattern style={hero.style} palette={hero.palette} className="h-full w-full" />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden w-40 animate-float overflow-hidden rounded-md border-4 border-cream shadow-[var(--shadow-lift)] sm:block">
            <div className="aspect-[3/4]">
              <RugPattern style={heroAside.style} palette={heroAside.palette} className="h-full w-full" />
            </div>
          </div>
          <span className="absolute -right-3 top-6 rotate-3 rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[var(--shadow-soft)]">
            Made with love ♥
          </span>
        </div>
        </div>
        <div className="flex flex-col items-center gap-1 pb-8 text-muted">
          <span className="text-[0.62rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="animate-float text-lg">↓</span>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 text-center sm:grid-cols-3 sm:px-8">
          <Value title="100% handmade" sub="Every knot tied by hand" />
          <Value title="Ships worldwide" sub="From our studio in Morocco" />
          <Value title="Free white-glove delivery" sub="On orders over 10 000 DH" />
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Curated</p>
            <h2 className="mt-2 text-4xl">Featured pieces</h2>
          </div>
          <Link to="/shop" className="link-underline hidden text-sm font-medium text-charcoal sm:block">
            View all →
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((rug, i) => (
            <Reveal key={rug.id} delay={i * 90}>
              <ProductCard rug={rug} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHOP BY STYLE */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="text-center">
            <p className="eyebrow">Lookbook</p>
            <h2 className="mt-2 text-4xl">Shop by weave</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Five traditions, one obsession with detail. Find the language that speaks to your home.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-5">
            {styleSamples.map((s, i) => (
              <Reveal key={s.style} delay={i * 80}>
                <Link to="/shop" className="group block text-center">
                  <div className="aspect-square overflow-hidden rounded-md shadow-[var(--shadow-soft)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-lift)]">
                    <RugPattern
                      style={s.style}
                      palette={s.rug.palette}
                      fringe={false}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-3 font-serif text-lg text-charcoal transition-colors group-hover:text-gold">
                    {STYLE_LABELS[s.style]}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MADE WITH LOVE — features */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Maison</p>
            <h2 className="mt-2 text-4xl">Slow craft, made to be loved</h2>
            <p className="mt-4 text-muted">
              No machines, no shortcuts — just wool, dye, and the patient hands of the artisans who
              weave each piece.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-gold shadow-[var(--shadow-soft)]">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-charcoal">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="scroll-mt-24 bg-charcoal text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-md shadow-[var(--shadow-lift)]">
              <RugPattern style={rugs[6].style} palette={rugs[6].palette} fringe={false} className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2" delay={120}>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-4xl text-cream">Handmade with love, shipped worldwide</h2>
            <p className="mt-5 leading-relaxed text-cream/75">
              Maison began with a simple belief: a rug should carry the hand of the person who made
              it. We work directly with weaving cooperatives across Morocco, paying fairly and buying
              slowly — so every piece arrives with its own small history.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              We're based in Morocco, but we ship everywhere. No two rugs are identical; the gentle
              irregularities you'll find aren't flaws — they're the signature of a loom and a pair of
              hands.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex border-b border-gold pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-gold"
            >
              Explore the collection →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow">Loved worldwide</p>
          <h2 className="mt-2 text-4xl">From homes around the world</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-md border border-line bg-cream p-7 shadow-[var(--shadow-soft)]">
                <div className="text-gold" aria-hidden>
                  ★★★★★
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-charcoal">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  <span className="font-semibold text-charcoal">{t.name}</span> · {t.place}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal className="overflow-hidden rounded-lg border border-line bg-cream-deep px-8 py-12 text-center">
          <h2 className="text-4xl">Not sure which rug is right?</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Tell us about your space and we'll help you choose — and arrange worldwide delivery.
            We're a message away.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-7 bg-[#25D366] text-white hover:opacity-90"
          >
            Chat with us on WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  )
}

const features = [
  { title: 'Knotted by hand', text: 'Each rug is woven on a traditional loom — never machine-made.', icon: <HandIcon /> },
  { title: 'Made with love', text: 'Crafted slowly by artisans who take pride in every row.', icon: <HeartIcon /> },
  { title: 'Natural materials', text: 'Pure wool coloured with plant-based, vegetable dyes.', icon: <LeafIcon /> },
  { title: 'Shipped worldwide', text: 'From our studio in Morocco to your door, wherever you are.', icon: <GlobeIcon /> },
]

function Stat({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
function Label({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">{children}</p>
}
function Value({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <p className="font-serif text-lg text-charcoal">{title}</p>
      <p className="mt-1 text-sm text-muted">{sub}</p>
    </div>
  )
}

function HandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 11V6.5a1.5 1.5 0 0 1 3 0V13" />
      <path d="M17 8.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.2-1.7L4 14.5a1.5 1.5 0 0 1 2.1-2.1L8 14" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7.5-4.6-10-9.2C.6 9 1.7 5.5 5 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.3 0 4.4 3.5 3 6.3C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}
function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 8-5 13-9 13a4 4 0 0 1-4-4" />
      <path d="M8 17c2-4 5-6 9-7" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
    </svg>
  )
}
