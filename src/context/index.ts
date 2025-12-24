/**
 * index.ts
 * @description: Exportaciones de Jotai para gestión de estado
 */

export { atom, useAtom } from 'jotai'
export { atomWithStorage } from 'jotai/utils'

// Export of context custom hooks
export { useSelectedCharacter } from './use-selected-character'
export { useCharactersStarred } from './use-characters-starred'
