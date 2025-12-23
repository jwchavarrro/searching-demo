/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <header className="sidebar-header">
          header ( Title and Search Bar )
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="sidebar-main">
          <section className="sidebar-section-starred">
            Starred Characters
          </section>
          <section className="sidebar-section-characters">Characters</section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className="main-content"></main>
    </div>
  )
}

export default App
