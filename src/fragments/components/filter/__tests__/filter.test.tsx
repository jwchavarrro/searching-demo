/**
 * filter.test.tsx
 * @description: Tests para el componente Filter
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filter, type FilterOption } from '../filter'
import type { CharacterFilterType, SpecieFilterType } from '../utils/types'

const defaultCharacterOptions: FilterOption<CharacterFilterType>[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'others', label: 'Others' },
]

const defaultSpecieOptions: FilterOption<SpecieFilterType>[] = [
  { value: 'all', label: 'All' },
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
]

describe('Filter', () => {
  describe('Renderizado básico', () => {
    it('renderiza el componente correctamente', () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      expect(
        screen.getByPlaceholderText('Search or filter results')
      ).toBeInTheDocument()
    })

    it('renderiza el input de búsqueda', () => {
      const { container } = render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const input = container.querySelector('input[type="text"]')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Search or filter results')
    })

    it('renderiza el botón de filtro', () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      expect(filterButton).toBeInTheDocument()
    })

    it('aplica className personalizada', () => {
      const { container } = render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          className="custom-class"
        />
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('custom-class')
    })
  })

  describe('Input de búsqueda', () => {
    it('muestra el valor inicial del searchValue', () => {
      render(
        <Filter
          searchValue="test search"
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const input = screen.getByPlaceholderText('Search or filter results')
      expect(input).toHaveValue('test search')
    })

    it('actualiza el valor local cuando se escribe en el input', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const input = screen.getByPlaceholderText('Search or filter results')
      await userEvent.type(input, 'test')
      // El valor se actualiza localmente, pero no se llama ningún callback
      expect(input).toHaveValue('test')
    })

    it('actualiza el valor del input cuando se escribe', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const input = screen.getByPlaceholderText('Search or filter results')
      await userEvent.type(input, 'rick')
      expect(input).toHaveValue('rick')
    })
  })

  describe('Popover', () => {
    it('no muestra el popover inicialmente', () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      expect(screen.queryByText('Character')).not.toBeInTheDocument()
      expect(screen.queryByText('Specie')).not.toBeInTheDocument()
    })

    it('abre el popover cuando se hace clic en el botón de filtro', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)
      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
        expect(screen.getByText('Specie')).toBeInTheDocument()
      })
    })

    it('cierra el popover cuando se hace clic nuevamente en el botón de filtro', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')

      // Abrir popover
      await userEvent.click(filterButton)
      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
      })

      // Cerrar popover
      await userEvent.click(filterButton)
      await waitFor(() => {
        expect(screen.queryByText('Character')).not.toBeInTheDocument()
      })
    })

    it('cierra el popover cuando se presiona Escape', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)
      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
      })

      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('Character')).not.toBeInTheDocument()
      })
    })
  })

  describe('Filtros de Character', () => {
    it('renderiza todas las opciones de Character', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
        expect(screen.getByText('Starred')).toBeInTheDocument()
        expect(screen.getByText('Others')).toBeInTheDocument()
      })

      // Verificar que hay al menos un botón "All" (puede haber dos: Character y Specie)
      const allButtons = screen.getAllByText('All')
      expect(allButtons.length).toBeGreaterThanOrEqual(1)
    })

    it('muestra "all" como seleccionado por defecto', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
      })

      // Buscar el botón "All" dentro de la sección Character
      const characterSection = screen
        .getByText('Character')
        .closest('div')?.parentElement
      const allButtons = characterSection?.querySelectorAll('button')
      const allButton = Array.from(allButtons || []).find(
        btn => btn.textContent === 'All'
      )
      expect(allButton).toHaveClass('bg-primary-100')
    })

    it('actualiza el filtro local cuando se selecciona una opción', async () => {
      const handleFilterApply = vi.fn()
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          onFilterApply={handleFilterApply}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Starred')).toBeInTheDocument()
      })

      const starredButton = screen.getByText('Starred')
      await userEvent.click(starredButton)

      // El filtro se actualiza localmente, pero no se llama el callback hasta hacer clic en Filter
      await waitFor(() => {
        const button = starredButton.closest('button')
        expect(button).toHaveClass('bg-primary-100')
      })

      // Hacer clic en Filter para aplicar los cambios
      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(handleFilterApply).toHaveBeenCalledWith({
          search: '',
          character: 'starred',
          specie: 'all',
        })
      })
    })

    it('actualiza la apariencia visual cuando se selecciona una opción', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Starred')).toBeInTheDocument()
      })

      const starredButton = screen.getByText('Starred')
      await userEvent.click(starredButton)

      await waitFor(() => {
        const button = starredButton.closest('button')
        expect(button).toHaveClass('bg-primary-100')
      })
    })

    it('usa el characterFilter inicial cuando se proporciona', async () => {
      render(
        <Filter
          characterFilter="starred"
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        const starredButton = screen.getByText('Starred').closest('button')
        expect(starredButton).toHaveClass('bg-primary-100')
      })
    })
  })

  describe('Filtros de Specie', () => {
    it('renderiza todas las opciones de Specie', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Human')).toBeInTheDocument()
        expect(screen.getByText('Alien')).toBeInTheDocument()
      })
    })

    it('muestra "all" como seleccionado por defecto', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        const allButton = screen.getAllByText('All')[1].closest('button')
        expect(allButton).toHaveClass('bg-primary-100')
      })
    })

    it('actualiza el filtro local cuando se selecciona una opción', async () => {
      const handleFilterApply = vi.fn()
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          onFilterApply={handleFilterApply}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Human')).toBeInTheDocument()
      })

      const humanButton = screen.getByText('Human')
      await userEvent.click(humanButton)

      // El filtro se actualiza localmente, pero no se llama el callback hasta hacer clic en Filter
      await waitFor(() => {
        const button = humanButton.closest('button')
        expect(button).toHaveClass('bg-primary-100')
      })

      // Hacer clic en Filter para aplicar los cambios
      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(handleFilterApply).toHaveBeenCalledWith({
          search: '',
          character: 'all',
          specie: 'human',
        })
      })
    })

    it('usa el specieFilter inicial cuando se proporciona', async () => {
      render(
        <Filter
          specieFilter="human"
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        const humanButton = screen.getByText('Human').closest('button')
        expect(humanButton).toHaveClass('bg-primary-100')
      })
    })
  })

  describe('Botón Apply Filter', () => {
    it('renderiza el botón Filter', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Filter')).toBeInTheDocument()
      })
    })

    it('llama a onFilterApply con los valores actuales cuando se hace clic', async () => {
      const handleFilterApply = vi.fn()
      render(
        <Filter
          searchValue="rick"
          characterFilter="starred"
          specieFilter="human"
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          onFilterApply={handleFilterApply}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Filter')).toBeInTheDocument()
      })

      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(handleFilterApply).toHaveBeenCalledWith({
          search: 'rick',
          character: 'starred',
          specie: 'human',
        })
      })
    })

    it('cierra el popover cuando se hace clic en Filter', async () => {
      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
        />
      )
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Filter')).toBeInTheDocument()
      })

      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(screen.queryByText('Character')).not.toBeInTheDocument()
      })
    })
  })

  describe('Integración', () => {
    it('funciona correctamente con todas las props', async () => {
      const handleFilterApply = vi.fn()

      render(
        <Filter
          searchValue="test"
          characterFilter="starred"
          specieFilter="alien"
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          onFilterApply={handleFilterApply}
        />
      )

      // Verificar input
      const input = screen.getByPlaceholderText('Search or filter results')
      expect(input).toHaveValue('test')

      // Abrir popover
      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Character')).toBeInTheDocument()
      })

      // Cambiar filtro de Character
      const othersButton = screen.getByText('Others')
      await userEvent.click(othersButton)

      // Cambiar filtro de Specie
      const humanButton = screen.getByText('Human')
      await userEvent.click(humanButton)

      // Aplicar filtros
      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(handleFilterApply).toHaveBeenCalledWith({
          search: 'test', // El valor inicial se mantiene porque no lo cambiamos
          character: 'others',
          specie: 'human',
        })
      })
    })

    it('maneja múltiples cambios de filtro correctamente', async () => {
      const handleFilterApply = vi.fn()

      render(
        <Filter
          characterOptions={defaultCharacterOptions}
          specieOptions={defaultSpecieOptions}
          onFilterApply={handleFilterApply}
        />
      )

      const filterButton = screen.getByLabelText('Open filters')
      await userEvent.click(filterButton)

      await waitFor(() => {
        expect(screen.getByText('Starred')).toBeInTheDocument()
      })

      // Cambiar a Starred
      await userEvent.click(screen.getByText('Starred'))

      // Cambiar a Others
      await userEvent.click(screen.getByText('Others'))

      // Cambiar a Human
      await userEvent.click(screen.getByText('Human'))

      // Cambiar a Alien
      await userEvent.click(screen.getByText('Alien'))

      // Aplicar filtros
      const applyButton = screen.getByText('Filter')
      await userEvent.click(applyButton)

      await waitFor(() => {
        expect(handleFilterApply).toHaveBeenCalledWith({
          search: '',
          character: 'others',
          specie: 'alien',
        })
      })
    })
  })
})
