/**
 * useUrlParam.ts
 * @description: Hook genérico para manejar parámetros de URL de forma reutilizable
 */

import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export type UrlParamType = 'string' | 'number' | 'boolean'

export interface UseUrlParamOptions<T = string> {
  defaultValue?: T
  type?: UrlParamType
  validator?: (value: string) => boolean
}

export interface UseUrlParamReturn<T> {
  value: T | null
  setValue: (value: T | null) => void
  remove: () => void
  isPresent: boolean
}

export function useUrlParam<T = string>(
  paramName: string,
  options: UseUrlParamOptions<T> = {}
): UseUrlParamReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams()
  const { defaultValue, type = 'string', validator } = options

  // Obtener y transformar el valor desde la URL
  const value = useMemo((): T | null => {
    const rawValue = searchParams.get(paramName)

    if (rawValue === null) {
      return defaultValue ?? null
    }

    // Validar si hay validador personalizado
    if (validator && !validator(rawValue)) {
      return defaultValue ?? null
    }

    // Transformar según el tipo
    switch (type) {
      case 'number': {
        const num = Number.parseFloat(rawValue)
        return Number.isNaN(num) ? (defaultValue ?? null) : (num as T)
      }
      case 'boolean': {
        const lower = rawValue.toLowerCase()
        if (lower === 'true' || lower === '1') return true as T
        if (lower === 'false' || lower === '0') return false as T
        return defaultValue ?? null
      }
      default:
        return rawValue as T
    }
  }, [searchParams, paramName, type, validator, defaultValue])

  const isPresent = searchParams.has(paramName)

  const setValue = (newValue: T | null) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (newValue === null) {
        newParams.delete(paramName)
      } else {
        newParams.set(paramName, String(newValue))
      }
      return newParams
    })
  }

  const remove = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.delete(paramName)
      return newParams
    })
  }

  return { value, setValue, remove, isPresent }
}

export interface UseUrlParamsReturn<T extends Record<string, unknown>> {
  values: Partial<T>
  setValue: <K extends keyof T>(key: K, value: T[K] | null) => void
  setValues: (newValues: Partial<T>) => void
  remove: (key: keyof T) => void
  removeAll: () => void
  isPresent: (key: keyof T) => boolean
}

/**
 * @name useUrlParams
 * @description: Hook para leer y actualizar múltiples parámetros de URL
 */
export function useUrlParams<T extends Record<string, string>>(
  paramNames: (keyof T)[]
): UseUrlParamsReturn<T> {
  const [searchParams, setSearchParams] = useSearchParams()

  const values = useMemo((): Partial<T> => {
    const params: Partial<T> = {}
    for (const paramName of paramNames) {
      const value = searchParams.get(String(paramName))
      if (value !== null) {
        params[paramName] = value as T[keyof T]
      }
    }
    return params
  }, [searchParams, paramNames])

  const setValue = <K extends keyof T>(key: K, value: T[K] | null) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      if (value === null) {
        newParams.delete(String(key))
      } else {
        newParams.set(String(key), String(value))
      }
      return newParams
    })
  }

  const setValues = (newValues: Partial<T>) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      for (const [key, value] of Object.entries(newValues)) {
        if (value == null) {
          newParams.delete(key)
        } else {
          newParams.set(key, String(value))
        }
      }
      return newParams
    })
  }

  const remove = (key: keyof T) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      newParams.delete(String(key))
      return newParams
    })
  }

  const removeAll = () => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)
      paramNames.forEach(name => newParams.delete(String(name)))
      return newParams
    })
  }

  const isPresent = (key: keyof T) => searchParams.has(String(key))

  return { values, setValue, setValues, remove, removeAll, isPresent }
}
