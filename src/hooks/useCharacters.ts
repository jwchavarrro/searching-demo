/**
 * useCharacters.ts
 * @description: Hook para obtener todos los personajes usando TanStack Query
 */

import { useMemo } from 'react'
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
 * Hook para obtener todos los personajes ordenados alfabéticamente
 */
export function useCharacters(): UseCharactersReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  })

  const sortedData = useMemo(() => {
    if (!data) return null

    const sortedResults = [...data.results].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )

    return {
      ...data,
      results: sortedResults,
    }
  }, [data])

  return {
    data: sortedData,
    isLoading,
    error: error ?? null,
  }
}
