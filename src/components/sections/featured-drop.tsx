import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { Splatter } from '@/components/brand/splatter'

export function FeaturedDrop() {
  const tempz = products.filter((p) => /tempz/i.test(p.name)).slice(0, 4)

  return (
    <section className="relative overflow-hidden border-y border-ink-300 bg-ink-50">
      <Splatter className="right-[-40px] top-[-30px] w-[300px]" opacity={0.3} rotate={140} />
      <div className="relative mx-auto grid max-w-[1340px] gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8 lg:py-20">
        {/* story panel, the rat mural that inspired the capsule */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink-300 frame-ink">
            <Image src="/images/serum/mural-3.jpg" alt="Mural Szczur, Serum Global" fill className="object-cover" sizes="(max-width:1024px) 100vw, 540px" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-acid">// kolaboracja</div>
              <h2 className="text-graffiti text-[clamp(2.4rem,6vw,4rem)] leading-[0.9] text-bone">
                SERUM <span className="text-acid">×</span> TEMPZ
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/75">
                Postacie ze ścian, Szczur i Gołąb, przeniesione prosto z muralu na ciężką bawełnę.
                Limitowana kapsuła z graffiti Tempza.
              </p>
              <Link
                href="/sklep?kat=bluzy"
                className="text-graffiti mt-5 inline-flex items-center gap-1.5 bg-gold px-4 py-2.5 text-sm text-ink shadow-[4px_4px_0_#060706] transition-all hover:bg-[#ffd666]"
              >
                cała kapsuła <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 self-center">
          {tempz.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
