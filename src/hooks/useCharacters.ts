/**
 * useCharacters.ts
 * @description: Hook para obtener todos los personajes usando TanStack Query
 */

import { useQuery } from '@tanstack/react-query'

// Import of services
import { fetchCharacters } from '@/graphql/services'

// Import of types
import type { ApiResponseType, CharacterType } from '@/graphql/types'

interface UseCharactersReturn {
  data: ApiResponseType<CharacterType> | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook para obtener todos los personajes
 */
export function useCharacters(): UseCharactersReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  })

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
  }
}
