/**
 * Popover.tsx
 * @description: Componente para renderizar un popover con posición y tamaño configurable.
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

// Import of utils
import { cn } from '@/utils/cn'

// Constants
const POPOVER_PADDING = 8
const POPOVER_GAP = 8

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

type PopoverAlign = 'start' | 'center' | 'end'
type PopoverSide = 'top' | 'right' | 'bottom' | 'left'

export interface PopoverTriggerProps {
  asChild?: true
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    ref?: React.Ref<HTMLElement>
  }>
}

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children, ...restProps } = props
  const { open, onOpenChange, triggerRef } = usePopoverContext()

  if (!React.isValidElement(children)) {
    throw new Error('PopoverTrigger children must be a valid React element')
  }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const originalOnClick = children.props?.onClick
      originalOnClick?.(e)
      // Toggle: si está abierto, lo cierra; si está cerrado, lo abre
      onOpenChange(!open)
    },
    [children.props, onOpenChange, open]
  )

  // Filter out asChild from props to prevent it from being passed to DOM
  const elementProps = Object.fromEntries(
    Object.entries(restProps).filter(([key]) => key !== 'asChild')
  ) as Omit<PopoverTriggerProps, 'asChild' | 'children'>

  return React.cloneElement(children, {
    ...elementProps,
    ref: triggerRef,
    onClick: handleClick,
  })
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  align?: PopoverAlign
  side?: PopoverSide
}

const calculateHorizontalPosition = (
  align: PopoverAlign,
  triggerRect: DOMRect,
  contentRect: DOMRect
): number => {
  switch (align) {
    case 'start':
      return triggerRect.left
    case 'center':
      return triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
    case 'end':
      return triggerRect.right - contentRect.width
  }
}

const calculateVerticalPosition = (
  align: PopoverAlign,
  triggerRect: DOMRect,
  contentRect: DOMRect
): number => {
  switch (align) {
    case 'start':
      return triggerRect.top
    case 'center':
      return triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
    case 'end':
      return triggerRect.bottom - contentRect.height
  }
}

const calculatePositionBySide = (
  side: PopoverSide,
  align: PopoverAlign,
  triggerRect: DOMRect,
  contentRect: DOMRect
): { top: number; left: number } => {
  let top = 0
  let left = 0

  // Calcular posición según side
  switch (side) {
    case 'top':
      top = triggerRect.top - contentRect.height - POPOVER_GAP
      left = calculateHorizontalPosition(align, triggerRect, contentRect)
      break
    case 'bottom':
      top = triggerRect.bottom + POPOVER_GAP
      left = calculateHorizontalPosition(align, triggerRect, contentRect)
      break
    case 'left':
      left = triggerRect.left - contentRect.width - POPOVER_GAP
      top = calculateVerticalPosition(align, triggerRect, contentRect)
      break
    case 'right':
      left = triggerRect.right + POPOVER_GAP
      top = calculateVerticalPosition(align, triggerRect, contentRect)
      break
  }

  return { top, left }
}

const constrainToViewport = (
  top: number,
  left: number,
  contentRect: DOMRect
): { top: number; left: number } => {
  const constrainedLeft = Math.max(
    POPOVER_PADDING,
    Math.min(left, window.innerWidth - contentRect.width - POPOVER_PADDING)
  )
  const constrainedTop = Math.max(
    POPOVER_PADDING,
    Math.min(top, window.innerHeight - contentRect.height - POPOVER_PADDING)
  )

  return { top: constrainedTop, left: constrainedLeft }
}

export const PopoverContent = ({
  className,
  children,
  align = 'center',
  side = 'bottom',
  ...props
}: PopoverContentProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext()
  const contentRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    },
    [onOpenChange]
  )

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        contentRef.current &&
        triggerRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false)
      }
    },
    [onOpenChange, triggerRef]
  )

  useEffect(() => {
    if (!open) return

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleEscape, handleClickOutside])

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()

    const { top, left } = calculatePositionBySide(
      side,
      align,
      triggerRect,
      contentRect
    )

    const { top: constrainedTop, left: constrainedLeft } = constrainToViewport(
      top,
      left,
      contentRect
    )

    if (contentRef.current) {
      contentRef.current.style.top = `${constrainedTop}px`
      contentRef.current.style.left = `${constrainedLeft}px`
    }
  }, [side, align, triggerRef])

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, updatePosition, triggerRef])

  if (!open) return null

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        'border-gray/10 absolute z-50 rounded-md border bg-white p-5 shadow',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {children}
    </div>,
    document.body
  )
}
