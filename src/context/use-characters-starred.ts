/**
 * use-characters-starred.ts
 * @description: Hook para manejar el estado del listado de personajes marcados como favoritos usando Jotai
 */

// Import of context
import { atomWithStorage, useAtom } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

const charactersStarredAtom = atomWithStorage<CharacterType[]>(
  'characters-starred',
  []
)

export const useCharactersStarred = () => {
  const [charactersStarred, setCharactersStarred] = useAtom(
    charactersStarredAtom
  )

  const addCharacter = (character: CharacterType) => {
    setCharactersStarred(prev => {
      // Evitar duplicados
      if (prev.some(char => char.id === character.id)) {
        return prev
      }
      return [...prev, character]
    })
  }

  const removeCharacter = (characterId: number) => {
    setCharactersStarred(prev => prev.filter(char => char.id !== characterId))
  }

  const handleCharacterStarred = (character: CharacterType) => {
    setCharactersStarred(prev => {
      const isStarred = prev.some(char => char.id === character.id)
      if (isStarred) {
        return prev.filter(char => char.id !== character.id)
      }
      return [...prev, character]
    })
  }

  const isCharacterStarred = (characterId: number) => {
    return charactersStarred.some(char => char.id === characterId)
  }

  const count = charactersStarred.length

  return {
    charactersStarred,
    setCharactersStarred,
    addCharacter,
    removeCharacter,
    handleCharacterStarred,
    isCharacterStarred,
    count,
  }
}
