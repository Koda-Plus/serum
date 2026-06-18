'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { mainNav } from '@/data/nav'
import { SerumLogo } from '@/components/brand/logo'
import { useCart } from '@/store/cart'
import { cn } from '@/lib/utils'
import { IconButton } from '@/components/ui/button'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const count = useCart((s) => s.count())
  const toggle = useCart((s) => s.toggle)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-ink-300 transition-all duration-300',
        scrolled ? 'bg-ink/95 backdrop-blur-md' : 'bg-ink',
      )}
    >
      <div className="mx-auto flex max-w-[1340px] items-center gap-5 px-4 py-3.5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Serum Global, strona główna">
          <SerumLogo className="h-10 md:h-12" />
        </Link>
        <span className="hidden items-center rounded-sm border border-acid/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.28em] text-acid xl:inline-flex">
          streetwear / graffiti / since 2007
        </span>

        <div className="ml-auto flex items-center gap-2">
          <nav className="mr-1 hidden items-center gap-1 lg:flex">
            {mainNav.map((l) =>
              l.highlight ? (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-graffiti group relative ml-1 inline-flex items-center gap-1.5 bg-acid px-3 py-2 text-sm text-bone shadow-[3px_3px_0_var(--color-shadow)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-acid-deep hover:shadow-[4px_4px_0_var(--color-shadow)]"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bone/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bone" />
                  </span>
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-graffiti group relative px-3 py-2 text-sm text-bone transition-colors hover:text-acid"
                >
                  {l.label}
                  <span className="absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 bg-acid transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ),
            )}
          </nav>

          <IconButton variant="muted" size="sm" aria-label="Szukaj" className="hidden md:inline-flex">
            <Search size={18} />
          </IconButton>
          <button
            type="button"
            onClick={() => toggle(true)}
            className="text-graffiti relative flex items-center gap-2 border-2 border-bone px-3 py-2 text-xs text-bone transition-all hover:border-acid hover:text-acid"
            aria-label="Koszyk"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">koszyk</span>
            <span
              suppressHydrationWarning
              className="flex h-5 min-w-[20px] items-center justify-center bg-acid px-1 font-mono text-[11px] font-bold text-bone"
            >
              {mounted ? count : 0}
            </span>
          </button>
          <IconButton
            variant="muted"
            size="sm"
            aria-label="Menu"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </IconButton>
        </div>
      </div>
      <div className="slash-divider" />
      {open && (
        <div className="border-b border-ink-300 bg-ink-100 lg:hidden">
          <div className="mx-auto grid max-w-[1340px] gap-1 px-4 py-4">
            {mainNav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-graffiti border-l-4 border-acid bg-ink px-4 py-3 text-sm text-bone"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
