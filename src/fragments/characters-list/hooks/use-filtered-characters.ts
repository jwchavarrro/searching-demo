/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes según el filtro de Character y Specie
 */

import { useMemo } from 'react'

// Import of hooks
import {
  useCharacters,
  useCharactersBySpecies,
  useSearchCharacters,
} from '@/hooks'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/fragments/components/filter/utils'
import {
  CharacterFilterValues,
  SpecieFilterValues,
  SpecieApiValues,
} from '@/fragments/components/filter/utils'

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
  searchValue?: string
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
      return SpecieApiValues.HUMAN
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
    searchValue = '',
  } = props || {}

  // Normalizar y validar búsqueda
  const trimmedSearch = searchValue.trim()
  const hasSearch = trimmedSearch.length > 0

  // Convertir el filtro de Specie a valor para la API
  const apiSpecies = convertSpecieFilterToApiValue(specieFilter)
  const shouldUseSpeciesQuery = specieFilter === SpecieFilterValues.HUMAN

  // Ejecutar hooks condicionalmente para evitar llamadas innecesarias
  // Prioridad: 1. Búsqueda por nombre, 2. Filtro por especie, 3. Todos los personajes
  const searchQuery = useSearchCharacters(trimmedSearch)
  const charactersQuery = useCharacters()
  const charactersBySpeciesQuery = useCharactersBySpecies(apiSpecies || '')

  // Determinar qué query usar según el filtro
  // Prioridad: 1. Búsqueda por nombre, 2. Filtro por especie, 3. Todos los personajes
  let activeQuery
  if (hasSearch) {
    activeQuery = searchQuery
  } else if (shouldUseSpeciesQuery) {
    activeQuery = charactersBySpeciesQuery
  } else {
    activeQuery = charactersQuery
  }

  const { data, isLoading, error } = activeQuery

  /* @name charactersFilteredByCharacter
  @description: Filtrar personajes por Character (All/Starred/Others) - se aplica en cliente
  */
  const charactersFilteredByCharacter = useFilterByCharacter({
    characters: data?.results || [],
    characterFilter,
  })

  /* @name filteredCharacters
  @description: Aplicar filtros adicionales en cliente sobre los resultados:
  - Si hay búsqueda: refinar búsqueda (empieza con) y aplicar TODOS los filtros (Character y Specie)
  - Si no hay búsqueda: aplicar filtros según lógica normal
  */
  const filteredCharacters = useMemo(() => {
    let result = charactersFilteredByCharacter

    // Si hay búsqueda, refinar resultados de API (solo nombres que empiezan con el texto)
    if (hasSearch) {
      const searchLower = trimmedSearch.toLowerCase()
      result = result.filter(character =>
        character.name.toLowerCase().startsWith(searchLower)
      )

      // Cuando hay búsqueda, aplicar TODOS los filtros de Specie en cliente
      if (specieFilter === SpecieFilterValues.HUMAN) {
        // Filtrar solo humanos
        result = result.filter(
          character =>
            character.species.toLowerCase() ===
            SpecieApiValues.HUMAN.toLowerCase()
        )
      } else if (specieFilter === SpecieFilterValues.ALIEN) {
        // Filtrar alien (excluir humanos)
        result = result.filter(
          character =>
            character.species.toLowerCase() !==
            SpecieApiValues.HUMAN.toLowerCase()
        )
      }
      // Si es 'all', no filtrar por especie
    } else if (specieFilter === SpecieFilterValues.ALIEN) {
      // Sin búsqueda: aplicar filtro de Specie solo si es 'alien' (los demás vienen de API)
      result = result.filter(
        character =>
          character.species.toLowerCase() !==
          SpecieApiValues.HUMAN.toLowerCase()
      )
    }

    return result
  }, [charactersFilteredByCharacter, specieFilter, hasSearch, trimmedSearch])

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
