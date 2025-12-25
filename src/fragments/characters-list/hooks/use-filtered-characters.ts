/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes según el filtro de Character y Specie
 */

// Import of hooks
import { useCharacters } from '@/hooks'

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
import { useFilterBySpecie } from './use-filter-by-specie'

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

export function useFilteredCharacters(
  props?: UseFilteredCharactersProps
): UseFilteredCharactersReturn {
  const {
    characterFilter = CharacterFilterValues.OTHERS,
    specieFilter = SpecieFilterValues.ALL,
  } = props || {}

  /* @name useCharacters
  @description: Hook para obtener los personajes de la API
  */
  const { data, isLoading, error } = useCharacters()

  /* @name filteredCharacters
  @description: Filtrar personajes aplicando primero el filtro de Character y luego el de Specie
  */
  const charactersFilteredByCharacter = useFilterByCharacter({
    characters: data?.results || [],
    characterFilter,
  })

  const filteredCharacters = useFilterBySpecie({
    characters: charactersFilteredByCharacter,
    specieFilter,
  })

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
