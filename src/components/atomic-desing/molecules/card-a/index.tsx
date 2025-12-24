/**
 * CardA.tsx
 * @description: Componente molecular que combina Avatar, Title, Text y un icono de acción para crear una tarjeta de perfil.
 */

import { Icon } from '@iconify/react'
import { useState } from 'react'

// Import of components custom
import {
  Avatar,
  type AvatarProps,
  Button,
  Text,
  type TextProps,
  Title,
  type TitleProps,
} from '@/components/atomic-desing/atoms'

// Import of utils
import { cn } from '@/utils/cn'

export interface CardAProps {
  avatar: AvatarProps
  title: TitleProps
  description: TextProps
  onIconClick?: () => void
  className?: string
}

export const CardA = ({
  avatar,
  title,
  description,
  onIconClick,
  className,
}: CardAProps) => {
  // States generales
  const [isLiked, setIsLiked] = useState<boolean>(false)

  /**
   * @name: handleIconClick
   * @description:
   */
  const handleIconClick = () => {
    setIsLiked(!isLiked)
    onIconClick?.()
  }

  return (
    <div
      className={cn(
        'hover:bg-primary-100 group flex cursor-pointer items-center gap-4 bg-transparent p-4 hover:rounded-lg',
        className
      )}
    >
      <Avatar {...avatar} className="shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Title title={title.title} level={3} size="base" truncate />
        <Text
          text={description.text}
          size="sm"
          weight="normal"
          align="left"
          truncate
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleIconClick}
        className="shrink-0 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-white group-hover:shadow hover:bg-white"
      >
        <Icon
          className={cn(
            'text-gray/50 size-6 md:size-7',
            isLiked && 'text-secondary-600'
          )}
          icon={isLiked ? 'mdi:heart' : 'mdi:heart-outline'}
        />
      </Button>
    </div>
  )
}
