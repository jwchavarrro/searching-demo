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

// Import of types
import {
  type CharacterFilterType,
  type SpecieFilterType,
  CharacterFilterValues,
  SpecieFilterValues,
} from './utils/types'

export interface FilterOption<
  T extends CharacterFilterType | SpecieFilterType,
> {
  value: T
  label: string
}

export interface FilterProps {
  searchValue?: string
  characterFilter?: CharacterFilterType
  specieFilter?: SpecieFilterType
  characterOptions: FilterOption<CharacterFilterType>[]
  specieOptions: FilterOption<SpecieFilterType>[]
  onSearchChange?: (value: string) => void
  onFilterApply?: (filters: {
    search: string
    character: CharacterFilterType
    specie: SpecieFilterType
  }) => void
  className?: string
}

export const Filter = ({
  searchValue = '',
  characterFilter = CharacterFilterValues.ALL,
  specieFilter = SpecieFilterValues.ALL,
  characterOptions,
  specieOptions,
  onSearchChange,
  onFilterApply,
  className,
}: FilterProps) => {
  // States local
  const [localSearch, setLocalSearch] = useState(searchValue)
  const [localCharacterFilter, setLocalCharacterFilter] =
    useState<CharacterFilterType>(characterFilter)
  const [localSpecieFilter, setLocalSpecieFilter] =
    useState<SpecieFilterType>(specieFilter)
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  // Sincronizar estado local con props cuando se abre el popover
  const handlePopoverOpenChange = useCallback(
    (open: boolean) => {
      setIsPopoverOpen(open)
      if (open) {
        // Al abrir, sincronizar con los valores aplicados actuales
        setLocalSearch(searchValue)
        setLocalCharacterFilter(characterFilter)
        setLocalSpecieFilter(specieFilter)
      }
    },
    [searchValue, characterFilter, specieFilter]
  )

  /* @name handleSearchChange
  @description: Manejador para búsqueda en tiempo real mientras el usuario escribe
  Se ejecuta inmediatamente cuando cambia el valor del input
  */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalSearch(value)
      onSearchChange?.(value)
    },
    [onSearchChange]
  )

  /* @name handleCharacterFilterClick
  @description: Manejador para filtrar por personaje
  */
  const handleCharacterFilterClick = useCallback(
    (filter: CharacterFilterType) => {
      setLocalCharacterFilter(filter)
    },
    []
  )

  /* @name handleSpecieFilterClick
  @description: Manejador para filtrar por especie
  */
  const handleSpecieFilterClick = useCallback((filter: SpecieFilterType) => {
    setLocalSpecieFilter(filter)
  }, [])

  /* @name handleFilterApply
  @description: Manejador para aplicar los filtros cuando se presiona el botón Filter
  */
  const handleFilterApply = useCallback(() => {
    onFilterApply?.({
      search: localSearch,
      character: localCharacterFilter,
      specie: localSpecieFilter,
    })
    setIsPopoverOpen(false)
  }, [localSearch, localCharacterFilter, localSpecieFilter, onFilterApply])

  /* @name handleClearSearch
  @description: Manejador para limpiar la búsqueda cuando se presiona el botón Clear
  */
  const handleClearSearch = useCallback(() => {
    setLocalSearch('')
    onSearchChange?.('')
  }, [onSearchChange])

  const hasSearchValue = localSearch.trim().length > 0

  return (
    <div className={cn('w-full', className)}>
      <Input
        value={localSearch}
        onChange={handleSearchChange}
        placeholder="Search or filter results"
      >
        {/* Clear Search Button */}
        {hasSearchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearSearch}
            className="hover:bg-primary-100 text-gray hover:text-black md:size-8"
            aria-label="Limpiar búsqueda"
          >
            <Icon icon={ICONS.close} className="size-4 md:size-5" />
          </Button>
        )}

        {/* Popover Trigger Button for filters */}
        <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
          <PopoverTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary-100 text-primary-700 md:size-8"
              aria-label="Open filters"
            >
              <Icon icon={ICONS.filter} className="size-4 md:size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center" side="bottom">
            <div className="flex flex-col justify-between gap-2">
              <div className="space-y-4">
                {/* Character Filter Section */}
                <div className="space-y-2">
                  <Text text="Character" size="sm" weight="medium" />
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
                          'min-w-0 flex-1',
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
                  <Text text="Specie" size="sm" weight="medium" />
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
                          'min-w-0 flex-1',
                          localSpecieFilter === option.value &&
                            'bg-primary-100 text-primary-700 hover:bg-primary-200'
                        )}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Filter Button */}
              <Button
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
