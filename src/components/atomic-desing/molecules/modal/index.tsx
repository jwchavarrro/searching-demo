/**
 * Modal.tsx
 * @description: Componente molecular para renderizar modales similar a shadcn/ui Dialog.
 */

import { Icon } from '@iconify/react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'

// Import of components custom
import { Button, type ButtonProps } from '@/components/atomic-desing/atoms'

// Import of utils
import { cn } from '@/utils/cn'

interface ModalContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined)

const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal components must be used within Modal')
  }
  return context
}

export interface ModalProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export const Modal = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  const open = controlledOpen ?? internalOpen

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [controlledOpen, onOpenChange]
  )

  const contextValue = useMemo(
    () => ({ open, onOpenChange: setOpen }),
    [open, setOpen]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  )
}

export interface ModalTriggerProps {
  asChild: true
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
  }>
}

export const ModalTrigger = ({ children, ...props }: ModalTriggerProps) => {
  const { onOpenChange } = useModalContext()

  if (!React.isValidElement(children)) {
    throw new Error('ModalTrigger children must be a valid React element')
  }

  return React.cloneElement(children, {
    ...props,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const originalOnClick = children.props?.onClick
      originalOnClick?.(e)
      onOpenChange(true)
    },
  } as React.HTMLAttributes<HTMLElement>)
}

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const ModalContent = ({
  className,
  children,
  ...props
}: ModalContentProps) => {
  const { open, onOpenChange } = useModalContext()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onOpenChange(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal Content */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className
        )}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export interface ModalCloseProps extends ButtonProps {
  asChild?: boolean
}

export const ModalClose = ({
  asChild,
  children,
  ...props
}: ModalCloseProps) => {
  const { onOpenChange } = useModalContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        props.onClick?.(e as React.MouseEvent<HTMLButtonElement>)
        onOpenChange(false)
      },
    } as React.HTMLAttributes<HTMLElement>)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 rounded-full"
      onClick={() => onOpenChange(false)}
      aria-label="Cerrar modal"
      {...props}
    >
      <Icon icon="mdi:close" className="h-4 w-4" />
      {children}
    </Button>
  )
}
