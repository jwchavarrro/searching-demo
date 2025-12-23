/**
 * Header.tsx
 * @description: Componente molecular que combina Avatar y Title para crear un header de perfil.
 */

import {
  Avatar,
  Title,
  type AvatarProps,
  type TitleProps,
} from '@/components/atomic-desing/atoms'

export interface HeaderProps {
  avatar: AvatarProps
  title: TitleProps
  className?: string
}

export const Header = ({ avatar, title, className = '' }: HeaderProps) => {
  return (
    <div
      className={['flex flex-col items-center gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative">
        <Avatar {...avatar} />
      </div>
      <Title {...title} align="center" />
    </div>
  )
}
