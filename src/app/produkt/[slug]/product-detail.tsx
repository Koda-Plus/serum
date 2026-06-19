'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react'
import { Product } from '@/data/products'
import { Badge, PriceChip, BezBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/shop/product-card'
import { formatPLN, cn } from '@/lib/utils'
import { useCart } from '@/store/cart'

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const add = useCart((s) => s.add)
  const toggle = useCart((s) => s.toggle)
  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState<string | undefined>(product.sizes[0])
  const [added, setAdded] = useState(false)
  const hasDiscount = typeof product.oldPrice === 'number' && product.oldPrice > product.price

  function handleAdd() {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.image, variant: size })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const pillarHref =
    product.pillar === 'muzyka' ? '/muzyka' : product.pillar === 'street' ? '/street' : '/sklep'
  const pillarLabel =
    product.pillar === 'muzyka' ? 'Muzyka' : product.pillar === 'street' ? 'Street Gallery' : 'Sklep'

  return (
    <div className="mx-auto max-w-[1340px] px-4 py-8 lg:px-8 lg:py-12">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45">
        <Link href="/" className="hover:text-acid-light">Start</Link>
        <ChevronRight size={12} />
        <Link href={pillarHref} className="hover:text-acid-light">{pillarLabel}</Link>
        <ChevronRight size={12} />
        <span className="text-bone/70">{product.categoryLabel}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* gallery */}
        <div className="flex flex-col gap-3">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden border-2 border-ink-300 bg-ink-100"
          >
            <Image
              src={product.images[activeImg] ?? product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 680px"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex gap-2">{product.badge && <Badge label={product.badge} />}</div>
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'relative h-20 w-20 shrink-0 overflow-hidden border-2 transition-colors',
                    i === activeImg ? 'border-acid' : 'border-ink-300 hover:border-bone/40',
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div className="flex flex-col">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-acid-light">{product.categoryLabel}</div>
          <h1 className="text-graffiti mt-2 text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[0.95] text-bone">{product.name}</h1>

          <div className="mt-5 flex items-end gap-3">
            <PriceChip size="pdp">{formatPLN(product.price)}</PriceChip>
            {hasDiscount && (
              <span className="pb-1 font-mono text-sm text-bone/40 line-through">{formatPLN(product.oldPrice as number)}</span>
            )}
          </div>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone/75">{product.description}</p>

          {/* sizes */}
          {product.sizes.length > 0 && (
            <div className="mt-7">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/55">Rozmiar</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className="chip-toggle min-w-[48px] px-3 py-2 text-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              variant="bone"
              size="lg"
              onClick={handleAdd}
              success={added}
              successLabel="Dodano"
              className="min-w-[220px]"
            >
              <ShoppingBag size={18} /> Dodaj do koszyka
            </Button>
            <Button variant="ghost" size="lg" onClick={() => toggle(true)}>
              Koszyk
            </Button>
          </div>

          {/* brand voice – Ero's own words, designed as a quality stamp */}
          <div className="mt-7">
            <BezBadge />
          </div>

          {/* trust row */}
          <div className="mt-9 grid grid-cols-1 gap-3 border-t border-ink-300 pt-7 sm:grid-cols-3">
            <Trust icon={<Truck size={16} />} title="Wysyłka 48h" sub="Darmowa od 299 zł" />
            <Trust icon={<RotateCcw size={16} />} title="14 dni na zwrot" sub="Bez tłumaczeń" />
            <Trust icon={<ShieldCheck size={16} />} title="Oryginał" sub="Prosto od marki" />
          </div>

          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/35">
            {product.inStock ? 'Dostępny, wysyłka od ręki' : 'Chwilowo niedostępny'} /{' '}
            <a href={product.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-acid-light">
              serumsklep.pl ↗
            </a>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-graffiti mb-8 text-2xl text-bone md:text-3xl">
            Zobacz też<span className="text-acid-light">.</span>
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Trust({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-acid-light">{icon}</span>
      <div>
        <div className="text-graffiti text-sm text-bone">{title}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/45">{sub}</div>
      </div>
    </div>
  )
}
