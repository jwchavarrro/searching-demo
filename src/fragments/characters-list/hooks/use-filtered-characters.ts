/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes según el filtro de Character
 */

import { useMemo } from 'react'

// Import of hooks
import { useCharacters } from '@/hooks'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { CharacterFilter } from '@/components/atomic-desing/organisms'

interface UseFilteredCharactersReturn {
  filteredCharacters: CharacterType[]
  isLoading: boolean
  error: Error | null
  data: ReturnType<typeof useCharacters>['data']
}

interface UseFilteredCharactersProps {
  characterFilter?: CharacterFilter
}

export function useFilteredCharacters(
  props?: UseFilteredCharactersProps
): UseFilteredCharactersReturn {
  const { characterFilter = 'others' } = props || {}

  /* @name useCharacters
  @description: Hook para obtener los personajes de la API
  */
  const { data, isLoading, error } = useCharacters()

  // Implement context
  const { charactersStarred } = useCharactersStarred()

  /* @name filteredCharacters
  @description: Filtrar personajes según el filtro de Character:
    - 'all': mostrar todos los personajes
    - 'starred': mostrar solo los personajes marcados como favoritos
    - 'others': mostrar solo los personajes que NO están en starred
  */
  const filteredCharacters = useMemo(() => {
    if (!data?.results) return []

    const starredIds = new Set(charactersStarred.map(char => char.id))

    switch (characterFilter) {
      case 'all':
        // Mostrar todos los personajes
        return data.results

      case 'starred':
        // Mostrar solo los personajes marcados como favoritos
        return data.results.filter(character => starredIds.has(character.id))

      case 'others':
        // Mostrar solo los personajes que NO están en starred (comportamiento por defecto)
        return data.results.filter(character => !starredIds.has(character.id))

      default:
        return data.results.filter(character => !starredIds.has(character.id))
    }
  }, [data, charactersStarred, characterFilter])

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
