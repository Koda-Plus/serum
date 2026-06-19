'use client'

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/store/cart'
import { formatPLN, cn } from '@/lib/utils'
import { Button, ButtonLink, IconButton } from '@/components/ui/button'
import { FREE_SHIPPING_PLN, pointsForSpend } from '@/data/loyalty'
import { ArrowRight } from 'lucide-react'

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
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-acid-light">// koszyk</div>
                <h3 className="text-graffiti text-3xl text-bone">Twój skład</h3>
              </div>
              <IconButton variant="outline" aria-label="Zamknij" onClick={() => toggle(false)}>
                <X size={18} />
              </IconButton>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={40} className="text-acid-light" />
                  <div className="text-graffiti text-2xl text-bone">Koszyk jest pusty</div>
                  <p className="max-w-xs text-sm text-bone/60">
                    Wrzuć bluzę Serum x Tempz albo winyl z półki. Wejdź na sklep.
                  </p>
                  <ButtonLink href="/sklep" variant="violet" size="md" onClick={() => toggle(false)}>
                    wejdź na sklep
                  </ButtonLink>
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
                          <div className="text-graffiti text-acid-light">{formatPLN(i.price * i.quantity)}</div>
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
                <CartLoyaltyNudge
                  total={total()}
                  count={items.reduce((n, i) => n + i.quantity, 0)}
                  onClose={() => toggle(false)}
                />
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone/60">razem</span>
                  <span className="text-graffiti text-3xl text-acid-light">{formatPLN(total())}</span>
                </div>
                <div className="mb-3 text-xs text-bone/50">Płatność online / Dostawa 48h / 14 dni na zwrot</div>
                <div className="flex gap-2">
                  <Button variant="danger" size="sm" onClick={clear}>
                    wyczyść
                  </Button>
                  <Button variant="bone" size="md" className="flex-1">
                    zamawiam, {formatPLN(total())}
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

/** The "buy one more" mechanic: free-shipping progress + points earned toward the
 *  Skład Serum club. Copy adapts to the cart: below/above the free-shipping
 *  threshold, and one piece vs a fuller basket (so it never hardcodes "po jednej"
 *  when you already have several). */
function CartLoyaltyNudge({ total, count, onClose }: { total: number; count: number; onClose: () => void }) {
  const remaining = Math.max(0, FREE_SHIPPING_PLN - total)
  const pct = Math.min(100, (total / FREE_SHIPPING_PLN) * 100)
  const pts = pointsForSpend(total)
  const free = remaining <= 0
  const solo = count <= 1

  return (
    <a
      href="/#klub"
      onClick={onClose}
      className="group mb-4 block border border-acid/30 bg-ink/60 p-3 transition-colors hover:border-acid/60"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-acid-light">Skład Serum</span>
        <span className="text-bone/55">ten zakup = +{pts.toLocaleString('pl-PL')} pkt</span>
      </div>
      <p className="mt-2 text-[12px] leading-snug text-bone/75">
        {free ? (
          solo ? (
            <>
              <span className="text-acid-light">Darmowa wysyłka odblokowana.</span> Nie zawijaj się po jednej –
              dorzuć drugą sztukę, każda to punkty w składzie.
            </>
          ) : (
            <>
              <span className="text-acid-light">Masz darmową wysyłkę.</span> Cały skład gotowy – każda kolejna
              sztuka to dodatkowe punkty na koncie.
            </>
          )
        ) : solo ? (
          <>
            Dobierz za <span className="text-bone">{formatPLN(remaining)}</span> i łapiesz{' '}
            <span className="text-acid-light">darmową wysyłkę</span> – nie zawijaj się po jednej.
          </>
        ) : (
          <>
            Jeszcze <span className="text-bone">{formatPLN(remaining)}</span> i cały skład jedzie z{' '}
            <span className="text-acid-light">darmową wysyłką</span>.
          </>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden bg-ink-200">
        <div className={cn('h-full bg-gradient-to-r from-acid to-toxic transition-[width]')} style={{ width: `${pct}%` }} />
      </div>
      <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55 transition-colors group-hover:text-acid-light">
        Rangi składu <ArrowRight size={11} />
      </span>
    </a>
  )
}
