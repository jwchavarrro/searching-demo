/**
 * useSearchCharacters.ts
 * @description: Hook para buscar personajes por nombre usando TanStack Query
 */

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// Import of services
import { searchCharacters } from '@/graphql/services'

// Import of types
import type { ApiResponseType, CharacterType } from '@/graphql/types'

interface UseSearchCharactersReturn {
  data: ApiResponseType<CharacterType> | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook para buscar personajes por nombre con debounce
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook para buscar personajes por nombre
 */
export function useSearchCharacters(query: string): UseSearchCharactersReturn {
  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', 'search', debouncedQuery],
    queryFn: () => searchCharacters(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  })

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
  }
}
