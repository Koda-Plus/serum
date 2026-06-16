import { cn } from '@/lib/utils'

const styles = {
  'NOWOŚĆ': 'bg-acid text-bone',
  'PROMO': 'bg-magenta text-bone',
  'LIMITED': 'bg-ink text-acid border border-acid',
  'BESTSELLER': 'bg-gold text-ink',
} as const

export type BadgeLabel = keyof typeof styles

export function Badge({ label, className }: { label: BadgeLabel; className?: string }) {
  return (
    <span
      className={cn(
        'text-graffiti inline-flex items-center px-2.5 py-1 text-[11px] tracking-[0.18em] shadow-[3px_3px_0_#060706]',
        styles[label],
        className,
      )}
    >
      {label}
    </span>
  )
}
