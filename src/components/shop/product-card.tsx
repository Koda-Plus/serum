'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Product } from '@/data/products'
import { Badge, MetaChip, DiscountChip, PriceChip } from '@/components/ui/badge'
import { formatPLN, cn } from '@/lib/utils'
import { useCart } from '@/store/cart'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add)
  const hasDiscount = typeof product.oldPrice === 'number' && product.oldPrice > product.price
  const pct = hasDiscount ? Math.round((1 - product.price / (product.oldPrice as number)) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.04 }}
      className="group relative flex h-full flex-col"
    >
      <Link href={`/produkt/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden border-2 border-ink-300 bg-ink-100 transition-all duration-300 group-hover:border-acid">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
            className={cn(
              'object-cover transition-transform duration-500 group-hover:scale-[1.05]',
              !product.inStock && 'opacity-50 grayscale',
            )}
          />
          {/* badges (sold-out trumps everything) */}
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {!product.inStock ? <Badge label="WYPRZEDANE" /> : product.badge && <Badge label={product.badge} />}
          </div>
          {/* category chip */}
          <div className="absolute right-2.5 top-2.5">
            <MetaChip>{product.categoryLabel}</MetaChip>
          </div>
          {/* bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent" />
          {/* quick add */}
          {product.inStock && (
            <button
              type="button"
              aria-label="Dodaj do koszyka"
              onClick={(e) => {
                e.preventDefault()
                add({
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  variant: product.sizes?.[0],
                })
              }}
              className="absolute bottom-2.5 right-2.5 flex h-10 w-10 translate-y-2 items-center justify-center bg-acid text-bone opacity-0 shadow-[3px_3px_0_var(--color-shadow)] transition-all duration-300 hover:bg-acid-deep group-hover:translate-y-0 group-hover:opacity-100"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-1 flex-col">
          <h3 className={cn('text-graffiti text-[15px] leading-[1.05] text-bone transition-colors group-hover:text-acid-light sm:text-base')}>
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <PriceChip>{formatPLN(product.price)}</PriceChip>
            {hasDiscount && (
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-bone/40 line-through">{formatPLN(product.oldPrice as number)}</span>
                <DiscountChip pct={pct} />
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
