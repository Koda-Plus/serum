'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, SprayCan } from 'lucide-react'
import { Splatter } from '@/components/brand/splatter'

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

      <Splatter className="left-[-60px] top-[18%] w-[360px]" opacity={0.42} rotate={-12} />

      {/* content */}
      <div className="relative mx-auto flex min-h-[82vh] max-w-[1340px] flex-col justify-center px-4 py-24 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 border border-acid/40 bg-ink/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-acid backdrop-blur-sm">
            <SprayCan size={13} /> streetwear / graffiti / od 2007
          </div>

          <h1 className="text-graffiti leading-[0.94]">
            <span className="block text-[clamp(3.2rem,11vw,8.5rem)] text-bone text-glow-acid">NOSISZ</span>
            <span className="block text-[clamp(3.2rem,11vw,8.5rem)] text-acid text-glow-acid">EROIZM</span>
          </h1>

          <p className="mt-6 max-w-lg border-l-2 border-acid pl-4 text-[15px] leading-relaxed text-bone/75 md:text-base">
            Serum Global, marka Erosa od 2007. Ubrania, muzyka i graffiti w jednym
            języku. Eroizm to nie ciuch, to postawa, którą nosisz na sobie.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/sklep" className="btn-spray text-base">
              Zobacz kolekcję <ArrowRight size={18} />
            </Link>
            <Link href="/street" className="btn-spray btn-ghost text-base">
              Street Gallery
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-bone/15 pt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/55">
            <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-acid" /> 4 światy: ubrania / muzyka / gadżety / street</span>
            <span className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-acid" /> wysyłka 48h</span>
          </div>
        </div>
      </div>

      {/* floating new-drop sticker */}
      <Link
        href="/sklep"
        className="group absolute right-4 top-28 z-10 hidden -rotate-6 lg:block xl:right-10"
        aria-label="Eros One '26, nowa kolekcja"
      >
        <div className="animate-float-slow border-2 border-ink bg-gold px-4 py-3 text-ink shadow-[6px_6px_0_#060706] transition-transform group-hover:-rotate-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em]">nowa kolekcja</div>
          <div className="text-graffiti text-2xl leading-none">EROS ONE ’26</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">bluzy / ts / szorty →</div>
        </div>
      </Link>

      {/* slide controls + piece credit */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="mx-auto flex max-w-[1340px] items-end justify-between px-4 lg:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55">
            <span className="text-acid">na ścianie ›</span> {slide.piece} / {slide.credit}
          </div>
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
