/**
 * Filter.tsx
 * @description: Componente organismo para renderizar un filtro con búsqueda y opciones de filtrado.
 */

import { useState, useCallback } from 'react'
import { Icon } from '@iconify/react'

// Import of components
import { Input } from '@/components/atomic-desing/atoms/input'
import { Button } from '@/components/atomic-desing/atoms/button'
import { Text } from '@/components/atomic-desing/atoms/text'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/atomic-desing/molecules/popover'

// Import of utils
import { cn } from '@/utils/cn'
import { ICONS } from '@/config'

export type CharacterFilter = 'all' | 'starred' | 'others'
export type SpecieFilter = 'all' | 'human' | 'alien'

export interface FilterProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  characterFilter?: CharacterFilter
  specieFilter?: SpecieFilter
  onCharacterFilterChange?: (filter: CharacterFilter) => void
  onSpecieFilterChange?: (filter: SpecieFilter) => void
  onFilterApply?: (filters: {
    search: string
    character: CharacterFilter
    specie: SpecieFilter
  }) => void
  className?: string
}

const characterOptions: { value: CharacterFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'others', label: 'Others' },
]

const specieOptions: { value: SpecieFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
]

export const Filter = ({
  searchValue = '',
  onSearchChange,
  characterFilter = 'all',
  specieFilter = 'all',
  onCharacterFilterChange,
  onSpecieFilterChange,
  onFilterApply,
  className,
}: FilterProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue)
  const [localCharacterFilter, setLocalCharacterFilter] =
    useState<CharacterFilter>(characterFilter)
  const [localSpecieFilter, setLocalSpecieFilter] =
    useState<SpecieFilter>(specieFilter)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalSearch(value)
      onSearchChange?.(value)
    },
    [onSearchChange]
  )

  const handleCharacterFilterClick = useCallback(
    (filter: CharacterFilter) => {
      setLocalCharacterFilter(filter)
      onCharacterFilterChange?.(filter)
    },
    [onCharacterFilterChange]
  )

  const handleSpecieFilterClick = useCallback(
    (filter: SpecieFilter) => {
      setLocalSpecieFilter(filter)
      onSpecieFilterChange?.(filter)
    },
    [onSpecieFilterChange]
  )

  const handleFilterApply = useCallback(() => {
    onFilterApply?.({
      search: localSearch,
      character: localCharacterFilter,
      specie: localSpecieFilter,
    })
    setIsPopoverOpen(false)
  }, [localSearch, localCharacterFilter, localSpecieFilter, onFilterApply])

  return (
    <div className={cn('w-full', className)}>
      <Input
        value={localSearch}
        onChange={handleSearchChange}
        placeholder="Search or filter results"
      >
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-gray hover:bg-primary-100 hover:text-primary-700"
              aria-label="Open filters"
            >
              <Icon icon={ICONS.filter} className="size-4 md:size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            width="base"
            className="p-2 md:p-5"
          >
            <div className="space-y-4">
              {/* Character Filter Section */}
              <div className="space-y-2">
                <Text text="Character" size="sm" />
                <div className="flex gap-2">
                  {characterOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={
                        localCharacterFilter === option.value
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => handleCharacterFilterClick(option.value)}
                      className={cn(
                        'flex-1',
                        localCharacterFilter === option.value &&
                          'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      )}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Specie Filter Section */}
              <div className="space-y-2">
                <Text text="Specie" size="sm" />
                <div className="flex gap-2">
                  {specieOptions.map(option => (
                    <Button
                      key={option.value}
                      variant={
                        localSpecieFilter === option.value
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => handleSpecieFilterClick(option.value)}
                      className={cn(
                        'flex-1',
                        localSpecieFilter === option.value &&
                          'bg-primary-100 text-primary-700 hover:bg-primary-200'
                      )}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Apply Filter Button */}
              <Button
                variant="secondary"
                size="base"
                onClick={handleFilterApply}
                className="w-full"
              >
                Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Input>
    </div>
  )
}
