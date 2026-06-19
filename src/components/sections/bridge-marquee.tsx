/**
 * The chapter curtain between the SERUM × TEMPZ prologue and the Street Gallery
 * reel. Deliberately quieter than the loud TagMarquee up top: a single message
 * in faded Anton OUTLINE, slow drift – a hinge, not a ticker.
 */
import { Fragment } from 'react'

const PHRASE = 'ZE ŚCIANY NA MERCH · FROM THE WALL TO THE MERCH'

export function BridgeMarquee() {
  const strip = Array.from({ length: 4 })
  return (
    <div className="relative overflow-hidden border-y border-ink-300 bg-ink py-5">
      {/* uniform gap between every child → stars centered between phrases (matches TagMarquee) */}
      <div className="flex w-max items-center gap-8 animate-marquee" style={{ animationDuration: '42s' }}>
        {strip.map((_, i) => (
          <Fragment key={i}>
            <span className="text-graffiti text-stroke-acid-light text-2xl leading-none opacity-60 md:text-4xl">{PHRASE}</span>
            <span className="text-acid-light" aria-hidden>✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
