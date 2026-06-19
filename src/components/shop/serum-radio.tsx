'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Pause, Radio, RotateCcw, RotateCw, Loader2 } from 'lucide-react'

/**
 * Serum Radio – the sticky bottom bar. Custom graffiti-styled chrome wrapping a
 * hidden Spotify embed, driven through the official Spotify IFrame API so the
 * play button actually plays the track (JWP-site style). Featured cut:
 * Ero JWP – "Nowy Dobrobyt" (Ero is the founder of Serum).
 */

const TRACK = {
  artist: 'ERO JWP',
  title: 'Nowy Dobrobyt',
  cover: '/images/serum/ero-nowy-dobrobyt.jpg',
  uri: 'spotify:track:1UtVtaTsolXpmJwS4Z0e4L',
  url: 'https://open.spotify.com/track/1UtVtaTsolXpmJwS4Z0e4L',
}

type SpotifyController = {
  togglePlay: () => void
  play?: () => void
  resume?: () => void
  pause?: () => void
  seek: (seconds: number) => void
  addListener: (event: string, cb: (e: { data: PlaybackData }) => void) => void
}
type PlaybackData = { position: number; duration: number; isPaused: boolean; isBuffering?: boolean }

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: {
      createController: (
        el: HTMLElement,
        opts: { uri: string; width: string | number; height: string | number },
        cb: (controller: SpotifyController) => void,
      ) => void
    }) => void
  }
}

const fmt = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function SerumRadio() {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const controllerRef = useRef<SpotifyController | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [dur, setDur] = useState(0)
  // Spotify only reports position ~1×/sec, which makes the bar jump in steps.
  // We keep the last reported position + its timestamp and tick a smooth
  // display position locally between reports.
  const [displayMs, setDisplayMs] = useState(0)
  const posRef = useRef(0)
  const updatedRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    const init = (api: Parameters<NonNullable<Window['onSpotifyIframeApiReady']>>[0]) => {
      if (cancelled || !hostRef.current || controllerRef.current) return
      api.createController(
        hostRef.current,
        { uri: TRACK.uri, width: '100%', height: 80 },
        (controller) => {
          controllerRef.current = controller
          // Spotify creates the embed iframe with loading="lazy"; force eager so
          // it loads even though it's visually hidden behind the bar.
          hostRef.current?.querySelector('iframe')?.setAttribute('loading', 'eager')
          // The controller is usable as soon as we hold it; the separate
          // 'ready' event often fires before we can subscribe, so don't gate
          // the UI on it – enable controls now.
          if (!cancelled) setReady(true)
          controller.addListener('ready', () => !cancelled && setReady(true))
          controller.addListener('playback_update', (e) => {
            if (cancelled) return
            posRef.current = e.data.position
            updatedRef.current = Date.now()
            setDur(e.data.duration)
            setPlaying(!e.data.isPaused)
            setDisplayMs(e.data.position)
          })
        },
      )
    }

    window.onSpotifyIframeApiReady = init

    const SRC = 'https://open.spotify.com/embed/iframe-api/v1'
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = SRC
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      cancelled = true
    }
  }, [])

  // smooth ticker – advance the displayed position between Spotify's sparse reports
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      const next = posRef.current + (Date.now() - updatedRef.current)
      setDisplayMs(dur > 0 ? Math.min(dur, next) : next)
    }, 150)
    return () => clearInterval(id)
  }, [playing, dur])

  // Seek + optimistically move the UI right away. Spotify only reports position
  // while playing, so without this the bar wouldn't budge when paused and the
  // ±15s buttons "felt" dead.
  const seekTo = useCallback(
    (secs: number) => {
      const c = controllerRef.current
      if (!c) return
      const maxSecs = dur > 0 ? dur / 1000 : Infinity
      const clamped = Math.max(0, Math.min(secs, maxSecs))
      c.seek(clamped)
      posRef.current = clamped * 1000
      updatedRef.current = Date.now()
      setDisplayMs(clamped * 1000)
    },
    [dur],
  )

  // Play/pause that also handles the end of the track: once it has finished,
  // togglePlay alone won't restart it, so we rewind to 0 and resume.
  const toggle = useCallback(() => {
    const c = controllerRef.current
    if (!c) return
    const atEnd = dur > 0 && displayMs >= dur - 800
    if (atEnd && !playing) {
      seekTo(0)
      ;(c.play ?? c.resume ?? c.togglePlay)()
      return
    }
    c.togglePlay()
  }, [dur, displayMs, playing, seekTo])

  const nudge = useCallback((delta: number) => seekTo(displayMs / 1000 + delta), [displayMs, seekTo])
  const seekToFraction = useCallback(
    (f: number) => {
      if (dur <= 0) return
      seekTo(Math.max(0, Math.min(1, f)) * (dur / 1000))
    },
    [dur, seekTo],
  )

  const pct = dur > 0 ? Math.min(100, (displayMs / dur) * 100) : 0

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-acid/30 bg-ink/95 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md">
      {/* progress line on the very top edge – click anywhere to seek */}
      <button
        type="button"
        aria-label="Przewiń utwór"
        disabled={!ready || dur <= 0}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          seekToFraction((e.clientX - r.left) / r.width)
        }}
        className="group/seek absolute inset-x-0 top-0 z-10 h-[5px] cursor-pointer bg-ink-200 transition-[height] duration-150 hover:h-[9px] disabled:cursor-default"
      >
        <div
          className="relative h-full bg-gradient-to-r from-acid to-toxic transition-[width] duration-150 ease-linear"
          style={{ width: `${pct}%` }}
        >
          <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-bone opacity-0 shadow-[0_0_10px_var(--color-acid)] transition-opacity group-hover/seek:opacity-100" />
        </div>
      </button>

      <div className="mx-auto flex max-w-[1340px] items-center gap-3 px-3 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
        {/* cover – doubles as a play/pause toggle */}
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? 'Pauza' : 'Odtwórz'}
          className={`group/cover relative h-12 w-12 shrink-0 overflow-hidden border bg-ink-100 transition-colors disabled:cursor-wait ${playing ? 'border-acid' : 'border-acid/30'}`}
        >
          <Image src={TRACK.cover} alt={`${TRACK.artist} – ${TRACK.title}`} fill sizes="48px" className="object-cover" />
          <span className={`absolute inset-0 grid place-items-center bg-ink/55 text-bone transition-opacity ${playing ? 'opacity-0 group-hover/cover:opacity-100' : 'opacity-100 group-hover/cover:opacity-100 sm:opacity-0 sm:group-hover/cover:opacity-100'}`}>
            {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </span>
        </button>

        {/* controls */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => nudge(-15)}
            aria-label="Cofnij 15 sekund"
            disabled={!ready}
            className="hidden h-8 w-8 items-center justify-center text-bone/55 transition-colors hover:text-acid-light disabled:opacity-30 sm:flex"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pauza' : 'Odtwórz'}
            disabled={!ready}
            className="flex h-10 w-10 items-center justify-center bg-acid text-bone shadow-[3px_3px_0_var(--color-shadow)] transition-all hover:bg-acid-deep active:translate-x-[1px] active:translate-y-[1px] disabled:cursor-wait disabled:bg-ink-300"
          >
            {!ready ? (
              <Loader2 size={18} className="animate-spin" />
            ) : playing ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => nudge(15)}
            aria-label="Do przodu 15 sekund"
            disabled={!ready}
            className="hidden h-8 w-8 items-center justify-center text-bone/55 transition-colors hover:text-acid-light disabled:opacity-30 sm:flex"
          >
            <RotateCw size={15} />
          </button>
        </div>

        {/* track info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-sm bg-acid/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-acid-light sm:inline-flex">
              {playing ? (
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
                </span>
              ) : (
                <Radio size={10} />
              )}
              Serum Radio
            </span>
            <span className="truncate">
              <span className="text-graffiti text-sm text-bone">{TRACK.title}</span>
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/45">{TRACK.artist}</span>
            </span>
          </div>
          {/* slim inline progress on mobile */}
          <div className="mt-1.5 flex items-center gap-2 sm:hidden">
            <div className="h-[3px] flex-1 overflow-hidden bg-ink-200">
              <div className="h-full bg-acid" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-[9px] text-bone/40">{fmt(displayMs)}</span>
          </div>
        </div>

        {/* time + equalizer */}
        <div className="hidden items-center gap-4 sm:flex">
          <span className="font-mono text-[11px] tabular-nums text-bone/50">
            {fmt(displayMs)} <span className="text-bone/25">/ {dur ? fmt(dur) : '–:–'}</span>
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
          className="font-semibold uppercase tracking-wide shrink-0 border border-ink-300 px-3 py-1.5 text-[11px] text-bone transition-colors hover:border-acid hover:text-acid-light"
        >
          <span className="hidden sm:inline">pełna </span>muzyka
        </Link>
      </div>

      {/* Real Spotify embed driving playback via the IFrame API. Kept ON-SCREEN
          behind the bar (z-index/opacity hidden) – if parked off-screen its
          loading="lazy" iframe never enters the viewport and never loads, so the
          play button does nothing. On-screen + opacity 0 still plays audio. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0"
      >
        <div ref={hostRef} />
      </div>

      <style>{`@keyframes eq { 0% { height: 4px } 100% { height: 26px } }`}</style>
    </div>
  )
}
