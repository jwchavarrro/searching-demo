/**
 * rick-morty-api.ts
 * @description: Funciones para hacer consultas a la API de Rick and Morty
 */

import { graphqlClient, SEARCH_CHARACTERS, GET_CHARACTERS } from '@/graphql'

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

/**
 * @name fetchCharacterByName
 * @description: Obtiene un personaje por su nombre (búsqueda exacta)
 */
export async function fetchCharacterByName(
  name: string
): Promise<CharacterType> {
  try {
    const data = await graphqlClient.request<{
      characters: ApiResponseType<CharacterType>
    }>(SEARCH_CHARACTERS, { name })

    // Buscar coincidencia exacta del nombre
    const exactMatch = data.characters.results.find(
      char => char.name.toLowerCase() === name.toLowerCase()
    )

    if (!exactMatch) {
      throw new Error('Personaje no encontrado')
    }

    return exactMatch
  } catch (err) {
    if (err instanceof Error) {
      throw err
    }
    throw new Error('Error al obtener el personaje')
  }
}
