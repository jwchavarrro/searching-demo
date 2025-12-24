import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Text } from '../text'

describe('Text', () => {
  it('renderiza el texto correctamente', () => {
    render(<Text text="Texto de prueba" />)
    expect(screen.getByText('Texto de prueba')).toBeInTheDocument()
  })

  it('renderiza como elemento p', () => {
    const { container } = render(<Text text="Texto" />)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toHaveTextContent('Texto')
  })

  describe('size', () => {
    it('aplica el tamaño xs por defecto', () => {
      const { container } = render(<Text text="Texto" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-xs')
    })

    it('aplica el tamaño xs', () => {
      const { container } = render(<Text text="Texto" size="xs" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-xs')
    })

    it('aplica el tamaño sm', () => {
      const { container } = render(<Text text="Texto" size="sm" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-xs')
      expect(paragraph).toHaveClass('md:text-sm')
    })

    it('aplica el tamaño lg', () => {
      const { container } = render(<Text text="Texto" size="lg" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-sm')
      expect(paragraph).toHaveClass('md:text-lg')
    })

    it('aplica el tamaño xl', () => {
      const { container } = render(<Text text="Texto" size="xl" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-lg')
      expect(paragraph).toHaveClass('md:text-xl')
    })
  })

  describe('weight', () => {
    it('aplica el peso normal por defecto', () => {
      const { container } = render(<Text text="Texto" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('font-normal')
    })

    it('aplica el peso light', () => {
      const { container } = render(<Text text="Texto" weight="light" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('font-light')
    })

    it('aplica el peso medium', () => {
      const { container } = render(<Text text="Texto" weight="medium" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('font-medium')
    })

    it('aplica el peso semibold', () => {
      const { container } = render(<Text text="Texto" weight="semibold" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('font-semibold')
    })

    it('aplica el peso bold', () => {
      const { container } = render(<Text text="Texto" weight="bold" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('font-bold')
    })
  })

  describe('align', () => {
    it('aplica alineación left por defecto', () => {
      const { container } = render(<Text text="Texto" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-left')
    })

    it('aplica alineación center', () => {
      const { container } = render(<Text text="Texto" align="center" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-center')
    })

    it('aplica alineación right', () => {
      const { container } = render(<Text text="Texto" align="right" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-right')
    })

    it('aplica alineación justify', () => {
      const { container } = render(<Text text="Texto" align="justify" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-justify')
    })
  })

  describe('truncate', () => {
    it('no aplica truncate por defecto', () => {
      const { container } = render(<Text text="Texto" />)
      const paragraph = container.querySelector('p')
      expect(paragraph).not.toHaveClass('truncate')
    })

    it('aplica truncate cuando es true', () => {
      const { container } = render(<Text text="Texto" truncate />)
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('truncate')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Text text="Texto" className="custom-class" />
      )
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Text text="Texto" size="lg" className="custom-class" />
      )
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-sm')
      expect(paragraph).toHaveClass('md:text-lg')
      expect(paragraph).toHaveClass('custom-class')
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Text
          text="Texto completo"
          size="xl"
          weight="bold"
          align="center"
          truncate
          className="custom"
        />
      )
      const paragraph = container.querySelector('p')
      expect(paragraph).toHaveClass('text-lg')
      expect(paragraph).toHaveClass('md:text-xl')
      expect(paragraph).toHaveClass('font-bold')
      expect(paragraph).toHaveClass('text-center')
      expect(paragraph).toHaveClass('truncate')
      expect(paragraph).toHaveClass('custom')
      expect(paragraph).toHaveTextContent('Texto completo')
    })
  })
})
