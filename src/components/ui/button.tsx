import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { Check, Loader2 } from 'lucide-react'

/**
 * Serum button system. One shared base (.btn) + variants that all speak the
 * same graffiti hard-shadow language (see globals.css). Sizes are padding/text
 * utilities. Use <Button> for actions, <ButtonLink> for navigation, <IconButton>
 * for square icon-only controls.
 */

export const buttonVariants = cva('btn', {
  variants: {
    variant: {
      bone: 'btn--bone', // primary "money" action (bone/white on dark)
      ghost: 'btn--ghost', // secondary CTA (violet outline)
      violet: 'btn--violet', // wayfinding / identity
      outline: 'btn--outline', // quiet, flat
      muted: 'btn--outline btn--muted', // quietest (ink border)
      danger: 'btn--outline btn--danger', // destructive
    },
    size: {
      sm: 'text-xs px-3 py-2',
      md: 'text-sm px-5 py-3',
      lg: 'text-base px-7 py-4',
    },
  },
  defaultVariants: { variant: 'bone', size: 'md' },
})

type Variant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
type Size = NonNullable<VariantProps<typeof buttonVariants>['size']>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** swaps label for a spinner and disables interaction */
  loading?: boolean
  /** flashes a success state (e.g. "Dodano") — caller controls timing */
  success?: boolean
  successLabel?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'bone', size = 'md', loading, success, successLabel, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        buttonVariants({ variant, size }),
        success && '!bg-[var(--color-toxic)] !text-ink',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 size={size === 'lg' ? 18 : 16} className="animate-spin" />
      ) : success ? (
        <>
          <Check size={size === 'lg' ? 18 : 16} strokeWidth={3} /> {successLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  )
})

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: Size
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { href, variant = 'bone', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <Link href={href} ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      {children}
    </Link>
  )
})

/* ---------------------------------------------------------------- icon button */

const iconVariants = cva('btn btn--icon', {
  variants: {
    variant: {
      bone: 'btn--bone',
      violet: 'btn--violet',
      outline: 'btn--outline',
      muted: 'btn--outline btn--muted',
    },
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
    },
  },
  defaultVariants: { variant: 'outline', size: 'md' },
})

type IconVariant = NonNullable<VariantProps<typeof iconVariants>['variant']>
type IconSize = NonNullable<VariantProps<typeof iconVariants>['size']>

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconVariant
  size?: IconSize
  /** required — icon-only controls must be labelled */
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'outline', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={cn(iconVariants({ variant, size }), className)} {...rest}>
      {children}
    </button>
  )
})
