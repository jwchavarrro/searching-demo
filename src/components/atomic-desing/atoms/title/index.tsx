/**
 * Title.tsx
 * @description: Componente genérico para renderizar títulos con diferentes niveles.
 */

import { createElement } from 'react'

// Import of utils
import { cn } from '@/utils/cn'

export interface TitleProps {
  title: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  className?: string
}

const defaultSizeByLevel = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg',
  6: 'text-base',
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const headingTags = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

export const Title = ({
  title,
  level = 1,
  size,
  align = 'left',
  truncate = false,
  className,
}: TitleProps) => {
  const sizeClass = size ? sizeClasses[size] : defaultSizeByLevel[level]

  return createElement(
    headingTags[level],
    {
      className: cn(
        'font-bold',
        'text-black',
        sizeClass,
        alignClasses[align],
        truncate && 'truncate',
        className
      ),
    },
    title
  )
}
