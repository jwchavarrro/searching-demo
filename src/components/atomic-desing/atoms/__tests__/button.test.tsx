import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../button'

describe('Button', () => {
  it('renderiza el botón correctamente', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renderiza como elemento button', () => {
    const { container } = render(<Button>Button</Button>)
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Button')
  })

  describe('variant', () => {
    it('aplica la variante default por defecto', () => {
      const { container } = render(<Button>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-primary-600')
      expect(button).toHaveClass('text-white')
    })

    it('aplica la variante default', () => {
      const { container } = render(<Button variant="default">Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-primary-600')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('hover:bg-primary-700')
    })

    it('aplica la variante destructive', () => {
      const { container } = render(
        <Button variant="destructive">Delete</Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-red-600')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('hover:bg-red-700')
    })

    it('aplica la variante outline', () => {
      const { container } = render(<Button variant="outline">Outline</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('border')
      expect(button).toHaveClass('border-gray-300')
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('hover:bg-gray-100')
    })

    it('aplica la variante secondary', () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-gray-200')
      expect(button).toHaveClass('text-gray-900')
      expect(button).toHaveClass('hover:bg-gray-300')
    })

    it('aplica la variante ghost', () => {
      const { container } = render(<Button variant="ghost">Ghost</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('hover:bg-gray-100')
      expect(button).toHaveClass('text-gray-900')
    })

    it('aplica la variante link', () => {
      const { container } = render(<Button variant="link">Link</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('text-primary-600')
      expect(button).toHaveClass('hover:underline')
      expect(button).toHaveClass('p-0')
      expect(button).toHaveClass('h-auto')
    })
  })

  describe('size', () => {
    it('aplica el tamaño base por defecto', () => {
      const { container } = render(<Button>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-10')
      expect(button).toHaveClass('px-4')
      expect(button).toHaveClass('text-base')
    })

    it('aplica el tamaño sm', () => {
      const { container } = render(<Button size="sm">Small</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-8')
      expect(button).toHaveClass('px-3')
      expect(button).toHaveClass('text-sm')
    })

    it('aplica el tamaño lg', () => {
      const { container } = render(<Button size="lg">Large</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('px-6')
      expect(button).toHaveClass('text-lg')
    })

    it('aplica el tamaño icon', () => {
      const { container } = render(<Button size="icon">🔍</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('h-10')
      expect(button).toHaveClass('w-10')
      expect(button).toHaveClass('p-0')
    })
  })

  describe('clases base', () => {
    it('aplica las clases base correctamente', () => {
      const { container } = render(<Button>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('inline-flex')
      expect(button).toHaveClass('items-center')
      expect(button).toHaveClass('justify-center')
      expect(button).toHaveClass('rounded-md')
      expect(button).toHaveClass('font-medium')
      expect(button).toHaveClass('transition-colors')
    })

    it('aplica clases de focus', () => {
      const { container } = render(<Button>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('focus-visible:outline-none')
      expect(button).toHaveClass('focus-visible:ring-2')
      expect(button).toHaveClass('focus-visible:ring-offset-2')
      expect(button).toHaveClass('focus-visible:ring-primary-600')
    })

    it('aplica clases de disabled', () => {
      const { container } = render(<Button disabled>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveClass('disabled:pointer-events-none')
      expect(button).toHaveClass('disabled:opacity-50')
      expect(button).toHaveAttribute('disabled')
    })
  })

  describe('disabled', () => {
    it('no está deshabilitado por defecto', () => {
      const { container } = render(<Button>Button</Button>)
      const button = container.querySelector('button')
      expect(button).not.toHaveAttribute('disabled')
    })

    it('está deshabilitado cuando se pasa disabled', () => {
      const { container } = render(<Button disabled>Button</Button>)
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('disabled')
      expect(button).toHaveClass('opacity-50')
      expect(button).toHaveClass('cursor-not-allowed')
    })

    it('no ejecuta onClick cuando está deshabilitado', async () => {
      const handleClick = vi.fn()
      const { container } = render(
        <Button disabled onClick={handleClick}>
          Button
        </Button>
      )
      const button = container.querySelector('button')
      await userEvent.click(button!)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('eventos', () => {
    it('ejecuta onClick cuando se hace clic', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByText('Click me')
      await userEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('pasa otras props HTML al botón', () => {
      const { container } = render(
        <Button type="submit" aria-label="Submit button">
          Submit
        </Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-label', 'Submit button')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Button className="custom-class">Button</Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Button variant="outline" size="lg" className="custom-class">
          Button
        </Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Button
          variant="destructive"
          size="lg"
          className="custom-class"
          disabled
        >
          Delete
        </Button>
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-red-600')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('opacity-50')
      expect(button).toHaveAttribute('disabled')
      expect(button).toHaveTextContent('Delete')
    })
  })
})
