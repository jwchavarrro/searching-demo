/**
 * use-selected-character.test.tsx
 * @description: Tests para el hook useSelectedCharacter
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'jotai'
import { MemoryRouter } from 'react-router-dom'
import { useSelectedCharacter } from '../use-selected-character'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <Provider>{children}</Provider>
  </MemoryRouter>
)

describe('useSelectedCharacter', () => {
  beforeEach(() => {
    // Resetear el estado antes de cada test
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })
    act(() => {
      result.current.setSelectedCharacter(null)
    })
  })

  it('debe retornar null inicialmente', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })

    expect(result.current.selectedCharacterName).toBeNull()
    expect(result.current.setSelectedCharacter).toBeDefined()
    expect(typeof result.current.setSelectedCharacter).toBe('function')
  })

  it('debe permitir establecer un personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })

    act(() => {
      result.current.setSelectedCharacter('Rick Sanchez')
    })

    expect(result.current.selectedCharacterName).toBe('Rick Sanchez')
  })

  it('debe permitir cambiar el personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })

    act(() => {
      result.current.setSelectedCharacter('Rick Sanchez')
    })

    expect(result.current.selectedCharacterName).toBe('Rick Sanchez')

    act(() => {
      result.current.setSelectedCharacter('Morty Smith')
    })

    expect(result.current.selectedCharacterName).toBe('Morty Smith')
  })

  it('debe permitir limpiar el personaje seleccionado', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })

    act(() => {
      result.current.setSelectedCharacter('Rick Sanchez')
    })

    expect(result.current.selectedCharacterName).not.toBeNull()

    act(() => {
      result.current.setSelectedCharacter(null)
    })

    expect(result.current.selectedCharacterName).toBeNull()
  })

  it('debe actualizar el estado correctamente cuando se cambia el personaje', () => {
    const { result } = renderHook(() => useSelectedCharacter(), {
      wrapper,
    })

    act(() => {
      result.current.setSelectedCharacter('Rick Sanchez')
    })

    expect(result.current.selectedCharacterName).toBe('Rick Sanchez')

    act(() => {
      result.current.setSelectedCharacter('Morty Smith')
    })

    expect(result.current.selectedCharacterName).toBe('Morty Smith')
  })
})
