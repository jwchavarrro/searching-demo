/**
 * CardA.tsx
 * @description: Componente molecular que combina Avatar, Title, Text y un icono de acción para crear una tarjeta de perfil.
 */

import { Icon } from '@iconify/react'
import { useState, type ButtonHTMLAttributes, type HTMLAttributes } from 'react'

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

type CardABaseProps = {
  avatar: AvatarProps
  title: TitleProps
  description: TextProps
  onIconClick?: () => void
  className?: string
}

type CardAAsButton = CardABaseProps & {
  as: 'button'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CardABaseProps>

type CardAAsDiv = CardABaseProps & {
  as?: 'div'
} & Omit<HTMLAttributes<HTMLDivElement>, keyof CardABaseProps>

export type CardAProps = CardAAsButton | CardAAsDiv

export const CardA = ({
  avatar,
  title,
  description,
  onIconClick,
  className,
  as = 'div',
  ...props
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

  const baseClasses = cn(
    'w-full hover:bg-primary-100 group flex cursor-pointer items-center gap-4 bg-transparent p-4 hover:rounded-lg',
    className
  )

  const content = (
    <>
      <Avatar {...avatar} className={cn('shrink-0', avatar.className)} />
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
    </>
  )

  if (as === 'button') {
    return (
      <button
        type="button"
        className={baseClasses}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={baseClasses} {...(props as HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  )
}
