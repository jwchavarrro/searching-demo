/**
 * useCharacterByName.ts
 * @description: Hook para obtener un personaje por su nombre usando TanStack Query
 */

import { useQuery } from '@tanstack/react-query'

// Import of services
import { fetchCharacterByName } from '@/graphql/services'

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
  const {
    data: character,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['character', characterName],
    queryFn: () => {
      if (!characterName) throw new Error('Character name is required')
      return fetchCharacterByName(characterName)
    },
    enabled: !!characterName,
  })

  return {
    character: character || null,
    isLoading,
    error: error || null,
  }
}
