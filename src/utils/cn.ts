import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind CSS de forma inteligente, resolviendo conflictos
 * entre clases duplicadas (ej: p-4 y p-2 -> solo p-2)
 * @param inputs - Clases de Tailwind CSS a combinar
 * @returns String con las clases combinadas y sin conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
