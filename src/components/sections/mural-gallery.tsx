'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { murals } from '@/data/murals'
import { IconButton } from '@/components/ui/button'

const TAG_PL: Record<string, string> = { character: 'Charakter', piece: 'Piece' }

export function MuralGallery() {
  const [open, setOpen] = useState<number | null>(null)
  const close = () => setOpen(null)
  const prev = () => setOpen((i) => (i === null ? i : (i - 1 + murals.length) % murals.length))
  const next = () => setOpen((i) => (i === null ? i : (i + 1) % murals.length))

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {murals.map((m, i) => (
          <button
            key={m.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative aspect-[16/10] overflow-hidden border-2 border-ink-300 transition-colors hover:border-acid ${
              i % 5 === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''
            }`}
          >
            <Image src={m.src} alt={m.title} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-85 transition-opacity group-hover:opacity-100" />
            {/* index + tag + zoom affordance */}
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              <span className="text-graffiti text-stroke-acid text-2xl leading-none opacity-70">{String(i + 1).padStart(2, '0')}</span>
              <span className="bg-ink/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-acid-light backdrop-blur-sm">{TAG_PL[m.tag] ?? m.tag}</span>
            </div>
            <Maximize2 size={16} className="absolute right-3 bottom-3 text-bone opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-3 text-left">
              <div className="text-graffiti text-base text-bone md:text-xl">{m.title}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-acid-light">{m.credit} · {m.year}</div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          >
            <IconButton type="button" onClick={close} aria-label="Zamknij" variant="outline" className="absolute right-4 top-4 z-10">
              <X size={20} />
            </IconButton>
            <IconButton type="button" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Poprzedni" variant="outline" className="absolute left-3 z-10 md:left-8">
              <ChevronLeft size={22} />
            </IconButton>
            <IconButton type="button" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Następny" variant="outline" className="absolute right-3 z-10 md:right-8">
              <ChevronRight size={22} />
            </IconButton>

            <motion.figure
              key={open}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-acid">
                <Image src={murals[open].src} alt={murals[open].title} fill sizes="90vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-graffiti text-xl text-bone">{murals[open].title}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid-light">{murals[open].credit} / {murals[open].year}</div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{open + 1} / {murals.length}</div>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
