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

// Import of custom hooks
import { useIsMobile } from '@/hooks/use-mobile'

// Constants
const POPOVER_PADDING = 8
const POPOVER_GAP = 10

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
  renderInParent?: boolean
  width?: string | number
  height?: string | number
  mobileWidth?: string | number
  mobileHeight?: string | number
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
  contentRect: DOMRect,
  useGap: boolean = true
): { top: number; left: number } => {
  let top = 0
  let left = 0
  const gap = useGap ? POPOVER_GAP : 0

  // Calcular posición según side
  switch (side) {
    case 'top':
      top = triggerRect.top - contentRect.height - gap
      left = calculateHorizontalPosition(align, triggerRect, contentRect)
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = calculateHorizontalPosition(align, triggerRect, contentRect)
      break
    case 'left':
      left = triggerRect.left - contentRect.width - gap
      top = calculateVerticalPosition(align, triggerRect, contentRect)
      break
    case 'right':
      left = triggerRect.right + gap
      top = calculateVerticalPosition(align, triggerRect, contentRect)
      break
  }

  return { top, left }
}

const constrainToViewport = (
  top: number,
  left: number,
  contentRect: DOMRect,
  usePadding: boolean = true
): { top: number; left: number } => {
  const padding = usePadding ? POPOVER_PADDING : 0
  const viewportWidth = globalThis.window?.innerWidth ?? 0
  const viewportHeight = globalThis.window?.innerHeight ?? 0
  const constrainedLeft = Math.max(
    padding,
    Math.min(left, viewportWidth - contentRect.width - padding)
  )
  const constrainedTop = Math.max(
    padding,
    Math.min(top, viewportHeight - contentRect.height - padding)
  )

  return { top: constrainedTop, left: constrainedLeft }
}

// Buscar el contenedor padre más cercano con position: relative
const findRelativeParent = (
  element: HTMLElement | null
): HTMLElement | null => {
  if (!element) return null

  let parent = element.parentElement
  while (parent) {
    const style = globalThis.window?.getComputedStyle(parent)
    if (style?.position === 'relative' || style?.position === 'absolute') {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}

export const PopoverContent = ({
  className,
  children,
  align = 'end',
  side = 'bottom',
  renderInParent = false,
  width,
  height,
  mobileWidth,
  mobileHeight,
  ...props
}: PopoverContentProps) => {
  const { open, onOpenChange, triggerRef } = usePopoverContext()
  const isMobile = useIsMobile()
  const contentRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  )
  const parentContainerRef = useRef<HTMLElement | null>(null)

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
      // Si renderInParent, usar el contenedor padre; sino usar triggerRef
      const referenceElement =
        renderInParent && parentContainerRef.current
          ? parentContainerRef.current
          : triggerRef.current
      if (
        contentRef.current &&
        referenceElement &&
        !contentRef.current.contains(e.target as Node) &&
        !referenceElement.contains(e.target as Node)
      ) {
        onOpenChange(false)
      }
    },
    [onOpenChange, triggerRef, renderInParent]
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
    // Si renderInParent, usar el contenedor padre; sino usar triggerRef
    const referenceElement =
      renderInParent && parentContainerRef.current
        ? parentContainerRef.current
        : triggerRef.current
    if (!referenceElement || !contentRef.current) return

    const referenceRect = referenceElement.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()

    // Solo desactivar gap/padding si está en mobile Y se pasaron mobileWidth="100vw" y mobileHeight="100vh"
    const isFullScreenMobile =
      isMobile &&
      mobileWidth !== undefined &&
      mobileHeight !== undefined &&
      (String(mobileWidth) === '100vw' || String(mobileWidth) === '100%') &&
      (String(mobileHeight) === '100vh' || String(mobileHeight) === '100%')

    // Aplicar gap solo si NO es pantalla completa en mobile
    const useGap = !isFullScreenMobile
    const { top, left } = calculatePositionBySide(
      side,
      align,
      referenceRect,
      contentRect,
      useGap
    )

    // Si renderInParent, calcular posición relativa al contenedor
    if (renderInParent && parentContainerRef.current) {
      const containerRect = parentContainerRef.current.getBoundingClientRect()
      // Posición relativa al contenedor
      const relativeTop = top - containerRect.top
      const relativeLeft = left - containerRect.left

      if (contentRef.current) {
        contentRef.current.style.top = `${relativeTop}px`
        contentRef.current.style.left = `${relativeLeft}px`
      }
    } else {
      // Aplicar padding solo si NO es pantalla completa en mobile
      const usePadding = !isFullScreenMobile
      const { top: constrainedTop, left: constrainedLeft } =
        constrainToViewport(top, left, contentRect, usePadding)

      if (contentRef.current) {
        contentRef.current.style.top = `${constrainedTop}px`
        contentRef.current.style.left = `${constrainedLeft}px`
      }
    }
  }, [
    side,
    align,
    triggerRef,
    renderInParent,
    mobileWidth,
    mobileHeight,
    isMobile,
  ])

  // Determinar dónde renderizar el portal
  useEffect(() => {
    if (renderInParent && triggerRef.current) {
      // Buscar el contenedor padre con position: relative
      const relativeParent = findRelativeParent(triggerRef.current)
      if (relativeParent) {
        parentContainerRef.current = relativeParent
        setPortalContainer(relativeParent)
      } else {
        // Fallback a document.body si no encuentra contenedor relativo
        parentContainerRef.current = null
        setPortalContainer(document.body)
      }
    } else {
      parentContainerRef.current = null
      setPortalContainer(document.body)
    }
  }, [renderInParent, triggerRef])

  useEffect(() => {
    // Si renderInParent, usar el contenedor padre; sino usar triggerRef
    const referenceElement =
      renderInParent && parentContainerRef.current
        ? parentContainerRef.current
        : triggerRef.current
    if (!open || !referenceElement || !contentRef.current) return

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, updatePosition, triggerRef, renderInParent])

  // Calcular estilos de ancho y alto
  const getWidthStyle = useCallback((): React.CSSProperties => {
    const style: React.CSSProperties = {}

    // Helper para convertir valores a string CSS
    const toCssValue = (value: string | number): string =>
      typeof value === 'number' ? `${value}px` : value

    if (isMobile && mobileWidth !== undefined) {
      // En mobile, usar mobileWidth
      style.width = toCssValue(mobileWidth)

      // En mobile, altura: mobileHeight si está definido, sino 100vh por defecto
      const heightValue = mobileHeight ?? '100vh'
      style.height =
        typeof heightValue === 'string' ? heightValue : toCssValue(heightValue)
    } else {
      // En desktop
      if (width !== undefined) {
        style.width = toCssValue(width)
      }
      if (height !== undefined) {
        style.height = toCssValue(height)
      }
    }

    return style
  }, [width, height, mobileWidth, mobileHeight, isMobile])

  if (!open || !portalContainer) return null

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
      style={getWidthStyle()}
      {...props}
    >
      {children}
    </div>,
    portalContainer
  )
}
