'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/button'
import { Sticker } from '@/components/ui/badge'

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

  // fade the EROIZM wordmark in once the player is ready, then play it
  // once 1s later (the fade reveals it during that delay)
  const [lottieReady, setLottieReady] = useState(false)
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleLottieRef = (dotLottie: DotLottie | null) => {
    if (playTimer.current) {
      clearTimeout(playTimer.current)
      playTimer.current = null
    }
    if (!dotLottie) return
    const start = () => {
      setLottieReady(true)
      playTimer.current = setTimeout(() => dotLottie.play(), 900)
    }
    dotLottie.addEventListener('load', start)
  }
  useEffect(() => {
    return () => {
      if (playTimer.current) clearTimeout(playTimer.current)
    }
  }, [])

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
      <div className="relative mx-auto flex min-h-[82vh] max-w-[1340px] flex-col items-center justify-center px-4 py-16 text-center sm:py-24 lg:px-8">
        <div className="flex w-full flex-col items-center animate-fade-up">
          {/* EROIZM wordmark – the single hero lockup ("Eroizmu się nie nosi") */}
          <h1 className="text-graffiti flex flex-col items-center">
            <motion.span
              role="img"
              aria-label="EROIZM"
              className="relative block aspect-[2199/705] w-[clamp(16rem,84vw,52rem)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: lottieReady ? 1 : 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <DotLottieReact
                src="/lotties/eroizm.lottie"
                dotLottieRefCallback={handleLottieRef}
                layout={{ fit: 'contain', align: [0.5, 0.5] }}
                className="absolute inset-0 h-full w-full"
              />
            </motion.span>
          </h1>

          <span className="slash-divider mt-6 block h-[3px] w-16 sm:mt-8" aria-hidden />

          {/* Ero's bar, straight off the track – in the Jankora Street handstyle.
              Wide plate so the couplet stays on exactly 2 lines on desktop
              (wraps freely on mobile). */}
          <figure className="mt-6 w-full max-w-4xl border-x-2 border-acid bg-ink/45 px-6 py-5 backdrop-blur-sm">
            <blockquote className="text-handstyle leading-[1.18] text-bone">
              <span className="block text-[clamp(1.35rem,3.6vw,1.95rem)] lg:whitespace-nowrap">
                <span className="text-acid-light">„</span>mam nowe rzeczy, które ziomek musisz mieć
              </span>
              <span className="block text-[clamp(1.35rem,3.6vw,1.95rem)] lg:whitespace-nowrap">
                Tekst, bit, scratch i <span className="underline-graffiti">bezprzypałowy merch</span>
                <span className="text-acid-light">”</span>
              </span>
            </blockquote>
          </figure>

          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <ButtonLink href="/sklep" variant="bone" size="lg" className="w-full justify-center sm:w-auto">
              Zobacz kolekcję <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/street" variant="ghost" size="lg" className="w-full justify-center sm:w-auto">
              Street Gallery
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* floating new-drop sticker – into the shop filtered to the collection */}
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
