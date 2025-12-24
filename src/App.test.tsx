import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app', () => {
    const { container } = render(<App />)

    // Verificar que el componente principal existe
    expect(container.querySelector('.app')).toBeInTheDocument()
    expect(container.querySelector('.sidebar')).toBeInTheDocument()
    expect(container.querySelector('.sidebar-header')).toBeInTheDocument()
    expect(container.querySelector('.sidebar-main')).toBeInTheDocument()
    expect(container.querySelector('.main')).toBeInTheDocument()

    // Verificar que las secciones existen (pueden estar en diferentes estados)
    expect(container.querySelector('.sidebar-section')).toBeInTheDocument()
    expect(
      container.querySelector('.sidebar-section-characters')
    ).toBeInTheDocument()

    // Verificar que el título principal está presente
    expect(screen.getByText('Rick and Morty list')).toBeInTheDocument()
  })
})
