const items = ['Darmowa wysyłka od 299 zł', 'Wysyłka 48h', 'Nowa kolekcja Eros One ’26']

export function Announcement() {
  return (
    <div className="border-b border-ink bg-acid text-bone">
      <div className="mx-auto flex max-w-[1340px] items-center justify-center gap-x-5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] sm:gap-x-10 sm:text-[11px]">
        {items.map((t, i) => (
          <span key={t} className={`flex items-center gap-x-5 sm:gap-x-10 ${i === 2 ? 'hidden sm:flex' : ''}`}>
            {i > 0 && <span className="h-1 w-1 bg-bone/50" aria-hidden />}
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
