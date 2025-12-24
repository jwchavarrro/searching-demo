import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Message } from '../message'

describe('Message', () => {
  it('renderiza el componente correctamente', () => {
    render(
      <Message
        icon="mdi:information"
        title={{ title: 'Mensaje de prueba' }}
        description={{ text: 'Descripción del mensaje' }}
      />
    )
    expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument()
    expect(screen.getByText('Descripción del mensaje')).toBeInTheDocument()
  })

  it('renderiza como elemento div', () => {
    const { container } = render(
      <Message
        icon="mdi:information"
        title={{ title: 'Título' }}
        description={{ text: 'Descripción' }}
      />
    )
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  describe('icon', () => {
    it('renderiza el icono correctamente', async () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción' }}
        />
      )
      await waitFor(() => {
        const icon = container.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })
    })

    it('aplica las clases correctas al icono', async () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción' }}
        />
      )
      await waitFor(() => {
        const icon = container.querySelector('svg')
        expect(icon).toHaveClass('size-8')
        expect(icon).toHaveClass('md:size-12')
      })
    })
  })

  describe('title', () => {
    it('no renderiza el título si no se proporciona', () => {
      const { container } = render(
        <Message icon="mdi:information" description={{ text: 'Descripción' }} />
      )
      const heading = container.querySelector('h1, h2, h3, h4, h5, h6')
      expect(heading).not.toBeInTheDocument()
    })

    it('renderiza el título cuando se proporciona', () => {
      render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título del mensaje' }}
          description={{ text: 'Descripción' }}
        />
      )
      expect(screen.getByText('Título del mensaje')).toBeInTheDocument()
    })

    it('aplica las props del título correctamente', () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título', size: 'xl' }}
          description={{ text: 'Descripción' }}
        />
      )
      const heading = container.querySelector('h1')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Título')
      expect(heading).toHaveClass('text-xl')
      expect(heading).toHaveClass('text-center')
    })
  })

  describe('description', () => {
    it('no renderiza la descripción si no se proporciona', () => {
      const { container } = render(
        <Message icon="mdi:information" title={{ title: 'Título' }} />
      )
      const text = container.querySelector('p')
      expect(text).not.toBeInTheDocument()
    })

    it('renderiza la descripción cuando se proporciona', () => {
      render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción del mensaje' }}
        />
      )
      expect(screen.getByText('Descripción del mensaje')).toBeInTheDocument()
    })

    it('aplica las props de la descripción correctamente', () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción', size: 'sm', align: 'center' }}
        />
      )
      const text = container.querySelector('p')
      expect(text).toBeInTheDocument()
      expect(text).toHaveTextContent('Descripción')
      // El componente Message solo pasa text y align="center", no pasa size
      expect(text).toHaveClass('text-xs')
      expect(text).toHaveClass('text-center')
    })
  })

  describe('clases base', () => {
    it('aplica las clases base correctamente', () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción' }}
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('flex-col')
      expect(div).toHaveClass('items-center')
      expect(div).toHaveClass('gap-2')
      expect(div).toHaveClass('opacity-50')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción' }}
          className="custom-class"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Message
          icon="mdi:information"
          title={{ title: 'Título' }}
          description={{ text: 'Descripción' }}
          className="custom-class border-2"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('flex-col')
      expect(div).toHaveClass('custom-class')
      expect(div).toHaveClass('border-2')
    })
  })

  describe('combinación de props', () => {
    it('renderiza correctamente solo con icono', async () => {
      const { container } = render(<Message icon="mdi:information" />)
      const div = container.querySelector('div')
      expect(div).toBeInTheDocument()
      await waitFor(() => {
        const icon = container.querySelector('svg')
        expect(icon).toBeInTheDocument()
      })
      const heading = container.querySelector('h1, h2, h3, h4, h5, h6')
      expect(heading).not.toBeInTheDocument()
      const text = container.querySelector('p')
      expect(text).not.toBeInTheDocument()
    })

    it('renderiza correctamente con icono y título', () => {
      render(
        <Message icon="mdi:information" title={{ title: 'Solo título' }} />
      )
      expect(screen.getByText('Solo título')).toBeInTheDocument()
      const { container } = render(
        <Message icon="mdi:information" title={{ title: 'Solo título' }} />
      )
      const text = container.querySelector('p')
      expect(text).not.toBeInTheDocument()
    })

    it('renderiza correctamente con icono y descripción', () => {
      render(
        <Message
          icon="mdi:information"
          description={{ text: 'Solo descripción' }}
        />
      )
      expect(screen.getByText('Solo descripción')).toBeInTheDocument()
      const { container } = render(
        <Message
          icon="mdi:information"
          description={{ text: 'Solo descripción' }}
        />
      )
      const heading = container.querySelector('h1, h2, h3, h4, h5, h6')
      expect(heading).not.toBeInTheDocument()
    })

    it('aplica múltiples props correctamente', () => {
      const { container } = render(
        <Message
          icon="mdi:alert"
          title={{ title: 'Título completo', size: 'xl' }}
          description={{ text: 'Descripción completa', size: 'base' }}
          className="custom-message"
        />
      )
      const div = container.querySelector('div')
      expect(div).toHaveClass('custom-message')
      expect(div).toHaveClass('flex')
      expect(div).toHaveClass('flex-col')

      const heading = container.querySelector('h1')
      expect(heading).toHaveTextContent('Título completo')
      // El componente Message siempre usa size="xl" para el Title
      expect(heading).toHaveClass('text-xl')

      const text = container.querySelector('p')
      expect(text).toHaveTextContent('Descripción completa')
      // El componente Message solo pasa text y align="center", no pasa size
      expect(text).toHaveClass('text-xs')
    })
  })
})
