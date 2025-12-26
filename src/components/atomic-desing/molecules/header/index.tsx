/**
 * Header.tsx
 * @description: Componente molecular que combina Avatar y Title para crear un header de perfil.
 */
import { Icon } from '@iconify/react'

// Import of components custom
import {
  Button,
  Title,
  type TitleProps,
} from '@/components/atomic-desing/atoms'
import {
  AvatarButton,
  type AvatarButtonProps,
} from '@/components/atomic-desing/molecules/avatar-button'

// Import of utils
import { cn } from '@/utils/cn'

import { ICONS } from '@/config'

export interface HeaderProps {
  avatar: AvatarButtonProps
  title: TitleProps
  isStarred: {
    status: boolean
    onIconClick: () => void
  }
  className?: string
}

export const Header = ({
  avatar,
  title,
  isStarred,
  className,
}: HeaderProps) => {
  return (
    <div className={cn('grid grid-cols-2 items-center gap-5', className)}>
      {/* Column #1: Avatar and title */}
      <div>
        <AvatarButton {...avatar} />
        <Title {...title} size="2xl" />
      </div>

      {/* Column #2: Star button */}
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={isStarred.onIconClick}
          className="shrink-0 rounded-full transition-colors duration-300 ease-in-out group-hover:bg-white group-hover:shadow hover:bg-white"
        >
          <Icon
            className={cn(
              'text-gray/50 size-4 md:size-7',
              isStarred.status && 'text-secondary-600'
            )}
            icon={isStarred.status ? ICONS.heart : ICONS.heart_outline}
          />
        </Button>
      </div>
    </div>
  )
}
