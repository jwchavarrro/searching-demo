/**
 * useUrlParam.test.ts
 * @description: Tests para el hook useUrlParam
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useUrlParam, useUrlParams } from '../useUrlParam'

const createWrapper = (initialEntries = ['/']) => {
  return ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  )
}

describe('useUrlParam', () => {
  beforeEach(() => {
    // Limpiar la URL antes de cada test
    window.history.replaceState({}, '', '/')
  })

  it('debe retornar null cuando el parámetro no existe', () => {
    const { result } = renderHook(() => useUrlParam('test'), {
      wrapper: createWrapper(),
    })

    expect(result.current.value).toBeNull()
    expect(result.current.isPresent).toBe(false)
  })

  it('debe retornar el valor del parámetro de la URL', () => {
    const { result } = renderHook(() => useUrlParam('name'), {
      wrapper: createWrapper(['/?name=Rick']),
    })

    expect(result.current.value).toBe('Rick')
    expect(result.current.isPresent).toBe(true)
  })

  it('debe establecer un valor en la URL', () => {
    const { result } = renderHook(() => useUrlParam('name'), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.setValue('Morty')
    })

    expect(result.current.value).toBe('Morty')
    expect(result.current.isPresent).toBe(true)
  })

  it('debe eliminar un parámetro de la URL', () => {
    const { result } = renderHook(() => useUrlParam('name'), {
      wrapper: createWrapper(['/?name=Rick']),
    })

    act(() => {
      result.current.remove()
    })

    expect(result.current.value).toBeNull()
    expect(result.current.isPresent).toBe(false)
  })

  it('debe usar el valor por defecto cuando el parámetro no existe', () => {
    const { result } = renderHook(
      () => useUrlParam('name', { defaultValue: 'Default' }),
      { wrapper: createWrapper() }
    )

    expect(result.current.value).toBe('Default')
  })

  it('debe convertir el valor a número cuando type es "number"', () => {
    const { result } = renderHook(
      () => useUrlParam('page', { type: 'number' }),
      {
        wrapper: createWrapper(['/?page=42']),
      }
    )

    expect(result.current.value).toBe(42)
    expect(typeof result.current.value).toBe('number')
  })

  it('debe convertir el valor a booleano cuando type es "boolean"', () => {
    const { result } = renderHook(
      () => useUrlParam('active', { type: 'boolean' }),
      {
        wrapper: createWrapper(['/?active=true']),
      }
    )

    expect(result.current.value).toBe(true)
    expect(typeof result.current.value).toBe('boolean')
  })

  it('debe validar el valor con el validator', () => {
    const validator = (value: string) => value.length > 3

    const { result } = renderHook(
      () => useUrlParam('name', { validator, defaultValue: 'Default' }),
      {
        wrapper: createWrapper(['/?name=Hi']),
      }
    )

    expect(result.current.value).toBe('Default')
  })
})

describe('useUrlParams', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('debe retornar un objeto vacío cuando no hay parámetros', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      { wrapper: createWrapper() }
    )

    expect(result.current.values).toEqual({})
  })

  it('debe retornar los valores de múltiples parámetros', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      {
        wrapper: createWrapper(['/?name=Rick&age=70']),
      }
    )

    expect(result.current.values).toEqual({ name: 'Rick', age: '70' })
  })

  it('debe establecer un valor para un parámetro específico', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      { wrapper: createWrapper() }
    )

    act(() => {
      result.current.setValue('name', 'Morty')
    })

    expect(result.current.values.name).toBe('Morty')
    expect(result.current.isPresent('name')).toBe(true)
  })

  it('debe establecer múltiples valores a la vez', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      { wrapper: createWrapper() }
    )

    act(() => {
      result.current.setValues({ name: 'Rick', age: '70' })
    })

    expect(result.current.values).toEqual({ name: 'Rick', age: '70' })
  })

  it('debe eliminar un parámetro específico', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      {
        wrapper: createWrapper(['/?name=Rick&age=70']),
      }
    )

    act(() => {
      result.current.remove('name')
    })

    expect(result.current.values.name).toBeUndefined()
    expect(result.current.isPresent('name')).toBe(false)
    expect(result.current.values.age).toBe('70')
  })

  it('debe eliminar todos los parámetros', () => {
    const { result } = renderHook(
      () => useUrlParams<{ name: string; age: string }>(['name', 'age']),
      {
        wrapper: createWrapper(['/?name=Rick&age=70']),
      }
    )

    act(() => {
      result.current.removeAll()
    })

    expect(result.current.values).toEqual({})
    expect(result.current.isPresent('name')).toBe(false)
    expect(result.current.isPresent('age')).toBe(false)
  })
})
