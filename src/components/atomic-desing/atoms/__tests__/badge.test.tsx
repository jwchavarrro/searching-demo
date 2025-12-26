import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../badge'

describe('Badge', () => {
  it('renderiza el badge correctamente', () => {
    render(<Badge>Badge text</Badge>)
    expect(screen.getByText('Badge text')).toBeInTheDocument()
  })

  it('renderiza como elemento div', () => {
    const { container } = render(<Badge>Badge</Badge>)
    const badge = container.querySelector('div')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Badge')
  })

  describe('variant', () => {
    it('aplica la variante default por defecto', () => {
      const { container } = render(<Badge>Badge</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('bg-primary-700')
      expect(badge).toHaveClass('text-white')
    })

    it('aplica la variante default', () => {
      const { container } = render(<Badge variant="default">Badge</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('bg-primary-700')
      expect(badge).toHaveClass('text-white')
    })

    it('aplica la variante outline', () => {
      const { container } = render(<Badge variant="outline">Badge</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('border')
      expect(badge).toHaveClass('border-gray/50')
      expect(badge).toHaveClass('bg-transparent')
      expect(badge).toHaveClass('text-black')
    })
  })

  describe('size', () => {
    it('aplica el tamaño base por defecto', () => {
      const { container } = render(<Badge>Badge</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('px-2.5')
      expect(badge).toHaveClass('py-0.5')
      expect(badge).toHaveClass('text-sm')
    })

    it('aplica el tamaño sm', () => {
      const { container } = render(<Badge size="sm">Small</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('px-2.5')
      expect(badge).toHaveClass('py-0.5')
      expect(badge).toHaveClass('text-xs')
    })

    it('aplica el tamaño lg', () => {
      const { container } = render(<Badge size="lg">Large</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('px-3.5')
      expect(badge).toHaveClass('py-1.5')
      expect(badge).toHaveClass('text-base')
    })
  })

  describe('clases base', () => {
    it('aplica las clases base correctamente', () => {
      const { container } = render(<Badge>Badge</Badge>)
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('inline-flex')
      expect(badge).toHaveClass('items-center')
      expect(badge).toHaveClass('justify-center')
      expect(badge).toHaveClass('rounded-full')
      expect(badge).toHaveClass('font-semibold')
      expect(badge).toHaveClass('transition-colors')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>
      )
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Badge variant="outline" size="lg" className="custom-class">
          Badge
        </Badge>
      )
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('border')
      expect(badge).toHaveClass('px-3.5')
      expect(badge).toHaveClass('custom-class')
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Badge variant="outline" size="sm" className="custom-class">
          Badge
        </Badge>
      )
      const badge = container.querySelector('div')
      expect(badge).toHaveClass('border-gray/50')
      expect(badge).toHaveClass('px-2.5')
      expect(badge).toHaveClass('custom-class')
      expect(badge).toHaveTextContent('Badge')
    })
  })
})
