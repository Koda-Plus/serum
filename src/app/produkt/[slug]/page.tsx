import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products, productBySlug } from '@/data/products'
import { ProductDetail } from './product-detail'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) return { title: 'Nie znaleziono' }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, images: [product.image] },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = productBySlug(slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4)
  const filled =
    related.length >= 4
      ? related
      : [...related, ...products.filter((p) => p.pillar === product.pillar && p.slug !== product.slug && !related.includes(p))].slice(0, 4)

  return <ProductDetail product={product} related={filled} />
}
