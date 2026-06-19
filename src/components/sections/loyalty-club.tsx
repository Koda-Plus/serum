import { ArrowRight, Check, SprayCan } from 'lucide-react'
import { ranks, accentText, accentBorder, type Rank } from '@/data/loyalty'
import { ButtonLink } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * "SKŁAD SERUM" – the loyalty club (crew framing). Points per złoty spent, ranks
 * follow a graffiti/crew progression. The point: make the upside of buying a
 * second/third piece visible and aspirational. See src/data/loyalty.ts.
 */
export function LoyaltyClub() {
  return (
    <section id="klub" className="noise-overlay relative overflow-hidden border-t border-ink-300 bg-ink-50">

      <div className="relative mx-auto max-w-[1340px] px-4 py-20 lg:px-8 lg:py-28">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mb-3 justify-center">Program ekipy · od 2007</Eyebrow>
          <h2 className="text-graffiti text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.88] text-bone">
            Skład <span className="text-acid-light text-glow-acid">Serum</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-bone/70">
            Każdy zakup zgarnia punkty. 1 zł = <span className="text-acid-light">1 punkt</span> na koncie –
            zbierasz, wbijasz w rangi i odblokowujesz rabaty, które zostają z Tobą na stałe.
            Im więcej nosisz, tym wyżej w ekipie.
          </p>
        </div>

        {/* how it works */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ['01', 'Kupujesz', 'Bluza, płyta, czapka – co weźmiesz, to punkty.'],
            ['02', 'Zbierasz punkty', '1 zł = 1 pkt. Pełny set = podwójne punkty.'],
            ['03', 'Wbijasz wyżej', 'Wyższa ranga = większy rabat na zawsze.'],
          ].map(([n, t, d]) => (
            <div key={n} className="border border-ink-300 bg-ink/60 p-4 backdrop-blur-sm">
              <div className="text-graffiti text-stroke-acid text-3xl leading-none">{n}</div>
              <div className="text-graffiti mt-2 text-base text-bone">{t}</div>
              <div className="mt-1 text-[13px] leading-snug text-bone/60">{d}</div>
            </div>
          ))}
        </div>

        {/* rank ladder */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ranks.map((r, i) => (
            <RankCard key={r.key} rank={r} step={i} />
          ))}
        </div>

        {/* CTA band */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-2 border-acid/40 bg-ink/60 px-6 py-7 backdrop-blur-sm md:flex-row lg:px-10">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-acid bg-ink text-acid-light">
              <SprayCan size={22} />
            </span>
            <div>
              <div className="text-graffiti text-xl text-bone md:text-2xl">Wbij do składu. Zero opłat.</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/55">
                Powitalny kod −10% leci od razu po założeniu konta
              </div>
            </div>
          </div>
          <ButtonLink href="/sklep" variant="bone" size="lg" className="shrink-0">
            Dołącz i zbieraj <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

function RankCard({ rank, step }: { rank: Rank; step: number }) {
  const total = 4

  // placeholder rank – name/benefits not decided yet: just a big "X"
  if (rank.tbd) {
    return (
      <div className="flex min-h-[220px] items-center justify-center border-2 border-dashed border-ink-400 bg-ink/40 backdrop-blur-sm">
        <span className="text-graffiti text-stroke-acid text-7xl leading-none text-bone/15">X</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col border-2 p-5 backdrop-blur-sm transition-all hover:-translate-y-1',
        // BOMBER is the black-and-white sleeve: a near-black card with a hard
        // shadow, the rest stay on the translucent ink panel.
        rank.accent === 'mono' ? 'bg-[#050406] shadow-[6px_6px_0_var(--color-shadow)]' : 'bg-ink/70',
        accentBorder[rank.accent],
        rank.accent === 'bone' && 'shadow-[6px_6px_0_var(--color-shadow)]',
      )}
    >
      {/* rising rank meter – each tier a bit fuller, so the climb reads visually */}
      <div className="absolute right-0 top-0 h-full w-1 bg-ink-200">
        <div
          className={cn('absolute bottom-0 left-0 w-full', accentText[rank.accent])}
          style={{ height: `${((step + 1) / total) * 100}%`, backgroundColor: 'currentColor' }}
        />
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/45">
          Ranga {String(step + 1).padStart(2, '0')}
        </span>
        <span className={cn('font-mono text-[10px] uppercase tracking-[0.16em]', accentText[rank.accent])}>{rank.gate}</span>
      </div>

      <h3 className={cn('text-graffiti mt-1 text-[clamp(1.6rem,3vw,2.2rem)] leading-none', accentText[rank.accent])}>
        {rank.name}
      </h3>
      <p className="mt-1.5 text-[13px] italic leading-snug text-bone/55">{rank.tagline}</p>

      <ul className="mt-4 space-y-2 border-t border-ink-300 pt-4">
        {rank.perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-bone/85">
            <Check size={14} className={cn('mt-0.5 shrink-0', accentText[rank.accent])} strokeWidth={3} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
