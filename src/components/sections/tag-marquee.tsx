import { Fragment } from 'react'

const tags = ['EROS ONE ’26', 'SERUM × TEMPZ', 'WILDSTYLE', 'STREET GALLERY', 'WINYL', 'SINCE 2007', 'GRAFFITI', 'SERUM GLOBAL']

export function TagMarquee() {
  const strip = [...tags, ...tags]
  return (
    <div className="relative overflow-hidden border-y border-ink-300 bg-ink-50 py-4">
      {/* uniform gap between every child → stars sit centered between labels */}
      <div className="flex w-max items-center gap-8 animate-marquee">
        {strip.map((t, i) => (
          <Fragment key={i}>
            <span className="text-graffiti text-2xl text-bone/40 md:text-3xl">{t}</span>
            <span className="text-acid-light" aria-hidden>✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
