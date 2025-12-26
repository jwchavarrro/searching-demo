/**
 * utils/constants.ts
 * @description: Constantes para los utils
 */

import type {
  CharacterFilterType,
  SpecieFilterType,
} from '@/fragments/components/filter/utils'
import type { FilterOption } from '@/fragments/components/filter'

export const FILTER_CHARACTER_OPTIONS: FilterOption<CharacterFilterType>[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'others', label: 'Others' },
]

export const FILTER_SPECIE_OPTIONS: FilterOption<SpecieFilterType>[] = [
  { value: 'all', label: 'All' },
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
]
