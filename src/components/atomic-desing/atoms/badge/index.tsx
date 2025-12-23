/**
 * Badge.tsx
 * @description: Componente genérico para renderizar badges con diferentes variantes.
 */

import { type HTMLAttributes, type ReactNode } from 'react'

// Import of utils
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'default' | 'outline'
  size?: 'sm' | 'base' | 'lg'
  className?: string
}

const variantClasses = {
  default: 'bg-primary-600 text-white',
  outline: 'border border-gray/50 bg-transparent text-black',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  base: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors'

export const Badge = ({
  children,
  variant = 'default',
  size = 'base',
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
