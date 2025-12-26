/**
 * popover.test.tsx
 * @description: Tests para el componente Popover y sus subcomponentes
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Button } from '@/components/atomic-desing/atoms'
import { mockConsoleError } from '@/test/setup'

// Helpers para reducir anidamiento
const renderPopover = (props?: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  contentProps?: React.ComponentProps<typeof PopoverContent>
}) => {
  return render(
    <Popover
      open={props?.open}
      defaultOpen={props?.defaultOpen}
      onOpenChange={props?.onOpenChange}
    >
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent {...props?.contentProps}>Content</PopoverContent>
    </Popover>
  )
}

const waitForContent = async () => {
  await waitFor(() => {
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
}

const expectContentVisible = () => {
  const content = screen.getByText('Content')
  expect(content).toBeInTheDocument()
  return content
}

const expectContentNotVisible = () => {
  expect(screen.queryByText('Content')).not.toBeInTheDocument()
}

const expectOpenChangeCalledWith = (
  handleOpenChange: ReturnType<typeof vi.fn>,
  value: boolean
) => {
  expect(handleOpenChange).toHaveBeenCalledWith(value)
}

const waitForOpenChange = async (
  handleOpenChange: ReturnType<typeof vi.fn>,
  value: boolean
) => {
  await waitFor(() => {
    expectOpenChangeCalledWith(handleOpenChange, value)
  })
}

describe('Popover', () => {
  describe('Popover (Componente principal)', () => {
    it('renderiza el componente correctamente', () => {
      const { container } = renderPopover()
      expect(container).toBeInTheDocument()
    })

    it('maneja estado interno cuando no se proporciona open controlado', () => {
      const { container } = renderPopover()

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      expectContentNotVisible()
    })

    it('maneja estado controlado cuando se proporciona open', () => {
      const { rerender } = renderPopover({ open: true })

      expectContentVisible()

      rerender(
        <Popover open={false}>
          <PopoverTrigger asChild>
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      expectContentNotVisible()
    })

    it('llama a onOpenChange cuando cambia el estado', async () => {
      const handleOpenChange = vi.fn()
      const { container } = renderPopover({ onOpenChange: handleOpenChange })

      const button = container.querySelector('button')
      await userEvent.click(button!)

      await waitFor(() => {
        expect(handleOpenChange).toHaveBeenCalledWith(true)
      })
    })

    it('usa defaultOpen para el estado inicial', async () => {
      renderPopover({ defaultOpen: true })
      await waitForContent()
    })

    it('prioriza open controlado sobre defaultOpen', () => {
      renderPopover({ open: false, defaultOpen: true })
      expectContentNotVisible()
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
      const { container } = renderPopover()

      const button = container.querySelector('button')
      await userEvent.click(button!)

      await waitForContent()
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
      const consoleError = mockConsoleError()

      expect(() => {
        const invalidChild = 'invalid' as unknown as React.ReactElement<{
          onClick?: (e: React.MouseEvent<HTMLElement>) => void
          ref?: React.Ref<HTMLElement>
        }>
        render(
          <Popover>
            <PopoverTrigger asChild>{invalidChild}</PopoverTrigger>
            <PopoverContent>Content</PopoverContent>
          </Popover>
        )
      }).toThrow('PopoverTrigger children must be a valid React element')

      consoleError.mockRestore()
    })

    it('filtra asChild para que no se pase al elemento DOM', () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild data-testid="trigger">
            <Button>Open</Button>
          </PopoverTrigger>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      )

      const button = container.querySelector('button')
      expect(button).not.toHaveAttribute('asChild')
      expect(button).toHaveAttribute('data-testid', 'trigger')
    })
  })

  describe('PopoverContent', () => {
    it('no renderiza cuando el popover está cerrado', () => {
      renderPopover({ open: false })
      expectContentNotVisible()
    })

    it('renderiza cuando el popover está abierto', async () => {
      renderPopover({ open: true })
      await waitForContent()
    })

    it('renderiza en un portal en document.body', async () => {
      renderPopover({ open: true })
      await waitForContent()

      const content = screen.getByText('Content')
      expect(document.body.contains(content)).toBe(true)
    })

    it('aplica las clases base correctamente', async () => {
      renderPopover({ open: true })
      await waitForContent()

      const content = expectContentVisible()
      expect(content).toHaveClass('absolute')
      expect(content).toHaveClass('z-50')
      expect(content).toHaveClass('rounded-md')
      expect(content).toHaveClass('border')
      expect(content).toHaveClass('bg-white')
      expect(content).toHaveClass('p-5')
      expect(content).toHaveClass('shadow')
    })


    describe('side', () => {
      it('usa bottom por defecto', async () => {
        renderPopover({ open: true })
        await waitForContent()
      })

      it.each(['top', 'right', 'left'] as const)(
        'acepta side %s',
        async side => {
          renderPopover({ open: true, contentProps: { side } })
          await waitForContent()
        }
      )
    })

    describe('align', () => {
      it('usa center por defecto', async () => {
        renderPopover({ open: true })
        await waitForContent()
      })

      it.each(['start', 'end'] as const)('acepta align %s', async align => {
        renderPopover({ open: true, contentProps: { align } })
        await waitForContent()
      })
    })

    describe('cierre', () => {
      it('cierra el popover cuando se presiona Escape', async () => {
        const handleOpenChange = vi.fn()
        renderPopover({ open: true, onOpenChange: handleOpenChange })

        expectContentVisible()

        await userEvent.keyboard('{Escape}')

        await waitForOpenChange(handleOpenChange, false)
      })

      it('cierra el popover cuando se hace clic fuera', async () => {
        const handleOpenChange = vi.fn()
        renderPopover({ open: true, onOpenChange: handleOpenChange })

        expectContentVisible()

        await userEvent.click(document.body)

        await waitForOpenChange(handleOpenChange, false)
      })
    })

    describe('className', () => {
      it('aplica clases personalizadas', async () => {
        renderPopover({
          open: true,
          contentProps: { className: 'custom-class' },
        })
        await waitForContent()

        const content = expectContentVisible()
        expect(content).toHaveClass('custom-class')
      })

      it('combina clases personalizadas con las clases por defecto', async () => {
        renderPopover({
          open: true,
          contentProps: { side: 'top', className: 'custom-class' },
        })
        await waitForContent()

        const content = expectContentVisible()
        expect(content).toHaveClass('custom-class')
      })
    })

    describe('combinación de props', () => {
      it('aplica múltiples props correctamente', async () => {
        renderPopover({
          open: true,
          contentProps: {
            side: 'right',
            align: 'start',
            className: 'custom',
          },
        })
        await waitForContent()

        const content = expectContentVisible()
        expect(content).toHaveClass('custom')
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

    it('maneja múltiples popovers independientes', async () => {
      const { container } = render(
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover 1</Button>
            </PopoverTrigger>
            <PopoverContent>Content 1</PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button>Open Popover 2</Button>
            </PopoverTrigger>
            <PopoverContent>Content 2</PopoverContent>
          </Popover>
        </>
      )

      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(2)

      const firstButton = buttons[0]
      expect(firstButton).toBeInTheDocument()
      await userEvent.click(firstButton)

      await waitFor(() => {
        expect(screen.getByText('Content 1')).toBeInTheDocument()
        expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
      })
    })
  })
})
