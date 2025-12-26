/**
 * Popover.tsx
 * @description Componente Popover simplificado
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

interface PopoverContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
}

const PopoverContext = createContext<PopoverContextValue | undefined>(undefined)

const usePopoverContext = () => {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('Popover components must be used within Popover')
  }
  return context
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export const Popover = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const triggerRef = useRef<HTMLElement>(null)

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
    () => ({ open, onOpenChange: setOpen, triggerRef }),
    [open, setOpen]
  )

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  )
}

export interface PopoverTriggerProps {
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    ref?: React.Ref<HTMLElement>
  }>
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext()

  if (!React.isValidElement(children)) {
    throw new Error('PopoverTrigger children must be a valid React element')
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    children.props?.onClick?.(e)
    onOpenChange(!open)
  }

  return React.cloneElement(children, {
    ref: triggerRef,
    onClick: handleClick,
  })
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const PopoverContent = ({
  className,
  children,
  ...props
}: PopoverContentProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false)
      }
    }

    const updatePosition = () => {
      if (!triggerRef.current || !contentRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      // Posición simple: debajo del trigger, centrado
      const top = triggerRect.bottom + 8
      const left =
        triggerRect.left + triggerRect.width / 2 - contentRect.width / 2

      contentRef.current.style.top = `${top}px`
      contentRef.current.style.left = `${Math.max(8, left)}px`
    }

    updatePosition()
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, onOpenChange, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        'fixed z-50 rounded-md border border-gray-200 bg-white p-5 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>,
    document.body
  )
}
