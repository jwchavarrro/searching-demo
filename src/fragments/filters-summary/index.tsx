/**
 * filters-summary/index.tsx
 * @description: Componente para mostrar el resumen de resultados y filtros aplicados
 */

import { useMemo } from 'react'

// Import of components
import { Text, Badge } from '@/components/atomic-desing/atoms'

// Import of types
import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/fragments/components/filter/utils'
import {
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/fragments/components/filter/utils'

// Import of utils
import { cn } from '@/utils/cn'

export interface FiltersSummaryProps {
  readonly charactersCount: number
  readonly starredCount: number
  readonly characterFilter?: CharacterFilterType
  readonly specieFilter?: SpecieFilterType
  readonly className?: string
}

function countAdvancedFilters(
  characterFilter: CharacterFilterType,
  specieFilter: SpecieFilterType
): number {
  return (
    Number(characterFilter !== CharacterFilterValues.OTHERS) +
    Number(specieFilter !== SpecieFilterValues.ALL)
  )
}

export function FiltersSummary({
  charactersCount,
  starredCount,
  characterFilter = CharacterFilterValues.OTHERS,
  specieFilter = SpecieFilterValues.ALL,
  className,
}: FiltersSummaryProps) {
  const resultsCount = useMemo(
    () => charactersCount + starredCount,
    [charactersCount, starredCount]
  )

  const activeFiltersCount = useMemo(
    () => countAdvancedFilters(characterFilter, specieFilter),
    [characterFilter, specieFilter]
  )

  // Early return si no hay nada que mostrar
  if (resultsCount === 0 && activeFiltersCount === 0) {
    return null
  }

  return (
    <div
      className={cn('flex items-center justify-between gap-4 py-2', className)}
    >
      {/* Results count */}
      <Text
        text={`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}
        size="xs"
        weight="semibold"
        className="text-primary-600"
      />

      {/* Active filters badge */}
      {activeFiltersCount > 0 && (
        <Badge size="base" className="bg-secondary-600/20 text-green-700">
          {activeFiltersCount} {activeFiltersCount === 1 ? 'Filter' : 'Filters'}
        </Badge>
      )}
    </div>
  )
}
