/**
 * MainLayout.tsx
 * @description: Layout principal que contiene el sidebar y el área de contenido principal
 */

import { useState } from 'react'
import { motion } from 'motion/react'
import { Outlet } from 'react-router-dom'

// Import of components custom
import { Title } from '@/components/atomic-desing/atoms'
import {
  Filter,
  type CharacterFilterType,
  type SpecieFilterType,
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/fragments/components/filter'
import {
  type SortOrderType,
  SortOrderValues,
} from '@/fragments/components/sort-order/utils'
import {
  CharactersList,
  CharactersStarredList,
  FiltersSummary,
  useTotalResults,
} from '@/fragments'

// Import of context
import { useSelectedCharacter } from '@/context'

// Import of utils
import { FILTER_CHARACTER_OPTIONS, FILTER_SPECIE_OPTIONS } from '@/utils'
import { cn } from '@/utils/cn'

export function MainLayout() {
  // States generales
  const [appliedSearchValue, setAppliedSearchValue] = useState<string>('')
  const [appliedCharacterFilter, setAppliedCharacterFilter] =
    useState<CharacterFilterType>(CharacterFilterValues.OTHERS)
  const [appliedSpecieFilter, setAppliedSpecieFilter] =
    useState<SpecieFilterType>(SpecieFilterValues.ALL)
  const [appliedSortOrder, setAppliedSortOrder] = useState<SortOrderType>(
    SortOrderValues.ASC
  )

  // Implement context
  const { selectedCharacterName } = useSelectedCharacter()

  // Implement custom hooks
  /* @name totalResults
  @description: Obtiene el conteo total de resultados (personajes + starred)
  */
  const { charactersCount, starredCount } = useTotalResults({
    searchValue: appliedSearchValue,
    characterFilter: appliedCharacterFilter,
    specieFilter: appliedSpecieFilter,
  })

  /* @name hasAdvancedFilters
  @description: Verifica si hay más de un filtro avanzado aplicado (Character y Specie)
  */
  const advancedFiltersCount =
    Number(appliedCharacterFilter !== CharacterFilterValues.OTHERS) +
    Number(appliedSpecieFilter !== SpecieFilterValues.ALL)
  const hasAdvancedFilters = advancedFiltersCount >= 1

  // Handlers
  /* @name handleSearchChange
  @description: Manejador para búsqueda en tiempo real mientras el usuario escribe
  Se ejecuta inmediatamente cuando cambia el valor del input
  */
  const handleSearchChange = (value: string) => {
    setAppliedSearchValue(value)
  }

  /* @name handleFilterApply
  @description: Manejador para aplicar los filtros cuando se presiona el botón Filter
  Actualiza todos los filtros aplicados (search, character y specie)
  */
  const handleFilterApply = (filters: {
    search: string
    character: CharacterFilterType
    specie: SpecieFilterType
  }) => {
    setAppliedSearchValue(filters.search)
    setAppliedCharacterFilter(filters.character)
    setAppliedSpecieFilter(filters.specie)
  }

  /* @name handleSortChange
  @description: Manejador para cambiar el orden de los personajes
  */
  const handleSortChange = (order: SortOrderType) => {
    setAppliedSortOrder(order)
  }

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <Title title="Rick and Morty list" level={1} size="xl" />
          <Filter
            searchValue={appliedSearchValue}
            characterFilter={appliedCharacterFilter}
            specieFilter={appliedSpecieFilter}
            characterOptions={FILTER_CHARACTER_OPTIONS}
            specieOptions={FILTER_SPECIE_OPTIONS}
            onSearchChange={handleSearchChange}
            onFilterApply={handleFilterApply}
          />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          {/* Inform: Results filter  */}
          {hasAdvancedFilters && (
            <FiltersSummary
              charactersCount={charactersCount}
              starredCount={starredCount}
              characterFilter={appliedCharacterFilter}
              specieFilter={appliedSpecieFilter}
            />
          )}

          {/* Personajes favoritos */}
          <section className="sidebar-section sidebar-section-starred">
            <CharactersStarredList
              searchValue={appliedSearchValue}
              specieFilter={appliedSpecieFilter}
              sortOrder={appliedSortOrder}
              onSortChange={handleSortChange}
            />
          </section>

          {/* Personajes */}
          <section className="sidebar-section sidebar-section-characters">
            <CharactersList
              characterFilter={appliedCharacterFilter}
              specieFilter={appliedSpecieFilter}
              searchValue={appliedSearchValue}
              sortOrder={appliedSortOrder}
              onSortChange={handleSortChange}
            />
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className={cn('main', selectedCharacterName && 'main-visible')}>
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </motion.div>
  )
}
