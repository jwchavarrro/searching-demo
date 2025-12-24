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
  type CharacterFilter,
  type SpecieFilter,
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
  // State generales
  const [searchValue, setSearchValue] = useState<string>('')
  const [characterFilter, setCharacterFilter] = useState<CharacterFilter>('all')
  const [specieFilter, setSpecieFilter] = useState<SpecieFilter>('all')

  // Implement context
  const { selectedCharacter } = useSelectedCharacter()

  /* @name handleFilterApply
  @description: Manejador para aplicar los filtros
  */
  const handleFilterApply = (filters: {
    search: string
    character: CharacterFilter
    specie: SpecieFilter
  }) => {
    setSearchValue(filters.search)
    setCharacterFilter(filters.character)
    setSpecieFilter(filters.specie)
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
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            characterFilter={characterFilter}
            specieFilter={specieFilter}
            characterOptions={FILTER_CHARACTER_OPTIONS}
            specieOptions={FILTER_SPECIE_OPTIONS}
            onCharacterFilterChange={setCharacterFilter}
            onSpecieFilterChange={setSpecieFilter}
            onFilterApply={handleFilterApply}
          />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section sidebar-section-starred">
            <CharactersStarredList />
          </section>

          <section className="sidebar-section sidebar-section-characters">
            <CharactersList />
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className={cn('main', selectedCharacter && 'main-visible')}>
        <div className="main-content">
          <DetailsCharacter />
        </div>
      </main>
    </motion.div>
  )
}

export default App
