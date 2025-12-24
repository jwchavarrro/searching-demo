/**
 * Message.tsx
 * @description: Componente molecular que combina un icono, título y descripción para mostrar mensajes.
 */

import { Icon } from '@iconify/react'

// Import of components custom
import {
  Text,
  Title,
  type TextProps,
  type TitleProps,
} from '@/components/atomic-desing/atoms'

// Import of utils
import { cn } from '@/utils/cn'

export interface MessageProps {
  icon: string
  title: TitleProps
  description: TextProps
  className?: string
}

export const Message = ({
  icon,
  title,
  description,
  className,
}: MessageProps) => {
  return (
    <div
      className={cn('flex flex-col items-center gap-1 opacity-50', className)}
    >
      <Icon icon={icon} className="size-8 md:size-12" />
      <Title {...title} align="center" size="2xl" />
      <Text {...description} align="center" />
    </div>
  )
}
