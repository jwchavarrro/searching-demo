/**
 * use-filter-by-specie.ts
 * @description: Hook para filtrar personajes según el filtro de Specie
 */

import { useMemo } from 'react'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { SpecieFilterType } from '@/fragments/components/filter/utils'
import {
  SpecieFilterValues,
  SpecieApiValues,
} from '@/fragments/components/filter/utils'

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
            character.species.toLowerCase() ===
            SpecieApiValues.HUMAN.toLowerCase()
        )

      case SpecieFilterValues.ALIEN:
        return characters.filter(
          character =>
            character.species.toLowerCase() !==
            SpecieApiValues.HUMAN.toLowerCase()
        )

      default:
        return characters
    }
  }, [characters, specieFilter])
}
