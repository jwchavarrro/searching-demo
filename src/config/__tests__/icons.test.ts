/**
 * icons.test.ts
 * @description: Tests para el módulo de iconos
 */

import { describe, it, expect } from 'vitest'
import { ICONS } from '../icons'

describe('ICONS', () => {
  it('debe exportar un objeto con iconos', () => {
    expect(ICONS).toBeDefined()
    expect(typeof ICONS).toBe('object')
  })

  it('debe tener la propiedad filter', () => {
    expect(ICONS).toHaveProperty('filter')
    expect(typeof ICONS.filter).toBe('string')
    expect(ICONS.filter).toBe('hugeicons:filter-vertical')
  })

  it('debe tener la propiedad search_01', () => {
    expect(ICONS).toHaveProperty('search_01')
    expect(typeof ICONS.search_01).toBe('string')
    expect(ICONS.search_01).toBe('hugeicons:search-01')
  })

  it('debe ser un objeto readonly (as const)', () => {
    // Verificar que todas las propiedades son strings
    Object.values(ICONS).forEach(value => {
      expect(typeof value).toBe('string')
    })
  })

  it('debe tener todas las propiedades definidas', () => {
    const expectedKeys = ['filter', 'search_01']
    const actualKeys = Object.keys(ICONS)

    expectedKeys.forEach(key => {
      expect(actualKeys).toContain(key)
    })
  })
})

