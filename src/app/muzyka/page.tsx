import type { Metadata } from 'next'
import Image from 'next/image'
import { Disc3 } from 'lucide-react'
import { productsByPillar } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { Eyebrow, MetaChip, PriceChip, TagSticker } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { formatPLN } from '@/lib/utils'

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

const artistOf = (name: string) => name.split(/[-–—]/)[0].trim()

export default function MusicPage() {
  const all = productsByPillar('muzyka')
  const featured = all.find((p) => p.featured && p.inStock) ?? all[0]

  return (
    <div>
      {/* editorial hero — featured release pulled off the shelf */}
      <header className="noise-overlay relative overflow-hidden border-b border-ink-300 bg-ink-50">
        <div className="relative mx-auto grid max-w-[1340px] grid-cols-1 items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <Eyebrow icon={<Disc3 size={14} />} className="mb-3">winyl · cd · kaseta</Eyebrow>
            <h1 className="text-graffiti text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.88] text-bone">
              Muzyka <span className="text-acid text-glow-acid">z półki</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/70">
              Rap, który gra w tle każdej ściany. Wydania z katalogu Serum i zaprzyjaźnionych ekip —
              Ero, JWP/BC, WENA, Włodi i inni. Format fizyczny, dla kolekcjonerów.
            </p>
            {featured && (
              <div className="mt-7 flex items-center gap-3">
                <PriceChip>{formatPLN(featured.price)}</PriceChip>
                <ButtonLink href={`/produkt/${featured.slug}`} variant="violet" size="md">
                  <Disc3 size={16} /> {artistOf(featured.name)}
                </ButtonLink>
              </div>
            )}
          </div>
          {featured && (
            <div className="relative mx-auto w-full max-w-[420px]">
              <TagSticker tone="acid" className="absolute -top-3 left-4 z-10 whitespace-nowrap">na topie</TagSticker>
              <div className="relative aspect-square -rotate-[1.5deg] overflow-hidden border-2 border-ink-300 frame-ink">
                <Image src={featured.image} alt={featured.name} fill priority sizes="420px" className="object-cover" />
                <div className="absolute left-3 top-3"><MetaChip>{featured.categoryLabel}</MetaChip></div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[1340px] px-4 py-14 lg:px-8">
        {groups.map((g, gi) => {
          const items = all.filter((p) => p.category === g.key)
          if (!items.length) return null
          return (
            <section key={g.key} className="mb-16 last:mb-0">
              <div className="mb-7 flex items-end gap-4">
                <span className="text-graffiti text-stroke-acid text-3xl leading-none md:text-4xl">{String(gi + 1).padStart(2, '0')}</span>
                <h2 className="text-graffiti text-2xl text-bone md:text-3xl">{g.label}</h2>
                <span className="mb-1 h-[2px] flex-1 bg-ink-300" />
                <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{items.length} wydań</span>
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
