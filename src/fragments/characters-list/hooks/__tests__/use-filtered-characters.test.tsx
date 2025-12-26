/**
 * use-filtered-characters.test.ts
 * @description: Tests para el hook useFilteredCharacters
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFilteredCharacters } from '../use-filtered-characters'
import {
  useCharacters,
  useCharactersBySpecies,
  useCharactersByGender,
  useSearchCharacters,
} from '@/hooks'
import { useCharactersStarred } from '@/context'
import type { CharacterType } from '@/graphql/types'

// Mock de los hooks
vi.mock('@/hooks', () => ({
  useCharacters: vi.fn(),
  useCharactersBySpecies: vi.fn(),
  useCharactersByGender: vi.fn(),
  useSearchCharacters: vi.fn(),
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

describe('useFilteredCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar un array vacío cuando no hay datos', () => {
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.filteredCharacters).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('debe retornar todos los personajes cuando no hay favoritos', () => {
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: {
        results: [mockCharacter1, mockCharacter2, mockCharacter3],
        info: {
          count: 3,
          pages: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.filteredCharacters).toHaveLength(3)
    expect(result.current.filteredCharacters).toEqual([
      mockCharacter1,
      mockCharacter2,
      mockCharacter3,
    ])
  })

  it('debe excluir los personajes marcados como favoritos', () => {
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: {
        results: [mockCharacter1, mockCharacter2, mockCharacter3],
        info: {
          count: 3,
          pages: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 1,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.filteredCharacters).toHaveLength(2)
    expect(result.current.filteredCharacters).toEqual([
      mockCharacter2,
      mockCharacter3,
    ])
    expect(result.current.filteredCharacters.some(char => char.id === 1)).toBe(
      false
    )
  })

  it('debe retornar un array vacío cuando todos los personajes son favoritos', () => {
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: {
        results: [mockCharacter1, mockCharacter2],
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [mockCharacter1, mockCharacter2],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 2,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.filteredCharacters).toEqual([])
  })

  it('debe pasar el estado de loading correctamente', () => {
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('debe pasar el error correctamente', () => {
    const error = new Error('Error al cargar personajes')
    vi.mocked(useSearchCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharacters).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    })

    vi.mocked(useCharactersBySpecies).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersByGender).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(),
      count: 0,
    })

    const { result } = renderHook(() => useFilteredCharacters(), {
      wrapper: createWrapper(),
    })

    expect(result.current.error).toEqual(error)
  })
})
