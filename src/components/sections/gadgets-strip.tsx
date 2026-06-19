'use client'

import { Fragment, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { productsByPillar } from '@/data/products'
import { Button, ButtonLink } from '@/components/ui/button'
import { Badge, Eyebrow, MetaChip, PriceChip, TagSticker } from '@/components/ui/badge'
import { cn, formatPLN } from '@/lib/utils'
import { useCart } from '@/store/cart'

/**
 * Gadgets – instead of seven near-identical belt cards, sell ONE belt seven ways:
 * a single large hero detail + a colourway swatch picker that swaps it in place.
 * Repetition becomes "wybierz swój kolor" rather than a monotonous grid.
 */

const COLOR: Record<string, string> = {
  czarny: '#0a0812',
  biały: '#ffffff',
  bialy: '#ffffff',
  szary: '#6f6a7e',
  srebrny: '#c7c2d8',
  zielony: '#4b7a4e',
  granat: '#1b2447',
  niebieski: '#4aa3ff',
}

/** "Pasek Serum - granat/biały" → ["granat","biały"] → two hex stops */
function swatch(name: string): [string, string] {
  const tail = name.split(' - ').pop() ?? name
  const parts = tail.split('/').map((s) => s.trim().toLowerCase())
  const a = COLOR[parts[0]] ?? '#7047d7'
  const b = COLOR[parts[1] ?? parts[0]] ?? a
  return [a, b]
}
const colourway = (name: string) => (name.split(' - ').pop() ?? name).toUpperCase()

export function GadgetsStrip() {
  const belts = productsByPillar('gadzety').filter((p) => /pasek/i.test(p.name))
  const items = belts.length ? belts : productsByPillar('gadzety')
  const [active, setActive] = useState(0)
  const add = useCart((s) => s.add)
  const belt = items[active]

  return (
    <section className="noise-overlay relative overflow-hidden border-y border-ink-300 bg-ink-50">
      <div className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
        {/* header with a clearly-visible link to all gadgets */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <Eyebrow className="mb-2">Akcesoria · Paski</Eyebrow>
            <h2 className="text-graffiti text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-bone">Pasek Serum</h2>
          </div>
          <ButtonLink href="/sklep?kat=gadzety" variant="outline" size="sm">
            wszystkie gadżety <ArrowUpRight size={15} />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* hero */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-[340px] overflow-hidden border-2 border-ink-300 frame-ink">
              <AnimatePresence mode="wait">
                <motion.div
                  key={belt.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={belt.image}
                    alt={belt.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 720px"
                    className={cn('object-cover', !belt.inStock && 'opacity-50 grayscale')}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute left-3 top-3">
                <MetaChip>140 cm · parciany</MetaChip>
              </div>
              {!belt.inStock && (
                <div className="absolute right-3 top-3">
                  <Badge label="WYPRZEDANE" />
                </div>
              )}
              <TagSticker tone="acid" className="absolute bottom-4 left-4 whitespace-nowrap">wyprodukowano w PL</TagSticker>
            </div>
          </div>

          {/* control rail */}
          <div className="flex flex-col justify-center gap-8 lg:col-span-7">
            <div>
              <div className="flex items-baseline justify-between">
                <Eyebrow>{items.length} kolorów</Eyebrow>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-acid-light">{colourway(belt.name)}</span>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/60">
                Jeden pasek, parciany splot z logo Serum i metalowa klamra. Wybierz swój kolor –
                pasuje do każdego dropu z kolekcji.
              </p>

              {/* swatch picker */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {items.map((p, i) => {
                  const [a, b] = swatch(p.name)
                  const isActive = i === active
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={colourway(p.name)}
                      aria-pressed={isActive}
                      className={cn(
                        'relative h-14 w-14 border-2 transition-all',
                        isActive
                          ? 'border-acid shadow-[4px_4px_0_var(--color-shadow)]'
                          : 'border-ink-300 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-shadow)]',
                        !p.inStock && 'opacity-50',
                      )}
                      style={{ background: `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)` }}
                    >
                      {!p.inStock && <span className="absolute inset-0 grid place-items-center text-[10px] text-bone">✕</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* spec + CTA */}
            <div>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {['klamra metalowa', 'regulowany', '140 cm'].map((s) => (
                  <span key={s} className="border border-ink-300 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/45">{s}</span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <PriceChip size="pdp">{formatPLN(belt.price)}</PriceChip>
                <Button
                  variant="violet"
                  size="lg"
                  disabled={!belt.inStock}
                  onClick={() => add({ slug: belt.slug, name: belt.name, price: belt.price, image: belt.image })}
                >
                  {belt.inStock ? 'Dodaj do koszyka' : 'Niedostępny'}
                </Button>
                <ButtonLink href={`/produkt/${belt.slug}`} variant="ghost" size="lg">
                  Zobacz pasek
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* webbing marquee — matches the top TagMarquee: uniform gap, ✦ centered between labels.
          16 = two identical 8-item halves, so translateX(-50%) loops with no gap/jump. */}
      <div className="relative overflow-hidden border-t border-ink-300 py-3">
        <div className="flex w-max items-center gap-8 animate-marquee">
          {Array.from({ length: 16 }).map((_, i) => (
            <Fragment key={i}>
              <span className="text-graffiti text-2xl text-bone/40 md:text-3xl">SERUM GLOBAL</span>
              <span className="text-acid-light" aria-hidden>✦</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
