/**
 * App.tsx
 * @description: Este componente gestiona el layout principal de la aplicación.
 */

import './App.css'

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex flex-col gap-4 justify-between p-4 grow border md:max-w-80 lg:max-w-96">
        <header className="border min-h-24">
          header ( Title and Search Bar )
        </header>

        {/* Personajes favoritos y personajes */}
        <main className="border h-full">
          <section className="border h-1/3">Starred Characters (2)</section>
          <section className="border h-2/3">Characters (4)</section>
        </main>
      </aside>

      {/* Main Content Area */}
      <main className="hidden grow border md:block"></main>
    </div>
  )
}

export default App
