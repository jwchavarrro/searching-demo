import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '@/components/atomic-desing/atoms'

describe('Popover', () => {
  describe('Popover', () => {
    it('renderiza el componente correctamente', () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )
      expect(container).toBeInTheDocument()
    })

    it('maneja estado interno cuando no se proporciona open controlado', async () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()

      // El contenido no debería estar visible inicialmente
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('maneja estado controlado cuando se proporciona open', () => {
      const { rerender } = render(
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      // El contenido debería estar visible cuando open es true
      expect(screen.getByText('Content')).toBeInTheDocument()

      rerender(
        <Popover open={false}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      // El contenido no debería estar visible cuando open es false
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('llama a onOpenChange cuando cambia el estado', async () => {
      const handleOpenChange = vi.fn()
      const { container } = render(
        <Popover onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      await userEvent.click(button!)

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true)
      })
    })

    it('usa defaultOpen para el estado inicial', async () => {
      render(
        <Popover defaultOpen={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })
    })
  })

  describe('PopoverTrigger', () => {
    it('renderiza el trigger correctamente', () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Open Popover')
    })

    it('abre el popover cuando se hace clic en el trigger', async () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      await userEvent.click(button!)

      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })
    })

    it('ejecuta el onClick original del children si existe', async () => {
      const handleClick = vi.fn()
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button onClick={handleClick}>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      await userEvent.click(button!)

      await waitFor(() => {
        expect(handleClick).toHaveBeenCalled()
      })
    })

    it('lanza error si children no es un elemento válido', () => {
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      expect(() => {
        render(
          <Popover>
            <PopoverTrigger
              asChild
              children={
                'invalid' as unknown as React.ReactElement<{
                  onClick?: (e: React.MouseEvent<HTMLElement>) => void
                  ref?: React.Ref<HTMLElement>
                }>
              }
            />
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )
      }).toThrow('PopoverTrigger children must be a valid React element')

      consoleError.mockRestore()
    })
  })

  describe('PopoverContent', () => {
    it('no renderiza cuando el popover está cerrado', () => {
      render(
        <Popover open={false}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('renderiza cuando el popover está abierto', async () => {
      render(
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      // Esperar a que el contenido se renderice en el portal
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })
    })

    it('renderiza en un portal en document.body', async () => {
      render(
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      await waitFor(() => {
        const content = screen.getByText('Content')
        expect(content).toBeInTheDocument()
        expect(document.body.contains(content)).toBe(true)
      })
    })

    it('aplica las clases base correctamente', async () => {
      render(
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      await waitFor(() => {
        const content = screen.getByText('Content')
        expect(content).toHaveClass('absolute')
        expect(content).toHaveClass('z-50')
        expect(content).toHaveClass('rounded-md')
        expect(content).toHaveClass('border')
        expect(content).toHaveClass('bg-white')
        expect(content).toHaveClass('p-4')
        expect(content).toHaveClass('shadow-md')
      })
    })

    it('aplica el ancho base por defecto', async () => {
      render(
        <Popover open={true}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      await waitFor(() => {
        const content = screen.getByText('Content')
        expect(content).toHaveClass('w-72')
      })
    })

    describe('width', () => {
      it('aplica el ancho sm', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="sm">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-48')
        })
      })

      it('aplica el ancho lg', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="lg">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-96')
        })
      })

      it('aplica el ancho full', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="full">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-full')
        })
      })

      it('aplica ancho numérico personalizado', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width={400}>Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveStyle({ width: '400px' })
        })
      })
    })

    describe('mobileWidth', () => {
      it('aplica mobileWidth cuando se proporciona', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="lg" mobileWidth="full">
              Content
            </PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-full')
          expect(content).toHaveClass('md:w-96')
        })
      })

      it('aplica mobileWidth numérico', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="base" mobileWidth={300}>
              Content
            </PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveStyle({ width: '300px' })
        })
      })
    })

    describe('side', () => {
      it('usa bottom por defecto', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })

      it('acepta side top', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent side="top">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })

      it('acepta side right', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent side="right">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })

      it('acepta side left', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent side="left">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })
    })

    describe('align', () => {
      it('usa center por defecto', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })

      it('acepta align start', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent align="start">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })

      it('acepta align end', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent align="end">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toBeInTheDocument()
        })
      })
    })

    describe('cierre', () => {
      it('cierra el popover cuando se presiona Escape', async () => {
        const handleOpenChange = vi.fn()
        render(
          <Popover open={true} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )

        expect(screen.getByText('Content')).toBeInTheDocument()

        await userEvent.keyboard('{Escape}')

        await waitFor(() => {
          expect(handleOpenChange).toHaveBeenCalledWith(false)
        })
      })

      it('cierra el popover cuando se hace clic fuera', async () => {
        const handleOpenChange = vi.fn()
        render(
          <Popover open={true} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )

        expect(screen.getByText('Content')).toBeInTheDocument()

        // Hacer clic fuera del popover
        await userEvent.click(document.body)

        await waitFor(() => {
          expect(handleOpenChange).toHaveBeenCalledWith(false)
        })
      })
    })

    describe('className', () => {
      it('aplica clases personalizadas', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent className="custom-class">Content</PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('custom-class')
        })
      })

      it('combina clases personalizadas con las clases por defecto', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent width="lg" side="top" className="custom-class">
              Content
            </PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-96')
          expect(content).toHaveClass('custom-class')
        })
      })
    })

    describe('combinación de props', () => {
      it('aplica múltiples props correctamente', async () => {
        render(
          <Popover open={true}>
            <PopoverTrigger asChild>
              <Button>Open</Button>
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              width="lg"
              mobileWidth="full"
              className="custom"
            >
              Content
            </PopoverContent>
          </Popover>
        )

        await waitFor(() => {
          const content = screen.getByText('Content')
          expect(content).toHaveClass('w-full')
          expect(content).toHaveClass('md:w-96')
          expect(content).toHaveClass('custom')
          expect(content).toBeInTheDocument()
        })
      })
    })
  })

  describe('integración', () => {
    it('funciona correctamente con todos los componentes juntos', async () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <h3>Popover Title</h3>
              <p>Popover content</p>
            </div>
          </PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      expect(button).toHaveTextContent('Open Popover')

      await userEvent.click(button!)

      await waitFor(() => {
        expect(screen.getByText('Popover Title')).toBeInTheDocument()
        expect(screen.getByText('Popover content')).toBeInTheDocument()
      })
    })
  })
})
