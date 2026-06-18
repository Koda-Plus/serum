'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import { products, type Product } from '@/data/products'
import { ButtonLink } from '@/components/ui/button'
import { Eyebrow, PriceChip, TagSticker } from '@/components/ui/badge'
import { formatPLN } from '@/lib/utils'
import { useCart } from '@/store/cart'

/**
 * SERUM × TEMPZ — a full-bleed Szczur mural ("na pełną pizdę"), with the collab
 * hoodies advertised right on the wall as a glass spec-rail. The mural is the
 * hero; the products are the payoff stuck onto it.
 */
export function FeaturedDrop() {
  const tempz = products.filter((p) => /tempz/i.test(p.name)).slice(0, 4)

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden border-y border-ink-300 bg-ink">
      {/* full-bleed mural */}
      <Image src="/images/serum/mural-3.jpg" alt="Mural Szczur, Serum Global" fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-transparent to-ink/60" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1340px] flex-col justify-end gap-10 px-4 pb-28 pt-28 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:px-8">
        {/* lockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <Eyebrow>Rozdział 00 · kolaboracja</Eyebrow>
            <TagSticker tone="acid" className="whitespace-nowrap text-sm">prosto ze ściany</TagSticker>
          </div>
          <h2 className="text-graffiti text-[clamp(3rem,11vw,7.5rem)] leading-[0.82] text-bone">
            SERUM <span className="text-acid text-glow-acid">×</span> TEMPZ
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/80 md:text-base">
            Szczur i Gołąb ze ścian Tembe4 × Hersk — przeniesione prosto z muralu na ciężką bawełnę.
            Limitowana kapsuła.
          </p>
          <ButtonLink href="/sklep?kat=bluzy" variant="violet" size="lg" className="mt-7">
            cała kapsuła <ArrowUpRight size={18} />
          </ButtonLink>
        </motion.div>

        {/* products advertised on the wall */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full border-2 border-acid/30 bg-ink/70 backdrop-blur-md lg:w-[400px]"
        >
          <div className="flex items-center justify-between border-b border-ink-300 px-4 py-3">
            <Eyebrow>kapsuła · 4 dropy</Eyebrow>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">limitowane</span>
          </div>
          <div className="flex flex-col divide-y divide-ink-300/70">
            {tempz.map((p) => (
              <CollabRow key={p.slug} product={p} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function CollabRow({ product }: { product: Product }) {
  const add = useCart((s) => s.add)
  return (
    <div className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-ink-100/50">
      <Link href={`/produkt/${product.slug}`} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-ink-300 bg-ink-100">
          <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-graffiti truncate text-sm leading-tight text-bone transition-colors group-hover:text-toxic">
            {product.name.replace(/^Bluza Serum x Tempz - /i, '')}
          </div>
          <PriceChip className="mt-1.5">{formatPLN(product.price)}</PriceChip>
        </div>
      </Link>
      <button
        type="button"
        aria-label={`Dodaj ${product.name} do koszyka`}
        onClick={() => add({ slug: product.slug, name: product.name, price: product.price, image: product.image, variant: product.sizes?.[0] })}
        className="flex h-9 w-9 shrink-0 items-center justify-center bg-acid text-bone shadow-[3px_3px_0_var(--color-shadow)] transition-all hover:bg-acid-deep active:translate-x-[1px] active:translate-y-[1px]"
      >
        <Plus size={16} strokeWidth={3} />
      </button>
    </div>
  )
}
