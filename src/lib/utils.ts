import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Our display/typography classes (globals.css @layer components) are named with
// a `text-` prefix, so stock tailwind-merge mistakes them for font-size/color
// utilities and strips them when merged next to `text-[…]`/`text-acid`. Register
// them as font-family utilities so they survive cn() and only conflict w/ each other.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': ['text-graffiti', 'text-chunky', 'text-blocky', 'text-tag', 'text-brush'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPLN(value: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
