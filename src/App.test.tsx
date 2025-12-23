import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app', () => {
    render(<App />)
    expect(screen.getByText(/Starred Characters \(2\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Characters \(4\)/i)).toBeInTheDocument()
  })
})
