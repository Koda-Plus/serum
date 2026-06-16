import Image from 'next/image'
import { Splatter } from '@/components/brand/splatter'

const stats = [
  ['2007', 'rok założenia'],
  ['4', 'światy marki'],
  ['∞', 'ścian w mieście'],
  ['48H', 'wysyłka'],
]

export function Manifesto() {
  return (
    <section id="manifest" className="relative overflow-hidden bg-ink">
      <Image src="/images/serum/mural-eros-chrome.jpg" alt="" fill aria-hidden className="object-cover opacity-20" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      <Splatter className="left-1/2 top-8 w-[380px] -translate-x-1/2" opacity={0.22} />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center lg:py-28">
        <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">
          <span className="h-2 w-2 bg-acid" /> manifest
        </div>
        <h2 className="text-graffiti text-[clamp(2rem,6vw,4rem)] leading-[1.02] text-bone">
          Marka, która <span className="text-acid">wyrosła ze ściany</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone/75">
          Serum Global zaczęło się od graffiti, od nocy z puszką i porannego podziwiania świeżego
          piece&apos;a. Od 2007 roku zamieniamy ten język w ubrania, muzykę i sztukę. Nie sprzedajemy
          trendu. Sprzedajemy kawałek miasta, który nosisz na sobie.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="border border-ink-300 bg-ink-100/70 px-3 py-5 backdrop-blur-sm">
              <div className="text-graffiti text-4xl text-acid">{n}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
