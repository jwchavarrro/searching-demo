import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Title } from '../title'

describe('Title', () => {
  it('renderiza el título correctamente', () => {
    render(<Title title="Título de prueba" />)
    expect(screen.getByText('Título de prueba')).toBeInTheDocument()
  })

  it('renderiza como h1 por defecto', () => {
    const { container } = render(<Title title="Título" />)
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Título')
  })

  describe('level', () => {
    it('renderiza como h1 cuando level es 1', () => {
      const { container } = render(<Title title="Título" level={1} />)
      const heading = container.querySelector('h1')
      expect(heading).toBeInTheDocument()
    })

    it('renderiza como h2 cuando level es 2', () => {
      const { container } = render(<Title title="Título" level={2} />)
      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
    })

    it('renderiza como h3 cuando level es 3', () => {
      const { container } = render(<Title title="Título" level={3} />)
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
    })

    it('renderiza como h4 cuando level es 4', () => {
      const { container } = render(<Title title="Título" level={4} />)
      const heading = container.querySelector('h4')
      expect(heading).toBeInTheDocument()
    })

    it('renderiza como h5 cuando level es 5', () => {
      const { container } = render(<Title title="Título" level={5} />)
      const heading = container.querySelector('h5')
      expect(heading).toBeInTheDocument()
    })

    it('renderiza como h6 cuando level es 6', () => {
      const { container } = render(<Title title="Título" level={6} />)
      const heading = container.querySelector('h6')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('size por defecto según level', () => {
    it('aplica text-4xl cuando level es 1', () => {
      const { container } = render(<Title title="Título" level={1} />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-4xl')
    })

    it('aplica text-3xl cuando level es 2', () => {
      const { container } = render(<Title title="Título" level={2} />)
      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('text-3xl')
    })

    it('aplica text-2xl cuando level es 3', () => {
      const { container } = render(<Title title="Título" level={3} />)
      const heading = container.querySelector('h3')
      expect(heading).toHaveClass('text-2xl')
    })

    it('aplica text-xl cuando level es 4', () => {
      const { container } = render(<Title title="Título" level={4} />)
      const heading = container.querySelector('h4')
      expect(heading).toHaveClass('text-xl')
    })

    it('aplica text-lg cuando level es 5', () => {
      const { container } = render(<Title title="Título" level={5} />)
      const heading = container.querySelector('h5')
      expect(heading).toHaveClass('text-lg')
    })

    it('aplica text-base cuando level es 6', () => {
      const { container } = render(<Title title="Título" level={6} />)
      const heading = container.querySelector('h6')
      expect(heading).toHaveClass('text-base')
    })
  })

  describe('size personalizado', () => {
    it('sobrescribe el tamaño por defecto cuando se proporciona size', () => {
      const { container } = render(<Title title="Título" level={1} size="xs" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-xs')
      expect(heading).not.toHaveClass('text-4xl')
    })

    it('aplica size xs', () => {
      const { container } = render(<Title title="Título" size="xs" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-xs')
    })

    it('aplica size sm', () => {
      const { container } = render(<Title title="Título" size="sm" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-sm')
    })

    it('aplica size base', () => {
      const { container } = render(<Title title="Título" size="base" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-base')
    })

    it('aplica size lg', () => {
      const { container } = render(<Title title="Título" size="lg" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-lg')
    })

    it('aplica size xl', () => {
      const { container } = render(<Title title="Título" size="xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-xl')
    })

    it('aplica size 2xl', () => {
      const { container } = render(<Title title="Título" size="2xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-2xl')
    })

    it('aplica size 3xl', () => {
      const { container } = render(<Title title="Título" size="3xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-3xl')
    })

    it('aplica size 4xl', () => {
      const { container } = render(<Title title="Título" size="4xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-4xl')
    })

    it('aplica size 5xl', () => {
      const { container } = render(<Title title="Título" size="5xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-5xl')
    })

    it('aplica size 6xl', () => {
      const { container } = render(<Title title="Título" size="6xl" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-6xl')
    })
  })

  describe('align', () => {
    it('aplica alineación left por defecto', () => {
      const { container } = render(<Title title="Título" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-left')
    })

    it('aplica alineación center', () => {
      const { container } = render(<Title title="Título" align="center" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-center')
    })

    it('aplica alineación right', () => {
      const { container } = render(<Title title="Título" align="right" />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-right')
    })
  })

  describe('truncate', () => {
    it('no aplica truncate por defecto', () => {
      const { container } = render(<Title title="Título" />)
      const heading = container.querySelector('h1')
      expect(heading).not.toHaveClass('truncate')
    })

    it('aplica truncate cuando es true', () => {
      const { container } = render(<Title title="Título" truncate />)
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('truncate')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Title title="Título" className="custom-class" />
      )
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Title title="Título" level={2} className="custom-class" />
      )
      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('text-3xl')
      expect(heading).toHaveClass('custom-class')
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Title
          title="Título completo"
          level={2}
          size="5xl"
          align="center"
          truncate
          className="custom"
        />
      )
      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('text-5xl')
      expect(heading).toHaveClass('text-center')
      expect(heading).toHaveClass('truncate')
      expect(heading).toHaveClass('custom')
      expect(heading).toHaveTextContent('Título completo')
    })
  })
})
