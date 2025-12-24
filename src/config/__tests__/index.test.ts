/**
 * index.test.ts
 * @description: Tests para las exportaciones del módulo config
 */

import { describe, it, expect } from 'vitest'
import * as config from '../index'

describe('config/index', () => {
  it('debe exportar ICONS', () => {
    expect(config).toHaveProperty('ICONS')
    expect(config.ICONS).toBeDefined()
    expect(typeof config.ICONS).toBe('object')
  })

  it('debe exportar ICONS con las propiedades correctas', () => {
    expect(config.ICONS).toHaveProperty('filter')
    expect(config.ICONS).toHaveProperty('search_01')
  })
})
