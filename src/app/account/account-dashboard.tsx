'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Heart,
  Lock,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  Truck,
} from 'lucide-react'
import { productBySlug, type Product } from '@/data/products'
import { ranks, rankForPoints, progressToNext } from '@/data/loyalty'
import { Button, ButtonLink } from '@/components/ui/button'
import { Eyebrow, MetaChip } from '@/components/ui/badge'
import { cn, formatPLN } from '@/lib/utils'
import { useCart } from '@/store/cart'

/**
 * Demo user dashboard ("Moje konto") for the pitch – no real auth, all data is
 * the mock account below. The point of the page is to SHOW the logged-in
 * experience and make the Skład Serum loyalty payoff tangible: rank, points,
 * the standing −10%, free shipping and how much the member has already saved.
 */

const USER = {
  name: 'Kuba',
  initials: 'KW',
  handle: '@szczur_wwa',
  email: 'kuba.w@example.com',
  city: 'Warszawa',
  memberSince: 2023,
  points: 975, // 1 zł = 1 pkt → matches lifetime order totals below
  referralCode: 'KUBA-SERUM',
}

const WISHLIST = ['bluza-serum-x-tempz-golab-small-czarna', 'serum-baggy-szary', 'snap-serum-global-czarne-logo']

interface OrderSeed {
  id: string
  date: string
  status: 'transit' | 'done'
  itemSlugs: string[]
}

const ORDER_SEEDS: OrderSeed[] = [
  { id: 'SG-2026-0142', date: '12.06.2026', status: 'transit', itemSlugs: ['bluza-eros-one-26', 'pasek-serum-czarny-bialy'] },
  { id: 'SG-2026-0098', date: '28.04.2026', status: 'done', itemSlugs: ['ts-premium-eros-one-26-bialy', 'ts-serum-global-eros-czarny-2'] },
  { id: 'SG-2025-0731', date: '15.11.2025', status: 'done', itemSlugs: ['bluza-serum-x-tempz-szczur-big-czarna'] },
]

// active loyalty perks for the member's current standing (curated – the live
// −10% supersedes the Writer −5%, so we don't list both)
const ACTIVE_PERKS = [
  '−10% na każdy zakup — na stałe',
  'Darmowa wysyłka — zawsze, bez progu',
  'Dropy 24h przed wszystkimi',
  'Kod powitalny i newsletter ekipy',
]

const DISCOUNT = 0.1

export function AccountDashboard() {
  const orders = ORDER_SEEDS.map((o) => {
    const items = o.itemSlugs.map(productBySlug).filter(Boolean) as Product[]
    const subtotal = items.reduce((s, p) => s + p.price, 0)
    const discount = Math.round(subtotal * DISCOUNT)
    return { ...o, items, subtotal, discount, paid: subtotal - discount }
  })
  const savedTotal = orders.reduce((s, o) => s + o.discount, 0)
  const wishlist = WISHLIST.map(productBySlug).filter(Boolean) as Product[]

  const { current, next, index } = rankForPoints(USER.points)
  const pct = Math.round(progressToNext(USER.points) * 100)
  const toNext = next ? next.pts - USER.points : 0

  return (
    <div className="bg-ink">
      {/* greeting band */}
      <header className="noise-overlay relative overflow-hidden border-b border-ink-300 bg-ink-50">
        <div className="relative mx-auto max-w-[1340px] px-4 py-12 lg:px-8 lg:py-16">
          <Eyebrow className="mb-4">Moje konto · Skład Serum</Eyebrow>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-graffiti grid h-16 w-16 shrink-0 place-items-center border-2 border-acid bg-acid text-2xl text-bone shadow-[4px_4px_0_var(--color-shadow)]">
                {USER.initials}
              </span>
              <div>
                <h1 className="text-graffiti text-[clamp(2rem,5vw,3.2rem)] leading-none text-bone">Cześć, {USER.name}</h1>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/45">
                  {USER.handle} · w składzie od {USER.memberSince} · {USER.city}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink href="/sklep" variant="violet" size="md">
                Kupuj dalej <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href="/" variant="muted" size="md">
                <LogOut size={15} /> Wyloguj
              </ButtonLink>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1340px] space-y-12 px-4 py-12 lg:px-8 lg:py-16">
        {/* stat row */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Punkty" value={USER.points.toLocaleString('pl-PL')} sub="1 zł = 1 punkt" />
          <Stat label="Ranga" value={current.name} sub="Skład Serum" accent />
          <Stat label="Zaoszczędzone" value={`${savedTotal} zł`} sub="dzięki rabatom" />
          <Stat label="Zamówienia" value={orders.length} sub={`od ${USER.memberSince}`} />
        </div>

        {/* loyalty centerpiece + benefits */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* BOMBER black-and-white rank card */}
          <div className="relative overflow-hidden border-2 border-bone/25 bg-[#050406] p-6 shadow-[6px_6px_0_var(--color-shadow)] lg:p-8">
            <div aria-hidden className="text-graffiti pointer-events-none absolute -right-3 -top-8 select-none text-[8rem] leading-none text-bone/[0.04]">
              {current.name}
            </div>

            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-bone/45">Twoja ranga w składzie</div>
                <h2 className="text-graffiti mt-1 text-[clamp(2.4rem,6vw,3.6rem)] leading-none text-bone">{current.name}</h2>
                <div className="mt-1.5 text-sm italic text-bone/55">{current.tagline}</div>
              </div>
              <div className="border-2 border-bone/30 bg-bone px-3.5 py-2 text-center text-ink">
                <div className="text-graffiti text-3xl leading-none">−10%</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em]">na stałe</div>
              </div>
            </div>

            {/* points + progress */}
            <div className="relative mt-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-graffiti text-4xl leading-none text-bone">{USER.points.toLocaleString('pl-PL')}</span>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45">punktów</span>
                </div>
                {next && (
                  <div className="text-right font-mono text-[11px] uppercase leading-tight tracking-[0.16em] text-bone/45">
                    jeszcze <span className="text-bone">{toNext} pkt</span>
                    <br />
                    do kolejnej rangi
                  </div>
                )}
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden border border-bone/20 bg-ink-200">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full bg-bone"
                />
              </div>
            </div>

            {/* rank ladder */}
            <div className="relative mt-6 grid grid-cols-4 gap-2">
              {ranks.map((r, i) => {
                const unlocked = USER.points >= r.pts
                const isCurrent = i === index
                return (
                  <div
                    key={r.key}
                    className={cn(
                      'flex flex-col items-center gap-1 border px-1.5 py-2.5 text-center transition-colors',
                      isCurrent ? 'border-bone bg-bone/10' : unlocked ? 'border-bone/30' : 'border-ink-300 opacity-55',
                    )}
                  >
                    <span className="text-graffiti text-sm leading-none text-bone">{r.tbd ? '???' : r.name}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-bone/40">{r.gate}</span>
                    {unlocked ? <Check size={13} className="text-bone" strokeWidth={3} /> : <Lock size={12} className="text-bone/40" />}
                  </div>
                )
              })}
            </div>
          </div>

          {/* benefits */}
          <div className="flex flex-col gap-6">
            <div className="border-2 border-acid/40 bg-ink/40 p-5">
              <Eyebrow className="mb-3">Korzyści · aktywne teraz</Eyebrow>
              <ul className="space-y-2.5">
                {ACTIVE_PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-bone/85">
                    <Check size={15} className="mt-0.5 shrink-0 text-acid-light" strokeWidth={3} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-1 flex-col border-2 border-dashed border-ink-400 bg-ink/25 p-5">
              <Eyebrow className="mb-3">Co dalej · {toNext} pkt</Eyebrow>
              <p className="text-[14px] leading-relaxed text-bone/60">
                Wbij w kolejną rangę i odblokuj jeszcze większy rabat na zawsze plus niespodzianki dla ekipy.
                Nazwę rangi jeszcze kombinujemy.
              </p>
              <ButtonLink href="/sklep" variant="ghost" size="sm" className="mt-4 self-start">
                Dobij punkty <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* discount + referral */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 border-2 border-ink-300 bg-ink/40 p-5">
            <span className="text-graffiti grid h-14 w-14 shrink-0 place-items-center border-2 border-acid bg-acid/15 text-acid-light">
              −10%
            </span>
            <div>
              <div className="text-graffiti text-lg text-bone">Stały rabat składu</div>
              <p className="mt-1 text-[13px] leading-snug text-bone/55">Nalicza się automatycznie w koszyku na każde zamówienie.</p>
            </div>
          </div>
          <div className="border-2 border-ink-300 bg-ink/40 p-5">
            <Eyebrow className="mb-2.5">Poleć ekipie</Eyebrow>
            <CopyCode code={USER.referralCode} />
            <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/45">
              Ziom dostaje −10% na 1. zakup, Ty zgarniasz punkty.
            </p>
          </div>
        </section>

        {/* orders */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package size={20} className="text-acid-light" />
              <h2 className="text-graffiti text-2xl text-bone md:text-3xl">Twoje zamówienia</h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{orders.length} zamówienia</span>
          </div>
          <div className="space-y-4">
            {orders.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        </section>

        {/* wishlist + account data */}
        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Heart size={18} className="text-acid-light" />
              <h2 className="text-graffiti text-xl text-bone md:text-2xl">Lista życzeń</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {wishlist.map((p) => (
                <Link key={p.slug} href={`/produkt/${p.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden border-2 border-ink-300 bg-ink-100 transition-colors group-hover:border-acid">
                    <Image src={p.image} alt={p.name} fill sizes="200px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="text-graffiti mt-2 text-[13px] leading-tight text-bone transition-colors group-hover:text-acid-light">{p.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-bone/50">{formatPLN(p.price)}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <MapPin size={18} className="text-acid-light" />
              <h2 className="text-graffiti text-xl text-bone md:text-2xl">Dane konta</h2>
            </div>
            <div className="space-y-3 border-2 border-ink-300 bg-ink/40 p-5">
              <DataRow label="Imię" value={`${USER.name} · ${USER.handle}`} />
              <DataRow label="E-mail" value={USER.email} />
              <DataRow label="Adres" value={`${USER.city}, Polska`} />
              <DataRow label="W składzie od" value={String(USER.memberSince)} />
              <Button variant="muted" size="sm" className="mt-1 w-full">Edytuj dane</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- subcomponents */

function Stat({ label, value, sub, accent = false }: { label: string; value: string | number; sub: string; accent?: boolean }) {
  return (
    <div className="border-2 border-ink-300 bg-ink/40 p-4 lg:p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">{label}</div>
      <div className={cn('text-graffiti mt-1.5 text-2xl leading-none lg:text-3xl', accent ? 'text-acid-light' : 'text-bone')}>{value}</div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/35">{sub}</div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-ink-300 pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40">{label}</span>
      <span className="text-right text-sm text-bone/85">{value}</span>
    </div>
  )
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable – ignore in demo */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center justify-between gap-3 border-2 border-dashed border-acid/50 bg-ink px-3.5 py-2.5 transition-colors hover:border-acid"
    >
      <span className="text-graffiti text-lg tracking-[0.06em] text-bone">{code}</span>
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-acid-light">
        {copied ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
        {copied ? 'skopiowano' : 'kopiuj'}
      </span>
    </button>
  )
}

function OrderCard({
  order,
}: {
  order: { id: string; date: string; status: 'transit' | 'done'; items: Product[]; subtotal: number; discount: number; paid: number }
}) {
  const add = useCart((s) => s.add)
  const reorder = () =>
    order.items.forEach((p) => add({ slug: p.slug, name: p.name, price: p.price, image: p.image, variant: p.sizes?.[0] }))

  return (
    <div className="border-2 border-ink-300 bg-ink/40">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-ink-300 px-4 py-3 lg:px-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40">Zamówienie</span>
          <span className="text-graffiti text-base text-bone">#{order.id}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40">{order.date}</span>
          {order.status === 'transit' ? (
            <span className="inline-flex items-center gap-1.5 bg-acid px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
              <Truck size={12} /> W drodze
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 border border-ink-300 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/55">
              <Check size={12} strokeWidth={3} /> Dostarczone
            </span>
          )}
        </div>
      </div>

      {/* body */}
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:px-5">
        <div className="space-y-3">
          {order.items.map((p) => (
            <Link key={p.slug} href={`/produkt/${p.slug}`} className="group flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-ink-300 bg-ink-100">
                <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-graffiti truncate text-[14px] leading-tight text-bone transition-colors group-hover:text-acid-light">{p.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <MetaChip>{p.categoryLabel}</MetaChip>
                  <span className="font-mono text-[11px] text-bone/50">{formatPLN(p.price)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* totals + actions */}
        <div className="border-t border-ink-300 pt-4 lg:w-64 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="space-y-1.5 font-mono text-[12px]">
            <div className="flex justify-between text-bone/50">
              <span>Wartość</span>
              <span>{formatPLN(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-acid-light">
              <span>−10% Skład Serum</span>
              <span>−{formatPLN(order.discount)}</span>
            </div>
            <div className="flex justify-between text-bone/50">
              <span>Wysyłka</span>
              <span className="text-bone/70">0 zł</span>
            </div>
            <div className="flex justify-between border-t border-ink-300 pt-2 text-bone">
              <span className="uppercase tracking-[0.12em]">Zapłacono</span>
              <span className="text-graffiti text-base">{formatPLN(order.paid)}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="violet" size="sm" className="flex-1" onClick={reorder}>
              <RotateCcw size={14} /> Zamów ponownie
            </Button>
            <ButtonLink href={`/produkt/${order.items[0]?.slug ?? ''}`} variant="muted" size="sm" aria-label="Szczegóły zamówienia">
              <ArrowUpRight size={15} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}
