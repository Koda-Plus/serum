import { productsByPillar } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { SectionHeading } from '@/components/sections/section-heading'

export function MusicStrip() {
  const items = productsByPillar('muzyka').slice(0, 5)
  return (
    <section className="relative overflow-hidden border-y border-ink-300 bg-ink-50">
      <div className="mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
        <SectionHeading kicker="Winyl / CD / Kaseta" title="Muzyka z półki" href="/muzyka" linkLabel="cała muzyka" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
