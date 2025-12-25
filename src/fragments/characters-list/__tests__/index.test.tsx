/**
 * characters-list.test.tsx
 * @description: Tests para el componente CharactersList
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'jotai'
import { CharactersList } from '../index'
import { useFilteredCharacters } from '../hooks'
import { useCharactersStarred, useSelectedCharacter } from '@/context'
import type { CharacterType } from '@/graphql/types'

// Mock de los hooks
vi.mock('../hooks', () => ({
  useFilteredCharacters: vi.fn(),
}))

vi.mock('@/context', () => ({
  useCharactersStarred: vi.fn(),
  useSelectedCharacter: vi.fn(),
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
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('CharactersList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe mostrar un mensaje de carga cuando está cargando', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: true,
      error: null,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(() => false),
      count: 0,
    })

    vi.mocked(useSelectedCharacter).mockReturnValue({
      selectedCharacterName: null,
      setSelectedCharacter: vi.fn(),
    })

    render(<CharactersList />, { wrapper: createWrapper() })

    expect(screen.getByText('Loading characters...')).toBeInTheDocument()
  })

  it('debe mostrar un mensaje de error cuando hay un error', () => {
    const error = new Error('Error al cargar personajes')
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error,
      data: null,
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(() => false),
      count: 0,
    })

    vi.mocked(useSelectedCharacter).mockReturnValue({
      selectedCharacterName: null,
      setSelectedCharacter: vi.fn(),
    })

    render(<CharactersList />, { wrapper: createWrapper() })

    expect(
      screen.getByText('An error occurred while loading the characters.')
    ).toBeInTheDocument()
  })

  it('debe mostrar un mensaje cuando no hay personajes', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: {
        results: [],
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
      },
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(() => false),
      count: 0,
    })

    vi.mocked(useSelectedCharacter).mockReturnValue({
      selectedCharacterName: null,
      setSelectedCharacter: vi.fn(),
    })

    render(<CharactersList />, { wrapper: createWrapper() })

    expect(screen.getByText('No characters found')).toBeInTheDocument()
  })

  it('debe mostrar un mensaje cuando todos los personajes son favoritos', () => {
    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [],
      isLoading: false,
      error: null,
      data: {
        results: [mockCharacter1],
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
      },
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred: vi.fn(),
      isCharacterStarred: vi.fn(() => false),
      count: 0,
    })

    vi.mocked(useSelectedCharacter).mockReturnValue({
      selectedCharacterName: null,
      setSelectedCharacter: vi.fn(),
    })

    render(<CharactersList />, { wrapper: createWrapper() })

    expect(screen.getByText('All characters are starred')).toBeInTheDocument()
  })

  it('debe renderizar la lista de personajes filtrados', () => {
    const setSelectedCharacter = vi.fn()
    const handleCharacterStarred = vi.fn()

    vi.mocked(useFilteredCharacters).mockReturnValue({
      filteredCharacters: [mockCharacter1, mockCharacter2],
      isLoading: false,
      error: null,
      data: {
        results: [mockCharacter1, mockCharacter2],
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
      },
    })

    vi.mocked(useCharactersStarred).mockReturnValue({
      charactersStarred: [],
      setCharactersStarred: vi.fn(),
      addCharacter: vi.fn(),
      removeCharacter: vi.fn(),
      handleCharacterStarred,
      isCharacterStarred: vi.fn(() => false),
      count: 0,
    })

    vi.mocked(useSelectedCharacter).mockReturnValue({
      selectedCharacterName: null,
      setSelectedCharacter,
    })

    render(<CharactersList />, { wrapper: createWrapper() })

    expect(screen.getByText('CHARACTERS (2)')).toBeInTheDocument()
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Morty Smith')).toBeInTheDocument()
  })
})
