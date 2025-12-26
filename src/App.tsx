/**
 * App.tsx
 * @description: Gestiona las rutas principales
 */

import { Routes, Route } from 'react-router-dom'

// Import of components custom
import { MainLayout } from '@/components/layout'

// Import of fragments
import { DetailsCharacter } from '@/fragments'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DetailsCharacter />} />
        <Route path="character/:name" element={<DetailsCharacter />} />
      </Route>
    </Routes>
  )
}

export default App
