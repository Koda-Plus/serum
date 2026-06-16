export interface NavLink {
  label: string
  href: string
  highlight?: boolean
}

export const mainNav: NavLink[] = [
  { label: 'Ubrania', href: '/sklep' },
  { label: 'Muzyka', href: '/muzyka' },
  { label: 'Gadżety', href: '/sklep?kat=gadzety' },
  { label: 'Street Gallery', href: '/street', highlight: true },
]

export interface ShopFilter {
  key: string
  label: string
}

export const shopFilters: ShopFilter[] = [
  { key: 'all', label: 'Wszystko' },
  { key: 't-shirty', label: 'T-shirty' },
  { key: 'bluzy', label: 'Bluzy' },
  { key: 'spodnie', label: 'Spodnie' },
  { key: 'szorty', label: 'Szorty' },
  { key: 'czapki', label: 'Czapki' },
  { key: 'gadzety', label: 'Gadżety' },
]
