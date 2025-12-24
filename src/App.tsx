/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

// Import of components custom
import { Title, Input } from '@/components/atomic-desing/atoms'
import {
  CharactersList,
  DetailsCharacter,
  CharactersStarredList,
} from '@/fragments'

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <Title title="Rick and Morty list" level={1} size="xl" />
          <Input placeholder="Search or filter results" />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section">
            <CharactersStarredList />
          </section>

          <section className="sidebar-section sidebar-section-characters">
            <CharactersList />
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className="main">
        <div className="main-content">
          <DetailsCharacter />
        </div>
      </main>
    </div>
  )
}

export default App
