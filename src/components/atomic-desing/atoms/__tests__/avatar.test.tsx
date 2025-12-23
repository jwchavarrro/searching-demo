import { describe, it, expect } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { Avatar } from '../avatar'

describe('Avatar', () => {
  describe('renderizado con imagen', () => {
    it('renderiza una imagen cuando se proporciona src', () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="Usuario" />
      )
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
      expect(img).toHaveAttribute('alt', 'Usuario')
    })

    it('aplica las clases correctas a la imagen', () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="Usuario" />
      )
      const img = container.querySelector('img')
      expect(img).toHaveClass('rounded-full')
      expect(img).toHaveClass('flex')
      expect(img).toHaveClass('items-center')
      expect(img).toHaveClass('justify-center')
    })
  })

  describe('renderizado con iniciales', () => {
    it('renderiza iniciales cuando no hay src', () => {
      render(<Avatar initials="JP" />)
      expect(screen.getByText('JP')).toBeInTheDocument()
    })

    it('renderiza un div con las iniciales cuando no hay src', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toBeInTheDocument()
      expect(div).toHaveTextContent('AB')
    })

    it('genera iniciales automáticamente desde alt', () => {
      render(<Avatar alt="Juan Pérez" />)
      expect(screen.getByText('JP')).toBeInTheDocument()
    })

    it('genera iniciales de una sola palabra', () => {
      render(<Avatar alt="Juan" />)
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('genera máximo 2 iniciales', () => {
      render(<Avatar alt="Juan Pérez García" />)
      expect(screen.getByText('JP')).toBeInTheDocument()
    })

    it('muestra "?" cuando no hay src, initials ni alt válido', () => {
      render(<Avatar />)
      expect(screen.getByText('?')).toBeInTheDocument()
    })

    it('muestra "?" cuando alt es "Avatar"', () => {
      render(<Avatar alt="Avatar" />)
      expect(screen.getByText('?')).toBeInTheDocument()
    })
  })

  describe('size', () => {
    it('aplica el tamaño base por defecto', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-10')
      expect(div).toHaveClass('h-10')
      expect(div).toHaveClass('text-base')
    })

    it('aplica el tamaño xs', () => {
      const { container } = render(<Avatar initials="AB" size="xs" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-6')
      expect(div).toHaveClass('h-6')
      expect(div).toHaveClass('text-xs')
    })

    it('aplica el tamaño sm', () => {
      const { container } = render(<Avatar initials="AB" size="sm" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-8')
      expect(div).toHaveClass('h-8')
      expect(div).toHaveClass('text-sm')
    })

    it('aplica el tamaño lg', () => {
      const { container } = render(<Avatar initials="AB" size="lg" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-12')
      expect(div).toHaveClass('h-12')
      expect(div).toHaveClass('text-lg')
    })

    it('aplica el tamaño xl', () => {
      const { container } = render(<Avatar initials="AB" size="xl" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-16')
      expect(div).toHaveClass('h-16')
      expect(div).toHaveClass('text-xl')
    })

    it('aplica el tamaño 2xl', () => {
      const { container } = render(<Avatar initials="AB" size="2xl" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-20')
      expect(div).toHaveClass('h-20')
      expect(div).toHaveClass('text-2xl')
    })
  })

  describe('clases CSS', () => {
    it('siempre aplica rounded-full', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('rounded-full')
    })

    it('aplica clases de flexbox', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('items-center')
      expect(div).toHaveClass('justify-center')
    })

    it('aplica clases de fondo y texto', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('bg-gray-200')
      expect(div).toHaveClass('text-gray-700')
    })

    it('aplica clases de fuente y overflow', () => {
      const { container } = render(<Avatar initials="AB" />)
      const div = container.querySelector('div')
      expect(div).toHaveClass('font-medium')
      expect(div).toHaveClass('overflow-hidden')
    })

    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Avatar initials="AB" className="custom-class" />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Avatar initials="AB" size="lg" className="custom-class" />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-12')
      expect(div).toHaveClass('custom-class')
    })
  })

  describe('manejo de errores de imagen', () => {
    it('muestra iniciales cuando la imagen falla al cargar', async () => {
      const { container } = render(
        <Avatar
          src="https://example.com/invalid.jpg"
          alt="Usuario"
          initials="AB"
        />
      )

      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()

      // Simular error de carga dentro de act
      await act(async () => {
        if (img) {
          const errorEvent = new Event('error', { bubbles: true })
          img.dispatchEvent(errorEvent)
        }
      })

      // Esperar a que el componente actualice el estado
      await waitFor(() => {
        const div = container.querySelector('div')
        expect(div).toBeInTheDocument()
        expect(div).toHaveTextContent('AB')
      })
    })
  })

  describe('alt por defecto', () => {
    it('usa "Avatar" como alt por defecto cuando no se proporciona', () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" />
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', 'Avatar')
    })

    it('usa el alt proporcionado', () => {
      const { container } = render(
        <Avatar src="https://example.com/avatar.jpg" alt="Juan Pérez" />
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', 'Juan Pérez')
    })
  })

  describe('prioridad de iniciales', () => {
    it('usa initials cuando está disponible, incluso si hay alt', () => {
      render(<Avatar initials="XY" alt="Juan Pérez" />)
      expect(screen.getByText('XY')).toBeInTheDocument()
      expect(screen.queryByText('JP')).not.toBeInTheDocument()
    })

    it('usa alt para generar iniciales cuando no hay initials', () => {
      render(<Avatar alt="María García" />)
      expect(screen.getByText('MG')).toBeInTheDocument()
    })
  })

  describe('combinación de props', () => {
    it('aplica múltiples clases correctamente', () => {
      const { container } = render(
        <Avatar initials="AB" size="xl" className="custom-class border-2" />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('w-16')
      expect(div).toHaveClass('h-16')
      expect(div).toHaveClass('text-xl')
      expect(div).toHaveClass('rounded-full')
      expect(div).toHaveClass('custom-class')
      expect(div).toHaveClass('border-2')
      expect(div).toHaveTextContent('AB')
    })
  })
})
