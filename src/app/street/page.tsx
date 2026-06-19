import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { productsByPillar } from '@/data/products'
import { murals } from '@/data/murals'
import { ProductCard } from '@/components/shop/product-card'
import { MuralGallery } from '@/components/sections/mural-gallery'
import { SectionHeading } from '@/components/sections/section-heading'
import { Eyebrow } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Street Gallery',
  description: 'Autorskie murale i charaktery Serum Global oraz sygnowane printy z serii „EROS”.',
}

export default function StreetPage() {
  const prints = productsByPillar('street')
  const meta = [
    [`${murals.length}`, 'ścian w archiwum'],
    ['2007', 'od kiedy malujemy'],
    [`${prints.length}`, 'sygnowanych printów'],
  ]

  return (
    <div>
      {/* hero */}
      <header className="relative min-h-[68svh] overflow-hidden border-b border-ink-300">
        <Image src="/images/serum/mural-2.jpg" alt="" fill priority aria-hidden className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/20 to-transparent" />
        <div className="noise-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[68svh] max-w-[1340px] flex-col justify-end px-4 pb-10 pt-28 lg:px-8">
          <Eyebrow over className="mb-4 w-fit">galeria · od 2007</Eyebrow>
          <h1 className="text-graffiti text-[clamp(3rem,11vw,8rem)] leading-[0.84] text-bone">
            STREET <span className="text-acid-light text-glow-acid">GALLERY</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/75">
            Tu zaczyna się Serum. Murale, charaktery i wildstyle malowane przez Erosa i ekipę –
            archiwum miasta, z którego wyrosła cała marka.
          </p>

          {/* meta strip */}
          <div className="mt-8 flex flex-wrap items-stretch gap-x-10 gap-y-4 border-t border-bone/15 pt-6">
            {meta.map(([n, l]) => (
              <div key={l}>
                <div className="text-graffiti text-3xl leading-none text-acid-light">{n}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55">{l}</div>
              </div>
            ))}
            <Link
              href="#printy"
              className="font-semibold uppercase tracking-wide ml-auto hidden items-center gap-2 self-end border-b-2 border-acid pb-1 text-sm text-bone transition-colors hover:text-acid-light sm:inline-flex"
            >
              przewiń do printów <ArrowDown size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* mural gallery */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-24">
        <SectionHeading kicker={`Na ścianach · ${murals.length} prac`} title="Murale & charaktery" />
        <MuralGallery />
      </section>

      {/* prints for sale */}
      <section id="printy" className="scroll-mt-24 border-t border-ink-300 bg-ink-50">
        <div className="mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-24">
          <SectionHeading kicker={`Seria „EROS” · ${prints.length} prac`} title="Weź to na ścianę" href="/sklep" linkLabel="cały sklep" />
          <p className="-mt-4 mb-8 max-w-2xl text-sm leading-relaxed text-bone/65">
            Sygnowane printy w jakości galeryjnej. Kawałek ulicy w ramie, limitowane nakłady prosto od Erosa.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {prints.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
