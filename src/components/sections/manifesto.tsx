'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Eyebrow } from '@/components/ui/badge'

/**
 * Manifesto — a centered brand statement over a faint full-bleed mural, with the
 * real heritage year "2007" as an oversized outline stamp behind the heading.
 * No quote, no fake metrics — one centred lockup.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="manifest" ref={ref} className="noise-overlay relative overflow-hidden bg-ink">
      {/* faint mural backdrop */}
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <Image src="/images/serum/mural-eros-chrome.jpg" alt="" aria-hidden fill sizes="100vw" className="object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/75 to-ink" />

      <div className="relative mx-auto max-w-3xl px-4 py-28 text-center lg:py-36">
        {/* heritage stamp behind the heading */}
        <div
          aria-hidden
          className="text-graffiti text-stroke-acid pointer-events-none absolute inset-x-0 top-1/2 -translate-y-[60%] text-center leading-none text-[clamp(7rem,22vw,18rem)] opacity-[0.13]"
        >
          2007
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <div className="flex justify-center">
            <Eyebrow className="mb-5">manifest · od 2007</Eyebrow>
          </div>
          <h2 className="text-graffiti mx-auto max-w-3xl pb-1 text-[clamp(2.2rem,6.5vw,5rem)] leading-[1.06] text-bone">
            Marka, która <span className="text-acid text-glow-acid">wyrosła ze ściany</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-bone/75">
            Serum Global zaczęło się od graffiti — od nocy z puszką i porannego podziwiania świeżego
            piece&apos;a. Od 2007 roku zamieniamy ten język w ubrania, muzykę i sztukę. Nie sprzedajemy
            trendu. Sprzedajemy kawałek miasta, który nosisz na sobie.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/55">
            z puszki na ścianę <span className="text-brush text-lg text-acid">→</span> ze ściany na merch
          </div>
        </motion.div>
      </div>
    </section>
  )
}
