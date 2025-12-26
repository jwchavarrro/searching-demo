/**
 * useIsMobile
 *
 * Hook personalizado para determinar si el dispositivo actual es considerado móvil
 * según el ancho de la ventana (viewport). Utiliza un breakpoint definido (768px)
 * para establecer la condición de "móvil".
 *
 * Características:
 * - Devuelve un booleano indicando si el viewport es menor al breakpoint móvil.
 * - Escucha cambios en el tamaño de la ventana para actualizar el estado en tiempo real.
 * - Garantiza consistencia entre SSR y cliente inicializando en false.
 * - Utiliza matchMedia para mejor rendimiento y precisión.
 *
 * @returns {boolean} true si el ancho de la ventana es menor a 768px (móvil), false en caso contrario.
 *
 * Ejemplo de uso:
 *   const isMobile = useIsMobile();
 *   if (isMobile) {
 *     return <MobileLayout />;
 *   }
 *   return <DesktopLayout />;
 */

import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export const useIsMobile = () => {
  // Inicializar con false para que sea consistente entre SSR y cliente
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Solo ejecutar en el cliente
    const checkMobile = () => {
      const width = globalThis.window?.innerWidth ?? 0
      setIsMobile(width < MOBILE_BREAKPOINT)
    }

    // Verificar inmediatamente
    checkMobile()

    // Configurar el listener usando matchMedia para mejor rendimiento
    const mql = globalThis.window?.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    )
    if (!mql) return

    const onChange = () => {
      checkMobile()
    }

    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
