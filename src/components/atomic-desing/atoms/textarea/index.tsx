/**
 * Textarea.tsx
 * @description: Componente genérico para renderizar campos de texto multilínea.
 */

import { type TextareaHTMLAttributes } from 'react'

// Import of utils
import { cn } from '@/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string
  className?: string
}

export const Textarea = ({
  placeholder = 'Write here...',
  className,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      className={cn(
        'text-gray border-gray/5 bg-gray/5 h-48 max-h-48 min-h-32 w-full rounded-md border px-4 py-3 text-xs md:text-sm',
        'placeholder:text-gray text-black',
        'focus:ring-primary-600 focus:border-primary-600 focus:ring-2 focus:outline-none',
        'disabled:bg-gray/10 disabled:cursor-not-allowed',
        className,
        'resize-y'
      )}
      {...props}
    />
  )
}
