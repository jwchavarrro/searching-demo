/**
 * rick-morty-api.ts
 * @description: Funciones para hacer consultas a la API de Rick and Morty
 */

import {
  graphqlClient,
  SEARCH_CHARACTERS,
  GET_CHARACTER_BY_ID,
  GET_CHARACTERS,
} from '@/graphql'

// Import of types
import type { ApiResponseType, CharacterType } from '@/graphql/types'

/**
 * @name fetchCharacters
 * @description: Obtiene todos los personajes
 */
export async function fetchCharacters(): Promise<
  ApiResponseType<CharacterType>
> {
  try {
    const data = await graphqlClient.request<{
      characters: ApiResponseType<CharacterType>
    }>(GET_CHARACTERS)

    return data.characters
  } catch {
    throw new Error('Error al obtener los personajes')
  }
}

/**
 * @name fetchCharacterById
 * @description: Obtiene un personaje por su ID
 */
export async function fetchCharacterById(id: number): Promise<CharacterType> {
  try {
    const data = await graphqlClient.request<{
      character: CharacterType
    }>(GET_CHARACTER_BY_ID, { id })

    return data.character
  } catch {
    throw new Error('Error al obtener el personaje')
  }
}

/**
 * @name searchCharacters
 * @description: Busca personajes por nombre
 */
export async function searchCharacters(
  name: string
): Promise<ApiResponseType<CharacterType>> {
  try {
    const data = await graphqlClient.request<{
      characters: ApiResponseType<CharacterType>
    }>(SEARCH_CHARACTERS, { name })

    return data.characters
  } catch {
    throw new Error('Error al buscar personajes')
  }
}
