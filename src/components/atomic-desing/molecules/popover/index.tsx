/**
 * Popover.tsx
 * @description: Componente molecular para renderizar popovers similar a shadcn/ui Popover.
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
  asChild: true
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    ref?: React.Ref<HTMLElement>
  }>
}

export const PopoverTrigger = ({ children, ...props }: PopoverTriggerProps) => {
  const { onOpenChange, triggerRef } = usePopoverContext()

  if (!React.isValidElement(children)) {
    throw new Error('PopoverTrigger children must be a valid React element')
  }

  return React.cloneElement(children, {
    ...props,
    ref: triggerRef,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      const originalOnClick = children.props?.onClick
      originalOnClick?.(e)
      onOpenChange(true)
    },
  } as React.HTMLAttributes<HTMLElement>)
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  width?: 'sm' | 'base' | 'lg' | 'xl' | 'full' | number
  mobileWidth?: 'sm' | 'base' | 'lg' | 'xl' | 'full' | number
}

const widthClasses = {
  sm: 'w-48',
  base: 'w-72',
  lg: 'w-96',
  xl: 'w-[28rem]',
  full: 'w-full',
}

export const PopoverContent = ({
  className,
  children,
  align = 'center',
  side = 'bottom',
  width = 'base',
  mobileWidth,
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

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onOpenChange, triggerRef])

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    const updatePosition = () => {
      if (!triggerRef.current || !contentRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()

      let top = 0
      let left = 0

      // Calcular posición según side
      if (side === 'top') top = triggerRect.top - contentRect.height - 8
      else if (side === 'bottom') top = triggerRect.bottom + 8
      else if (side === 'left') left = triggerRect.left - contentRect.width - 8
      else if (side === 'right') left = triggerRect.right + 8

      // Calcular alineación
      if (side === 'top' || side === 'bottom') {
        if (align === 'start') left = triggerRect.left
        else if (align === 'center')
          left =
            triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
        else if (align === 'end') left = triggerRect.right - contentRect.width
      } else {
        if (align === 'start') top = triggerRect.top
        else if (align === 'center')
          top =
            triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
        else if (align === 'end') top = triggerRect.bottom - contentRect.height
      }

      // Ajustar para que no se salga de la pantalla
      const padding = 8
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - contentRect.width - padding)
      )
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - contentRect.height - padding)
      )

      contentRef.current.style.top = `${top}px`
      contentRef.current.style.left = `${left}px`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, align, side, triggerRef])

  if (!open) return null

  const getWidthClasses = () => {
    const baseWidth = typeof width === 'number' ? '' : widthClasses[width]

    let mobileW: string | null = null
    if (mobileWidth) {
      if (typeof mobileWidth === 'number') {
        mobileW = ''
      } else {
        mobileW = widthClasses[mobileWidth]
      }
    }

    if (mobileW) {
      return `${mobileW} md:${baseWidth}`
    }
    return baseWidth
  }

  const getWidthStyle = (): React.CSSProperties => {
    const style: Record<string, string> = {}
    if (typeof width === 'number') {
      style.width = `${width}px`
    }
    if (mobileWidth && typeof mobileWidth === 'number') {
      style.width = `${mobileWidth}px`
      if (typeof width === 'number') {
        style['@media (min-width: 768px)'] = `${width}px`
      }
    }
    return style as React.CSSProperties
  }

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        'border-gray/50 absolute z-50 rounded-md border bg-white p-4 shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        getWidthClasses(),
        className
      )}
      style={getWidthStyle()}
      {...props}
    >
      {children}
    </div>,
    document.body
  )
}
