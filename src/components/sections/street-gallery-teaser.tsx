'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import { murals, type Mural } from '@/data/murals'
import { productBySlug } from '@/data/products'
import { Eyebrow } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { formatPLN } from '@/lib/utils'

/**
 * "ZE ŚCIANY NA MERCH" – full-screen mural "plates" that STACK: each plate is
 * sticky, so the next one slides up from underneath and covers the previous as
 * you scroll. Pure CSS sticky stacking = buttery smooth, no scroll-jacking.
 * Murals fill the viewport; matched products are advertised on their plate.
 */

const TAG_PL: Record<string, string> = { character: 'Charakter', piece: 'Piece / Wildstyle' }

interface Plate {
  src: string
  lead?: string
  glow: string
  tail?: string
  garmentSlug?: string
}

const bySrc = (src: string): Mural => murals.find((m) => m.src === src)!

const PLATES: Plate[] = [
  { src: '/images/serum/mural-3.jpg', glow: 'SZCZUR', garmentSlug: 'bluza-serum-x-tempz-szczur-big-czarna' },
  { src: '/images/serum/mural-eagle.jpg', glow: 'PTAK', tail: ' / SAM', garmentSlug: 'bluza-serum-x-tempz-golab-small-czarna' },
  { src: '/images/serum/mural-2.jpg', lead: '„', glow: 'SERUM', tail: '” WILDSTYLE' },
  { src: '/images/serum/mural-eros-chrome.jpg', lead: '„', glow: 'EROS', tail: '” CHROME' },
]

export function StreetGalleryTeaser() {
  return (
    <div className="relative bg-ink">
      {PLATES.map((plate, i) => (
        <Plate key={plate.src} plate={plate} index={i} total={PLATES.length} />
      ))}
    </div>
  )
}

function Plate({ plate, index, total }: { plate: Plate; index: number; total: number }) {
  const mural = bySrc(plate.src)
  const num = String(index + 1).padStart(2, '0')
  const garment = plate.garmentSlug ? productBySlug(plate.garmentSlug) : undefined

  return (
    <section className="sticky top-0 h-[100svh] overflow-hidden bg-ink shadow-[0_-30px_70px_-10px_rgba(0,0,0,0.7)]">
      {/* top edge highlight – reads as the plate sliding over the previous one */}
      <div className="absolute inset-x-0 top-0 z-30 h-[3px] bg-gradient-to-r from-transparent via-acid to-transparent" />

      {/* full-bleed mural */}
      <Image src={plate.src} alt={mural.title} fill priority={index === 0} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/20" />
      <div className="noise-overlay absolute inset-0" />

      {/* giant outline chapter number */}
      <div
        aria-hidden
        className="text-graffiti text-stroke-acid pointer-events-none absolute right-[-0.04em] top-[8%] z-10 leading-none text-[clamp(7rem,26vw,22rem)] opacity-25"
      >
        {num}
      </div>

      {/* content */}
      <div className="absolute inset-0 z-20 mx-auto max-w-[1340px] px-4 lg:px-8">
        {/* top label, pinned */}
        <div className="absolute inset-x-4 top-24 flex items-center justify-between lg:inset-x-8">
          <Eyebrow over>Ze ściany na merch · plate {num}</Eyebrow>
          <Link
            href="/street"
            className="font-semibold uppercase tracking-wide hidden items-center gap-1.5 border-b-2 border-acid pb-1 text-sm text-bone transition-colors hover:text-acid-light sm:inline-flex"
          >
            całe archiwum <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* lockup + advert, vertically centred (equal space top/bottom) */}
        <div className="flex h-full items-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_auto]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h3
                className="text-graffiti text-[clamp(2.4rem,8.5vw,6.5rem)] leading-[1.04] text-bone"
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)' }}
              >
                {plate.lead}
                <span className="text-acid-light text-glow-acid">{plate.glow}</span>
                {plate.tail}
              </h3>
              <div className="mt-6 inline-flex w-fit flex-wrap items-center gap-x-5 gap-y-1.5 border border-bone/10 bg-ink/55 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-sm">
                <span className="text-bone/55">autor <span className="ml-1 text-bone">{mural.credit}</span></span>
                <span className="text-bone/55">rok <span className="ml-1 text-bone">{mural.year}</span></span>
                <span className="text-bone/55">typ <span className="ml-1 text-bone">{TAG_PL[mural.tag] ?? mural.tag}</span></span>
                <span className="text-acid-light">{num} / {String(total).padStart(2, '0')}</span>
              </div>
            </motion.div>

            {/* matched → product advert; unmatched → a prominent print CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full max-w-md border-2 border-acid/40 bg-ink/70 p-4 backdrop-blur-md lg:w-[420px]"
            >
              {garment ? (
                <>
                  <div className="mb-3 flex items-center gap-2 px-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-acid-light">
                    ze ściany <MoveRight size={14} /> na merch
                  </div>
                  <Link href={`/produkt/${garment.slug}`} className="group/g block">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink-300 bg-ink-100">
                      <Image src={garment.image} alt={garment.name} fill sizes="(max-width:1024px) 90vw, 420px" className="object-cover transition-transform duration-500 group-hover/g:scale-[1.04]" />
                      <ArrowUpRight size={20} className="absolute right-3 top-3 text-bone opacity-0 transition-opacity group-hover/g:opacity-100" />
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div className="text-graffiti text-base leading-tight text-bone transition-colors group-hover/g:text-acid-light md:text-lg">{garment.name}</div>
                      <span className="text-graffiti shrink-0 bg-acid px-2.5 py-1 text-base text-bone shadow-[2px_2px_0_var(--color-shadow)]">{formatPLN(garment.price)}</span>
                    </div>
                  </Link>
                  <ButtonLink href={`/produkt/${garment.slug}`} variant="violet" size="md" className="mt-3 w-full">
                    Weź to na siebie <ArrowUpRight size={16} />
                  </ButtonLink>
                </>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-2 px-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-acid-light">
                    ze ściany <MoveRight size={14} /> na ścianę
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink-300 bg-ink-100">
                    <Image src={plate.src} alt={mural.title} fill sizes="(max-width:1024px) 90vw, 420px" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70">sygnowany print · limitowany</div>
                  </div>
                  <div className="mt-3 text-graffiti text-base leading-tight text-bone md:text-lg">Weź tę pracę na ścianę</div>
                  <ButtonLink href="/street" variant="bone" size="md" className="mt-3 w-full">
                    Zobacz printy <ArrowUpRight size={16} />
                  </ButtonLink>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
