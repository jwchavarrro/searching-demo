/**
 * useCharactersBySpecies.ts
 * @description: Hook para obtener personajes filtrados por especie usando TanStack Query
 */

import { useQuery } from '@tanstack/react-query'

// Import of services
import { fetchCharactersBySpecies } from '@/graphql/services'

// Import of types
import type { ApiResponseType, CharacterType } from '@/graphql/types'

interface UseCharactersBySpeciesReturn {
  data: ApiResponseType<CharacterType> | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook para obtener personajes filtrados por especie
 */
export function useCharactersBySpecies(
  species: string
): UseCharactersBySpeciesReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', 'species', species],
    queryFn: () => fetchCharactersBySpecies(species),
    enabled: species.length > 0,
  })

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
  }
}
