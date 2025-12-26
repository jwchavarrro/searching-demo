/**
 * use-sorted-characters.ts
 * @description: Hook para ordenar personajes según el orden especificado
 */

import { useMemo } from 'react'

// Import of utils
import { sortCharactersByOrder } from '@/fragments/utils'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { SortOrderType } from '@/fragments/components/sort-order/utils'
import { SortOrderValues } from '@/fragments/components/sort-order/utils'

interface UseSortedCharactersProps {
  characters: CharacterType[]
  sortOrder?: SortOrderType
}

/**
 * Hook para ordenar personajes
 * Por defecto ordena ascendente
 */
export function useSortedCharacters({
  characters,
  sortOrder = SortOrderValues.ASC,
}: UseSortedCharactersProps): CharacterType[] {
  return useMemo(() => {
    return sortCharactersByOrder(characters, sortOrder)
  }, [characters, sortOrder])
}
