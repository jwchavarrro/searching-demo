/**
 * utils/constants.ts
 * @description: Constantes para los utils
 */

import type {
  CharacterFilter,
  FilterOption,
  SpecieFilter,
} from '@/components/atomic-desing/organisms'

export const FILTER_CHARACTER_OPTIONS: FilterOption<CharacterFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'others', label: 'Others' },
]

export const FILTER_SPECIE_OPTIONS: FilterOption<SpecieFilter>[] = [
  { value: 'all', label: 'All' },
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
]
