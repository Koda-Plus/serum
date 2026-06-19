'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Disc3, ChevronLeft, ChevronRight } from 'lucide-react'
import { productsByPillar, type Product } from '@/data/products'
import { SectionHeading } from '@/components/sections/section-heading'
import { ButtonLink } from '@/components/ui/button'
import { Badge, MetaChip, PriceChip, TagSticker } from '@/components/ui/badge'
import { formatPLN, cn } from '@/lib/utils'

/**
 * "Muzyka z półki" – a record crate you dig through, not a tidy cover grid.
 * One large "pulled" sleeve features on the left (with a vinyl disc peeking out);
 * the rest of the catalogue leans/overlaps in a horizontal crate you flick.
 */

const FORMATS = [
  { key: 'all', label: 'Wszystko' },
  { key: 'winyl', label: 'Winyl' },
  { key: 'cd', label: 'CD' },
  { key: 'kaseta', label: 'Kaseta' },
] as const

const fmtLabel = (cat: string) => (cat === 'kaseta' ? 'KASETA' : cat === 'cd' ? 'CD' : cat === 'winyl' ? 'WINYL' : 'ALBUM')
const artistOf = (name: string) => name.split(/[-––]/)[0].trim()

export function MusicStrip() {
  const all = useMemo(() => productsByPillar('muzyka').slice(0, 14), [])
  const [format, setFormat] = useState<string>('all')
  const [featuredSlug, setFeaturedSlug] = useState(all[0]?.slug)

  const crate = useMemo(
    () => (format === 'all' ? all : all.filter((p) => p.category === format)),
    [all, format],
  )
  const featured = all.find((p) => p.slug === featuredSlug) ?? all[0]

  // hover the left/right edge to scroll the crate; speed ramps the longer you hold
  const railRef = useRef<HTMLDivElement>(null)
  const dirRef = useRef(0)
  const rafRef = useRef(0)
  const speedRef = useRef(0)
  const startScroll = (dir: number) => {
    dirRef.current = dir
    speedRef.current = 5
    cancelAnimationFrame(rafRef.current)
    const step = () => {
      if (!railRef.current || !dirRef.current) return
      speedRef.current = Math.min(30, speedRef.current + 0.5)
      railRef.current.scrollLeft += dirRef.current * speedRef.current
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }
  const stopScroll = () => {
    dirRef.current = 0
    cancelAnimationFrame(rafRef.current)
  }
  const step = (dir: number) => railRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' })
  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <section className="noise-overlay relative overflow-hidden border-y border-ink-300 bg-ink-50">
      <div className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Winyl · CD · Kaseta" title="Muzyka z półki" href="/muzyka" linkLabel="cała muzyka" className="mb-0 flex-1" />
        </div>

        {/* format filter */}
        <div className="mb-8 mt-6 flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFormat(f.key)}
              aria-pressed={format === f.key}
              className="chip-toggle px-3 py-1.5 text-xs tracking-[0.12em]"
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* featured "pulled" sleeve */}
          {featured && (
            <div className="lg:col-span-5">
              <div className="group relative">
                {/* vinyl disc peeking out the right edge */}
                <div className="absolute right-2 top-1/2 hidden aspect-square w-[78%] -translate-y-1/2 translate-x-0 rounded-full bg-[radial-gradient(circle,#1c1730_0%,#0a0812_62%,#08060f_63%)] transition-transform duration-500 group-hover:translate-x-[26%] sm:block">
                  <div className="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/80" />
                </div>
                <Link
                  href={`/produkt/${featured.slug}`}
                  className="relative block aspect-square -rotate-[1.5deg] overflow-hidden border-2 border-ink-300 frame-ink transition-transform duration-300 group-hover:rotate-0"
                >
                  <Image src={featured.image} alt={featured.name} fill sizes="(max-width:1024px) 100vw, 420px" className={cn('object-cover', !featured.inStock && 'opacity-50 grayscale')} />
                  <div className="absolute left-3 top-3"><MetaChip>{fmtLabel(featured.category)}</MetaChip></div>
                  {featured.badge && <span className="absolute right-3 top-3"><Badge label={featured.badge} /></span>}
                </Link>
                <TagSticker tone="acid" className="absolute -top-3 left-4 z-10 whitespace-nowrap">teraz na gramofonie</TagSticker>
              </div>

              <div className="mt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-acid-light">{artistOf(featured.name)}</div>
                <h3 className="text-graffiti mt-1 text-2xl leading-tight text-bone md:text-3xl">{featured.name}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <PriceChip size="pdp">{formatPLN(featured.price)}</PriceChip>
                  <ButtonLink href={`/produkt/${featured.slug}`} variant="violet" size="md">
                    <Disc3 size={16} /> Zobacz wydanie
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}

          {/* the crate – flick through it */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40">
              <span>przesuń – dig the crate</span>
              <span>{crate.length} wydań</span>
            </div>
            <div className="relative">
              <div ref={railRef} className="flex gap-0 overflow-x-auto pb-4 pl-9 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {crate.map((p, i) => (
                  <CrateSleeve key={p.slug} product={p} index={i} active={p.slug === featuredSlug} onPick={() => setFeaturedSlug(p.slug)} />
                ))}
              </div>
              {/* edge zones: click to step, hold (hover) to glide – speed ramps */}
              <button
                type="button"
                aria-label="Przewiń w lewo"
                onClick={() => step(-1)}
                onMouseEnter={() => startScroll(-1)}
                onMouseLeave={stopScroll}
                className="group/edge absolute inset-y-0 left-0 z-20 flex w-16 cursor-pointer items-center justify-start bg-gradient-to-r from-ink-50 via-ink-50/85 to-transparent pl-1"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-ink-300 bg-ink/80 text-bone/70 transition-colors group-hover/edge:border-acid group-hover/edge:text-acid-light">
                  <ChevronLeft size={20} />
                </span>
              </button>
              <button
                type="button"
                aria-label="Przewiń w prawo"
                onClick={() => step(1)}
                onMouseEnter={() => startScroll(1)}
                onMouseLeave={stopScroll}
                className="group/edge absolute inset-y-0 right-0 z-20 flex w-16 cursor-pointer items-center justify-end bg-gradient-to-l from-ink-50 via-ink-50/85 to-transparent pr-1"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-ink-300 bg-ink/80 text-bone/70 transition-colors group-hover/edge:border-acid group-hover/edge:text-acid-light">
                  <ChevronRight size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CrateSleeve({ product, index, active, onPick }: { product: Product; index: number; active: boolean; onPick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onPick}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      aria-label={`Pokaż ${product.name}`}
      className={cn(
        'group/sl relative -ml-14 aspect-square w-[300px] shrink-0 overflow-hidden border-2 bg-ink-100 shadow-[6px_6px_0_var(--color-shadow)] transition-all duration-300 first:ml-0 hover:z-20 hover:-translate-y-3 hover:rotate-0 lg:w-[380px]',
        index % 2 ? 'rotate-[2deg]' : 'rotate-0',
        active ? 'z-10 border-acid' : 'border-ink-300',
      )}
    >
      <Image src={product.image} alt={product.name} fill sizes="380px" className={cn('object-cover', !product.inStock && 'opacity-40 grayscale')} />
      <div className="absolute left-2.5 top-2.5">
        <span className="bg-ink/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/75 backdrop-blur-sm">{fmtLabel(product.category)}</span>
      </div>
      {!product.inStock && (
        <div className="absolute right-2.5 top-2.5"><span className="bg-ink-300 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/55">brak</span></div>
      )}
      {/* artist spine */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent px-3 pb-3 pt-8 text-left">
        <div className="truncate font-mono text-[12px] uppercase tracking-[0.14em] text-bone/85">{artistOf(product.name)}</div>
        <span className="text-graffiti mt-1.5 inline-flex bg-acid px-2 py-0.5 text-xs text-bone opacity-0 shadow-[2px_2px_0_var(--color-shadow)] transition-opacity group-hover/sl:opacity-100">
          {formatPLN(product.price)}
        </span>
      </div>
    </motion.button>
  )
}
