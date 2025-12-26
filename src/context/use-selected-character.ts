/**
 * use-selected-character.ts
 * @description: Hook para manejar el nombre del personaje seleccionado usando Jotai
 * y sincronizarlo con los parámetros de la URL
 */

import { atom, useAtom } from '@/context'
import { useUrlParam } from '@/hooks'

const selectedCharacterNameAtom = atom<string | null>(null)

export const useSelectedCharacter = () => {
  const {
    value: characterNameFromUrlEncoded,
    setValue: setCharacterNameInUrl,
    remove: removeCharacterNameFromUrl,
  } = useUrlParam<string>('character-name', {
    type: 'string',
  })

  // Decodificar el nombre desde la URL
  let characterNameFromUrl: string | null = null
  if (characterNameFromUrlEncoded) {
    try {
      characterNameFromUrl = decodeURIComponent(characterNameFromUrlEncoded)
    } catch {
      characterNameFromUrl = characterNameFromUrlEncoded
    }
  }

  // Leer y escribir en el atom, sincronizado con la URL
  const [selectedCharacterName, setSelectedCharacterNameAtom] = useAtom(
    selectedCharacterNameAtom
  )

  // Usar la URL como fuente de verdad si está presente, sino usar el atom
  const currentName = characterNameFromUrl ?? selectedCharacterName

  // Función para actualizar tanto el atom como la URL
  const setSelectedCharacter = (characterName: string | null) => {
    setSelectedCharacterNameAtom(characterName)
    if (characterName) {
      setCharacterNameInUrl(encodeURIComponent(characterName))
    } else {
      removeCharacterNameFromUrl()
    }
  }

  return {
    selectedCharacterName: currentName,
    setSelectedCharacter,
  }
}
