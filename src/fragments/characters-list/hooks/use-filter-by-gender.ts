/**
 * use-filter-by-gender.ts
 * @description: Hook para filtrar personajes según el filtro de Gender
 */

import { useMemo } from 'react'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { GenderFilterType } from '@/fragments/components/filter/utils'
import {
  GenderFilterValues,
  GenderApiValues,
} from '@/fragments/components/filter/utils'

interface UseFilterByGenderProps {
  characters: CharacterType[]
  genderFilter?: GenderFilterType
}

export function useFilterByGender({
  characters,
  genderFilter = GenderFilterValues.ALL,
}: UseFilterByGenderProps): CharacterType[] {
  return useMemo(() => {
    if (characters.length === 0) return []

    switch (genderFilter) {
      case GenderFilterValues.ALL:
        return characters

      case GenderFilterValues.MALE:
        return characters.filter(
          character =>
            character.gender.toLowerCase() ===
            GenderApiValues.MALE.toLowerCase()
        )

      case GenderFilterValues.FEMALE:
        return characters.filter(
          character =>
            character.gender.toLowerCase() ===
            GenderApiValues.FEMALE.toLowerCase()
        )

      case GenderFilterValues.GENDERLESS:
        return characters.filter(
          character =>
            character.gender.toLowerCase() ===
            GenderApiValues.GENDERLESS.toLowerCase()
        )

      case GenderFilterValues.UNKNOWN:
        return characters.filter(
          character =>
            character.gender.toLowerCase() ===
            GenderApiValues.UNKNOWN.toLowerCase()
        )

      default:
        return characters
    }
  }, [characters, genderFilter])
}
