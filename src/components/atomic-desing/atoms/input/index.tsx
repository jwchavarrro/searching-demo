/**
 * Input.tsx
 * @description: Componente genérico para renderizar campos de entrada de texto.
 */

import { Icon } from '@iconify/react'
import { type InputHTMLAttributes, type ReactNode } from 'react'

// Import of utils
import { cn } from '@/utils/cn'
import { ICONS } from '@config'

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  placeholder?: string
  className?: string
  children?: ReactNode
}

export const Input = ({
  placeholder = 'Search or filter results',
  className,
  children,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="text-gray absolute top-1/2 left-3 -translate-y-1/2">
          <Icon icon={ICONS.search_01} className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            'border-gray/50 text-sx h-10 w-full rounded-lg border bg-white px-4 pl-10 md:text-sm',
            'placeholder:text-gray text-black',
            'focus:ring-primary-600 focus:border-primary-600 focus:ring-2 focus:outline-none',
            'disabled:bg-gray/10 disabled:cursor-not-allowed',
            children && 'pr-10',
            className
          )}
          {...props}
        />
        {children && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
