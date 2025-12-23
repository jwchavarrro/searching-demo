/**
 * Header.tsx
 * @description: Componente molecular que combina Avatar y Title para crear un header de perfil.
 */

// Import of components custom
import { Title, type TitleProps } from '@/components/atomic-desing/atoms'
import {
  AvatarButton,
  type AvatarButtonProps,
} from '@/components/atomic-desing/molecules/avatar-button'

// Import of utils
import { cn } from '@/utils/cn'

export interface HeaderProps {
  avatar: AvatarButtonProps
  title: TitleProps
  className?: string
}

export const Header = ({ avatar, title, className }: HeaderProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <AvatarButton {...avatar} />
      <Title {...title} align="center" className="font-bold" />
    </div>
  )
}
