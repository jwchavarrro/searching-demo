/**
 * utils/constants.ts
 * @description: Constantes para los utils
 */

import type {
  CharacterFilterType,
  FilterOption,
  SpecieFilterType,
} from '@/components/atomic-desing/organisms'

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
