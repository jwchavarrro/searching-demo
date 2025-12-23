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
    expect(container.querySelector('.main-content')).toBeInTheDocument()

    // Verificar textos específicos
    expect(screen.getByText('Starred Characters')).toBeInTheDocument()
    expect(screen.getByText(/^Characters$/)).toBeInTheDocument()
  })
})
