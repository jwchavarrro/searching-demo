/**
 * test/setup.ts
 * @description: Configuración global para los tests
 */

import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { createElement } from 'react'
import type { IconProps } from '@iconify/react'

// Mock de @iconify/react
vi.mock('@iconify/react', async () => {
  const actual = await vi.importActual('@iconify/react')
  return {
    ...actual,
    Icon: ({ icon, className, ...props }: IconProps) => {
      return createElement('svg', {
        'data-testid': 'iconify-icon',
        'data-icon': icon,
        className,
        viewBox: '0 0 24 24',
        ...props,
      })
    },
  }
})

// Mock de window.matchMedia para tests
// Usamos globalThis.window para evitar warnings de ESLint
Object.defineProperty(globalThis.window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Limpiar timers después de cada test para evitar errores asíncronos
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
