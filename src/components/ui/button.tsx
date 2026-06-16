import { cn } from '@/lib/utils'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

type Variant = 'spray' | 'ghost' | 'bone'
type Size = 'md' | 'lg' | 'sm'

const variantMap: Record<Variant, string> = {
  spray: 'btn-spray',
  ghost: 'btn-spray btn-ghost',
  bone: 'btn-spray btn-bone',
}

const sizeMap: Record<Size, string> = {
  sm: 'text-xs px-3 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-4',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'spray', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn('inline-flex items-center justify-center gap-2', variantMap[variant], sizeMap[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
})
