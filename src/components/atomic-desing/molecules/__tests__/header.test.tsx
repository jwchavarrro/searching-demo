import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../header'

describe('Header', () => {
  it('renderiza el header correctamente', () => {
    render(
      <Header
        avatar={{ avatar: { src: '/avatar.jpg', alt: 'Usuario' } }}
        title={{ title: 'Título del Header' }}
      />
    )
    expect(screen.getByText('Título del Header')).toBeInTheDocument()
  })

  it('renderiza el avatar', () => {
    const { container } = render(
      <Header
        avatar={{ avatar: { src: '/avatar.jpg', alt: 'Usuario' } }}
        title={{ title: 'Título' }}
      />
    )
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/avatar.jpg')
    expect(img).toHaveAttribute('alt', 'Usuario')
  })

  it('renderiza el título', () => {
    const { container } = render(
      <Header
        avatar={{ avatar: { initials: 'AB' } }}
        title={{ title: 'Mi Título' }}
      />
    )
    const heading = container.querySelector('h1')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Mi Título')
  })

  describe('layout', () => {
    it('aplica clases de layout flex column', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{ title: 'Título' }}
          className="flex flex-col items-center gap-2"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('flex-col')
      expect(div).toHaveClass('items-center')
      expect(div).toHaveClass('gap-2')
    })

    it('centra el título por defecto', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{ title: 'Título', align: 'center' }}
        />
      )
      const heading = container.querySelector('h1')
      expect(heading).toHaveClass('text-center')
    })
  })

  describe('avatar props', () => {
    it('pasa todas las props del avatar', () => {
      const { container } = render(
        <Header
          avatar={{
            avatar: {
              src: '/avatar.jpg',
              alt: 'Usuario',
              size: 'xl',
              className: 'avatar-custom',
            },
          }}
          title={{ title: 'Título' }}
        />
      )
      const img = container.querySelector('img')
      expect(img).toHaveClass('w-16')
      expect(img).toHaveClass('h-16')
      expect(img).toHaveClass('avatar-custom')
    })

    it('funciona con iniciales en lugar de imagen', () => {
      render(
        <Header
          avatar={{ avatar: { initials: 'JP', size: 'lg' } }}
          title={{ title: 'Título' }}
        />
      )
      expect(screen.getByText('JP')).toBeInTheDocument()
    })
  })

  describe('title props', () => {
    it('pasa todas las props del título', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{
            title: 'Mi Título',
            level: 2,
            size: 'xl',
            className: 'title-custom',
          }}
        />
      )
      const heading = container.querySelector('h2')
      expect(heading).toHaveClass('text-2xl')
      expect(heading).toHaveClass('title-custom')
      expect(heading).toHaveTextContent('Mi Título')
    })

    it('usa level 1 por defecto', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{ title: 'Título' }}
        />
      )
      const heading = container.querySelector('h1')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas al contenedor', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{ title: 'Título' }}
          className="custom-header"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('custom-header')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Header
          avatar={{ avatar: { initials: 'AB' } }}
          title={{ title: 'Título' }}
          className="custom-header flex flex-col items-center gap-2 border-2"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('flex-col')
      expect(div).toHaveClass('custom-header')
      expect(div).toHaveClass('border-2')
    })
  })

  describe('combinación de props', () => {
    it('renderiza correctamente con todas las props', () => {
      const { container } = render(
        <Header
          avatar={{
            avatar: {
              src: '/avatar.jpg',
              alt: 'Juan Pérez',
              size: '2xl',
              className: 'avatar-class',
            },
          }}
          title={{
            title: 'Abadango Cluster Princess',
            level: 2,
            size: '3xl',
            className: 'title-class',
          }}
          className="header-class"
        />
      )

      const headerDiv = container.querySelector('div')
      expect(headerDiv).toHaveClass('header-class')

      const img = container.querySelector('img')
      expect(img).toHaveAttribute('src', '/avatar.jpg')
      expect(img).toHaveClass('w-20')
      expect(img).toHaveClass('h-20')

      const heading = container.querySelector('h2')
      expect(heading).toHaveTextContent('Abadango Cluster Princess')
      expect(heading).toHaveClass('text-2xl')
      expect(heading).toHaveClass('title-class')
    })
  })
})
