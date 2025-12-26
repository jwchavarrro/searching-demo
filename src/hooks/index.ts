/**
 * hooks/index.ts
 * @description: Exportaciones de todos los hooks
 */

export { useCharacters } from './useCharacters'
export { useSearchCharacters } from './useSearchCharacters'
export { useCharactersBySpecies } from './useCharactersBySpecies'
export { useCharacterByName } from './useCharacterByName'
export { useUrlParam, useUrlParams } from './useUrlParam'

// Export of types
export type {
  UseUrlParamOptions,
  UseUrlParamReturn,
  UseUrlParamsReturn,
} from './useUrlParam'
