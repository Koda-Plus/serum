// "SKŁAD SERUM" – loyalty program (crew framing, no drug/veins connotations).
// Points are collected per złoty spent; ranks follow a graffiti/crew progression
// with realistic, believable perks. Thresholds tuned so a second hoodie reaches
// BOMBER (free shipping forever) – building a wardrobe pays.

export type RankAccent = 'violet' | 'blue' | 'chrome' | 'bone'

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
    pts: 500,
    gate: '500 pkt',
    tagline: 'Robisz to regularnie.',
    perks: ['−10% na stałe', 'Darmowa wysyłka – zawsze', 'Dropy 24h przed wszystkimi'],
    accent: 'blue',
  },
  {
    key: 'rank-3',
    name: 'X',
    pts: 1500,
    gate: '1500 pkt',
    tagline: 'Jeszcze kombinujemy nazwę.',
    perks: [],
    accent: 'chrome',
    tbd: true,
  },
  {
    key: 'rank-4',
    name: 'X',
    pts: 3000,
    gate: '3000 pkt',
    tagline: 'Top ekipy – szykujemy coś grubego.',
    perks: [],
    accent: 'bone',
    tbd: true,
  },
]

/** 1 zł spent = 1 point. Full set (bluza + spodnie + czapka) doubles it. */
export const POINTS_PER_PLN = 1

/** Free-shipping threshold (zł) – the most actionable in-cart milestone. */
export const FREE_SHIPPING_PLN = 299

/** Given a cart total (zł), the points it earns. */
export function pointsForSpend(pln: number) {
  return Math.round(pln * POINTS_PER_PLN)
}

export const accentFill: Record<RankAccent, string> = {
  violet: 'bg-acid text-bone',
  blue: 'bg-blue text-ink',
  chrome: 'bg-chrome text-ink',
  bone: 'bg-bone text-ink',
}
export const accentText: Record<RankAccent, string> = {
  violet: 'text-acid-light',
  blue: 'text-blue',
  chrome: 'text-chrome',
  bone: 'text-bone',
}
export const accentBorder: Record<RankAccent, string> = {
  violet: 'border-acid',
  blue: 'border-blue',
  chrome: 'border-chrome',
  bone: 'border-bone',
}
