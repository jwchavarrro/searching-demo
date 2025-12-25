/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

import { useState } from 'react'
import { motion } from 'motion/react'

// Import of components custom
import { Title } from '@/components/atomic-desing/atoms'
import {
  Filter,
  type CharacterFilterType,
  type SpecieFilterType,
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/components/atomic-desing/organisms'
import {
  CharactersList,
  DetailsCharacter,
  CharactersStarredList,
} from '@/fragments'

// Import of context
import { useSelectedCharacter } from '@/context'

// Import of utils
import { FILTER_CHARACTER_OPTIONS, FILTER_SPECIE_OPTIONS } from '@/utils'
import { cn } from '@/utils/cn'

function App() {
  // States generales
  const [appliedSearchValue, setAppliedSearchValue] = useState<string>('')
  const [appliedCharacterFilter, setAppliedCharacterFilter] =
    useState<CharacterFilterType>(CharacterFilterValues.OTHERS)
  const [appliedSpecieFilter, setAppliedSpecieFilter] =
    useState<SpecieFilterType>(SpecieFilterValues.ALL)

  // Implement context
  const { selectedCharacterName } = useSelectedCharacter()

  /* @name handleFilterApply
  @description: Manejador para aplicar los filtros cuando se presiona el botón Filter
  Solo aquí se actualizan los filtros aplicados y se dispara la nueva consulta
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
            onFilterApply={handleFilterApply}
          />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section sidebar-section-starred">
            <CharactersStarredList />
          </section>

          <section className="sidebar-section sidebar-section-characters">
            <CharactersList
              characterFilter={appliedCharacterFilter}
              specieFilter={appliedSpecieFilter}
            />
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className={cn('main', selectedCharacterName && 'main-visible')}>
        <div className="main-content">
          <DetailsCharacter />
        </div>
      </main>
    </motion.div>
  )
}

export default App
