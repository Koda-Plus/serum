import type { Metadata } from 'next'
import Image from 'next/image'
import { productsByPillar } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { MuralGallery } from '@/components/sections/mural-gallery'
import { SectionHeading } from '@/components/sections/section-heading'
import { Splatter } from '@/components/brand/splatter'

export const metadata: Metadata = {
  title: 'Street Gallery',
  description: 'Autorskie murale i charaktery Serum Global oraz sygnowane printy z serii „EROS”.',
}

export default function StreetPage() {
  const prints = productsByPillar('street')

  return (
    <div>
      {/* hero */}
      <header className="relative min-h-[52vh] overflow-hidden border-b border-ink-300">
        <Image src="/images/serum/mural-2.jpg" alt="" fill priority aria-hidden className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
        <div className="noise-overlay absolute inset-0" />
        <Splatter className="right-0 top-10 w-[320px]" opacity={0.32} rotate={30} />
        <div className="relative mx-auto flex min-h-[52vh] max-w-[1340px] flex-col justify-end px-4 pb-12 lg:px-8">
          <div className="mb-3 inline-flex w-fit items-center gap-2 border border-acid/40 bg-ink/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-acid backdrop-blur-sm">
            galeria / od 2007
          </div>
          <h1 className="text-graffiti text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.86] text-bone text-glow-acid">
            STREET<br />GALLERY
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-bone/75">
            Tu zaczyna się Serum. Murale, charaktery i wildstyle malowane przez Erosa i ekipę -
            archiwum miasta, z którego wyrosła cała marka.
          </p>
        </div>
      </header>

      {/* mural gallery */}
      <section className="mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
        <SectionHeading kicker="Na ścianach" title="Murale & charaktery" />
        <MuralGallery />
      </section>

      {/* prints for sale */}
      <section className="border-t border-ink-300 bg-ink-50">
        <div className="mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
          <SectionHeading kicker={`Seria „EROS” / ${prints.length} prac`} title="Weź to na ścianę" />
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
