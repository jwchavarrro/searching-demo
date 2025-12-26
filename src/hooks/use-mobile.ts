/**
 * use-mobile.ts
 * @description: Hook para determinar si el dispositivo actual es considerado móvil
 */
import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export const useIsMobile = () => {
  // Inicializar con false para que sea consistente entre SSR y cliente
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Verificar inmediatamente
    checkMobile()

    // Configurar el listener usando matchMedia para mejor rendimiento
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile()
    }

    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
