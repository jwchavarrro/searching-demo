/**
 * filter/utils/types.ts
 * @description: Tipos para los utils del componente Filter
 */

/**
 * @name CharacterFilterType
 * @description: Tipos auxiliares/útiles relacionados con la gestión y filtrado de personajes.
 */
export type CharacterFilterType = 'all' | 'starred' | 'others'

/**
 * @name CharacterFilterValues
 * @description: Constantes con los valores de CharacterFilterType para evitar hardcode
 */
export const CharacterFilterValues = {
  ALL: 'all',
  STARRED: 'starred',
  OTHERS: 'others',
} as const satisfies Record<string, CharacterFilterType>

/**
 * @name SpecieFilterType
 * @description: Tipos de filtro para las especies de personajes.
 */
export type SpecieFilterType = 'all' | 'human' | 'alien'

/**
 * @name SpecieFilterValues
 * @description: Constantes con los valores de SpecieFilterType para evitar hardcode
 */
export const SpecieFilterValues = {
  ALL: 'all',
  HUMAN: 'human',
  ALIEN: 'alien',
} as const satisfies Record<string, SpecieFilterType>
