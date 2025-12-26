/**
 * useCharactersByGender.ts
 * @description: Hook para obtener personajes filtrados por género usando TanStack Query
 */

import { useQuery } from '@tanstack/react-query'

// Import of services
import { fetchCharactersByGender } from '@/graphql/services'

// Import of types
import type { ApiResponseType, CharacterType } from '@/graphql/types'

interface UseCharactersByGenderReturn {
  data: ApiResponseType<CharacterType> | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook para obtener personajes filtrados por género
 */
export function useCharactersByGender(
  gender: string
): UseCharactersByGenderReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', 'gender', gender],
    queryFn: () => fetchCharactersByGender(gender),
    enabled: gender.length > 0,
  })

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
  }
}

