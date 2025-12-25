/**
 * use-characters-starred.test.tsx
 * @description: Tests para el hook useCharactersStarred
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'jotai'
import { useCharactersStarred } from '../use-characters-starred'
import type { CharacterType } from '@/graphql/types'

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

describe('useCharactersStarred', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('debe retornar un array vacío inicialmente', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    expect(result.current.charactersStarred).toEqual([])
    expect(result.current.count).toBe(0)
  })

  it('debe agregar un personaje a la lista', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.addCharacter(mockCharacter1)
    })

    expect(result.current.charactersStarred).toHaveLength(1)
    expect(result.current.charactersStarred[0]).toEqual(mockCharacter1)
    expect(result.current.count).toBe(1)
  })

  it('debe evitar agregar duplicados', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.addCharacter(mockCharacter1)
      result.current.addCharacter(mockCharacter1)
    })

    expect(result.current.charactersStarred).toHaveLength(1)
    expect(result.current.count).toBe(1)
  })

  it('debe eliminar un personaje de la lista', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.addCharacter(mockCharacter1)
      result.current.addCharacter(mockCharacter2)
    })

    expect(result.current.charactersStarred).toHaveLength(2)

    act(() => {
      result.current.removeCharacter(1)
    })

    expect(result.current.charactersStarred).toHaveLength(1)
    expect(result.current.charactersStarred[0]).toEqual(mockCharacter2)
    expect(result.current.count).toBe(1)
  })

  it('debe alternar el estado de favorito de un personaje', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.handleCharacterStarred(mockCharacter1)
    })

    expect(result.current.charactersStarred).toHaveLength(1)
    expect(result.current.isCharacterStarred(1)).toBe(true)

    act(() => {
      result.current.handleCharacterStarred(mockCharacter1)
    })

    expect(result.current.charactersStarred).toHaveLength(0)
    expect(result.current.isCharacterStarred(1)).toBe(false)
  })

  it('debe verificar correctamente si un personaje está marcado como favorito', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    expect(result.current.isCharacterStarred(1)).toBe(false)

    act(() => {
      result.current.addCharacter(mockCharacter1)
    })

    expect(result.current.isCharacterStarred(1)).toBe(true)
    expect(result.current.isCharacterStarred(2)).toBe(false)
  })

  it('debe actualizar el contador correctamente', () => {
    const { result } = renderHook(() => useCharactersStarred(), {
      wrapper: Provider,
    })

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.addCharacter(mockCharacter1)
    })

    expect(result.current.count).toBe(1)

    act(() => {
      result.current.addCharacter(mockCharacter2)
    })

    expect(result.current.count).toBe(2)

    act(() => {
      result.current.removeCharacter(1)
    })

    expect(result.current.count).toBe(1)
  })
})
