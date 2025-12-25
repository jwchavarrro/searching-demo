/**
 * use-filter-by-character.ts
 * @description: Hook para filtrar personajes según el filtro de Character
 */

import { useMemo } from 'react'

// Import of context
import { useCharactersStarred } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'
import type { CharacterFilterType } from '@/components/atomic-desing/organisms/filter/utils'
import { CharacterFilterValues } from '@/components/atomic-desing/organisms/filter/utils'

interface UseFilterByCharacterProps {
  characters: CharacterType[]
  characterFilter?: CharacterFilterType
}

export function useFilterByCharacter({
  characters,
  characterFilter = CharacterFilterValues.OTHERS,
}: UseFilterByCharacterProps): CharacterType[] {
  const { charactersStarred } = useCharactersStarred()

  return useMemo(() => {
    if (characters.length === 0) return []

    const starredIds = new Set(charactersStarred.map(char => char.id))

    switch (characterFilter) {
      case CharacterFilterValues.ALL:
        return characters

      case CharacterFilterValues.STARRED:
        return characters.filter(character => starredIds.has(character.id))

      case CharacterFilterValues.OTHERS:
      default:
        return characters.filter(character => !starredIds.has(character.id))
    }
  }, [characters, charactersStarred, characterFilter])
}
