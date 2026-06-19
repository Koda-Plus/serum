// "SKŁAD SERUM" – loyalty program (crew framing, no drug/veins connotations).
// Points are earned per złoty spent at 1 zł = 10 pkt (a multiplier, so the
// balance reads as a points score, not a literal "how much I've spent" total).
// Rank thresholds are in points, tuned so ~500 zł reaches BOMBER (free shipping
// forever) – building a wardrobe pays.

// 'mono' = the black-and-white BOMBER treatment, after the b/w "NO.1 W PL"
// album cover (was a stray blue that didn't belong in the violet palette).
export type RankAccent = 'violet' | 'mono' | 'chrome' | 'bone'

export interface Rank {
  key: string
  name: string
  /** lifetime points needed to reach this rank */
  pts: number
  /** short, human label for the gate */
  gate: string
  tagline: string
  perks: string[]
  accent: RankAccent
  /** placeholder rank – name + perks not decided yet */
  tbd?: boolean
}

export const ranks: Rank[] = [
  {
    key: 'writer',
    name: 'Writer',
    pts: 0,
    gate: 'start w składzie',
    tagline: 'Wbijasz na ścianę.',
    perks: ['−5% na każdy zakup', 'Powitalny kod −10% na 1. zamówienie', 'Dostęp do dropów i newsletter ekipy'],
    accent: 'violet',
  },
  {
    key: 'bomber',
    name: 'Bomber',
    pts: 5000,
    gate: '5000 pkt',
    tagline: 'Robisz to regularnie.',
    perks: ['−10% na stałe', 'Darmowa wysyłka – zawsze', 'Dropy 24h przed wszystkimi'],
    accent: 'mono',
  },
  {
    key: 'rank-3',
    name: 'X',
    pts: 15000,
    gate: '15 000 pkt',
    tagline: 'Jeszcze kombinujemy nazwę.',
    perks: [],
    accent: 'chrome',
    tbd: true,
  },
  {
    key: 'rank-4',
    name: 'X',
    pts: 30000,
    gate: '30 000 pkt',
    tagline: 'Top ekipy – szykujemy coś grubego.',
    perks: [],
    accent: 'bone',
    tbd: true,
  },
]

/** 1 zł spent = 10 points (multiplier so the balance isn't a literal PLN-spent
 *  readout). Full set (bluza + spodnie + czapka) doubles it. */
export const POINTS_PER_PLN = 10

/** Free-shipping threshold (zł) – the most actionable in-cart milestone. */
export const FREE_SHIPPING_PLN = 299

/** Given a cart total (zł), the points it earns. */
export function pointsForSpend(pln: number) {
  return Math.round(pln * POINTS_PER_PLN)
}

/** The user's current rank for a lifetime points balance, plus the next tier. */
export function rankForPoints(pts: number): { current: Rank; next: Rank | null; index: number } {
  let index = 0
  ranks.forEach((r, i) => {
    if (pts >= r.pts) index = i
  })
  return { current: ranks[index], next: ranks[index + 1] ?? null, index }
}

/** 0..1 fill from the current rank's threshold toward the next one. */
export function progressToNext(pts: number): number {
  const { current, next } = rankForPoints(pts)
  if (!next) return 1
  return Math.min(1, Math.max(0, (pts - current.pts) / (next.pts - current.pts)))
}

export const accentFill: Record<RankAccent, string> = {
  violet: 'bg-acid text-bone',
  mono: 'bg-bone text-ink',
  chrome: 'bg-chrome text-ink',
  bone: 'bg-bone text-ink',
}
export const accentText: Record<RankAccent, string> = {
  violet: 'text-acid-light',
  mono: 'text-bone',
  chrome: 'text-chrome',
  bone: 'text-bone',
}
export const accentBorder: Record<RankAccent, string> = {
  violet: 'border-acid',
  mono: 'border-bone/65',
  chrome: 'border-chrome',
  bone: 'border-bone',
}
