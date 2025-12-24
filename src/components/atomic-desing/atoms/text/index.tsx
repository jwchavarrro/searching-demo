/**
 * Text.tsx
 * @description: Componente genérico para renderizar texto con diferentes variantes.
 */

// Import of utils
import { cn } from '@/utils/cn'

export interface TextProps {
  text: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  truncate?: boolean
  className?: string
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-xs md:text-sm',
  base: 'text-sm md:text-base',
  lg: 'text-sm md:text-lg',
  xl: 'text-lg md:text-xl',
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

export const Text = ({
  text,
  size = 'xs',
  weight = 'normal',
  align = 'left',
  truncate = false,
  className,
}: TextProps) => {
  return (
    <p
      className={cn(
        sizeClasses[size],
        weightClasses[weight],
        alignClasses[align],
        truncate && 'truncate',
        className
      )}
    >
      {text}
    </p>
  )
}
