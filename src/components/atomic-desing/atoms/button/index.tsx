/**
 * Button.tsx
 * @description: Componente genérico para renderizar botones con diferentes variantes.
 */

import { type ButtonHTMLAttributes, type ReactNode } from 'react'

// Import of utils
import { cn } from '@/utils/cn'

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'size'
> {
  children: ReactNode
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'sm' | 'base' | 'lg' | 'icon'
  className?: string
}

const variantClasses = {
  default:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-700',
  outline:
    'border border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-100 text-gray-900',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-300',
  ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-100 text-gray-900',
  link: 'bg-transparent text-primary-600 hover:underline p-0 h-auto',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  base: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
  icon: 'h-10 w-10 p-0',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50'

export const Button = ({
  children,
  variant = 'default',
  size = 'base',
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
