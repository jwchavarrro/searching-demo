/**
 * config/icons.ts
 * @description: Este archivo exporta todas las configuraciones de los iconos de la aplicación.
 */

export const ICONS: Record<string, string> = {
  // Filtrado y búsqueda
  filter: 'hugeicons:filter-vertical',
  search_01: 'hugeicons:search-01',
  selection_03: 'hugeicons:cursor-magic-selection-03',
  close: 'hugeicons:remove-circle',
  az: 'hugeicons:arrange-by-letters-az',
  za: 'hugeicons:arrange-by-letters-za',

  // Estado y carga
  loading: 'svg-spinners:ring-resize',
  alert: 'hugeicons:alert-square',

  // Favoritos
  heart: 'mdi:heart',
  heart_outline: 'mdi:heart-outline',

  // Navegación
  arrow_left_02: 'hugeicons:arrow-left-02',
  arrow_up_02: 'hugeicons:arrow-up-02',
  arrow_down_02: 'hugeicons:arrow-down-02',

  // CRUD
  create: 'hugeicons:plus-sign-square',
  update_02: 'hugeicons:pencil-edit-02',
  delete_01: 'hugeicons:delete-01',
} as const
