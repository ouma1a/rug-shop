import { Link } from 'react-router-dom'
import { rugs } from '../data/rugs'
import RugPattern from '../components/RugPattern'
import ProductCard from '../components/ProductCard'

const featured = rugs.filter((r) => r.featured)

export default function Home() {
  const hero = rugs[1] // Tabriz Indigo
  const heroAside = rugs[2] // Beni Ourain Clay

  return (
    <>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 md:grid-cols-2 md:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow">Handwoven · Hand-knotted</p>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Floors worth
            <br />
            <span className="italic text-gold">coming home</span> to.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            A curated collection of rugs knotted by hand in Morocco, Türkiye and Persia. Natural
            wool, vegetable dyes, and patterns refined over generations.
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
            <Stat value="120+" label="Looms sourced" />
            <Stat value="3" label="Weaving regions" />
            <Stat value="∞" label="One of a kind" />
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="aspect-[3/4] overflow-hidden rounded-md shadow-[var(--shadow-lift)]">
            <RugPattern style={hero.style} palette={hero.palette} className="h-full w-full" />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden w-40 overflow-hidden rounded-md border-4 border-cream shadow-[var(--shadow-lift)] sm:block">
            <div className="aspect-[3/4]">
              <RugPattern style={heroAside.style} palette={heroAside.palette} className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-line bg-cream-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 text-center sm:grid-cols-3 sm:px-8">
          <Value title="Free white-glove delivery" sub="On orders over $1,000" />
          <Value title="Natural materials" sub="Wool, silk & vegetable dyes" />
          <Value title="30-day home trial" sub="Live with it before you commit" />
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Curated</p>
            <h2 className="mt-2 text-4xl">Featured pieces</h2>
          </div>
          <Link to="/shop" className="link-underline hidden text-sm font-medium text-charcoal sm:block">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((rug) => (
            <ProductCard key={rug.id} rug={rug} />
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="scroll-mt-24 bg-charcoal text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-md shadow-[var(--shadow-lift)]">
              <RugPattern style={rugs[6].style} palette={rugs[6].palette} fringe={false} className="h-full w-full" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 text-4xl text-cream">From the loom to your living room</h2>
            <p className="mt-5 leading-relaxed text-cream/75">
              Maison began with a simple belief: a rug should carry the hand of the person who made
              it. We work directly with weaving cooperatives, paying fairly and buying slowly — so
              every piece arrives with its own small history.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              No two are identical. The slight irregularities you'll find are not flaws; they're the
              signature of a loom and a pair of hands.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex border-b border-gold pb-1 text-sm font-semibold uppercase tracking-[0.15em] text-gold"
            >
              Explore the collection →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl text-charcoal">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">{label}</p>
    </div>
  )
}

function Value({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <p className="font-serif text-lg text-charcoal">{title}</p>
      <p className="mt-1 text-sm text-muted">{sub}</p>
    </div>
  )
}
