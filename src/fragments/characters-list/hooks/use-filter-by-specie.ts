/**
 * use-filter-by-specie.ts
 * @description: Hook para filtrar personajes según el filtro de Specie
 */

import { useMemo } from 'react'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { SpecieFilterType } from '@/components/atomic-desing/organisms/filter/utils'
import { SpecieFilterValues } from '@/components/atomic-desing/organisms/filter/utils'

interface UseFilterBySpecieProps {
  characters: CharacterType[]
  specieFilter?: SpecieFilterType
}

export function useFilterBySpecie({
  characters,
  specieFilter = SpecieFilterValues.ALL,
}: UseFilterBySpecieProps): CharacterType[] {
  return useMemo(() => {
    if (characters.length === 0) return []

    switch (specieFilter) {
      case SpecieFilterValues.ALL:
        return characters

      case SpecieFilterValues.HUMAN:
        return characters.filter(
          character =>
            character.species.toLowerCase() === SpecieFilterValues.HUMAN
        )

      case SpecieFilterValues.ALIEN:
        return characters.filter(
          character =>
            character.species.toLowerCase() !== SpecieFilterValues.HUMAN
        )

      default:
        return characters
    }
  }, [characters, specieFilter])
}
