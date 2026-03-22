import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[14px] font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-brand-navy text-white hover:bg-brand-navy/90 shadow-sm dark:bg-brand-cyan dark:text-brand-navy dark:hover:bg-brand-cyan/90',
        destructive: 'bg-brand-coral text-white hover:bg-brand-coral/90 shadow-sm',
        outline:
          'border border-brand-teal bg-transparent text-brand-navy hover:bg-brand-light dark:border-brand-cyan/50 dark:text-white dark:hover:bg-brand-navy/50',
        secondary: 'bg-brand-teal text-brand-navy hover:bg-brand-teal/80 shadow-sm',
        ghost: 'text-brand-navy hover:bg-brand-light dark:text-white dark:hover:bg-white/10',
        link: 'text-brand-cyan underline-offset-4 hover:underline font-semibold',
      },
      size: {
        default: 'h-11 px-4 py-2 min-h-[44px]',
        sm: 'h-9 px-3 text-[13px]',
        lg: 'h-12 px-8 text-[15px] min-h-[48px]',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
