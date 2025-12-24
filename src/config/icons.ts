/**
 * config/icons.ts
 * @description: Este archivo exporta todas las configuraciones de los iconos de la aplicación.
 */

export const ICONS: Record<string, string> = {
  // Filtrado y búsqueda
  filter: 'hugeicons:filter-vertical',
  search_01: 'hugeicons:search-01',
  selection_03: 'hugeicons:cursor-magic-selection-03',

  // Estado y carga
  loading: 'svg-spinners:ring-resize',
  alert: 'hugeicons:alert-square',

  // Favoritos
  heart: 'mdi:heart',
  heart_outline: 'mdi:heart-outline',

  // Navegación
  arrow_left_02: 'hugeicons:arrow-left-02',
} as const
