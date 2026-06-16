const tags = ['EROS ONE ’26', 'SERUM × TEMPZ', 'WILDSTYLE', 'STREET GALLERY', 'WINYL', 'SINCE 2007', 'GRAFFITI', 'SERUM GLOBAL']

export function TagMarquee() {
  const strip = [...tags, ...tags]
  return (
    <div className="relative overflow-hidden border-y border-ink-300 bg-ink-50 py-4">
      <div className="flex w-max animate-marquee">
        {strip.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="text-graffiti text-2xl text-bone/15 md:text-3xl">{t}</span>
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
