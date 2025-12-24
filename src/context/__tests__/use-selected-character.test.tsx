/**
 * use-selected-character.test.tsx
 * @description: Tests para el hook useSelectedCharacter
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'jotai'
import { useSelectedCharacter } from '../use-selected-character'
import type { CharacterType } from '@/graphql/types'

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

describe('useSelectedCharacter', () => {
  beforeEach(() => {
    // Resetear el estado antes de cada test
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })
    act(() => {
      result.current.setSelectedCharacter(null)
    })
  })

  it('debe retornar null inicialmente', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })

    expect(result.current.selectedCharacter).toBeNull()
    expect(result.current.setSelectedCharacter).toBeDefined()
    expect(typeof result.current.setSelectedCharacter).toBe('function')
  })

  it('debe permitir establecer un personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.setSelectedCharacter(mockCharacter)
    })

    expect(result.current.selectedCharacter).toEqual(mockCharacter)
    expect(result.current.selectedCharacter?.id).toBe(1)
    expect(result.current.selectedCharacter?.name).toBe('Rick Sanchez')
  })

  it('debe permitir cambiar el personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })

    const anotherCharacter: CharacterType = {
      ...mockCharacter,
      id: 2,
      name: 'Morty Smith',
    }

    act(() => {
      result.current.setSelectedCharacter(mockCharacter)
    })

    expect(result.current.selectedCharacter?.name).toBe('Rick Sanchez')

    act(() => {
      result.current.setSelectedCharacter(anotherCharacter)
    })

    expect(result.current.selectedCharacter?.name).toBe('Morty Smith')
    expect(result.current.selectedCharacter?.id).toBe(2)
  })

  it('debe permitir limpiar el personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.setSelectedCharacter(mockCharacter)
    })

    expect(result.current.selectedCharacter).not.toBeNull()

    act(() => {
      result.current.setSelectedCharacter(null)
    })

    expect(result.current.selectedCharacter).toBeNull()
  })

  it('debe actualizar el estado correctamente cuando se cambia el personaje', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper: Provider,
    })

    act(() => {
      result.current.setSelectedCharacter(mockCharacter)
    })

    expect(result.current.selectedCharacter).toEqual(mockCharacter)

    const anotherCharacter: CharacterType = {
      ...mockCharacter,
      id: 2,
      name: 'Morty Smith',
    }

    act(() => {
      result.current.setSelectedCharacter(anotherCharacter)
    })

    expect(result.current.selectedCharacter).toEqual(anotherCharacter)
    expect(result.current.selectedCharacter?.id).toBe(2)
  })
})
