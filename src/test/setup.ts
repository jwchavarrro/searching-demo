/**
 * test/setup.ts
 * @description: Configuración global para los tests
 */

import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'

// Limpiar timers después de cada test para evitar errores asíncronos
// de @iconify/react que intenta acceder a window de forma asíncrona
afterEach(() => {
  vi.clearAllTimers()
})

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks()
})

// Helper para mockear console.error silenciosamente
export const mockConsoleError = () => {
  return vi.spyOn(console, 'error').mockImplementation(() => {})
}

// Helper para restaurar todos los mocks
export const restoreAllMocks = () => {
  vi.restoreAllMocks()
}
