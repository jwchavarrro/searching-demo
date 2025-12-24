/**
 * useFilteredCharacters.ts
 * @description: Hook personalizado para obtener y filtrar personajes excluyendo los starred
 */

import { useMemo } from 'react'

// Import of hooks
import { useCharacters } from '@/hooks'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

interface UseFilteredCharactersReturn {
  filteredCharacters: CharacterType[]
  isLoading: boolean
  error: Error | null
  data: ReturnType<typeof useCharacters>['data']
}

export function useFilteredCharacters(): UseFilteredCharactersReturn {
  /* @name useCharacters
  @description: Hook para obtener los personajes de la API
  */
  const { data, isLoading, error } = useCharacters()

  // Implement context
  const { charactersStarred } = useCharactersStarred()

  /* @name filteredCharacters
  @description: Filtrar personajes marcados como favoritos de la lista principal
  */
  const filteredCharacters = useMemo(() => {
    if (!data?.results) return []
    const starredIds = new Set(charactersStarred.map(char => char.id))
    return data.results.filter(character => !starredIds.has(character.id))
  }, [data, charactersStarred])

  return {
    filteredCharacters,
    isLoading,
    error,
    data,
  }
}
