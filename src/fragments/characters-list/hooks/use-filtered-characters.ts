/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes según el filtro de Character y Specie
 */

import { useMemo } from 'react'

// Import of hooks
import { useCharacters, useCharactersBySpecies } from '@/hooks'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/components/atomic-desing/organisms/filter/utils'
import {
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/components/atomic-desing/organisms/filter/utils'

// Import of custom hooks
import { useFilterByCharacter } from './use-filter-by-character'

interface UseFilteredCharactersReturn {
  filteredCharacters: CharacterType[]
  isLoading: boolean
  error: Error | null
  data: ReturnType<typeof useCharacters>['data']
}

interface UseFilteredCharactersProps {
  characterFilter?: CharacterFilterType
  specieFilter?: SpecieFilterType
}

/**
 * @name convertSpecieFilterToApiValue
 * @description: Convierte el filtro de Specie a valor para la API
 * - 'all' -> undefined (usa GET_CHARACTERS)
 * - 'human' -> "Human" (usa GET_CHARACTERS_BY_SPECIES)
 * - 'alien' -> undefined (usa GET_CHARACTERS, luego filtra en cliente)
 */
function convertSpecieFilterToApiValue(
  specieFilter: SpecieFilterType
): string | undefined {
  switch (specieFilter) {
    case SpecieFilterValues.HUMAN:
      return 'Human'
    case SpecieFilterValues.ALL:
    case SpecieFilterValues.ALIEN:
    default:
      return undefined
  }
}

export function useFilteredCharacters(
  props?: UseFilteredCharactersProps
): UseFilteredCharactersReturn {
  const {
    characterFilter = CharacterFilterValues.OTHERS,
    specieFilter = SpecieFilterValues.ALL,
  } = props || {}

  // Convertir el filtro de Specie a valor para la API
  const apiSpecies = convertSpecieFilterToApiValue(specieFilter)

  /* @name useCharacters / useCharactersBySpecies
  @description: Optimizado para usar solo el hook necesario según el filtro:
  - Si el filtro es 'human', usar useCharactersBySpecies (filtra en API)
  - Si es 'all' o 'alien', usar useCharacters (filtra en cliente si es necesario)
  */
  const shouldUseSpeciesQuery = specieFilter === SpecieFilterValues.HUMAN

  // Ejecutar ambos hooks pero solo uno estará habilitado según el filtro
  // useCharactersBySpecies tiene enabled: !!species, así que no se ejecuta si species está vacío
  const charactersQuery = useCharacters()
  const charactersBySpeciesQuery = useCharactersBySpecies(apiSpecies || '')

  // Determinar qué query usar según el filtro
  // Si shouldUseSpeciesQuery es true, usar charactersBySpeciesQuery
  // Si es false, usar charactersQuery (y charactersBySpeciesQuery estará deshabilitado)
  const { data, isLoading, error } = shouldUseSpeciesQuery
    ? charactersBySpeciesQuery
    : charactersQuery

  /* @name charactersFilteredByCharacter
  @description: Filtrar personajes por Character (All/Starred/Others) - se aplica en cliente
  */
  const charactersFilteredByCharacter = useFilterByCharacter({
    characters: data?.results || [],
    characterFilter,
  })

  /* @name filteredCharacters
  @description: Si el filtro es 'alien', filtrar en cliente (excluir "Human")
  Si es 'human' o 'all', ya viene filtrado de la API o no necesita filtro adicional
  */
  const filteredCharacters = useMemo(() => {
    if (specieFilter === SpecieFilterValues.ALIEN) {
      // Filtrar alien en cliente (excluir "Human")
      return charactersFilteredByCharacter.filter(
        character => character.species.toLowerCase() !== 'human'
      )
    }
    // Para 'all' y 'human', ya viene filtrado de la API o no necesita filtro
    return charactersFilteredByCharacter
  }, [charactersFilteredByCharacter, specieFilter])

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
