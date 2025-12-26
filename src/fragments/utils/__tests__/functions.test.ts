/**
 * functions.test.ts
 * @description: Tests para las funciones utilitarias de fragments
 */

import { describe, it, expect } from 'vitest'
import { sortCharactersByOrder } from '../functions'
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

describe('sortCharactersByOrder', () => {
  it('debe retornar un array vacío si se pasa un array vacío', () => {
    const result = sortCharactersByOrder([], 'asc')
    expect(result).toEqual([])
  })

  it('debe ordenar personajes ascendente por nombre (A-Z)', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const result = sortCharactersByOrder(characters, 'asc')

    expect(result).toHaveLength(3)
    expect(result[0].name).toBe('Morty Smith')
    expect(result[1].name).toBe('Rick Sanchez')
    expect(result[2].name).toBe('Summer Smith')
  })

  it('debe ordenar personajes descendente por nombre (Z-A)', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const result = sortCharactersByOrder(characters, 'desc')

    expect(result).toHaveLength(3)
    expect(result[0].name).toBe('Summer Smith')
    expect(result[1].name).toBe('Rick Sanchez')
    expect(result[2].name).toBe('Morty Smith')
  })

  it('no debe mutar el array original', () => {
    const characters = [mockCharacter1, mockCharacter3, mockCharacter2]
    const originalOrder = characters.map(c => c.name)
    sortCharactersByOrder(characters, 'asc')

    expect(characters.map(c => c.name)).toEqual(originalOrder)
  })

  it('debe manejar un solo personaje', () => {
    const result = sortCharactersByOrder([mockCharacter1], 'asc')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Rick Sanchez')
  })

  it('debe mantener el orden cuando los nombres son iguales', () => {
    const duplicateCharacter = { ...mockCharacter1, id: 4 }
    const characters = [mockCharacter1, duplicateCharacter]
    const result = sortCharactersByOrder(characters, 'asc')

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(4)
  })
})
