import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Eyebrow } from '@/components/ui/badge'

export function SectionHeading({
  kicker,
  title,
  href,
  linkLabel = 'zobacz wszystko',
  className,
  align = 'left',
}: {
  kicker?: string
  title: string
  href?: string
  linkLabel?: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-wrap items-end gap-x-6 gap-y-3',
        align === 'center' ? 'flex-col items-center text-center' : 'justify-between',
        className,
      )}
    >
      <div>
        {kicker && <Eyebrow className="mb-2">{kicker}</Eyebrow>}
        <h2 className="text-graffiti text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] text-bone">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="text-graffiti group inline-flex items-center gap-1.5 border-b-2 border-acid pb-1 text-sm text-bone transition-colors hover:text-acid"
        >
          {linkLabel}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  )
}
