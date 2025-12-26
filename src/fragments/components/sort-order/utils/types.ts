/**
 * sort-order/utils/types.ts
 * @description: Tipos para los utils del componente SortOrder
 */

/**
 * @name SortFieldType
 * @description: Campos por los que se puede ordenar
 */
export type SortFieldType = 'name' | 'species' | 'created' | 'status'

/**
 * @name SortFieldValues
 * @description: Constantes con los valores de SortFieldType para evitar hardcode
 */
export const SortFieldValues = {
  NAME: 'name',
  SPECIES: 'species',
  CREATED: 'created',
  STATUS: 'status',
} as const satisfies Record<string, SortFieldType>

/**
 * @name SortOrderType
 * @description: Dirección del ordenamiento
 */
export type SortOrderType = 'asc' | 'desc'

/**
 * @name SortOrderValues
 * @description: Constantes con los valores de SortOrderType para evitar hardcode
 */
export const SortOrderValues = {
  ASC: 'asc',
  DESC: 'desc',
} as const satisfies Record<string, SortOrderType>
