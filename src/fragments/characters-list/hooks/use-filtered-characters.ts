/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes según el filtro de Character y Specie
 */

import { useMemo } from 'react'

// Import of hooks
import {
  useCharacters,
  useCharactersBySpecies,
  useCharactersByGender,
  useSearchCharacters,
} from '@/hooks'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type {
  CharacterFilterType,
  SpecieFilterType,
  GenderFilterType,
} from '@/fragments/components/filter/utils'
import {
  CharacterFilterValues,
  SpecieFilterValues,
  SpecieApiValues,
  GenderFilterValues,
  GenderApiValues,
} from '@/fragments/components/filter/utils'

// Import of custom hooks
import { useFilterByCharacter } from './use-filter-by-character'
import { useFilterBySpecie } from './use-filter-by-specie'
import { useFilterByGender } from './use-filter-by-gender'

interface UseFilteredCharactersReturn {
  filteredCharacters: CharacterType[]
  isLoading: boolean
  error: Error | null
  data: ReturnType<typeof useCharacters>['data']
}

interface UseFilteredCharactersProps {
  characterFilter?: CharacterFilterType
  specieFilter?: SpecieFilterType
  genderFilter?: GenderFilterType
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

/**
 * @name convertGenderFilterToApiValue
 * @description: Convierte el filtro de Gender a valor para la API
 * - 'all' -> undefined (usa GET_CHARACTERS)
 * - 'male' -> "Male" (usa GET_CHARACTERS_BY_GENDER)
 * - 'female' -> "Female" (usa GET_CHARACTERS_BY_GENDER)
 * - 'genderless' -> "Genderless" (usa GET_CHARACTERS_BY_GENDER)
 * - 'unknown' -> "unknown" (usa GET_CHARACTERS_BY_GENDER)
 */
function convertGenderFilterToApiValue(
  genderFilter: GenderFilterType
): string | undefined {
  switch (genderFilter) {
    case GenderFilterValues.MALE:
      return GenderApiValues.MALE
    case GenderFilterValues.FEMALE:
      return GenderApiValues.FEMALE
    case GenderFilterValues.GENDERLESS:
      return GenderApiValues.GENDERLESS
    case GenderFilterValues.UNKNOWN:
      return GenderApiValues.UNKNOWN
    case GenderFilterValues.ALL:
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
    genderFilter = GenderFilterValues.ALL,
    searchValue = '',
  } = props || {}

  // Normalizar y validar búsqueda
  const trimmedSearch = searchValue.trim()
  const hasSearch = trimmedSearch.length > 0

  // Convertir los filtros a valores para la API
  const apiSpecies = convertSpecieFilterToApiValue(specieFilter)
  const apiGender = convertGenderFilterToApiValue(genderFilter)
  const shouldUseSpeciesQuery = specieFilter === SpecieFilterValues.HUMAN
  const shouldUseGenderQuery =
    genderFilter !== GenderFilterValues.ALL && !hasSearch

  // Ejecutar hooks condicionalmente para evitar llamadas innecesarias
  // Prioridad: 1. Búsqueda por nombre, 2. Filtro por especie, 3. Filtro por género, 4. Todos los personajes
  const searchQuery = useSearchCharacters(trimmedSearch)
  const charactersQuery = useCharacters()
  const charactersBySpeciesQuery = useCharactersBySpecies(apiSpecies || '')
  const charactersByGenderQuery = useCharactersByGender(apiGender || '')

  // Determinar qué query usar según el filtro
  // Prioridad: 1. Búsqueda por nombre, 2. Filtro por especie, 3. Filtro por género, 4. Todos los personajes
  let activeQuery
  if (hasSearch) {
    activeQuery = searchQuery
  } else if (shouldUseSpeciesQuery) {
    activeQuery = charactersBySpeciesQuery
  } else if (shouldUseGenderQuery) {
    activeQuery = charactersByGenderQuery
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

  /* @name charactersFilteredBySpecie
  @description: Filtrar personajes por Specie - se aplica en cliente cuando es necesario
  */
  const charactersFilteredBySpecie = useFilterBySpecie({
    characters: charactersFilteredByCharacter,
    specieFilter:
      hasSearch || !shouldUseSpeciesQuery ? specieFilter : undefined,
  })

  /* @name charactersFilteredByGender
  @description: Filtrar personajes por Gender - se aplica en cliente cuando es necesario
  */
  const charactersFilteredByGender = useFilterByGender({
    characters: charactersFilteredBySpecie,
    genderFilter: hasSearch || !shouldUseGenderQuery ? genderFilter : undefined,
  })

  /* @name filteredCharacters
  @description: Aplicar filtros adicionales en cliente sobre los resultados:
  - Si hay búsqueda: refinar búsqueda (empieza con) - los filtros ya están aplicados por los hooks
  - Si no hay búsqueda: los filtros ya están aplicados por los hooks según la lógica
  */
  const filteredCharacters = useMemo(() => {
    let result = charactersFilteredByGender

    // Si hay búsqueda, refinar resultados de API (solo nombres que empiezan con el texto)
    if (hasSearch) {
      const searchLower = trimmedSearch.toLowerCase()
      result = result.filter(character =>
        character.name.toLowerCase().startsWith(searchLower)
      )
    }

    return result
  }, [charactersFilteredByGender, hasSearch, trimmedSearch])

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
