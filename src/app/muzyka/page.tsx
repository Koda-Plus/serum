import type { Metadata } from 'next'
import { Disc3 } from 'lucide-react'
import { productsByPillar } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { Splatter } from '@/components/brand/splatter'

export const metadata: Metadata = {
  title: 'Muzyka, winyl, CD, kaseta',
  description: 'Rap z katalogu Serum: Ero, JWP/BC, WENA, Włodi i inni. Winyle, płyty CD i kasety.',
}

const groups: { key: string; label: string }[] = [
  { key: 'winyl', label: 'Winyl' },
  { key: 'cd', label: 'CD' },
  { key: 'kaseta', label: 'Kaseta' },
  { key: 'album', label: 'Inne' },
]

export default function MusicPage() {
  const all = productsByPillar('muzyka')

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink-300 bg-ink-50">
        <Splatter className="left-[-40px] top-[-30px] w-[280px]" opacity={0.26} rotate={-20} />
        <div className="relative mx-auto max-w-[1340px] px-4 py-14 lg:px-8 lg:py-16">
          <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
            <Disc3 size={14} /> winyl / cd / kaseta
          </div>
          <h1 className="text-graffiti text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] text-bone">Muzyka</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/65">
            Rap, który gra w tle każdej ściany. Wydania z katalogu Serum i zaprzyjaźnionych ekip -
            Ero, JWP/BC, WENA, Włodi i inni. Format fizyczny, dla kolekcjonerów.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1340px] px-4 py-14 lg:px-8">
        {groups.map((g) => {
          const items = all.filter((p) => p.category === g.key)
          if (!items.length) return null
          return (
            <section key={g.key} className="mb-16 last:mb-0">
              <div className="mb-7 flex items-center gap-4">
                <h2 className="text-graffiti text-2xl text-bone md:text-3xl">{g.label}</h2>
                <span className="h-[2px] flex-1 bg-ink-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{items.length} szt.</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
