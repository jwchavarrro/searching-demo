/**
 * filters-summary/index.test.tsx
 * @description: Tests para el componente FiltersSummary
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FiltersSummary } from '../index'
import {
  CharacterFilterValues,
  SpecieFilterValues,
} from '@/components/atomic-desing/organisms'

describe('FiltersSummary', () => {
  describe('Renderizado básico', () => {
    it('no renderiza nada cuando no hay resultados ni filtros activos', () => {
      const { container } = render(
        <FiltersSummary
          charactersCount={0}
          starredCount={0}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.ALL}
        />
      )
      expect(container.firstChild).toBeNull()
    })

    it('renderiza el conteo de resultados cuando hay resultados', () => {
      render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.ALL}
        />
      )
      expect(screen.getByText('7 Results')).toBeInTheDocument()
    })

    it('renderiza "Result" en singular cuando hay 1 resultado', () => {
      render(
        <FiltersSummary
          charactersCount={1}
          starredCount={0}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.ALL}
        />
      )
      expect(screen.getByText('1 Result')).toBeInTheDocument()
    })
  })

  describe('Badge de filtros activos', () => {
    it('no muestra el badge cuando no hay filtros avanzados activos', () => {
      render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.ALL}
        />
      )
      expect(screen.queryByText(/Filter/)).not.toBeInTheDocument()
    })

    it('muestra el badge cuando hay 1 filtro avanzado activo', () => {
      render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.STARRED}
          specieFilter={SpecieFilterValues.ALL}
        />
      )
      expect(screen.getByText('1 Filter')).toBeInTheDocument()
    })

    it('muestra el badge cuando hay 2 filtros avanzados activos', () => {
      render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.STARRED}
          specieFilter={SpecieFilterValues.HUMAN}
        />
      )
      expect(screen.getByText('2 Filters')).toBeInTheDocument()
    })

    it('muestra "Filter" en singular cuando hay 1 filtro', () => {
      render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.HUMAN}
        />
      )
      expect(screen.getByText('1 Filter')).toBeInTheDocument()
    })
  })

  describe('Combinaciones', () => {
    it('muestra resultados y badge cuando hay ambos', () => {
      render(
        <FiltersSummary
          charactersCount={10}
          starredCount={5}
          characterFilter={CharacterFilterValues.STARRED}
          specieFilter={SpecieFilterValues.HUMAN}
        />
      )
      expect(screen.getByText('15 Results')).toBeInTheDocument()
      expect(screen.getByText('2 Filters')).toBeInTheDocument()
    })

    it('aplica className personalizada', () => {
      const { container } = render(
        <FiltersSummary
          charactersCount={5}
          starredCount={2}
          characterFilter={CharacterFilterValues.OTHERS}
          specieFilter={SpecieFilterValues.ALL}
          className="custom-class"
        />
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('custom-class')
    })
  })
})
