/**
 * use-total-results.test.tsx
 * @description: Tests para el hook useTotalResults
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTotalResults } from '../use-total-results'
import { useFilteredCharacters } from '../../characters-list/hooks'
import { useCharactersStarred } from '@/context'
import type { CharacterType } from '@/graphql/types'

// Mock de los hooks
vi.mock('../../characters-list/hooks', () => ({
  useFilteredCharacters: vi.fn(),
}))

vi.mock('@/context', () => ({
  useCharactersStarred: vi.fn(),
}))

const mockCharacter1: CharacterType = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
}

const mockCharacter2: CharacterType = {
  id: 2,
  name: 'Morty Smith',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  species: 'Human',
  status: 'Alive',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
}

const mockCharacter3: CharacterType = {
  id: 3,
  name: 'Summer Smith',
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  species: 'Human',
  status: 'Alive',
  type: '',
  gender: 'Female',
  created: '2017-11-04T18:48:46.250Z',
}

const mockCharacter4: CharacterType = {
  id: 4,
  name: 'Alien Character',
  image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  species: 'Alien',
  status: 'Alive',
  type: '',
  gender: 'unknown',
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTotalResults', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar conteos en 0 cuando no hay datos', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(() => useTotalResults(), {
      wrapper: createWrapper(),
    })

    expect(result.current.charactersCount).toBe(0)
    expect(result.current.starredCount).toBe(0)
    expect(result.current.totalCount).toBe(0)
  })

  it('debe calcular correctamente el conteo de personajes', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [mockCharacter1, mockCharacter2, mockCharacter3],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(() => useTotalResults(), {
      wrapper: createWrapper(),
    })

    expect(result.current.charactersCount).toBe(3)
    expect(result.current.starredCount).toBe(0)
    expect(result.current.totalCount).toBe(3)
  })

  it('debe calcular correctamente el conteo de starred', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 2,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(() => useTotalResults(), {
      wrapper: createWrapper(),
    })

    expect(result.current.charactersCount).toBe(0)
    expect(result.current.starredCount).toBe(2)
    expect(result.current.totalCount).toBe(2)
  })

  it('debe calcular correctamente el total sumando personajes y starred', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [mockCharacter1, mockCharacter2],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter3, mockCharacter4],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 2,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(() => useTotalResults(), {
      wrapper: createWrapper(),
    })

    expect(result.current.charactersCount).toBe(2)
    expect(result.current.starredCount).toBe(2)
    expect(result.current.totalCount).toBe(4)
  })

  it('debe filtrar starred por búsqueda', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2, mockCharacter3],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 3,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(
      () => useTotalResults({ searchValue: 'Rick' }),
      {
        wrapper: createWrapper(),
      }
    )

    // Solo Rick Sanchez empieza con "Rick"
    expect(result.current.starredCount).toBe(1)
  })

  it('debe filtrar starred por especie Human', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2, mockCharacter4],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 3,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(
      () => useTotalResults({ specieFilter: 'human' }),
      {
        wrapper: createWrapper(),
      }
    )

    // Solo los humanos (mockCharacter1 y mockCharacter2)
    expect(result.current.starredCount).toBe(2)
  })

  it('debe filtrar starred por especie Alien', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2, mockCharacter4],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 3,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(
      () => useTotalResults({ specieFilter: 'alien' }),
      {
        wrapper: createWrapper(),
      }
    )

    // Solo el alien (mockCharacter4)
    expect(result.current.starredCount).toBe(1)
  })

  it('debe filtrar starred por búsqueda y especie simultáneamente', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2, mockCharacter3],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 3,
      getCharacterComment: vi.fn(),
      updateCharacterComment: vi.fn(),
      removeCharacterComment: vi.fn(),
    })

    const { result } = renderHook(
      () =>
        useTotalResults({
          searchValue: 'Rick',
          specieFilter: 'human',
        }),
      {
        wrapper: createWrapper(),
      }
    )

    // Rick Sanchez es humano y empieza con "Rick"
    expect(result.current.starredCount).toBe(1)
  })
})
