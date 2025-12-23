/**
 * Avatar.tsx
 * @description: Componente genérico para renderizar avatares de usuario.
 */

import { useState } from 'react'
import { cn } from '@/utils/cn'

export interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  base: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
}

export const Avatar = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'base',
  className,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false)

  const baseClasses = cn(
    sizeClasses[size],
    'rounded-full',
    'flex items-center justify-center',
    'bg-gray-200 text-gray-700',
    'font-medium',
    'overflow-hidden',
    className
  )

  const getInitials = () => {
    if (initials) return initials
    if (alt && alt !== 'Avatar') {
      return alt
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return '?'
  }

  const showImage = src && !imageError

  return (
    <>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={baseClasses}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={baseClasses}>{getInitials()}</div>
      )}
    </>
  )
}
