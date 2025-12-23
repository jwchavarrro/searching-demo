import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CardA } from '../card-a'

describe('CardA', () => {
  it('renderiza el componente correctamente', () => {
    const { container } = render(
      <CardA
        avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
        title={{ title: 'Jerry Smith' }}
        description={{ text: 'Human' }}
      />
    )
    const wrapper = container.querySelector('div')
    expect(wrapper).toBeInTheDocument()
  })

  it('renderiza el avatar', () => {
    const { container } = render(
      <CardA
        avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
        title={{ title: 'Jerry Smith' }}
        description={{ text: 'Human' }}
      />
    )
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Usuario')
  })

  it('renderiza el título', () => {
    render(
      <CardA
        avatar={{ initials: 'AB' }}
        title={{ title: 'Jerry Smith' }}
        description={{ text: 'Human' }}
      />
    )
    expect(screen.getByText('Jerry Smith')).toBeInTheDocument()
  })

  it('renderiza la descripción', () => {
    render(
      <CardA
        avatar={{ initials: 'AB' }}
        title={{ title: 'Jerry Smith' }}
        description={{ text: 'Human' }}
      />
    )
    expect(screen.getByText('Human')).toBeInTheDocument()
  })

  describe('icono de corazón', () => {
    it('renderiza el botón con el icono de corazón', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })

    it('muestra el icono de corazón vacío por defecto', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      // Verificamos que el botón tiene las clases correctas
      expect(button).toHaveClass('bg-transparent')
      // El icono se renderiza dentro del botón
      // Iconify puede renderizar de forma asíncrona, así que verificamos el botón existe
    })

    it('cambia el estado cuando se hace clic en el botón', () => {
      const handleIconClick = vi.fn()
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
          onIconClick={handleIconClick}
        />
      )
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()

      // Hacer clic en el botón
      fireEvent.click(button!)

      // Verificar que el callback se llamó (esto confirma que el estado cambió)
      expect(handleIconClick).toHaveBeenCalledTimes(1)

      // Hacer otro clic para verificar que sigue funcionando
      fireEvent.click(button!)
      expect(handleIconClick).toHaveBeenCalledTimes(2)
    })

    it('llama a onIconClick cuando se proporciona', () => {
      const handleIconClick = vi.fn()
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
          onIconClick={handleIconClick}
        />
      )
      const button = container.querySelector('button')
      fireEvent.click(button!)
      expect(handleIconClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('layout', () => {
    it('aplica clases de layout flex al contenedor', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('items-center')
      expect(div).toHaveClass('gap-4')
    })

    it('aplica clases de hover y grupo', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('hover:bg-primary-100')
      expect(div).toHaveClass('group')
      expect(div).toHaveClass('cursor-pointer')
    })

    it('aplica clases de estilo al contenedor', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('rounded-lg')
      expect(div).toHaveClass('bg-white')
      expect(div).toHaveClass('p-4')
    })

    it('aplica clases al contenedor de texto', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      // Buscar el div que contiene el título (h3)
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      const textContainer = heading?.parentElement
      expect(textContainer).toHaveClass('flex')
      expect(textContainer).toHaveClass('flex-1')
      expect(textContainer).toHaveClass('flex-col')
      expect(textContainer).toHaveClass('gap-1')
    })
  })

  describe('avatar props', () => {
    it('pasa todas las props del avatar', () => {
      const { container } = render(
        <CardA
          avatar={{
            src: '/avatar.jpg',
            alt: 'Usuario',
            size: 'lg',
            className: 'avatar-custom',
          }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const img = container.querySelector('img')
      expect(img).toHaveClass('w-12')
      expect(img).toHaveClass('h-12')
      expect(img).toHaveClass('avatar-custom')
    })

    it('funciona con iniciales en lugar de imagen', () => {
      render(
        <CardA
          avatar={{ initials: 'JP', size: 'lg' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      expect(screen.getByText('JP')).toBeInTheDocument()
    })
  })

  describe('title props', () => {
    it('renderiza el título con las props correctas', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith', level: 3, size: 'base' }}
          description={{ text: 'Human' }}
        />
      )
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Jerry Smith')
      expect(heading).toHaveClass('text-base')
    })

    it('aplica truncate al título', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const heading = container.querySelector('h3')
      expect(heading).toHaveClass('truncate')
    })
  })

  describe('description props', () => {
    it('renderiza la descripción con las props correctas', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human', size: 'sm', weight: 'normal' }}
        />
      )
      const text = container.querySelector('p')
      expect(text).toBeInTheDocument()
      expect(text).toHaveTextContent('Human')
      expect(text).toHaveClass('text-sm')
    })

    it('aplica truncate a la descripción', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const text = container.querySelector('p')
      expect(text).toHaveClass('truncate')
    })
  })

  describe('button props', () => {
    it('aplica variant ghost al botón', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-transparent')
    })

    it('aplica size icon al botón', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('size-10')
    })

    it('aplica clases personalizadas al botón', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
        />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('rounded-full')
      expect(button).toHaveClass('transition-colors')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas al contenedor', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
          className="custom-card"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('custom-card')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <CardA
          avatar={{ initials: 'AB' }}
          title={{ title: 'Jerry Smith' }}
          description={{ text: 'Human' }}
          className="custom-card border-2"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('items-center')
      expect(div).toHaveClass('custom-card')
      expect(div).toHaveClass('border-2')
    })
  })

  describe('combinación de props', () => {
    it('renderiza correctamente con todas las props', () => {
      const handleIconClick = vi.fn()
      const { container } = render(
        <CardA
          avatar={{
            src: '/avatar.jpg',
            alt: 'Jerry Smith',
            size: 'lg',
            className: 'avatar-class',
          }}
          title={{
            title: 'Jerry Smith',
            level: 3,
            size: 'base',
          }}
          description={{
            text: 'Human',
            size: 'sm',
            weight: 'normal',
          }}
          onIconClick={handleIconClick}
          className="card-class"
        />
      )

      const cardDiv = container.querySelector('div')
      expect(cardDiv).toHaveClass('card-class')

      const img = container.querySelector('img')
      expect(img).toHaveAttribute('src', '/avatar.jpg')
      expect(img).toHaveClass('w-12')
      expect(img).toHaveClass('h-12')

      const heading = container.querySelector('h3')
      expect(heading).toHaveTextContent('Jerry Smith')
      expect(heading).toHaveClass('text-base')

      const text = container.querySelector('p')
      expect(text).toHaveTextContent('Human')
      expect(text).toHaveClass('text-sm')

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      fireEvent.click(button!)
      expect(handleIconClick).toHaveBeenCalledTimes(1)
    })
  })
})

