/**
 * use-selected-character.ts
 * @description: Hook para manejar el estado del personaje seleccionado usando Jotai
 */

// Import of context
import { atom, useAtom } from '@/context'

// Import of types
import type { CharacterType } from '@/graphql/types'

const selectedCharacterAtom = atom<CharacterType | null>(null)

export const useSelectedCharacter = () => {
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  )

  return { selectedCharacter, setSelectedCharacter }
}
