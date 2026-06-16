import { products } from '@/data/products'
import { ProductCard } from '@/components/shop/product-card'
import { SectionHeading } from '@/components/sections/section-heading'

export function NewCollection() {
  const items = products
    .filter((p) => p.newCollection && p.pillar === 'ubrania')
    .slice(0, 8)

  return (
    <section className="relative mx-auto max-w-[1340px] px-4 py-16 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Eros One ’26"
        title="Najnowsza kolekcja"
        href="/sklep"
        linkLabel="cały sklep"
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
