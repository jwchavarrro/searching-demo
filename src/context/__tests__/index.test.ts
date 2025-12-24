/**
 * index.test.ts
 * @description: Tests para las exportaciones del módulo context
 */

import { describe, it, expect } from 'vitest'
import * as context from '../index'

describe('context/index', () => {
  it('debe exportar atom', () => {
    expect(context).toHaveProperty('atom')
    expect(typeof context.atom).toBe('function')
  })

  it('debe exportar useAtom', () => {
    expect(context).toHaveProperty('useAtom')
    expect(typeof context.useAtom).toBe('function')
  })

  it('debe exportar atomWithStorage', () => {
    expect(context).toHaveProperty('atomWithStorage')
    expect(typeof context.atomWithStorage).toBe('function')
  })

  it('debe exportar useSelectedCharacter', () => {
    expect(context).toHaveProperty('useSelectedCharacter')
    expect(typeof context.useSelectedCharacter).toBe('function')
  })
})
