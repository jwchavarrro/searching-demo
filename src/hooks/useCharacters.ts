/**
 * useCharacters.ts
 * @description: Hooks personalizados para consultar personajes usando GraphQL (sin TanStack Query)
 */

import { useState, useEffect } from 'react'
import { fetchCharacters, searchCharacters } from '@/graphql/services'
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
  const [data, setData] = useState<ApiResponseType<CharacterType> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadCharacters() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchCharacters()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'))
      } finally {
        setIsLoading(false)
      }
    }

    loadCharacters()
  }, [])

  return { data, isLoading, error }
}

/**
 * Hook para buscar personajes por nombre
 */
export function useSearchCharacters(query: string): UseCharactersReturn {
  const [data, setData] = useState<ApiResponseType<CharacterType> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!query || query.length === 0) {
      setData(null)
      setIsLoading(false)
      setError(null)
      return
    }

    async function search() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await searchCharacters(query)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'))
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      search()
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timeoutId)
  }, [query])

  return { data, isLoading, error }
}
