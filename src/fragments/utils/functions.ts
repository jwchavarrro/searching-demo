/**
 * fragments/utils/functions.ts
 * @description: Funciones para el fragmento de personajes
 */

import type { CharacterType } from '@/graphql/types'

export function sortCharactersByOrder(
  characters: CharacterType[],
  sortOrder: 'asc' | 'desc'
): CharacterType[] {
  const sorted = [...characters].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name)
    return sortOrder === 'asc' ? comparison : -comparison
  })
  return sorted
}
