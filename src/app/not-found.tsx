import Link from 'next/link'
import Image from 'next/image'
import { Splatter } from '@/components/brand/splatter'

export default function NotFound() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden border-b border-ink-300 bg-ink py-24">
      <Image src="/images/serum/mural-eros-chrome.jpg" alt="" fill aria-hidden className="object-cover opacity-20" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/90 to-ink" />
      <Splatter className="left-1/2 top-6 w-[300px] -translate-x-1/2" opacity={0.26} />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-acid">// 404</div>
        <h1 className="text-graffiti text-[clamp(4rem,18vw,11rem)] leading-[0.85] text-bone text-glow-acid">
          NIE<span className="text-acid"> MA</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-bone/70">
          Tej ściany tu nie ma. Wróć na start, sprawdź najnowszą kolekcję albo wpadnij do Street Gallery.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-spray">wróć na start</Link>
          <Link href="/sklep" className="btn-spray btn-ghost">idź na sklep</Link>
        </div>
      </div>
    </section>
  )
}
