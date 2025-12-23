import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../input'

describe('Input', () => {
  it('renderiza el input correctamente', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('renderiza como elemento input', () => {
    const { container } = render(<Input placeholder="Input" />)
    const input = container.querySelector('input[type="text"]')
    expect(input).toBeInTheDocument()
  })

  it('aplica el placeholder por defecto', () => {
    render(<Input />)
    const input = screen.getByPlaceholderText('Search or filter results')
    expect(input).toBeInTheDocument()
  })

  it('aplica el placeholder personalizado', () => {
    render(<Input placeholder="Custom placeholder" />)
    const input = screen.getByPlaceholderText('Custom placeholder')
    expect(input).toBeInTheDocument()
  })

  describe('icono', () => {
    it('muestra el icono de búsqueda por defecto', () => {
      const { container } = render(<Input />)
      const iconContainer = container.querySelector(
        '.absolute.top-1\\/2.left-3'
      )
      expect(iconContainer).toBeInTheDocument()
    })

    it('aplica padding izquierdo cuando hay icono', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('pl-10')
    })
  })

  describe('clases base', () => {
    it('aplica las clases base correctamente', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('h-10')
      expect(input).toHaveClass('w-full')
      expect(input).toHaveClass('rounded-lg')
      expect(input).toHaveClass('border')
      expect(input).toHaveClass('border-gray/50')
      expect(input).toHaveClass('bg-white')
      expect(input).toHaveClass('px-4')
      expect(input).toHaveClass('md:text-sm')
    })

    it('aplica clases de focus', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('focus:ring-primary-600')
      expect(input).toHaveClass('focus:border-primary-600')
      expect(input).toHaveClass('focus:ring-2')
      expect(input).toHaveClass('focus:outline-none')
    })

    it('aplica clases de disabled', () => {
      const { container } = render(<Input disabled />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('disabled:bg-gray/10')
      expect(input).toHaveClass('disabled:cursor-not-allowed')
      expect(input).toHaveAttribute('disabled')
    })
  })

  describe('disabled', () => {
    it('no está deshabilitado por defecto', () => {
      const { container } = render(<Input />)
      const input = container.querySelector('input')
      expect(input).not.toHaveAttribute('disabled')
    })

    it('está deshabilitado cuando se pasa disabled', () => {
      const { container } = render(<Input disabled />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('disabled')
    })
  })

  describe('children', () => {
    it('no muestra children por defecto', () => {
      const { container } = render(<Input />)
      const rightContainer = container.querySelector(
        '.absolute.top-1\\/2.right-3'
      )
      expect(rightContainer).not.toBeInTheDocument()
    })

    it('muestra children cuando se proporcionan', () => {
      const { container } = render(
        <Input>
          <span>Right content</span>
        </Input>
      )
      const rightContainer = container.querySelector(
        '.absolute.top-1\\/2.right-3'
      )
      expect(rightContainer).toBeInTheDocument()
      expect(rightContainer).toHaveTextContent('Right content')
    })

    it('aplica padding derecho cuando hay children', () => {
      const { container } = render(
        <Input>
          <span>Content</span>
        </Input>
      )
      const input = container.querySelector('input')
      expect(input).toHaveClass('pr-10')
    })
  })

  describe('eventos', () => {
    it('ejecuta onChange cuando se escribe', async () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByPlaceholderText('Search or filter results')
      await userEvent.type(input, 'test')
      expect(handleChange).toHaveBeenCalled()
    })

    it('pasa otras props HTML al input', () => {
      const { container } = render(
        <Input
          type="email"
          name="email"
          aria-label="Email input"
          required
        />
      )
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('type', 'email')
      expect(input).toHaveAttribute('name', 'email')
      expect(input).toHaveAttribute('aria-label', 'Email input')
      expect(input).toHaveAttribute('required')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(<Input className="custom-class" />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Input className="custom-class" disabled />
      )
      const input = container.querySelector('input')
      expect(input).toHaveClass('bg-white')
      expect(input).toHaveClass('custom-class')
      expect(input).toHaveAttribute('disabled')
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Input
          placeholder="Search"
          disabled
          className="custom-class"
          data-testid="search-input"
        >
          <span>Icon</span>
        </Input>
      )
      const input = container.querySelector('input')
      expect(input).toHaveClass('h-10')
      expect(input).toHaveClass('pl-10')
      expect(input).toHaveClass('pr-10')
      expect(input).toHaveClass('custom-class')
      expect(input).toHaveAttribute('disabled')
      expect(input).toHaveAttribute('placeholder', 'Search')
      expect(input).toHaveAttribute('data-testid', 'search-input')
    })
  })
})

