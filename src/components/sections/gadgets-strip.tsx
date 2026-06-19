'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { products, type Product } from '@/data/products'
import { Button, ButtonLink } from '@/components/ui/button'
import { Badge, Eyebrow, MetaChip, PriceChip, TagSticker } from '@/components/ui/badge'
import { cn, formatPLN } from '@/lib/utils'
import { useCart } from '@/store/cart'

/**
 * Akcesoria – two parallel "pick one" pickers instead of a flat grid:
 *   · PASEK  – one belt, swap the colourway swatch in place
 *   · CZAPKA – summer caps (5-panel / snapback), swap the model in place
 * Same interaction language on both, so the section sells the breadth of the
 * range (not just belts) while staying compact.
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
function beltSwatch(name: string): [string, string] {
  const tail = name.split(' - ').pop() ?? name
  const parts = tail.split('/').map((s) => s.trim().toLowerCase())
  const a = COLOR[parts[0]] ?? '#7047d7'
  const b = COLOR[parts[1] ?? parts[0]] ?? a
  return [a, b]
}
/** the trailing variant label, e.g. "granat/biały" or "logo środek" */
const variantLabel = (name: string) => (name.split(' - ').pop() ?? name).toUpperCase()
const capType = (name: string) => (/5panel/i.test(name) ? '5-PANEL' : /snap/i.test(name) ? 'SNAPBACK' : 'CZAPKA')

/** in-stock items first, so the default selection is always buyable */
const inStockFirst = (a: Product, b: Product) => Number(b.inStock) - Number(a.inStock)

export function GadgetsStrip() {
  const belts = products.filter((p) => p.pillar === 'gadzety' && /pasek/i.test(p.name)).sort(inStockFirst)
  const caps = products.filter((p) => p.category === 'czapki' && !/zimowa/i.test(p.name)).sort(inStockFirst)

  return (
    <section className="noise-overlay relative overflow-hidden border-y border-ink-300 bg-ink-50">
      <div className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
        {/* header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <Eyebrow className="mb-2">Akcesoria · Lato ’26</Eyebrow>
            <h2 className="text-graffiti text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-bone">Dorzuć do dropu</h2>
          </div>
          <ButtonLink href="/sklep" variant="outline" size="sm">
            cały sklep <ArrowUpRight size={15} />
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Picker
            items={belts}
            kicker="Paski · wybierz kolor"
            title="Pasek Serum"
            blurb="Jeden pasek, parciany splot z logo Serum i metalowa klamra. Wybierz swój kolor – pasuje do każdego dropu."
            blurbTag="wyprodukowano w PL"
            topChip={() => '140 cm · parciany'}
            specs={['klamra metalowa', 'regulowany', '140 cm']}
            swatchType="color"
            ctaLabel="Zobacz pasek"
          />
          <Picker
            items={caps}
            kicker="Czapki · na lato"
            title="Czapka Serum"
            blurb="Lekka czapka na upały – 5-panel i snapback z haftem Serum Global. Wybierz model i bierzesz prosto z ulicy."
            blurbTag="na lato"
            topChip={(p) => capType(p.name)}
            specs={['uniwersalny', 'haft logo', 'PL']}
            swatchType="image"
            ctaLabel="Zobacz czapkę"
          />
        </div>
      </div>
    </section>
  )
}

function Picker({
  items,
  kicker,
  title,
  blurb,
  blurbTag,
  topChip,
  specs,
  swatchType,
  ctaLabel,
}: {
  items: Product[]
  kicker: string
  title: string
  blurb: string
  blurbTag: string
  topChip: (p: Product) => string
  specs: string[]
  swatchType: 'color' | 'image'
  ctaLabel: string
}) {
  const [active, setActive] = useState(0)
  const add = useCart((s) => s.add)
  const item = items[active]
  if (!item) return null

  return (
    <div className="flex h-full flex-col overflow-hidden border-2 border-ink-300 bg-ink/40 frame-ink">
      {/* hero image */}
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink-300 bg-ink-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width:1024px) 100vw, 640px"
              className={cn('object-cover', !item.inStock && 'opacity-50 grayscale')}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-3 top-3">
          <MetaChip>{topChip(item)}</MetaChip>
        </div>
        {!item.inStock && (
          <div className="absolute right-3 top-3">
            <Badge label="WYPRZEDANE" />
          </div>
        )}
        <TagSticker tone="acid" className="absolute bottom-4 left-4 whitespace-nowrap">
          {blurbTag}
        </TagSticker>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <Eyebrow className="mb-2">{kicker}</Eyebrow>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-graffiti text-2xl leading-none text-bone md:text-3xl">{title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-acid-light">{variantLabel(item.name)}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-bone/60">{blurb}</p>

        {/* picker */}
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">{items.length} {swatchType === 'color' ? 'kolorów' : 'modele'}</span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2.5">
          {items.map((p, i) => {
            const isActive = i === active
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActive(i)}
                aria-label={variantLabel(p.name)}
                aria-pressed={isActive}
                className={cn(
                  'relative h-14 w-14 overflow-hidden border-2 transition-all',
                  isActive
                    ? 'border-acid shadow-[4px_4px_0_var(--color-shadow)]'
                    : 'border-ink-300 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-shadow)]',
                  !p.inStock && 'opacity-50',
                )}
                style={swatchType === 'color' ? colorStyle(p.name) : undefined}
              >
                {swatchType === 'image' && (
                  <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                )}
                {!p.inStock && (
                  <span className="absolute inset-0 grid place-items-center bg-ink/40 text-[10px] text-bone">✕</span>
                )}
              </button>
            )
          })}
        </div>

        {/* spec + CTA */}
        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {specs.map((s) => (
              <span key={s} className="border border-ink-300 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/45">{s}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PriceChip size="pdp">{formatPLN(item.price)}</PriceChip>
            <Button
              variant="violet"
              size="md"
              disabled={!item.inStock}
              onClick={() => add({ slug: item.slug, name: item.name, price: item.price, image: item.image })}
            >
              {item.inStock ? 'Dodaj do koszyka' : 'Niedostępne'}
            </Button>
            <ButtonLink href={`/produkt/${item.slug}`} variant="ghost" size="md">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

function colorStyle(name: string) {
  const [a, b] = beltSwatch(name)
  return { background: `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)` }
}
