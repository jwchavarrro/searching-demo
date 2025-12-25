/**
 * useCharacterByName.ts
 * @description: Hook para obtener un personaje por su nombre usando TanStack Query
 * Optimizado: busca primero en starred (localStorage) antes de consultar la API
 */

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

// Import of services
import { fetchCharacterByName } from '@/graphql/services'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

interface UseCharacterByNameReturn {
  character: CharacterType | null
  isLoading: boolean
  error: Error | null
}

export function useCharacterByName(
  characterName: string | null
): UseCharacterByNameReturn {
  const { charactersStarred } = useCharactersStarred()

  /* @name characterFromStarred
  @description: Obtener datos del personaje por nombre desde el listado de favoritos
  */
  const characterFromStarred = useMemo(() => {
    if (!characterName) return null
    return (
      charactersStarred.find(
        char => char.name.toLowerCase() === characterName.toLowerCase()
      ) || null
    )
  }, [characterName, charactersStarred])

  /* @name characterFromApi
  @description: Obtener datos del personaje por nombre desde la API
  */
  const {
    data: characterFromApi,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['character', characterName],
    queryFn: () => {
      if (!characterName) throw new Error('Character name is required')
      return fetchCharacterByName(characterName)
    },
    enabled: !!characterName && !characterFromStarred, // No fetch si ya está en starred
  })

  /* @name character
  @description: Priorizar datos de starred
  */
  const character = characterFromStarred || characterFromApi || null

  return {
    character,
    isLoading: characterFromStarred ? false : isLoading,
    error: characterFromStarred ? null : error,
  }
}
