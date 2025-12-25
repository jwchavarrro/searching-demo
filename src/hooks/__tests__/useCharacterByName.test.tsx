/**
 * useCharacterByName.test.ts
 * @description: Tests para el hook useCharacterByName
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { useCharacterByName } from '../useCharacterByName'
import { fetchCharacterByName } from '@/graphql/services'
import type { CharacterType } from '@/graphql/types'

// Mock del servicio
vi.mock('@/graphql/services', () => ({
  fetchCharacterByName: vi.fn(),
}))

// Mock del contexto
vi.mock('@/context', async () => {
  const actual = await vi.importActual('@/context')
  return {
    ...actual,
    useCharactersStarred: vi.fn(() => ({
      charactersStarred: [],
    })),
  }
})

const mockCharacter: CharacterType = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  )
}

describe('useCharacterByName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar null cuando characterName es null', () => {
    const { result } = renderHook(() => useCharacterByName(null), {
      wrapper: createWrapper(),
    })

    expect(result.current.character).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('debe buscar el personaje en la API cuando no está en starred', async () => {
    vi.mocked(fetchCharacterByName).mockResolvedValue(mockCharacter)

    const { result } = renderHook(() => useCharacterByName('Rick Sanchez'), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.character).toEqual(mockCharacter)
    expect(fetchCharacterByName).toHaveBeenCalledWith('Rick Sanchez')
  })

  it('debe retornar error cuando la API falla', async () => {
    const error = new Error('Personaje no encontrado')
    vi.mocked(fetchCharacterByName).mockRejectedValue(error)

    const { result } = renderHook(() => useCharacterByName('Unknown'), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })

    expect(result.current.character).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('debe buscar primero en starred antes de consultar la API', async () => {
    const { useCharactersStarred } = await import('@/context')
    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 1,
    })

    const { result } = renderHook(() => useCharacterByName('Rick Sanchez'), {
      wrapper: createWrapper(),
    })

    expect(result.current.character).toEqual(mockCharacter)
    expect(result.current.isLoading).toBe(false)
    expect(fetchCharacterByName).not.toHaveBeenCalled()
  })

  it('debe hacer la búsqueda case-insensitive en starred', async () => {
    const { useCharactersStarred } = await import('@/context')
    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 1,
    })

    const { result } = renderHook(() => useCharacterByName('rick sanchez'), {
      wrapper: createWrapper(),
    })

    expect(result.current.character).toEqual(mockCharacter)
    expect(result.current.isLoading).toBe(false)
  })
})
