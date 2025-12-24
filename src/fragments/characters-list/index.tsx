/**
 * characters/index.tsx
 * @description: Fragmento para renderizar el listado de personajes
 */

import { CardA } from '@/components/atomic-desing/molecules'
import { Text } from '@/components/atomic-desing/atoms'
import { useCharacters } from '@/hooks'
import type { CharacterType } from '@/graphql/types'

export function CharactersList() {
  const { data, isLoading, error } = useCharacters()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text="Cargando personajes..." size="base" align="center" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text={`Error: ${error.message}`} size="base" align="center" />
      </div>
    )
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Text text="No se encontraron personajes" size="base" align="center" />
      </div>
    )
  }

  return (
    <div>
      {data.results.map((character: CharacterType) => (
        <CardA
          key={character.id}
          avatar={{
            src: character.image,
            alt: character.name,
            size: 'lg',
          }}
          title={{
            title: character.name,
          }}
          description={{
            text: character.species,
          }}
        />
      ))}
    </div>
  )
}
