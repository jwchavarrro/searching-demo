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
} from '@/components/atomic-desing/organisms'
import {
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/components/atomic-desing/organisms'

// Import of utils
import { cn } from '@/utils/cn'

export interface FiltersSummaryProps {
  readonly resultsCount: number
  readonly searchValue?: string
  readonly characterFilter?: CharacterFilterType
  readonly specieFilter?: SpecieFilterType
  readonly className?: string
}

/* @name countActiveFilters
@description: Cuenta cuántos filtros están activos (diferentes de los valores por defecto)
*/
function countActiveFilters(
  searchValue: string,
  characterFilter: CharacterFilterType,
  specieFilter: SpecieFilterType
): number {
  let count = 0

  // Contar búsqueda si tiene valor
  if (searchValue.trim().length > 0) {
    count++
  }

  // Contar filtro de Character si no es el valor por defecto (OTHERS)
  if (characterFilter !== CharacterFilterValues.OTHERS) {
    count++
  }

  // Contar filtro de Specie si no es 'all'
  if (specieFilter !== SpecieFilterValues.ALL) {
    count++
  }

  return count
}

export function FiltersSummary({
  resultsCount,
  searchValue = '',
  characterFilter = CharacterFilterValues.OTHERS,
  specieFilter = SpecieFilterValues.ALL,
  className,
}: FiltersSummaryProps) {
  const activeFiltersCount = useMemo(
    () => countActiveFilters(searchValue, characterFilter, specieFilter),
    [searchValue, characterFilter, specieFilter]
  )

  return (
    <div
      className={cn('flex items-center justify-between gap-4 py-2', className)}
    >
      {/* Results count */}
      {resultsCount > 0 && (
        <Text
          text={`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}
          size="xs"
          weight="semibold"
          className="text-primary-60"
        />
      )}

      {/* Active filters badge */}
      {activeFiltersCount > 0 && (
        <Badge size="base" className="bg-secondary-600/20 text-green-700">
          {activeFiltersCount} {activeFiltersCount === 1 ? 'Filter' : 'Filters'}
        </Badge>
      )}
    </div>
  )
}
