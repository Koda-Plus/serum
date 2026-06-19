import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { SprayCan, BadgeCheck } from 'lucide-react'

/**
 * Serum badge / chip / tag family. Three tiers, encoded by font + shadow depth:
 *   - LOUD (Anton + hard shadow): status Badge, PriceChip
 *   - DATA (JetBrains mono, flat): MetaChip, DiscountChip, Eyebrow
 *   - VOICE/OBJECT (Permanent Marker / big shadow): TagSticker, Sticker
 * Colours follow the brand rule: violet = new/system, gold = top status/scarcity,
 * magenta = markdown only, ink-300 = dead/unavailable.
 */

/* ----------------------------------------------------------- status badges */

const badgeStyles = {
  'NOWOŚĆ': 'bg-acid text-bone shadow-[3px_3px_0_var(--color-shadow)]',
  PROMO: 'bg-magenta text-bone shadow-[3px_3px_0_var(--color-shadow)]',
  LIMITED: 'bg-chrome text-ink shadow-[3px_3px_0_var(--color-shadow)]',
  BESTSELLER: 'bg-blue text-ink shadow-[3px_3px_0_var(--color-shadow)]',
  PREORDER: 'bg-acid-deep text-bone shadow-[3px_3px_0_var(--color-shadow)]',
  WYPRZEDANE: 'bg-ink-300 text-bone/55',
} as const

export type BadgeLabel = keyof typeof badgeStyles

export function Badge({ label, className }: { label: BadgeLabel; className?: string }) {
  return (
    <span
      className={cn(
        'text-graffiti inline-flex items-center px-2.5 py-1 text-[11px] tracking-[0.16em]',
        badgeStyles[label],
        className,
      )}
    >
      {label}
    </span>
  )
}

/* --------------------------------------------------------------- data chips */

/** Quiet glass meta chip – category, breadcrumb tail, captions. Never coloured. */
export function MetaChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-ink/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70 backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** −% markdown satellite that sits beside a struck-through old price. */
export function DiscountChip({ pct, className }: { pct: number; className?: string }) {
  return (
    <span className={cn('bg-magenta px-1.5 py-0.5 font-mono text-[10px] font-bold text-bone', className)}>
      −{pct}%
    </span>
  )
}

/** Headline price token – always signature violet, for one consistent price
 *  colour across every product (no per-accent variation). */
export function PriceChip({
  children,
  size = 'card',
  className,
}: {
  children: ReactNode
  size?: 'card' | 'pdp'
  className?: string
}) {
  return (
    <span
      className={cn(
        'text-graffiti inline-flex items-center bg-acid text-bone',
        size === 'pdp'
          ? 'px-3 py-1.5 text-2xl shadow-[3px_3px_0_var(--color-shadow)]'
          : 'gap-1.5 px-2.5 py-1 text-base shadow-[2px_2px_0_var(--color-shadow)]',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ----------------------------------------------------------- eyebrow / tags */

/** The one section eyebrow: mono + square bullet, acid. `over` adds a glass
 *  plate for use over photography; `icon` replaces the bullet. */
export function Eyebrow({
  children,
  className,
  over = false,
  icon,
}: {
  children: ReactNode
  className?: string
  over?: boolean
  icon?: ReactNode
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-acid-light',
        over && 'border border-toxic/40 bg-ink/60 px-3 py-1.5 backdrop-blur-sm',
        className,
      )}
    >
      {icon ?? <span className="h-1.5 w-1.5 bg-acid rounded-full" aria-hidden />}
      {children}
    </div>
  )
}

/** Object tier – a physical announcement card that casts a 6px shadow. */
export function Sticker({
  children,
  tone = 'bone',
  className,
}: {
  children: ReactNode
  tone?: 'bone' | 'violet'
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-2 border-ink shadow-[6px_6px_0_var(--color-shadow)]',
        tone === 'bone' ? 'bg-bone text-ink' : 'bg-acid text-bone',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Scrawl/voice tier – Permanent Marker hand-tag. Where brand voice lives. */
export function TagSticker({
  children,
  tone = 'acid',
  className,
}: {
  children: ReactNode
  tone?: 'acid' | 'bone'
  className?: string
}) {
  const fill = tone === 'bone' ? 'bg-bone text-ink' : 'bg-acid text-bone'
  return (
    <span
      className={cn(
        'text-tag inline-block -rotate-3 px-2.5 py-1 shadow-[2px_2px_0_var(--color-shadow)]',
        fill,
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * "Bezprzypałowy merch" – Ero's brand-voice quality stamp. A designed hip-hop
 * emblem (slap-sticker energy) rather than a dry tag: spray-can mark + Permanent
 * Marker headline + a mono certification sub-line, with starbursts.
 */
export function BezBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'group relative inline-flex -rotate-2 items-center gap-3 border-2 border-acid bg-ink px-4 py-2.5 shadow-[4px_4px_0_var(--color-shadow)]',
        className,
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-acid bg-acid/15 text-acid-light">
        <SprayCan size={18} />
      </span>
      <span className="leading-none">
        <span className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-acid-light">
          100% serum quality <BadgeCheck size={11} />
        </span>
        <span className="text-tag block whitespace-nowrap text-xl text-bone">bezprzypałowy merch</span>
      </span>
      {/* corner starbursts */}
      <span className="absolute -right-2.5 -top-2.5 text-acid-light">✦</span>
      <span className="absolute -bottom-2 -left-1.5 text-[10px] text-acid-light">✦</span>
    </div>
  )
}
