import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ShopContent } from './shop-content'

export const metadata: Metadata = {
  title: 'Sklep, ubrania i gadżety',
  description: 'Bluzy, t-shirty, spodnie, czapki i akcesoria Serum Global. Najnowsza kolekcja Eros One ’26.',
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  )
}
