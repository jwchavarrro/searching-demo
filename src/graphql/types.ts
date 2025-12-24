/**
 * types.ts
 * @description: Tipos TypeScript para la API de Rick and Morty
 */

export interface CharacterType {
  id: number
  name: string
  image: string
  species: string
  status: 'Alive' | 'Dead' | 'unknown'
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  created: string
}

export interface ApiInfoType {
  count: number
  pages: number
  next: number | null
  prev: number | null
}

export interface ApiResponseType<T> {
  info: ApiInfoType
  results: T[]
}
