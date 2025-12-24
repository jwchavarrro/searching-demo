/**
 * AvatarButton.tsx
 * @description: Componente molecular que combina Avatar con un Button como overlay.
 */

import { Icon } from '@iconify/react'

// Import of components custom
import { Avatar, type AvatarProps } from '@/components/atomic-desing/atoms'

// Import of utils
import { cn } from '@/utils/cn'

export interface AvatarButtonProps {
  avatar: AvatarProps
  icon?: string
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
            'absolute right-0 bottom-0 flex size-6 translate-x-1/6 translate-y-1/12 items-center justify-center rounded-full bg-white md:size-8',
            iconClassName
          )}
        >
          <Icon icon={icon} className="text-secondary-600 size-4 md:size-6" />
        </div>
      )}
    </div>
  )
}
