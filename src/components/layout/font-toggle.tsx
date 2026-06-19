'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'serum-font-jankora'

/**
 * Dev/preview switch: render the WHOLE project in Jankora Street. Toggles a
 * `font-jankora` class on <html> (globals.css overrides every font token there)
 * and remembers the choice. For evaluating the typeface across the whole site.
 */
export function FontToggle() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === '1'
    setOn(saved)
    document.documentElement.classList.toggle('font-jankora', saved)
  }, [])

  const toggle = () => {
    setOn((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('font-jankora', next)
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="group inline-flex items-center gap-3 border border-ink-300 bg-ink px-3 py-2 transition-colors hover:border-acid"
      title="Podgląd całego projektu w czcionce Jankora Street"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60 transition-colors group-hover:text-bone/80">
        Czcionka: Jankora Street
      </span>
      <span
        className={cn(
          'relative h-5 w-9 shrink-0 border transition-colors',
          on ? 'border-acid bg-acid/30' : 'border-ink-300 bg-ink-100',
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-all',
            on ? 'left-[18px] bg-acid-light' : 'left-0.5 bg-bone/70',
          )}
        />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acid-light">{on ? 'on' : 'off'}</span>
    </button>
  )
}
