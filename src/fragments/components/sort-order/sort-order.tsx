/**
 * SortOrder.tsx
 * @description: Componente para cambiar el orden de los personajes (ascendente/descendente)
 */

import { useCallback } from 'react'
import { Icon } from '@iconify/react'

// Import of components
import { Button } from '@/components/atomic-desing/atoms/button'

// Import of utils
import { cn } from '@/utils/cn'
import { ICONS } from '@/config'

// Import of types
import { type SortOrderType, SortOrderValues } from './utils/types'

export interface SortOrderProps {
  sortOrder?: SortOrderType
  onSortChange?: (order: SortOrderType) => void
  className?: string
}

export const SortOrder = ({
  sortOrder = SortOrderValues.ASC,
  onSortChange,
  className,
}: SortOrderProps) => {
  /* @name handleToggleSort
  @description: Manejador para alternar entre ascendente y descendente
  */
  const handleToggleSort = useCallback(() => {
    const newOrder =
      sortOrder === SortOrderValues.ASC
        ? SortOrderValues.DESC
        : SortOrderValues.ASC
    onSortChange?.(newOrder)
  }, [sortOrder, onSortChange])

  const isAscending = sortOrder === SortOrderValues.ASC

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggleSort}
      className={cn(
        'hover:bg-primary-100 text-primary-700 border-transparent hover:border-transparent md:size-7',
        className
      )}
      aria-label={isAscending ? 'Sort ascending' : 'Sort descending'}
    >
      <Icon
        icon={isAscending ? ICONS.az : ICONS.za}
        className="size-4 md:size-5"
      />
    </Button>
  )
}
