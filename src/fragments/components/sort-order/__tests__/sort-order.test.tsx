/**
 * sort-order.test.tsx
 * @description: Tests para el componente SortOrder
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SortOrder } from '../sort-order'

describe('SortOrder', () => {
  describe('Renderizado básico', () => {
    it('renderiza el componente correctamente', () => {
      render(<SortOrder />)
      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      expect(button).toBeInTheDocument()
    })

    it('muestra el icono de flecha arriba cuando está en orden ascendente', () => {
      render(<SortOrder sortOrder="asc" />)
      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      expect(button).toBeInTheDocument()
    })

    it('muestra el icono de flecha abajo cuando está en orden descendente', () => {
      render(<SortOrder sortOrder="desc" />)
      const button = screen.getByRole('button', {
        name: /sort descending/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  describe('Interacción', () => {
    it('llama a onSortChange cuando se hace clic', async () => {
      const handleSortChange = vi.fn()
      const user = userEvent.setup()

      render(<SortOrder sortOrder="asc" onSortChange={handleSortChange} />)

      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      await user.click(button)

      expect(handleSortChange).toHaveBeenCalledTimes(1)
      expect(handleSortChange).toHaveBeenCalledWith('desc')
    })

    it('alterna entre asc y desc cuando se hace clic', async () => {
      const handleSortChange = vi.fn()
      const user = userEvent.setup()

      const { rerender } = render(
        <SortOrder sortOrder="asc" onSortChange={handleSortChange} />
      )

      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      await user.click(button)

      expect(handleSortChange).toHaveBeenCalledWith('desc')

      rerender(<SortOrder sortOrder="desc" onSortChange={handleSortChange} />)

      const buttonDesc = screen.getByRole('button', {
        name: /sort descending/i,
      })
      await user.click(buttonDesc)

      expect(handleSortChange).toHaveBeenCalledWith('asc')
    })

    it('no llama a onSortChange si no está definido', async () => {
      const user = userEvent.setup()

      render(<SortOrder sortOrder="asc" />)

      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      await user.click(button)

      // No debería haber errores
      expect(button).toBeInTheDocument()
    })
  })

  describe('Valores por defecto', () => {
    it('usa "asc" como valor por defecto cuando no se proporciona sortOrder', () => {
      render(<SortOrder />)
      const button = screen.getByRole('button', {
        name: /sort ascending/i,
      })
      expect(button).toBeInTheDocument()
    })
  })
})
