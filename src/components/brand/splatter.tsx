import { cn } from '@/lib/utils'

/** Acid-green paint-splatter decoration (Serum's signature). Absolutely positioned, non-interactive. */
export function Splatter({
  className,
  rotate = 0,
  opacity = 1,
  flip = false,
}: {
  className?: string
  rotate?: number
  opacity?: number
  flip?: boolean
}) {
  return (
    <img
      src="/images/serum/splatter-green.png"
      alt=""
      aria-hidden
      className={cn('pointer-events-none absolute select-none', className)}
      style={{
        transform: `rotate(${rotate}deg)${flip ? ' scaleX(-1)' : ''}`,
        opacity,
        filter: 'hue-rotate(202deg) saturate(1.25) brightness(0.92)',
      }}
    />
  )
}
