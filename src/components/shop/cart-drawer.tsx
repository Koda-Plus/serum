'use client'

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/store/cart'
import { formatPLN } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, toggle, remove, updateQty, total, clear } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggle(false)}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l-4 border-acid bg-ink text-bone"
          >
            <div className="slash-divider" />
            <div className="flex items-center justify-between border-b border-ink-300 p-5">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-acid">// koszyk</div>
                <h3 className="text-graffiti text-3xl text-bone">Twój skład</h3>
              </div>
              <button
                type="button"
                onClick={() => toggle(false)}
                aria-label="Zamknij"
                className="rounded-sm border-2 border-bone p-2 text-bone transition hover:border-acid hover:text-acid"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={40} className="text-acid" />
                  <div className="text-graffiti text-2xl text-bone">Koszyk jest pusty</div>
                  <p className="max-w-xs text-sm text-bone/60">
                    Wrzuć bluzę Serum x Tempz albo winyl z półki. Wejdź na sklep.
                  </p>
                  <Link
                    href="/sklep"
                    onClick={() => toggle(false)}
                    className="text-graffiti bg-acid px-5 py-3 text-sm text-bone shadow-[4px_4px_0_#060706] transition-all hover:bg-acid-deep"
                  >
                    wejdź na sklep
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li key={i.slug + i.variant} className="flex gap-3 border border-ink-300 bg-ink-100 p-3">
                      <div className="h-20 w-20 shrink-0 overflow-hidden border border-ink-300 bg-ink">
                        <Image src={i.image} alt={i.name} width={80} height={80} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-graffiti text-sm leading-tight text-bone">{i.name}</div>
                        {i.variant && (
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
                            rozmiar: {i.variant}
                          </div>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-ink-300">
                            <button
                              type="button"
                              aria-label="mniej"
                              onClick={() => updateQty(i.slug, i.quantity - 1, i.variant)}
                              className="p-2 text-bone hover:bg-acid hover:text-bone"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="min-w-[28px] px-2 text-center font-mono text-sm">{i.quantity}</span>
                            <button
                              type="button"
                              aria-label="więcej"
                              onClick={() => updateQty(i.slug, i.quantity + 1, i.variant)}
                              className="p-2 text-bone hover:bg-acid hover:text-bone"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="text-graffiti text-acid">{formatPLN(i.price * i.quantity)}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(i.slug, i.variant)}
                        aria-label="Usuń"
                        className="self-start text-bone/50 transition-colors hover:text-magenta"
                      >
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink-300 bg-ink-50 p-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone/60">razem</span>
                  <span className="text-graffiti text-3xl text-acid">{formatPLN(total())}</span>
                </div>
                <div className="mb-3 text-xs text-bone/50">
                  Darmowa wysyłka od 299 zł / Płatność online / Dostawa 48h
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={clear}
                    className="border-2 border-ink-300 px-3 py-3 text-xs uppercase tracking-[0.2em] text-bone/60 transition hover:border-magenta hover:text-magenta"
                  >
                    wyczyść
                  </button>
                  <button
                    type="button"
                    className="text-graffiti flex-1 bg-gold px-4 py-3 text-sm text-ink shadow-[4px_4px_0_#060706] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-[#ffd666] hover:shadow-[6px_6px_0_#060706]"
                  >
                    zamawiam, {formatPLN(total())}
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
