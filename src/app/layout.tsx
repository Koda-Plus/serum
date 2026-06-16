import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Announcement } from '@/components/layout/announcement'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { SerumRadio } from '@/components/shop/serum-radio'
import { KodaBadge } from '@/components/layout/koda-badge'

export const metadata: Metadata = {
  metadataBase: new URL('https://serum-koda-demo.vercel.app'),
  title: {
    default: 'Serum Global / streetwear, muzyka i graffiti',
    template: '%s / Serum Global',
  },
  description:
    'Serum Global, niezależna marka streetwear i graffiti od 2007. Najnowsza kolekcja Eros One ’26, bluzy, t-shirty, spodnie, czapki, muzyka na winylu i CD oraz autorska Street Gallery. Wysyłka 48h, darmowa od 299 zł.',
  applicationName: 'Serum Global',
  authors: [{ name: 'KODA+', url: 'https://koda.plus' }],
  keywords: [
    'Serum Global', 'Serum Sklep', 'Eros', 'Eros One', 'streetwear', 'graffiti',
    'rap', 'hip-hop', 'bluzy', 't-shirty', 'winyl', 'merch', 'JWP', 'street art',
  ],
  openGraph: {
    title: 'Serum Global / streetwear, muzyka i graffiti',
    description:
      'Najnowsza kolekcja Eros One ’26, kolaboracja Serum x Tempz, muzyka na winylu oraz Street Gallery. Marka prosto z ulicy od 2007.',
    url: 'https://serum-koda-demo.vercel.app',
    siteName: 'Serum Global',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serum Global / streetwear & graffiti',
    description: 'Kolekcja Eros One ’26, Serum x Tempz, muzyka i Street Gallery.',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export const viewport: Viewport = {
  themeColor: '#060706',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Bungee&family=Bungee+Shade&family=Rubik+Mono+One&family=Permanent+Marker&family=Caveat:wght@500;700&family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <Announcement />
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <CartDrawer />
        <SerumRadio />
        <KodaBadge />
      </body>
    </html>
  )
}
