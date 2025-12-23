import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AvatarButton } from '../avatar-button'

describe('AvatarButton', () => {
  it('renderiza el componente correctamente', () => {
    const { container } = render(
      <AvatarButton
        avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
        icon="mdi:heart"
      />
    )
    const wrapper = container.querySelector('div')
    expect(wrapper).toBeInTheDocument()
  })

  it('renderiza el avatar', () => {
    const { container } = render(
      <AvatarButton
        avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
        icon="mdi:heart"
      />
    )
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Usuario')
  })

  describe('icon', () => {
    it('renderiza el icono cuando se proporciona', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toBeInTheDocument()
      expect(iconDiv).toHaveClass('absolute')
    })

    it('no renderiza el div del icono cuando no se proporciona icon', () => {
      const { container } = render(<AvatarButton avatar={{ initials: 'AB' }} />)
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).not.toBeInTheDocument()
    })

    it('renderiza el div del icono cuando se proporciona el nombre del icono', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:star"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toBeInTheDocument()
      // Verificar que el componente Icon está presente (puede renderizarse de forma asíncrona)
      expect(iconDiv).toHaveClass('flex')
      expect(iconDiv).toHaveClass('items-center')
      expect(iconDiv).toHaveClass('justify-center')
    })
  })

  describe('avatar props', () => {
    it('pasa todas las props del avatar', () => {
      const { container } = render(
        <AvatarButton
          avatar={{
            src: '/avatar.jpg',
            alt: 'Usuario',
            size: 'xl',
            className: 'avatar-custom',
          }}
          icon="mdi:heart"
        />
      )
      const img = container.querySelector('img')
      expect(img).toHaveClass('w-16')
      expect(img).toHaveClass('h-16')
      expect(img).toHaveClass('avatar-custom')
    })

    it('funciona con iniciales en lugar de imagen', () => {
      render(
        <AvatarButton
          avatar={{ initials: 'JP', size: 'lg' }}
          icon="mdi:heart"
        />
      )
      expect(screen.getByText('JP')).toBeInTheDocument()
    })
  })

  describe('layout y posicionamiento', () => {
    it('aplica clases de posicionamiento relativo al contenedor', () => {
      const { container } = render(
        <AvatarButton avatar={{ initials: 'AB' }} icon="mdi:heart" />
      )
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('relative')
      expect(wrapper).toHaveClass('inline-block')
    })

    it('aplica clases de posicionamiento absoluto al div del icono', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toHaveClass('absolute')
      expect(iconDiv).toHaveClass('right-0')
      expect(iconDiv).toHaveClass('bottom-0')
    })

    it('aplica clases de transform al div del icono', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toHaveClass('translate-x-1/6')
      expect(iconDiv).toHaveClass('translate-y-1/12')
    })

    it('aplica clases de estilo al div del icono', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toHaveClass('bg-white')
      expect(iconDiv).toHaveClass('rounded-full')
      expect(iconDiv).toHaveClass('flex')
      expect(iconDiv).toHaveClass('items-center')
      expect(iconDiv).toHaveClass('justify-center')
    })

    it('aplica clases responsive de tamaño', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toHaveClass('md:size-8')
      expect(iconDiv).toHaveClass('size-6')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas al contenedor', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ initials: 'AB' }}
          icon="mdi:heart"
          className="custom-container"
        />
      )
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('custom-container')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ initials: 'AB' }}
          icon="mdi:heart"
          className="custom-container border-2"
        />
      )
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('relative')
      expect(wrapper).toHaveClass('inline-block')
      expect(wrapper).toHaveClass('custom-container')
      expect(wrapper).toHaveClass('border-2')
    })

    it('aplica iconClassName al div del icono', () => {
      const { container } = render(
        <AvatarButton
          avatar={{ src: '/avatar.jpg', alt: 'Usuario' }}
          icon="mdi:heart"
          iconClassName="custom-icon"
        />
      )
      const iconDiv = container.querySelector('.absolute')
      expect(iconDiv).toHaveClass('custom-icon')
    })
  })

  describe('combinación de props', () => {
    it('renderiza correctamente con todas las props', () => {
      const { container } = render(
        <AvatarButton
          avatar={{
            src: '/avatar.jpg',
            alt: 'Juan Pérez',
            size: '2xl',
            className: 'avatar-class',
          }}
          icon="mdi:heart"
          className="container-class"
          iconClassName="icon-class"
        />
      )

      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('container-class')

      const img = container.querySelector('img')
      expect(img).toHaveAttribute('src', '/avatar.jpg')
      expect(img).toHaveClass('w-20')
      expect(img).toHaveClass('h-20')

      const iconDiv = container.querySelectorAll('div')[1]
      expect(iconDiv).toHaveClass('icon-class')
      expect(iconDiv).toHaveClass('bg-white')
    })
  })
})
