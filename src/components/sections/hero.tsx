'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, SprayCan } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Eyebrow, Sticker } from '@/components/ui/badge'

const slides = [
  { src: '/images/serum/mural-2.jpg', piece: '„SERUM” wildstyle', credit: 'Hersk × Tembe4' },
  { src: '/images/serum/mural-3.jpg', piece: 'Szczur, Serum Global', credit: 'Tembe4 prod.' },
  { src: '/images/serum/mural-eagle.jpg', piece: 'Ptak / SAM', credit: 'Serum crew' },
  { src: '/images/serum/mural-eros-chrome.jpg', piece: '„EROS” chrome', credit: 'Eros' },
  { src: '/images/serum/mural-wide-1.jpg', piece: 'Dark Area 51', credit: 'Serum crew' },
]

export function Hero() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5200)
    return () => clearInterval(t)
  }, [])
  const slide = slides[idx]

  return (
    <section className="relative min-h-[82vh] overflow-hidden bg-ink">
      {/* mural slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0" style={{ animation: 'ken-burns 6s ease-out forwards' }}>
              <Image src={slide.src} alt={slide.piece} fill priority className="object-cover" sizes="100vw" />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="noise-overlay absolute inset-0" />
      </div>

      {/* content */}
      <div className="relative mx-auto flex min-h-[82vh] max-w-[1340px] flex-col justify-center px-4 py-24 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <Eyebrow over icon={<SprayCan size={13} />} className="mb-5">
            streetwear / graffiti / od 2007
          </Eyebrow>

          <h1 className="text-graffiti flex flex-col items-start">
            <span className="flex items-baseline gap-[0.28em] whitespace-nowrap text-[clamp(1.9rem,7.5vw,5.5rem)] leading-[1.05]">
              <span className="text-bone">NOSISZ</span>
              <span className="text-acid text-glow-acid">EROIZM</span>
            </span>
            <span aria-hidden className="mt-3 block h-[4px] w-[clamp(120px,28vw,260px)] bg-gradient-to-r from-acid to-toxic" />
          </h1>

          <div className="mt-6 max-w-lg border-l-2 border-acid bg-ink/45 py-3 pl-4 pr-4 backdrop-blur-sm">
            <p className="text-[15px] leading-relaxed text-bone/80 md:text-base">
              Marka Erosa od 2007 — ubrania, muzyka i graffiti w jednym języku.
              Nie ciuch, tylko kawałek miasta, który nosisz na sobie.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/sklep" variant="bone" size="lg">
              Zobacz kolekcję <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/street" variant="ghost" size="lg">
              Street Gallery
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* floating new-drop sticker — into the shop filtered to the collection */}
      <Link
        href="/sklep?kolekcja=eros-one"
        className="group absolute right-4 top-28 z-10 hidden -rotate-6 lg:block xl:right-10"
        aria-label="Eros One '26, nowa kolekcja"
      >
        <Sticker tone="bone" className="animate-float-slow px-4 py-3 transition-transform group-hover:-rotate-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em]">nowa kolekcja</div>
          <div className="text-graffiti text-2xl leading-none">EROS ONE ’26</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">bluzy / ts / szorty →</div>
        </Sticker>
      </Link>

      {/* slide controls */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto flex max-w-[1340px] items-end justify-end px-4 lg:px-8">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slajd ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 transition-all ${i === idx ? 'w-8 bg-acid' : 'w-3 bg-bone/30 hover:bg-bone/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
