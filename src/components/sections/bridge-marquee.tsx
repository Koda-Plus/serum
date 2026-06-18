/**
 * The chapter curtain between the SERUM × TEMPZ prologue and the Street Gallery
 * reel. Deliberately quieter than the loud TagMarquee up top: a single message
 * in faded Anton OUTLINE, slow drift — a hinge, not a ticker.
 */
const PHRASE = 'ZE ŚCIANY NA MERCH · FROM THE WALL TO THE MERCH'

export function BridgeMarquee() {
  const strip = Array.from({ length: 4 })
  return (
    <div className="relative overflow-hidden border-y border-ink-300 bg-ink py-5">
      <div className="flex w-max animate-marquee" style={{ animationDuration: '42s' }}>
        {strip.map((_, i) => (
          <span key={i} className="text-graffiti text-stroke-acid flex items-center gap-6 px-6 text-2xl leading-none opacity-30 md:text-4xl">
            {PHRASE}
            <span className="text-acid opacity-100">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
