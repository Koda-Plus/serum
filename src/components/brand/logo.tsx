import { cn } from '@/lib/utils'

/** Serum Global brushscript wordmark, source PNG is black on transparent, inverted to bone. */
export function SerumLogo({ className }: { className?: string }) {
  return (
    <img
      src="/images/serum/brand-logo.png"
      alt="Serum Global"
      className={cn('h-12 w-auto object-contain md:h-14', className)}
      style={{ filter: 'invert(1) brightness(1.05)' }}
    />
  )
}

/** Compact "S" spray mark for tight spaces / favicons. */
export function SerumMark({ className, color = '#8b5cf6' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn('h-8 w-8', className)} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Serum">
      <path
        d="M72 28c-6-9-18-12-29-9-12 3-19 12-17 22 2 9 11 12 22 14 9 2 14 3 15 8 1 5-5 9-13 10-9 1-17-2-21-9l-12 8c7 11 22 16 36 13 14-3 23-13 20-25-2-10-12-13-23-15-8-2-13-3-14-7-1-4 4-8 11-9 7-1 14 1 18 7z"
        fill={color}
      />
    </svg>
  )
}
