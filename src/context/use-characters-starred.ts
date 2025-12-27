/**
 * use-characters-starred.ts
 * @description: Hook para manejar el estado del listado de personajes marcados como favoritos usando Jotai
 */

import { atomWithStorage, useAtom } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

// Almacenar personajes starred
const charactersStarredAtom = atomWithStorage<CharacterType[]>(
  'characters-starred',
  []
)

// Almacenar comentarios: characterId -> comment
const characterCommentsAtom = atomWithStorage<Record<number, string>>(
  'characters-comments',
  {}
)

export const useCharactersStarred = () => {
  const [charactersStarred, setCharactersStarred] = useAtom(
    charactersStarredAtom
  )
  const [characterComments, setCharacterComments] = useAtom(
    characterCommentsAtom
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
    deleteComment(characterId)
  }

  const handleCharacterStarred = (character: CharacterType) => {
    setCharactersStarred(prev => {
      const isStarred = prev.some(char => char.id === character.id)
      if (isStarred) {
        deleteComment(character.id)
        return prev.filter(char => char.id !== character.id)
      }
      return [...prev, character]
    })
  }

  const isCharacterStarred = (characterId: number) => {
    return charactersStarred.some(char => char.id === characterId)
  }

  const count = charactersStarred.length

  /* Comentarios */

  /* @name deleteComment
  @description: Eliminar un comentario
  */
  const deleteComment = (characterId: number) => {
    setCharacterComments(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [characterId]: _, ...rest } = prev
      return rest
    })
  }

  /* @name getCharacterComment
  @description: Obtener un comentario
  */
  const getCharacterComment = (characterId: number): string | undefined => {
    return characterComments[characterId]
  }

  /* @name updateCharacterComment
  @description: Actualizar un comentario
  */
  const updateCharacterComment = (
    characterId: number,
    comment: string
  ): void => {
    const trimmed = comment.trim()
    if (trimmed === '') {
      deleteComment(characterId)
    } else {
      setCharacterComments(prev => ({
        ...prev,
        [characterId]: trimmed,
      }))
    }
  }

  /* @name removeCharacterComment
  @description: Eliminar un comentario
  */
  const removeCharacterComment = (characterId: number): void => {
    deleteComment(characterId)
  }

  return {
    charactersStarred,
    setCharactersStarred,
    addCharacter,
    removeCharacter,
    handleCharacterStarred,
    isCharacterStarred,
    count,
    getCharacterComment,
    updateCharacterComment,
    removeCharacterComment,
  }
}
