/**
 * useSearchCharacters.ts
 * @description: Hook para buscar personajes por nombre usando TanStack Query
 */

import { useState, useEffect, useMemo } from 'react'
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
 * Hook para buscar personajes por nombre ordenados alfabéticamente
 */
export function useSearchCharacters(query: string): UseSearchCharactersReturn {
  const debouncedQuery = useDebounce(query, 300)

  const { data, isLoading, error } = useQuery({
    queryKey: ['characters', 'search', debouncedQuery],
    queryFn: () => searchCharacters(debouncedQuery),
    enabled: debouncedQuery.length > 0,
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
