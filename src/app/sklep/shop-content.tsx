'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { X } from 'lucide-react'
import { products } from '@/data/products'
import { shopFilters } from '@/data/nav'
import { ProductCard } from '@/components/shop/product-card'
import { Eyebrow } from '@/components/ui/badge'

type Sort = 'new' | 'price-asc' | 'price-desc'

const shopPool = products.filter((p) => p.pillar === 'ubrania' || p.pillar === 'gadzety')

export function ShopContent() {
  const params = useSearchParams()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState<Sort>('new')
  const collection = params.get('kolekcja') // e.g. "eros-one" — a named drop, not a category

  useEffect(() => {
    const kat = params.get('kat')
    if (kat && shopFilters.some((f) => f.key === kat)) setFilter(kat)
  }, [params])

  const list = useMemo(() => {
    let out = shopPool.filter((p) => {
      // a named collection (from the hero drop sticker) cuts across categories
      if (collection === 'eros-one') return /eros\s*one/i.test(p.name) || p.newCollection
      if (filter === 'all') return true
      if (filter === 'gadzety') return p.pillar === 'gadzety'
      return p.category === filter
    })
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price)
    else out = [...out].sort((a, b) => Number(b.newCollection) - Number(a.newCollection))
    return out
  }, [filter, sort, collection])

  return (
    <div>
      {/* page header */}
      <header className="relative overflow-hidden border-b border-ink-300 bg-ink-50">
        <div className="relative mx-auto max-w-[1340px] px-4 py-14 lg:px-8 lg:py-16">
          {collection === 'eros-one' ? (
            <>
              <Eyebrow className="mb-2">Kolekcja · drop ’26</Eyebrow>
              <h1 className="text-graffiti text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] text-bone">
                Eros One <span className="text-acid text-glow-acid">’26</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/65">
                Najnowszy drop Serum Global — bluzy, t-shirty i szorty z autorskimi nadrukami.
                Cała kolekcja w jednym miejscu.
              </p>
            </>
          ) : (
            <>
              <Eyebrow className="mb-2">sklep</Eyebrow>
              <h1 className="text-graffiti text-[clamp(2.4rem,7vw,5rem)] leading-[0.9] text-bone">Ubrania &amp; gadżety</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/65">
                Cała kolekcja Serum Global, bluzy, t-shirty, spodnie, czapki i akcesoria.
                Autorskie nadruki, ciężkie materiały, krój sprawdzony na ulicy.
              </p>
            </>
          )}
        </div>
      </header>

      {/* controls */}
      <div className="sticky top-[60px] z-30 border-b border-ink-300 bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1340px] flex-wrap items-center gap-2 px-4 py-3 lg:px-8">
          {collection === 'eros-one' ? (
            <Link
              href="/sklep"
              className="chip-toggle is-active inline-flex items-center gap-2 px-3 py-1.5 text-xs tracking-[0.12em]"
            >
              Eros One ’26 <X size={13} />
            </Link>
          ) : (
            <div className="flex flex-wrap gap-2">
              {shopFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className="chip-toggle px-3 py-1.5 text-xs tracking-[0.12em]"
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40 sm:inline">
              {list.length} szt.
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-ink-300 bg-ink px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-bone/70 outline-none focus:border-acid"
            >
              <option value="new">Najnowsze</option>
              <option value="price-asc">Cena ↑</option>
              <option value="price-desc">Cena ↓</option>
            </select>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="mx-auto max-w-[1340px] px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center font-mono text-sm uppercase tracking-[0.2em] text-bone/40">
            brak produktów w tej kategorii
          </p>
        )}
      </div>
    </div>
  )
}
