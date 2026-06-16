import { productsByPillar } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { SectionHeading } from '@/components/sections/section-heading'

export function GadgetsStrip() {
  const items = productsByPillar('gadzety')
    .slice()
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
  return (
    <section className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
      <SectionHeading kicker="Detale" title="Gadżety" href="/sklep?kat=gadzety" linkLabel="wszystkie gadżety" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
