/**
 * use-sorted-characters.test.tsx
 * @description: Tests para el hook useSortedCharacters
 */

import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSortedCharacters } from '../use-sorted-characters'
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

describe('useSortedCharacters', () => {
  it('debe retornar un array vacío si se pasa un array vacío', () => {
    const { result } = renderHook(() => useSortedCharacters({ characters: [] }))

    expect(result.current).toEqual([])
  })

  it('debe ordenar personajes ascendente por defecto', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const { result } = renderHook(() => useSortedCharacters({ characters }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].name).toBe('Morty Smith')
    expect(result.current[1].name).toBe('Rick Sanchez')
    expect(result.current[2].name).toBe('Summer Smith')
  })

  it('debe ordenar personajes ascendente cuando se especifica "asc"', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const { result } = renderHook(() =>
      useSortedCharacters({ characters, sortOrder: 'asc' })
    )

    expect(result.current).toHaveLength(3)
    expect(result.current[0].name).toBe('Morty Smith')
    expect(result.current[1].name).toBe('Rick Sanchez')
    expect(result.current[2].name).toBe('Summer Smith')
  })

  it('debe ordenar personajes descendente cuando se especifica "desc"', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const { result } = renderHook(() =>
      useSortedCharacters({ characters, sortOrder: 'desc' })
    )

    expect(result.current).toHaveLength(3)
    expect(result.current[0].name).toBe('Summer Smith')
    expect(result.current[1].name).toBe('Rick Sanchez')
    expect(result.current[2].name).toBe('Morty Smith')
  })

  it('debe actualizar el orden cuando cambia sortOrder', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const { result, rerender } = renderHook(
      ({ sortOrder }: { sortOrder: 'asc' | 'desc' }) =>
        useSortedCharacters({ characters, sortOrder }),
      {
        initialProps: { sortOrder: 'asc' as 'asc' | 'desc' },
      }
    )

    expect(result.current[0].name).toBe('Morty Smith')

    rerender({ sortOrder: 'desc' })

    expect(result.current[0].name).toBe('Summer Smith')
  })

  it('debe actualizar cuando cambian los personajes', () => {
    const { result, rerender } = renderHook(
      ({ characters }) => useSortedCharacters({ characters }),
      {
        initialProps: { characters: [mockCharacter1, mockCharacter2] },
      }
    )

    expect(result.current).toHaveLength(2)

    rerender({ characters: [mockCharacter1, mockCharacter2, mockCharacter3] })

    expect(result.current).toHaveLength(3)
    expect(result.current[0].name).toBe('Morty Smith')
  })
})
