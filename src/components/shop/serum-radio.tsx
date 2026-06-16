'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Pause, SkipBack, SkipForward, Radio } from 'lucide-react'

interface Track {
  artist: string
  title: string
  cover: string
  len: number // seconds
}

const queue: Track[] = [
  { artist: 'ERO JWP', title: 'Eroizm', cover: '/images/serum/ero-eroizm-lp-cd-wersja-preorder.jpg', len: 214 },
  { artist: 'JWP / BC', title: 'Ostatni z Gatunku', cover: '/images/serum/jwp-bc-feat-relo-akhenaton-ostatni-z-gatunku-les-derniers-de-lespece-lp-winyl-czarny.png', len: 198 },
  { artist: 'WENA', title: 'Nowa Ziemia', cover: '/images/serum/wena-nowa-ziemia-winyl.jpg', len: 232 },
  { artist: 'Włodi', title: 'Wszystko z Dymem', cover: '/images/serum/wlodi-wszystko-z-dymem-winyl-edycja-limitowana.jpg', len: 187 },
  { artist: 'ERO x KOSI', title: 'Blackbook', cover: '/images/serum/ero-x-kosi-blackbook-cd.jpg', len: 176 },
]

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export function SerumRadio() {
  const [playing, setPlaying] = useState(false)
  const [idx, setIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const track = queue[idx]

  const go = (n: number) => {
    setIdx((i) => (n + queue.length) % queue.length)
    setElapsed(0)
  }

  useEffect(() => {
    if (!playing) {
      if (timer.current) clearInterval(timer.current)
      return
    }
    timer.current = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= track.len) {
          setIdx((i) => (i + 1) % queue.length)
          return 0
        }
        return e + 1
      })
    }, 1000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [playing, idx, track.len])

  const pct = Math.min(100, (elapsed / track.len) * 100)

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-acid/25 bg-ink/95 backdrop-blur-md">
      {/* progress line on the very top edge */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-ink-200">
        <div className="h-full bg-acid transition-[width] duration-1000 ease-linear" style={{ width: `${pct}%` }} />
      </div>

      <div className="mx-auto flex max-w-[1340px] items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        {/* cover */}
        <div className={`relative h-12 w-12 shrink-0 overflow-hidden border border-ink-300 bg-ink-100 ${playing ? 'animate-spray-flicker' : ''}`}>
          <Image src={track.cover} alt={track.title} fill sizes="48px" className="object-cover" />
        </div>

        {/* controls */}
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => go(idx - 1)} aria-label="Poprzedni" className="hidden h-8 w-8 items-center justify-center text-bone/60 transition-colors hover:text-acid sm:flex">
            <SkipBack size={16} fill="currentColor" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pauza' : 'Odtwórz'}
            className="flex h-10 w-10 items-center justify-center bg-acid text-bone shadow-[3px_3px_0_#08060f] transition-all hover:bg-acid-deep active:translate-x-[1px] active:translate-y-[1px]"
          >
            {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
          <button type="button" onClick={() => go(idx + 1)} aria-label="Następny" className="flex h-8 w-8 items-center justify-center text-bone/60 transition-colors hover:text-acid">
            <SkipForward size={16} fill="currentColor" />
          </button>
        </div>

        {/* track info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 rounded-sm bg-acid/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-toxic sm:inline-flex">
              <Radio size={10} /> Serum Radio
            </span>
            <span className="truncate">
              <span className="text-graffiti text-sm text-bone">{track.title}</span>
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/45">{track.artist}</span>
            </span>
          </div>
          {/* slim inline progress on mobile */}
          <div className="mt-1.5 flex items-center gap-2 sm:hidden">
            <div className="h-[3px] flex-1 overflow-hidden bg-ink-200">
              <div className="h-full bg-acid" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-[9px] text-bone/40">{fmt(elapsed)}</span>
          </div>
        </div>

        {/* time + equalizer */}
        <div className="hidden items-center gap-4 sm:flex">
          <span className="font-mono text-[11px] tabular-nums text-bone/50">
            {fmt(elapsed)} <span className="text-bone/25">/ {fmt(track.len)}</span>
          </span>
          <div className="flex h-7 items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-[3px] bg-acid"
                style={{
                  height: playing ? undefined : '4px',
                  animation: playing ? `eq 0.${5 + i}s ease-in-out ${i * 0.07}s infinite alternate` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <Link
          href="/muzyka"
          className="text-graffiti shrink-0 border border-ink-300 px-3 py-1.5 text-[11px] text-bone transition-colors hover:border-acid hover:text-acid"
        >
          <span className="hidden sm:inline">pełna </span>muzyka
        </Link>
      </div>

      <style>{`@keyframes eq { 0% { height: 4px } 100% { height: 26px } }`}</style>
    </div>
  )
}
