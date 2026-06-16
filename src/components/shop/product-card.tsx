'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Product, Accent } from '@/data/products'
import { Badge } from '@/components/ui/badge'
import { formatPLN, cn } from '@/lib/utils'
import { useCart } from '@/store/cart'

export const accentBg: Record<Accent, string> = {
  acid: 'bg-acid text-bone',
  blue: 'bg-blue text-ink',
  violet: 'bg-violet text-ink',
  magenta: 'bg-magenta text-bone',
  gold: 'bg-gold text-ink',
  chrome: 'bg-chrome text-ink',
}
export const accentText: Record<Accent, string> = {
  acid: 'group-hover:text-acid',
  blue: 'group-hover:text-blue',
  violet: 'group-hover:text-violet',
  magenta: 'group-hover:text-magenta',
  gold: 'group-hover:text-gold',
  chrome: 'group-hover:text-chrome',
}
export const accentRing: Record<Accent, string> = {
  acid: 'group-hover:border-acid',
  blue: 'group-hover:border-blue',
  violet: 'group-hover:border-violet',
  magenta: 'group-hover:border-magenta',
  gold: 'group-hover:border-gold',
  chrome: 'group-hover:border-chrome',
}

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
        <div
          className={cn(
            'relative aspect-square overflow-hidden border-2 border-ink-300 bg-ink-100 transition-all duration-300',
            accentRing[product.accent],
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          {/* badges */}
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {product.badge && <Badge label={product.badge} />}
          </div>
          {/* category chip */}
          <div className="absolute right-2.5 top-2.5">
            <span className="bg-ink/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/75 backdrop-blur-sm">
              {product.categoryLabel}
            </span>
          </div>
          {/* bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/70 to-transparent" />
          {/* quick add */}
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
            className="absolute bottom-2.5 right-2.5 flex h-10 w-10 translate-y-2 items-center justify-center bg-gold text-ink opacity-0 shadow-[3px_3px_0_#060706] transition-all duration-300 hover:bg-[#ffd666] group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="mt-3 flex flex-1 flex-col">
          <h3 className={cn('text-graffiti text-[15px] leading-[1.05] text-bone transition-colors sm:text-base', accentText[product.accent])}>
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-2 pt-3">
            <span className={cn('text-graffiti inline-flex items-center gap-1.5 px-2.5 py-1 text-sm shadow-[2px_2px_0_#060706]', accentBg[product.accent])}>
              {formatPLN(product.price)}
            </span>
            {hasDiscount && (
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[11px] text-bone/40 line-through">{formatPLN(product.oldPrice as number)}</span>
                <span className="bg-magenta px-1.5 py-0.5 font-mono text-[10px] font-bold text-bone">−{pct}%</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
