/**
 * use-total-results.ts
 * @description: Hook para calcular el conteo total de resultados (personajes + starred)
 */

import { useMemo } from 'react'

// Import of hooks
import { useFilteredCharacters } from '../characters-list/hooks'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of types
import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/components/atomic-desing/organisms/filter/utils'
import {
  SpecieFilterValues,
  SpecieApiValues,
} from '@/components/atomic-desing/organisms/filter/utils'

export interface UseTotalResultsProps {
  readonly searchValue?: string
  readonly characterFilter?: CharacterFilterType
  readonly specieFilter?: SpecieFilterType
}

export interface UseTotalResultsReturn {
  readonly charactersCount: number
  readonly starredCount: number
  readonly totalCount: number
}

/* @name useTotalResults
@description: Calcula el conteo total de resultados filtrados (personajes + starred)
*/
export function useTotalResults(
  props?: UseTotalResultsProps
): UseTotalResultsReturn {
  const { searchValue = '', characterFilter, specieFilter } = props || {}

  // Obtener personajes filtrados
  const { filteredCharacters } = useFilteredCharacters({
    characterFilter,
    specieFilter,
    searchValue,
  })

  // Obtener personajes starred del contexto
  const { charactersStarred } = useCharactersStarred()

  /* @name starredCount
  @description: Calcula el conteo de personajes starred filtrados
  */
  const starredCount = useMemo(() => {
    if (!charactersStarred || charactersStarred.length === 0) {
      return 0
    }

    const trimmedSearch = searchValue.trim()
    const hasSearch = trimmedSearch.length > 0

    let result = charactersStarred

    // Filtrar por búsqueda: solo nombres que empiezan con el texto
    if (hasSearch) {
      const searchLower = trimmedSearch.toLowerCase()
      result = result.filter(character =>
        character.name.toLowerCase().startsWith(searchLower)
      )
    }

    // Filtrar por especie
    if (specieFilter === SpecieFilterValues.HUMAN) {
      result = result.filter(
        character =>
          character.species.toLowerCase() ===
          SpecieApiValues.HUMAN.toLowerCase()
      )
    } else if (specieFilter === SpecieFilterValues.ALIEN) {
      result = result.filter(
        character =>
          character.species.toLowerCase() !==
          SpecieApiValues.HUMAN.toLowerCase()
      )
    }
    // Si es 'all', no filtrar por especie

    return result.length
  }, [charactersStarred, searchValue, specieFilter])

  const charactersCount = filteredCharacters.length
  const totalCount = charactersCount + starredCount

  return {
    charactersCount,
    starredCount,
    totalCount,
  }
}
