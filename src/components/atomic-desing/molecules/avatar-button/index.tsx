/**
 * AvatarButton.tsx
 * @description: Componente molecular que combina Avatar con un Button como overlay.
 */

import { Icon } from '@iconify/react'
import { Avatar, type AvatarProps } from '@/components/atomic-desing/atoms'
import { cn } from '@/utils/cn'

export interface AvatarButtonProps {
  avatar: AvatarProps
  icon?: string
  iconSize?: number | string
  className?: string
  iconClassName?: string
}

export const AvatarButton = ({
  avatar,
  icon,
  className,
  iconClassName,
}: AvatarButtonProps) => {
  return (
    <div className={cn('relative inline-block', className)}>
      <Avatar {...avatar} />
      {icon && (
        <div
          className={cn(
            'absolute right-0 bottom-0 translate-x-1/6 translate-y-1/12 bg-white rounded-full md:size-8 size-6 flex items-center justify-center',
            iconClassName
          )}
        >
          <Icon icon={icon} className="md:size-6 size-4 text-secondary-600" />
        </div>
      )}
    </div>
  )
}
