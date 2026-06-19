import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook } from 'lucide-react'
import { SerumLogo } from '@/components/brand/logo'

const muralStrip = ['/images/serum/mural-eagle.jpg', '/images/serum/mural-2.jpg', '/images/serum/mural-3.jpg']

export function Footer() {
  return (
    <footer className="relative border-t border-ink-300 bg-ink text-bone">
      {/* mural panorama band */}
      <div className="relative">
        <div className="grid grid-cols-3">
          {muralStrip.map((src, i) => (
            <div key={i} className="relative aspect-[2/1] overflow-hidden border-r border-ink last:border-r-0">
              <Image src={src} alt="" fill aria-hidden className="object-cover opacity-90" sizes="33vw" />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/70">
            serum global / street gallery / since 2007
          </span>
        </div>
      </div>

      <div className="slash-divider" />

      <div className="mx-auto max-w-[1340px] px-4 py-12 lg:grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-14 lg:px-8">
        <div className="space-y-5">
          <SerumLogo className="h-12" />
          <p className="max-w-sm text-sm leading-relaxed text-bone/65">
            Serum Global, niezależna marka streetwear i graffiti tworzona przez Erosa i ekipę od 2007 roku.
            Ubrania, muzyka, gadżety i autorska galeria street artu. Wysyłka 48h.
          </p>
          <div className="flex gap-3">
            <SocialBtn icon={<Instagram size={18} />} href="https://instagram.com" label="Instagram" />
            <SocialBtn icon={<Youtube size={18} />} href="https://youtube.com" label="YouTube" />
            <SocialBtn icon={<Facebook size={18} />} href="https://facebook.com" label="Facebook" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:contents lg:mt-0">
          <FooterCol
            title="Sklep"
            links={[
              ['Nowa kolekcja', '/sklep'],
              ['T-shirty', '/sklep?kat=t-shirty'],
              ['Bluzy', '/sklep?kat=bluzy'],
              ['Spodnie', '/sklep?kat=spodnie'],
              ['Czapki', '/sklep?kat=czapki'],
            ]}
          />
          <FooterCol
            title="Kultura"
            links={[
              ['Muzyka', '/muzyka'],
              ['Street Gallery', '/street'],
              ['Gadżety', '/sklep?kat=gadzety'],
              ['Serum x Tempz', '/sklep?kat=bluzy'],
            ]}
          />
          <FooterCol
            title="Marka"
            links={[
              ['O nas', '#manifest'],
              ['Regulamin', '#'],
              ['Dostawa i płatność', '#'],
              ['Zwroty i reklamacje', '#'],
            ]}
          />
        </div>
      </div>

      <div className="border-t border-ink-300 bg-ink py-4">
        <div className="mx-auto max-w-[1340px] px-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45 sm:text-left lg:px-8">
          © 2007-2026 Serum Global / projekt &amp; demo: KODA+
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-graffiti mb-4 text-sm tracking-[0.28em] text-acid-light">{title}</h3>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-bone/65 transition-colors hover:text-acid-light">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialBtn({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border-2 border-bone text-bone transition-all hover:border-acid hover:bg-acid hover:text-bone"
    >
      {icon}
    </a>
  )
}
