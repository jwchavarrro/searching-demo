/**
 * utils/constants.ts
 * @description: Constantes para los utils
 */

import type {
  CharacterFilterType,
  FilterOption,
  SpecieFilterType,
  GenderFilterType,
} from '@/fragments/components/filter'

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

export const FILTER_GENDER_OPTIONS: FilterOption<GenderFilterType>[] = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
]
