/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

// Import of components custom
import { Title, Text } from '@/components/atomic-desing/atoms'
import { CharactersList } from '@/fragments'

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          <Title title="Rick and Morty list" level={1} size="2xl" />
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section-starred">
            <Text text="STARRED CHARACTERS" weight="semibold" />
          </section>
          <section className="sidebar-section-characters">
            <Text text="CHARACTERS" weight="semibold" />
            <div className="h-full overflow-y-auto">
              <CharactersList />
            </div>
          </section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className="main-content overflow-y-scroll"></main>
    </div>
  )
}

export default App
