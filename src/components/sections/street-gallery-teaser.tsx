import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { murals } from '@/data/murals'
import { SectionHeading } from '@/components/sections/section-heading'

export function StreetGalleryTeaser() {
  const feat = murals.slice(0, 5)
  return (
    <section className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
      <SectionHeading kicker="Galeria / od 2007" title="Street Gallery" href="/street" linkLabel="cała galeria" />
      <p className="-mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-bone/65">
        Ściany, na których wszystko się zaczęło. Autorskie murale i charaktery Serum Global -
        oglądaj w galerii i zabierz na ścianę jako sygnowany print.
      </p>

      {/* mosaic */}
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
        {feat.map((m, i) => (
          <Link
            key={m.src}
            href="/street"
            className={`group relative overflow-hidden border-2 border-ink-300 transition-colors hover:border-acid ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <Image src={m.src} alt={m.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 p-3">
              <div className="text-graffiti text-sm text-bone md:text-lg">{m.title}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-acid">{m.credit} / {m.year}</div>
            </div>
            <ArrowUpRight size={16} className="absolute right-3 top-3 text-bone opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  )
}
